# Phase-1-javascript-project

My web application uses the API https://www.thecocktaildb.com/api.php which is a large database of different alcoholic beverages, and how to make them.

The purpose of this App is to provide the user with information on the ingredients used to make the drink the user wants. The user can search for a drink that they like. When they find the drink they want they can click the add button to add that drink to a list. The list will display the Drink name and a list of ingredients needed to make the Drink. The user can continue to search/add under different categories and the list will continue to display. When the user is done searching they can look at the list to find all the drinks they selected and their ingredients. 

when the page loads there will be a search bar with a dropbox containing three categories. 
    Name - is the name of the beverage you want to find
    Liquor - the acholic used in the drink
    First Letter - the first letter of the drink you want to find

Name: will return one drink matching the name you provide with information on the glass used, the category, and ID. If the name doesn't exist or is misspelled an alert will display.

Liquor: when searching by liquor a list of all drinks containing the specified liquor will display. with the liquors ID number. If the liquor doesn't exist in the data set or if misspelled an alert will display.

First Letter: when searching by the first letter, a list of all drinks that start with the given letter will be displayed with glass type, category, and ID. If more than one letter is provided or if none of the drinks in the database exist with the character provided an alert will display.

https://youtu.be/Apmji8vh84o

## How it works

When the user selects a category the category is attached to the fetch request. when the user types in an input under any category. the user's response will be passed to the fetch attached to that category. Then the response is converted to a JSON file. Then the JSON file is passed to a function to create cards that display information from each item inside the JSON file. After the cards are created they are added to the DOM. On creation, Each card is given a button. for those buttons an eventListener is attached when a cards button is clicked, the callback function will filter through the JSON obj and find each ingredient if the ingredient exists. If it exists it will create a new ul and create a new li element for each ingredient. Then it will append the li to the ul and the ul to its container on the dom. The only exception is when the Liquor category is used. when a fetch for liquor is made the JSON file returns an array of objs with each obj containing only the name, picture, and ID. For the cards, it will only display these items. For the label elements when the user clicks the add button on the card, another fetch request is made with the name of the drink being passed to the fetch. When the fetch returns the information is passed to the function that creates the List element and the ingredients are displayed.

When the user performs a search on submit javascript will check if the card container already contains cards. If it does then the cards will be removed before displaying the newly searched item. This is to remove clutter on the page between searches. This will not remove the label elements. The label elements with the list of ingredients will remain until the user refreshes the page.
for more specific details click [here](functionNotes.md)


