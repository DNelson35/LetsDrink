document.addEventListener('DOMContentLoaded', () => {

    // grab elements
    const cardContainer = document.querySelector('.middle')
    const form = document.querySelector('form')
    const list = document.querySelector('.list-container')
 console.log(list)

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

    function createCard(item){
        const cardDiv = document.createElement('div')
        buildCardHtml(cardDiv, item)
        cardContainer.appendChild(cardDiv)
        cardDiv.lastChild.addEventListener('click', (e) => {
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
        })
    }
    
    function findCard(data,input){
        data.drinks.filter((item) => {
            if(input.toUpperCase() === item.strDrink.toUpperCase()){
                createCard(item)
            }
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
        .then(resp => findCard(resp,name))
        .catch((error) => console.log(error.message))
    }

    // call fetch request
    form.addEventListener('submit', (e) => 
    {
        e.preventDefault()
        const input = uppercaseFirstLetters(e, 0)
        fetchByName(input)

        form.reset()
        
    })

    
    
    



})

