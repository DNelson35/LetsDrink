// first eventListener 

document.addEventListener('DOMContentLoaded', () => {

    // grab elements 

    const cardContainer = document.querySelector('.middle')
    const form = document.querySelector('form')
    const list = document.querySelector('.list-container')
    const selector = document.querySelector('#search')

    // Second eventListener

    form.addEventListener('submit', (e) => 
    {
        e.preventDefault() // stop its defult of subiting the form data to a url.
        const input = uppercaseFirstLetters(e, 0) // found in helper functions line 62

        while(cardContainer.firstChild){
            cardContainer.firstChild.remove() // to clear cards from previous search
        }
        switch(selector.value){
            case 'Name':
                fetchByName(input, showCard) // line 38
                break;
            case 'Liquor':
                fetchLiquorType(input) // line 46
                break;
            case 'First':
                fetchFirstLetter(input) // line 53
                break;
        }
        document.querySelector('#form-input').value = '' // used to clear only the user input and not the selctor value
    })

    // fetch functions used in the the form event listener

    function fetchByName(name, func){ 
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`)
        .then(resp => resp.json())
        .then(resp => func(resp)) // to switch between two diffrent functions
        .catch((error) => alert(`Word mispelled or dosnt exist on file `))
    }


    function fetchLiquorType(name){
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${name}`)
        .then(resp => resp.json())
        .then(resp => showAllCards(resp)) // ShowAllCards can be found on line 73
        .catch(error => alert('Liquor Dosn\'t exits check spelling'))
    }

    function fetchFirstLetter(name){
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${name}`)
        .then(resp => resp.json())
        .then(resp => showAllCards(resp))
        .catch(error => alert('typed more than one letter / or nothing found'))
    }

    // Fetch helper functions

    function uppercaseFirstLetters(e, index){ // to upper case one or more words first letter
        return e.target[`${index}`].value.split(' ').map(el => {
            return el.charAt(0).toUpperCase() + el.slice(1)
        }).join(' ')
    }

    function showCard(data){
        const item = data.drinks[0]
        createCard(item) //line 81
    }

    function showAllCards(data){
        data.drinks.forEach((drink) => {
            createCard(drink)
        })
    }

    // helper function for showCard functions

    function createCard(item){
        const cardDiv = document.createElement('div')
        buildCardHtml(cardDiv, item) // line 93
        cardContainer.appendChild(cardDiv)
        // split into multiple function, speration of concerns
        cardClickEvent(cardDiv,item) // line 105
        handleMouseEvent(cardDiv) // line 118
        removeUndifined(cardDiv)  // line 127
    }

    // createCard Helper functions

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
                handleList(item) // line 137
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

    // helper function for cardClickEvent

    function handleList(item){ // the item will be the drink form the show card functions
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

