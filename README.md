<h1 align="center">TkAPI Bot - Tik Tak Toe Bot</h1>

<p align="center">
  <i>TkAPI is a library API Bot where you make the the Tik Tak Toe Game easily with this bot<br> using Typescript/JavaScript and other languages.</i>
</p>

<p align="center">
    <b>This is a bot not an AI</b>
</p>

<p align="center">
  <a href="./CONTRIBUTING.md">Contributing</a>
  ·
  <a href="https://github.com/ZhengLinLei/TkAPI/issues">Issues</a>
</p>

<p align="center">
  <a href="https://opensource.org/licenses/Apache-2.0">
    <img src="https://img.shields.io/badge/License-Apache%202.0-blue.svg" alt="TkAPI License" />
  </a>&nbsp;
  <a>
    <img src="https://img.shields.io/badge/version-1.0-brightgreen" alt="TkAPI Version" />
  </a>&nbsp;
  <a>
    <img src="https://img.shields.io/badge/size-4kb-yellow" alt="TkAPI Size" />
  </a>
</p>

<hr>

## Index

Learn how to use this library

- [Content](#content)
- [Getting Started](#gettingstarted)
- [Examples](#examples)
- [Extension](#extension)


## <a name="content"></a> Content

Before getting started to your tik tak toe game it is necessary to know what includes in this repository.

You can view code examples in `./tutorial` folder, and the source code in `./src` folder. The minified project files are in the `./min` folder where includes two files:

*Main file*
``
./min/tkapi.min.js
``

**Extension file**

_This file is an extension from the main file. If you want to create an easy and fast view, we have the solution for you. For the documentation [here](#extension)_
``
./min/tkapiGui.min.js
``


## <a name="gettingstarted"></a> Getting Started

#### Guide

**Properties**
- [class.options](#class.options)


**Method**
- [class.getResponse(:int)](#class.getResponse)
- [class.getHistory()](#class.getHistory)
- [class.getSimplyUI()](#class.getSimplyUI)
- [class.getWinner()](#class.getWinner)
- [class.reset()](#class.reset)


**Unfortunately we do not have a CDN, but you can clone the repo and use it in local**

### 1. Firstly add the script to your project

```html
<script src="./min/tkapi.min.js"></script>
```

And if you want to use the auto make default UI view add this script before the main file
```html
<script src="./min/tkapiGui.min.js"></script>
```


### 2. Create a varible with the class

_Here we are going to learn how to use only the main class, if you want to read the extension documentation click [here][#extension]_


In your JS file or inner script tag
```javascript
const TKAPI = new TkApi();
```

The object require options, if you do not pass anything the bot use the defaults options.
All this options can be changed in process, with the property of the class `class.options` replacing the class to your variable name.
```javascript
{

    symbol: {

        // Symbol used for simply UI if you want to personalizate it; Options (x | 0) :Default | Str

        bot: "x",
        user: "o"
    },

    botType: "Bot", // Options "Bot" :Default | "Random"

    speed: 5 // Options in ms, miliseconds 5 :Default | Int > 0; This is for a synchronous pause when the bot response

}
```


### 3. <a name="class.options"></a> Change the options

You can change the options with `class.options` property
```javascript
TKAPI.options = {
    symbol: {
        bot: "-",
        user: "*"
    },
    botType: "Random",
    speed: 5
}
```


### 4. <a name="class.getResponse"></a> Making a request to the bot [ class.getResponse(:int) ]

The `class.getResponse(:num)` is a conection between user and bot, need one parameters and must be a number between 0 to 8, logically the 8 positions avalibales in the tik tak toe table.

After you call this method with the position where the user want to put the token in the table, the bot returns a number, and it is the position of the table where the bot chose.

If you pass a not empty position, the bot returns an error
```javascript
TKAPI.getResponse(4);
```

You can save the the value in a variable and then use it
```javascript
let botNumberPosition = TKAPI.getResponse(4);

console.log(botNumberPosition);
// Output: Int
//
// 2
```


### 5. <a name="class.getHistory"></a> Get the game history [ class.getHistory() ]

If you want to check the history of the game you can use `class.getHistory()`, and it will return an object
```javascript
let historyGame = TKAPI.getHistory();

console.log(historyGame);
//Output: Object
//
//  {
//      user: [0, 1],
//      bot: [2],
//      round: 2
//  }
```


### 6. <a name="class.getSimplyUI"></a> Get a simply status view [ class.getSimplyUI() ]

When you are debugging or you want to view the status, you can call this function to get the interface of the game in the console
```javascript
TKAPI.getSimplyUI();

//Output: Str
//
//  ___ ___ ___  
// | o |   | x |
//  ___ ___ ___  
// |   |   |   |
//  ___ ___ ___  
// |   |   |   |
//  ___ ___ ___  
//
//  Round: 1
```


### 7. <a name="class.getWinner"></a> Get the winner [ class.getWinner() ]

When the bot stopped running, means that finish all the process and you can call `class.getWinner()` and will return 4 values `false | 'bot' | 'user' | 'draw'`

- `false`: When nobody won or the round is in process or not finished
- `'bot'`: When the bot won the game
- `'user'`: When the user won the game
- `'draw'`: When the process finished and nobody won the game

```javascript
console.log(TKAPI.getWinner());

//Output: Str | Boolean
//
// false
```


### 8. <a name="class.reset"></a> Reset all [ class.reset() ]

For reset all



## <a name="examples"></a> Examples

HTML
```html
<section class="tkGUI-viewer">
    <div class="0" block-position="0"></div>
    <div class="1" block-position="1"></div>
    <div class="2" block-position="2"></div>
    <div class="3" block-position="3"></div>
    <div class="4" block-position="4"></div>
    <div class="5" block-position="5"></div>
    <div class="6" block-position="6"></div>
    <div class="7" block-position="7"></div>
    <div class="8" block-position="8"></div>
</section>
```


JavaScript
```javascript
const TKAPI = new TkApi(); // DEFAULTS OPTIONS

// console.log(TKAPI.options);  IF YOU WANT TO SEE THE CURRENT OPTIONS AND CHANGE IT IF YOU WANT, IT IS A PUBLIC PROPERTY
let gameMarker = TKAPI.options.symbol;

let btnPositionDiv = document.querySelectorAll('.tkGUI-viewer > div');
btnPositionDiv.forEach(el =>{
    el.addEventListener('click', ()=>{
        let botNum = TKAPI.getResponse(parseInt(el.getAttribute('block-position')));
        // IF BOT RETURN FALSE DO NOT DO ANYTHING
        // REMMENBER THAT EXIST THE POSITION 0, SO YOU NEED TO BE CAREFULL TO USE if(botNum){} BECAUSE THAT WILL RETURN FALSE WHEN THE BOT RETURN POSITION 0
        if(botNum !== false){ 
            // IF THE BOT RETURN A NUMBER MEANS THAT ALL IS GOING WELL AND YOU CAN CONTINUE RUNNING THE PROCESS HERE
            el.innerHTML = gameMarker.user;

            // REMMENBER THAT EXIST THE -1 STATUS AND MEANS THAT THE BOT STOPPED WORKING BECAUSE SOMEONE WON, AND IS WAITING THE USER FOR RESET
            if(botNum >= 0){
                btnPositionDiv[botNum].innerHTML = gameMarker.bot;
            }

            // CHECK THE GAME STATUS WITH class.getWinner();

            // FOR SIMPLY UI VIEW IN DEBUG PROCCESS YOU CAN USE THE class.getSimplyUI();

            let statusGame = TKAPI.getWinner();

            if(statusGame){
                // CONSOLE THE STATUS

                console.log(statusGame);
            }
        }
    });
});
```


## <a name="extension"></a> Extension

With the main file js you can create your own tik tak toe game code, but if you want to make the game fastly you can use the default GUI extensions



### 1. Include this script after the main script

```html
<script src="./min/tkapiGui.min.js"></script>
```


### 2. Create the variable
```javascript
let element = document.getElementById('element'); // The element where the library are going to insert the code
let options = {}; // The options of TkApi
const TKAPIGUI = new TkApiGui(element, options, (statusGame) => { // Do this when someone won the game });
```

### 3. Examples of code
```javascript
let element = document.getElementById('element');
let options = {};
const TKAPIGUI = new TkApiGui(element, options, (statusGame) => {
  // PRINT THE STATUS
  console.log(statusGame);
});
```






### Love this repo? Give us a star ⭐

<a href="./">
  <img src="https://img.shields.io/badge/TkAPI-Rate-blue">
</a>