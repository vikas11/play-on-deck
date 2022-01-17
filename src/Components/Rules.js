import _ from 'lodash';
import Hearts from './Hearts';
import Spades from './Spades';
import Diamonds from './Diamonds';
import Clubs from './Clubs';

class Rules {
    cards=[]
    constructor() {

    }

    getCardsArray(){
        this.cards=[]
        Hearts.getAllCards().forEach(item=>{
            this.cards.push(item);
        })
        Spades.getAllCards().forEach(item=>{
            this.cards.push(item);
        })
        Diamonds.getAllCards().forEach(item=>{
            this.cards.push(item);
        })
        Clubs.getAllCards().forEach(item=>{
            this.cards.push(item);
        });

        this.cards=_.shuffle(this.cards);
        console.log(this.cards)
    }
    
}

const rules = new Rules();
export default rules;