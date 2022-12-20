document.addEventListener('DOMContentLoaded', () => {

    const cardContainer = document.querySelector('.middle')
    const form = document.querySelector('form')

    function createCard(item){
        const cardDiv = document.createElement('div')
        const cardName = document.createElement('p')
        const cardImg = document.createElement('img')
        cardDiv.classList = 'card'
        cardName.textContent = `${item.strDrink}`
        cardImg.src = item.strDrinkThumb
        cardImg.loading = 'lazy'
        cardContainer.appendChild(cardDiv)
        cardDiv.appendChild(cardImg)
        cardDiv.appendChild(cardName)
    }
    
    function findCard(data,input){
        data.drinks.filter((item) => {
            if(input.toLowerCase() === item.strDrink.toLowerCase()){
                createCard(item)
            }
        })
    }

    form.addEventListener('submit', (e) => 
    {
        e.preventDefault()
        const inputArr = e.target[0].value.split(' ')
        const input = inputArr.map(el => {
            return el.charAt(0).toUpperCase() + el.slice(1)
        }).join(' ')
        
        console.log(input)
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${input}`)
        .then(resp => resp.json())
        .then(resp => findCard(resp,input))

        form.reset()
        
    })
    
    
    



})

