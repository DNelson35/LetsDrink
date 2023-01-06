# first event listener

## DomContentLoded Line

 DOMContentLoaded will run my javascript file after the html document is read and loaded, I did this because I wanted to move my script tag to the head in my html file for organization.

# Second eventListener 

## Sumbit Line

   In this event first the defalt setting of submiting to a url is prevented with prevent default. Then It changes the first letter of each word provided by the user to uppercase. After the event will check the condition of the while loop, If the cardContainer contains any children it will remove the child and check again untill no children remain. then it will check the Switch statment, if the selector value equals one of the cases it will run the fetch function associated with the case.

``` Javascript 
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
```
# Fetch functions

## FetchByName

Fetch by name takes a Name and a function as an argument. first the function runs the fetch with the name provided by the user to retrive data back from the API. Then when the resp comes back it is converted into Json that is easier to work with. after the resp is passed to a function. It takes a function as an argument because later in the code I need to check a condition of whether the catigory is name or liquor if liquor I need to run handle list to this fetch instead of show cards. If any of the steps above fail it will move into the catch and post an alert on the page for the user.

``` javascript
    function fetchByName(name, func){ 
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`)
        .then(resp => resp.json())
        .then(resp => func(resp))
        .catch((error) => alert(`Word mispelled or dosnt exist on file `))
    }
```

## fetchLiquorType

Like above this fetch works in a simular way. The only diffrense is the return data, and the function used to handle the resp. In this case we use showAllCards. The showAll cards runs a forEach and will display every obj in the array provided by the resp.

```Javascript
    function fetchLiquorType(name){
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${name}`)
        .then(resp => resp.json())
        .then(resp => showAllCards(resp)) 
        .catch(error => alert('Liquor Dosn\'t exits check spelling'))
    }
```

## FetchFirstLetter

This function works is just like FetchLiquor Type with the only diffrense being the resp data.

```javascript
    function fetchFirstLetter(name){
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${name}`)
        .then(resp => resp.json())
        .then(resp => showAllCards(resp))
        .catch(error => alert('typed more than one letter / or nothing found'))
    }
```

# Fetch Helper Functions

## Function uppercaseFirstLetters

This function is used above in the Submit event to pass the input value provided by the user into the fetch with each words first letter capitalized to match the Json Data

The function works by taking the event and the index as a paramiter. then in the function it takes the event target at the spcified index grabs the value splits it into an array of one or more words. Then it maps over that array with each word being represented by el. Each el then charAt(0) takes first letter of the current el. That is then uppercased and concatinated with the rest of the string with slice(1). slice(1) will represent all but the first letter of the string. the array reurned by map will then be joined back into a string and the new string will be returned by the function.

```javascript
    function uppercaseFirstLetters(e, index){
        return e.target[`${index}`].value.split(' ').map(el => {
            return el.charAt(0).toUpperCase() + el.slice(1)
        }).join(' ')
    }
```

## showCard

this function takes data as a paramater. it then sets a const var of item  to the first object in the drinks array given by the resp data of the fetch. It then passes that item into the function creatCards

```javascript
    function showCard(data){
        const item = data.drinks[0]
        createCard(item)
    }

```

## showAllCards 

This function does essintailly the same thing as above but in this case it takes the data drinks array and applies a forEach to it. This iterates over every object in the drinks array and calls createCards on each of them.

```javascript
    function showAllCards(data){
        data.drinks.forEach((drink) => {
            createCard(drink)
        })
    }
```

# helper function for showCard functions

## function createCard

this function takes an item as a paramater. It creates an div element cardDiv then passes cardDiv into the buildCardHtml function which takes cardDiv, and the item as the arguments. It then appends the cardDiv to the CardContainer element. After it appends it then calls three functions first CardClickEvent which takes cardDiv And item as argument, HandleMouseEvent which takes cardDiv as the argument, and removeUndifined which takes Card Div as an argument.

```javascript
    function createCard(item){
        const cardDiv = document.createElement('div')
        buildCardHtml(cardDiv, item)
        cardContainer.appendChild(cardDiv)

        cardClickEvent(cardDiv,item)
        handleMouseEvent(cardDiv)
        removeUndifined(cardDiv)
    }
```

# creatCard Helper Functions

## buildCardHtml function

this function takes has two paramaters the card, and the item. the function first sets the card class to 'card' then the cards innerhtml to html script reliant on the resp from the api. each card passed to this function will have an image, a name, a glass type, catigory, id, and a button. the only exception is liquor which will only have an image, id, and button. 

```javascript
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

```

# Third eventListener

## function cardClickEvent

This function takes the card and item as paramater. when this function is called it will take the last child of the card passed and add an event listener to it. for this function that child will always be a button. when clicked it then checks a condition. If the selctor value is not liquor it will run handle list as normal. If it is liquor it will call the fetch by name function and pass the name givin by the liquor fetch to it as an argument. This is done becuase liquor json contains no information on ingrediats. to add the igrediants i get it from the name fetch. when the condition is completed it changes the cards opacity to .6 to show the user the card has already been clicked.

```javascript

    function cardClickEvent (card, item){
        card.lastChild.addEventListener('click', (e) => {
            if(selector.value !== 'Liquor'){
                handleList(item)
            } else {
                fetchByName(item.strDrink, (resp) => {
                    handleList(resp.drinks[0])
                })
            }
            cardDiv.style.opacity = .6
        })
    }

```

# Fourth And Fith eventListeners

## function handleMouseEvent

This function has the card as the paramater. it takes the card passed to it and adds two events to it. the first event mouseover listens for when the mouse is directly over the card. When it is it changes the scale of the card to 1.05. the second mouseleave is used to change the cards scale back to 1 when the mouse is no longer over the card.

```javascript 
    function handleMouseEvent(card){
        card.addEventListener('mouseover', (e) => {
            card.style.transform = 'scale(1.05)'
        })
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1)'
        })
    }
```

## function removeUndifined

This function is used in the case liquor is the catigory. When liquor is the catigory it lacks some of the information needed to complete the cards set up in the buildHtml function. So this function takes any values that are set to undeifned and removes them from the card. The function takes card as a paramater. It then uses querySelectorAll to grab all the li elements inside the card. The function then applies a forEach to the array of li returned by the selector. For each li it will chech a condition. If the li text includes undedifned the li element will be reomoved.

```javascript
   function removeUndifined(card){
        card.querySelectorAll('li').forEach(li => {
            if(li.textContent.includes('undefined')){
                li.remove()
            }
        })
    }
```

# CardClickEvent helper function

## function handleList

This function has the item as a paramater. When this function is invoked it will create two elements. First ul, second the h2. it sets the ul class to 'recipe-list' then it appends the h2 to the ul after it chages the text content to concat the drink name with the string Ingredient List. Next it access the keys of the drink obj or the item being passed in the show card functions. Then filter will check a condition on each key. If the key contains the sub string 'strIngredients' and the value of that key is not null. Then it will create an li element set to recipe. It will change its class to 'recipe' and change its text content to that keys value. then append the recipe li to the ul. finally it appens the ul to the list element.

```javascript
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
```