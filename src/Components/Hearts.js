import {find} from 'lodash';
class Hearts {
    constructor() {
        this.patti = [
            { 0: "A",  name:"AH" , value: 4 },
            { 1: "2",  name: "2H", value: 0 },
            { 2: "3",  name: "3H", value: 0 },
            { 3: "4",  name: "4H", value: 0 },
            { 4: "5",  name: "5H", value: 0 },
            { 5: "6",  name: "6H", value: 0 },
            { 6: "7",  name: "7H", value: 0 },
            { 7: "8",  name: "8H", value: 0 },
            { 8: "9",  name: "9H", value: 0 },
            { 9: "10", name: "10H",value: 0 },
            { 10: "J", name: "JH", value: 1 },
            { 11: "Q", name: "QH", value: 2 },
            { 12: "K", name: "KH", value: 3 }
        ];

    }
    getAllCards() {
        return this.patti; 
    }
    getCard(cardNumber) {
        return find(this.patti, cardNumber); 
    }

    getDeckName() {
        return "Hearts";
    }
    
}

export default new Hearts();