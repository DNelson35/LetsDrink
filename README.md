# Phase-1-javascript-project

My web-application uses the https://www.thecocktaildb.com/api.php which is a large data base of diffrent achololic beverages, and how to make them.

The purpose of this App is to provide the user with information on the ingrediats used to make the drink the user wants. The user can search for a drink that they like. When they find the drink they want they can click the add button to add that drink to a list. The list will display the Drink name and a list of ingrediats needed to make the Drink. The user can continue to search/add under diffrent catigories and the list will continue to display. When the user is done searching they can look at the list to find all the drinks they selected and thier ingrediants. 

when the page loads there will be a search bar with a dropbox containing three catigories. 
    Name - is the name of the bevrage you want to find
    Liquor - the acholole used in the drink
    First Letter - first letter of the drink you want to find

Name: will return one drink matching the name you provide with information on the glass used, the catigory, and ID. If the name dosnt exist or is misspelled an alert will display.

Liquor: when serching by liquor a list of all drinks containing the specified liquor will display. with the liquors ID number. IF the liquor doesn't exist in the data set or if misspelled an alert will display.

First Letter: when searching by first letter, a list of all drinks that start with the given letter will be displayed with glass type, catigory, and ID. If more than one letter is provided or if none of the drinks in the database exist with the character provided an alert will display.

## How it works

When the user selects a catigory the catigory is atached to fetch request. when they user types in an input under any catigory. the useres reponse will be passed to the fetch attached to that catigory. Then the respone is converted to a json file. Then the json file is passed to a function to create cards that display information from each item inside the json file. After the cards are created they are added to the DOM. On creation Each card is given a button. for those buttons an eventListener is attached when a cards button is click, the call back function will fillter though the json obj and find each ingrediant if the ingrediant exist. If it exist it will create a new ul and creat a new li element for each ingreadint. Then it will append the li to the ul and the ul to its container on the dom. 

The only exception  is when the Liqour catigory is used. when a fetch for liqour is made the json file retuns an array of objs with each obj containing only the name, picture, and ID. For the cards it will only display these items. For the lable elements when the user clicks the add button on the card another fetch request is made with the name of the drink being passed to the fetch. When the fetch returns the information is passed to the function that creates the List element and the ingredints are displayed.

When the user preformes a search on submit javascript will check if the card container already contains cards. If it does then the cards will be removed before displaying the new searched item. This is to remove cluter on the page between searches. This will not remove the label elements. The labels elements with the list of ingrediats will remain untill the user refreshes the page.


