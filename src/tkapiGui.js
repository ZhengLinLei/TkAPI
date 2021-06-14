class TkApiGui {
    // PRIVATE VARIABLES
    elementDOM; options; onwin;

    constructor(element, options, onwin){
        this.elementDOM = element;
        this.options = (typeof options == 'undefined')? {} : options;
        this.onwin = onwin; // THIS IS A FUNCTION WHERE RETURN WHEN SOMEONE WON THE GAME
        // CREATE ELEMENT
        this.createElement();
        this.jsProduction();
    }
    destroyElement(){
        this.elementDOM.innerHTML = '';
        return true;
    }
    reset(){
        // CALL THIS FUNCTION WHEN YOU WANT TO RESET ALL
        let btnPositionDiv = this.elementDOM.querySelectorAll('.tkGUI-viewer > div');
        btnPositionDiv.forEach(el => {
            el.innerHTML = '';
        });

        this.Bot.reset();

        return true;
    }
    //! INNER FNC----------------------
    createElement(){
        let html = `<section class="tkGUI-viewer" style="display:grid;grid-template-columns:repeat(3,1fr);position:relative;border:1px solid black;cursor:pointer;">`;
        // INCLUDE ALL NUMBERS FROM 0 TO 8
        for (let i = 0; i < 9; i++) {
            html += `<div class="${i}" block-position="${i}" style="width:100px;height:100px;border:1px solid black;font-size:24px;display:flex;justify-content:center;align-items:center"></div>`;
        }
        html += '</section>';

        // WRITE INTO ELEMENT
        this.elementDOM.innerHTML = html;
    }
    jsProduction(){
        this.Bot = new TkApi(this.options); // YOU CAN ACCESS THE CLASS WITH class.Bot;

        let gameMarker = this.Bot.options.symbol; // THE DEFAULTS ARE x AND o

        let btnPositionDiv = this.elementDOM.querySelectorAll('.tkGUI-viewer > div');
        btnPositionDiv.forEach(el =>{
            el.addEventListener('click', ()=>{
                let botNum = this.Bot.getResponse(parseInt(el.getAttribute('block-position')));
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

                    let statusGame = this.Bot.getWinner();

                    if(statusGame){
                        // THE BOT STOPPED RUNNING
                        this.onwin(statusGame);
                    }
                }
            });
        });
    }
}