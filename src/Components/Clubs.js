
import {find} from 'lodash';
class Clubs {
    constructor() {
        this.patti = [
            { 39: "A", name:"AC" ,value: 4},
            { 40: "2", name: "2C",value: 0 },
            { 41: "3", name: "3C",value: 0 },
            { 42: "4", name: "4C" ,value: 0},
            { 43: "5", name: "5C", value: 0},
            { 44: "6", name: "6C",value: 0},
            { 45: "7", name: "7C",value: 0},
            { 46: "8", name: "8C",value: 0},
            { 47: "9", name: "9C",value: 0},
            { 48: "10",name: "10C",value: 0 },
            { 49: "J" ,name: "JC",value: 1},
            { 50: "Q" ,name: "QC",value: 2},
            { 51: "K" ,name: "KC", value: 3}
        ];
    }

    getAllCards() {
        return this.patti; 
    }

    getCard(cardNumber) {
        return find(this.patti, cardNumber); 
    }

    getDeckName() {
        return "Clubs";
    }
}
export default new Clubs();