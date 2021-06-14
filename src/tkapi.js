class TkApi {
    //=======================
    // CREATE HISTORY (PRIVATE)
    history = {
        user: [],
        bot: [],
        round: 0
    }
    //=======================
    constructor(Json){
        // ADD DEFAULT OR USER INDICATED OPTIONS
        //THIS IS A DEFAULT PARAMS, YOU CAN GET MORE INFO IN ./params.js FILE
        let template = {
            symbol: {
                bot: 'x',
                user: 'o'
            },
            botType: 'Bot',
            speed: 1
        }

        let botMode = ['Random', 'Bot'];

        this.options = (Json)?{
            symbol: {
                bot: (Json.symbol && Json.symbol.bot)? Json.symbol.bot : template.symbol.bot,
                user: (Json.symbol && Json.symbol.user)? Json.symbol.user : template.symbol.user
            },
            botType: (Json.botType && botMode.includes(Json.botType))? Json.botType : template.botType,
            speed: (Json.speed && !isNaN(Json.speed))? Json.speed : template.speed
        }:template;
    }
    // GET HISTORY OF THE ACTUAL GAME
    getHistory(){
        return this.history;
    }
    // RESET ALL
    reset(){
        // !IMPORTANT: THE HISTORY WILL BE DELETE
        // HISTORY 
        this.history.bot = [];
        this.history.user = [];
        this.history.round = 0;

        return true;
    }
    // GET BOT RESPONSE
    getResponse(position){
        // CHECK IF THE 
        if(typeof position === 'undefined'){
            console.error(`Function need almost one input in "class.getResponse(:num)"`);

            return false;
        }
        // CHECK THE VALID NUM
        if(!this.validPos(position)){
            console.error(`Invalid input ${position} position in "class.getResponse(:num)"`);

            return false;
        }
        // CHECK IF USER OR BOT ELECTED THIS POSITION BEFORE
        if(!this.emptyPos(position)){
            console.error(`Position ${position} not empty in "class.getResponse(:num)"`);

            return false;
        }

        // SAVE USER ACTION
        this.history.user.push(position);
        this.history.round ++;

        // PREPARE ACTIONS
        var dt = new Date();
	    while ((new Date()) - dt <= this.options.speed) { /* Do nothing */ }

        // IF THE BOT DETECT SOMEONE WON AUTOMATICALLY STOP
        if(!this.getWinner()){
            // RETURN THE CORRECT MODE
            return (this.options.botType === 'Random')? this.randomBotMode(position) : this.normalBotMode(position);
        }
        return -1; // THE -1 MEANS THAT THE BOT STOPPED WORKING AND WAITING THE USER FOR RESET THE GAME
    }
    // GET A CONSOLE SIMPLY INTERFACE
    getSimplyUI(){
        let text = ''; // TEXT PLAIN

        for (let i = 0; i < 10; i = i + 3) {
            text += ' ___ ___ ___  ';

            if(i < 8){
                text += `\n| ${(this.history.user.includes(i))? this.options.symbol.user : ((this.history.bot.includes(i))? this.options.symbol.bot : ' ')} | ${(this.history.user.includes(i + 1))? this.options.symbol.user : ((this.history.bot.includes(i + 1))? this.options.symbol.bot : ' ')} | ${(this.history.user.includes(i + 2))? this.options.symbol.user : ((this.history.bot.includes(i + 2))? this.options.symbol.bot : ' ')} |\n`;
            }
        }

        // ACTUAL ROUND 
        text += `\n\n Round: ${this.history.round}`;

        console.log(text);
    }
    // GET WINNER; !iMPORTANT: YOU MUST CALL THIS FUNCTION EVERYTIME
    getWinner(){
        let key = ['user', 'bot'];

        for (let i = 0; i < key.length; i++) {
            const el = key[i];

            // ROW CHECK
            for (let i = 0; i < 9; i = i + 3) {
                if(this.history[el].includes(i) && this.history[el].includes(i + 1) && this.history[el].includes(i + 2)){
                    return el;
                }
            }
            // COLUMN CHECK
            for (let i = 0; i < 3; i++) {
                if(this.history[el].includes(i) && this.history[el].includes(i + 3) && this.history[el].includes(i + 6)){
                    return el;
                }
            }
            // DIAGONAL CHECK
            if(
                (this.history[el].includes(0) && this.history[el].includes(4) && this.history[el].includes(8)) ||
                (this.history[el].includes(2) && this.history[el].includes(4) && this.history[el].includes(6))

            ){
                return el;
            }
        };

        // CHECK IF IT IS A DRAW
        for (let i = 0; i < 9; i++) {
            if(!this.history.bot.includes(i) && !this.history.user.includes(i)){
                // WHEN ANYONE HAVE THE NUMBER MEANS THAT EXIST EMPTY POSITIONS
            return false;
            }
        }

        // RETURN DRAW BECAUSE NOBODY WON THE GAME AND THERE IS NOT EMPTY PLACE TO CHOOSE
        return 'draw';
    }
    // !INNER FUNCTIONS --------------------------
    validPos(num){
        return (!isNaN(num) && num > -1 && num < 9)? true : false; // RETURN TRUE IF THE NUMBER IS SMALLER THAN 9 AND BIGGER THAN -1; OPTIONS VALID: 0 | 1 | ... | 9
    }
    emptyPos(num){
        return (this.history.user.includes(num) || this.history.bot.includes(num))? false : true; // IF ANYONE ELECTED THE NUMBER WILL RETURN TRUE
    }
    // RANDOM BOT MODE
    randomBotMode(){
        // GENERATE RANDOM NUMBER BETWEEN 0 TO 8
        let numBot = Math.round(Math.random() * 8);

        if(!this.emptyPos(numBot)){
            return this.randomBotMode();
        }

        // GENERATE 
        this.history.bot.push(numBot);

        return numBot;
    }
    // NORMAL BOT MODE
    normalBotMode(){
        // RANDOM POSITION AT FIRST STEP
        if(this.history.round < 2){
            return this.randomBotMode();
        }
        
        // START THE BOT ENGINE
        return this.botEngine();
    }
    // BOT ENGINE TO PLAY
    botEngine(){
        let numBot; // BOT NUMBER
        let numArr = {
            defenseNumArr: [],
            attackNumArr: []
        }
        let defenseNum, attackNum;

        //==============
        // DEFENSE FIRST
        //==============
        //================
        // ATTACK SECOND
        //================

        // THAT IS BECAUSE WHEN THE BOT CHOOSE THE DEFENSE NUMBER AND THE SEARCHED A GOOD POSITION FOR ATTACK, REPLACE THE NUMBER

        let key = ['user', 'bot']; // FIRST SCAN THE USER HISTORY FOR MAKE A DECISION FOR DEFENSE AND THE SELF HISTORY TO MAKE A ATTACK AND REPLACE THE NUMBER CHOSE PREVIOUSLY
        let numKey = ['defenseNumArr', 'attackNumArr']; // SAVE ALL THE NUMBER AVALIABLE AND THEN MAKE AN ANALITYC WITH THEM


        key.forEach((el, index) => {
            // ROW CHECK
            for (let i = 0; i < 9; i = i + 3) {
                // FIRST COLUMN
                if(this.history[el].includes(i+1) && this.history[el].includes(i+2)){
                    numArr[numKey[index]].push(i);
                }
                // SECOND COLUMN
                if(this.history[el].includes(i) && this.history[el].includes(i+2)){
                    numArr[numKey[index]].push(i+1);
                }
                // THIRD COLUMN
                if(this.history[el].includes(i) && this.history[el].includes(i+1)){
                    numArr[numKey[index]].push(i+2);
                }
            }
            // COLUMN CHECK
            for (let i = 0; i < 3; i++) {
                // FIRST ROW
                if(this.history[el].includes(i+3) && this.history[el].includes(i+6)){
                    numArr[numKey[index]].push(i);
                }
                // SECOND ROW
                if(this.history[el].includes(i) && this.history[el].includes(i+6)){
                    numArr[numKey[index]].push(i+3);
                }
                // THIRD ROW
                if(this.history[el].includes(i) && this.history[el].includes(i+3)){
                    numArr[numKey[index]].push(i+6);
                }
            }
            // DIAGONAL CHECK
            // FIRST DIAGONAL
            // _x_|_ _|_ _
            // _ _|_x_|_ _
            //    |   | x 

            // FIRST ROW
            if(this.history[el].includes(4) && this.history[el].includes(8)){
                numArr[numKey[index]].push(0);
            }
            // SECOND ROW
            if(this.history[el].includes(0) && this.history[el].includes(8)){
                numArr[numKey[index]].push(4);
            }
            // THIRD ROW
            if(this.history[el].includes(0) && this.history[el].includes(4)){
                numArr[numKey[index]].push(8);
            }
            // SECOND DIAGONAL
            // _ _|_ _|_x_
            // _ _|_x_|_ _
            //  x |   |  

            // FIRST ROW
            if(this.history[el].includes(4) && this.history[el].includes(6)){
                numArr[numKey[index]].push(2);
            }
            // SECOND ROW
            if(this.history[el].includes(2) && this.history[el].includes(6)){
                numArr[numKey[index]].push(4);
            }
            // THIRD ROW
            if(this.history[el].includes(2) && this.history[el].includes(4)){
                numArr[numKey[index]].push(6);
            }
        });

        // CHOOSE THE FIRST NUMBER AVALIABLE IN DEFENSE
        numArr.defenseNumArr.forEach(element => {
            if(this.emptyPos(element)){
                defenseNum = element;

                return true; // RETURN TO STOP THE FOREACH
            }
        });

        // CHOOSE THE FIRST NUMBER AVALIABLE IN ATTACK
        numArr.attackNumArr.forEach(element => {
            if(this.emptyPos(element)){
                attackNum = element;

                return true; // RETURN TO STOP THE FOREACH
            }
        });

        numBot = (typeof attackNum !== 'undefined')? attackNum : defenseNum; // IF EXIST THE ATTACK OPPORTUNITY CHOOSE THE ATTACK FIRST

        // SECOND FILTER. RETURN RANDOM POSITION WHEN THE POSITION IS NOT EMPTY
        if(typeof numBot === 'undefined' || !this.emptyPos(numBot)){
            return this.randomBotMode();
        }

        // GENERATE 
        this.history.bot.push(numBot);

        return numBot;
    }
}