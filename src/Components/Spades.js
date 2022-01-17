
import {find} from 'lodash';
class Spades {
    constructor() {
        this.patti = [
            { 13: "A",name:"AS" ,  value: 4 },
            { 14: "2",name: "2S",  value: 0 },
            { 15: "3",name: "3S",  value: 0 },
            { 16: "4",name: "4S",  value: 0 },
            { 17: "5",name: "5S",  value: 0 },
            { 18: "6",name: "6S",  value: 0 },
            { 19: "7",name: "7S",  value: 0 },
            { 20: "8",name: "8S",  value: 0 },
            { 21: "9",name: "9S",  value: 0 },
            { 22: "10",name: "10S", value: 0 },
            { 23: "J",name: "JS",  value: 1 },
            { 24: "Q",name: "QS",  value: 2 },
            { 25: "K",name: "KS",  value: 3 }
        ];
    }    
    getAllCards() {
        return this.patti; 
    }
    getCard(cardNumber) {
        return find(this.patti, cardNumber); 
    }
    getDeckName() {
        return "Spades";
    }
}
export default new Spades();