import {find} from 'lodash';
class Diamonds {
    constructor() {
        this.patti = [
            { 26: "A",  name:"AD" ,   value: 4 },
            { 27: "2",  name: "2D",   value: 0 },
            { 28: "3",  name: "3D",   value: 0 },
            { 29: "4",  name: "4D",    value: 0 },
            { 30: "5" , name: "5D",   value: 0},
            { 31: "6",  name: "6D",   value: 0 },
            { 32: "7" , name: "7D",   value: 0},
            { 33: "8" , name: "8D",   value: 0},
            { 34: "9" , name: "9D",   value: 0},
            { 35: "10", name: "10D",   value: 0},
            { 36: "J" , name: "JD",   value: 1},
            { 37: "Q" , name: "QD",   value: 2},
            { 38: "K" , name: "KD",   value: 3}
        ];

    }  
    getAllCards() {
        return this.patti; 
    }
    
    getCard(cardNumber) {
        return find(this.patti, cardNumber); 
    }  

    getDeckName() {
        return "Diamonds";
    }
}

export default new Diamonds();