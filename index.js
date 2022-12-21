document.addEventListener('DOMContentLoaded', () => {

    // grab elements


    const cardContainer = document.querySelector('.middle')
    const form = document.querySelector('form')
    const list = document.querySelector('.list-container')
    const selector = document.querySelector('#search')

    // helper functions

    function buildCardHtml(card,item){
        card.classList = 'card'
        card.innerHTML = `  <img src=${item.strDrinkThumb} alt="Drink-Image" style="width:100%">
          <h4><b>${item.strDrink}</b></h4>
          <ul class="ing-list">
          <li><b>Glass:</b> ${item.strGlass}</li>
          <li><b>Category:</b> ${item.strCategory}</li>
          <li><b>ID:</b> ${item.idDrink}</li>
          </ul>
          <button class="addBtn">+</button>`
    }

    function handleList(item){
        const ul = document.createElement('ul')
        ul.classList = 'recipe-list'
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

    function createCard(item){
        const cardDiv = document.createElement('div')
        buildCardHtml(cardDiv, item)
        cardContainer.appendChild(cardDiv)
        cardDiv.lastChild.addEventListener('click', (e) => {
            handleList(item)
        })
    }
    
    function showCard(data){
            const item = data.drinks[0]
            createCard(item)
    }

    function showAllCards(data){
        console.log(data)
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
    function fetchByName(name){
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`)
        .then(resp => resp.json())
        .then(resp => showCard(resp))
        .catch((error) => alert(`Word mispelled or dosnt exist on file `))
    }

    function fetchRandom(){
        fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
        .then(resp => resp.json())
        .then(resp => showCard(resp))
        .catch(error = console.log(error))
    }

    function fetchLiquorType(name){
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${name}`)
        .then(resp => resp.json())
        .then(resp => showAllCards(resp))
        .catch(error = console.log('liquor error'))
    }

    function fetchFirstLetter(name){
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${name}`)
        .then(resp => resp.json())
        .then(resp => showAllCards(resp))
        .catch(error = console.log('first error'))
    }

    // call fetch request
    form.addEventListener('submit', (e) => 
    {
        e.preventDefault()
        const input = uppercaseFirstLetters(e, 0)
        if(selector.value === 'Name'){
            fetchByName(input) 
        }
        if(selector.value === 'Liquor'){
            fetchLiquorType(input)
        }
        if(selector.value === 'First'){
            console.log(selector.value)
            fetchFirstLetter(input)
        }
        

        form.reset()
        
    })

    
    
    



})

