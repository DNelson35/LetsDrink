document.addEventListener('DOMContentLoaded', () => {

    const cardContainer = document.querySelector('.middle')
    const form = document.querySelector('form')
    const list = document.querySelector('.list-container')
    const selector = document.querySelector('#search')

    form.addEventListener('submit', (e) => 
    {
        e.preventDefault() 
        
        const input = uppercaseFirstLetters(e, 0) 

        while(cardContainer.firstChild){
            cardContainer.firstChild.remove() 
        }
        switch(selector.value){
            case 'Name':
                fetchByName(input, showCard) 
                break;
            case 'Liquor':
                fetchLiquorType(input) 
                break;
            case 'First':
                fetchFirstLetter(input) 
                break;
        }
        document.querySelector('#form-input').value = ''
    })

    function fetchByName(name, func){ 
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`)
        .then(resp => resp.json())
        .then(resp => func(resp)) 
        .catch((error) => alert(`Word mispelled or dosnt exist on file `))
    }


    function fetchLiquorType(name){
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${name}`)
        .then(resp => resp.json())
        .then(resp => showAllCards(resp)) 
        .catch(error => alert('Liquor Dosn\'t exits check spelling'))
    }

    function fetchFirstLetter(name){
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${name}`)
        .then(resp => resp.json())
        .then(resp => showAllCards(resp))
        .catch(error => alert('typed more than one letter / or nothing found'))
    }


    function uppercaseFirstLetters(e, index){ 
        return e.target[`${index}`].value.split(' ').map(el => {
            return el.charAt(0).toUpperCase() + el.slice(1)
        }).join(' ')
    }

    function showCard(data){
        const item = data.drinks[0]
        createCard(item) 
    }

    function showAllCards(data){
        data.drinks.forEach((drink) => {
            createCard(drink)
        })
    }

    function createCard(item){
        const cardDiv = document.createElement('div')
        buildCardHtml(cardDiv, item) 
        cardContainer.appendChild(cardDiv)
        cardClickEvent(cardDiv,item)
        handleMouseEvent(cardDiv) 
        removeUndifined(cardDiv)  
    }

    function buildCardHtml(card, item){
        card.classList = 'card'
        card.innerHTML = `  <img loading="lazy" src=${item.strDrinkThumb} alt="Drink-Image" style="width:100%">
          <h4><b>${item.strDrink}</b></h4>
          <ul class="ing-list">
          <li><b>Glass:</b> ${item.strGlass}</li>
          <li><b>Category:</b> ${item.strCategory}</li>
          <li><b>ID:</b> ${item.idDrink}</li>
          </ul>
          <button class="addBtn">+</button>`
    }

    function cardClickEvent (card, item){
        card.lastChild.addEventListener('click', (e) => {
            if(selector.value !== 'Liquor'){
                handleList(item) 
            } else {
                fetchByName(item.strDrink, (resp) => {
                    handleList(resp.drinks[0])
                })
            }
            card.style.opacity = .6
        })
    }

    function handleMouseEvent(card){
        card.addEventListener('mouseover', (e) => {
            card.style.transform = 'scale(1.05)'
        })
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1)'
        })
    }

    function removeUndifined(card){
        card.querySelectorAll('li').forEach(li => {
            if(li.textContent.includes('undefined')){
                li.remove()
            }
        })
    }

    function handleList(item){ 
        const ul = document.createElement('ul')
        ul.classList = 'recipe-list'
        const h2 = document.createElement('h2')
        ul.appendChild(h2)
        h2.textContent = `${item.strDrink} Ingredient List`
        Object.keys(item).filter((value) => { 
            if(value.includes('strIngredient') && item[value] !== null){
                const recipe = document.createElement('li')
                recipe.classList = 'recipe'
                recipe.textContent = item[value]
                ul.appendChild(recipe)
            }
            list.appendChild(ul)
        })
    }
})

