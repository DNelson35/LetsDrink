document.addEventListener('DOMContentLoaded', () => {

    // grab elements


    const cardContainer = document.querySelector('.middle')
    const form = document.querySelector('form')
    const list = document.querySelector('.list-container')
    const selector = document.querySelector('#search')


    // helper functions


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

    function handleList(item){
        console.log(item)
        const ul = document.createElement('ul')
        ul.classList = 'recipe-list'
        const h2 = document.createElement('h2')
        ul.appendChild(h2)
        h2.textContent = `${item.strDrink} Ingredient List`
        Object.keys(item).filter((value) => {
            if(value.includes('strIngredient') && item[value] !== null){
                h2.textContent = `${item.strDrink} Ingredient List`
                const recipe = document.createElement('li')
                recipe.classList = 'recipe'
                recipe.textContent = item[value]
                ul.appendChild(recipe)
            }
            list.appendChild(ul)
        })
    }

    function createCard(item){
        const cardDiv = document.createElement('div')
        buildCardHtml(cardDiv, item)
        cardContainer.appendChild(cardDiv)
        cardDiv.lastChild.addEventListener('click', (e) => {
            if(selector.value !== 'Liquor'){
                handleList(item)
            } else {
                fetchByName(item.strDrink, (resp) => {
                    handleList(resp.drinks[0])
                })
            }
            
        })
        cardDiv.querySelectorAll('li').forEach(li => {
            if(li.textContent.includes('undefined')){
                li.remove()
            }
        })
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

    function uppercaseFirstLetters(e, index){
        const inputArr = e.target[`${index}`].value.split(' ')
        return inputArr.map(el => {
            return el.charAt(0).toUpperCase() + el.slice(1)
        }).join(' ')
    }

    // build fetch
    function fetchByName(name, func){
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`)
        .then(resp => resp.json())
        .then(resp => func(resp))
        .catch((error) => alert(`Word mispelled or dosnt exist on file `))
    }

    function fetchRandom(){
        fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
        .then(resp => resp.json())
        .then(resp => showCard(resp))
        .catch(error => console.log(error))
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

    // call fetch request
    form.addEventListener('submit', (e) => 
    {
        e.preventDefault()
        while(cardContainer.firstChild){
            cardContainer.firstChild.remove()
        }
        const input = uppercaseFirstLetters(e, 0)
        if(selector.value === 'Name'){
            fetchByName(input, showCard) 
        }
        if(selector.value === 'Liquor'){
            fetchLiquorType(input)
        }
        if(selector.value === 'First'){
            fetchFirstLetter(input)
        }

        document.querySelector('#form-input').value = ''
    })

    
    
    



})

