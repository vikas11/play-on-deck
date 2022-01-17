import React, { Component } from "react";
import { connect } from "react-redux"
import './deck.css';

import {
  addPlayer, updatePlayer
} from "../redux/Players/players.actions"

import Rules from './Rules';
import _ from 'lodash';

class Deck extends Component {
  isPlayersLoaded = false;
  playersToLoad = [];
  isCardShuffling = false;
  constructor(props) {
    super(props)
    this.state = { isCardDistributed: false, showCards: false, showWinner: false, winner: {} };
  }

  render() {

    const isAllPlayersJoined = () => {
      return this.props?.players?.filter(item => {
        return item.display
      }).length;

    }

    const pickPlayer = () => {
      setTimeout(() => {
        let randomNumber = this.playersToLoad[Math.floor(Math.random() * this.playersToLoad.length)];
        console.log('Vikas---', randomNumber);
        let player = this.props.players.filter(item => {
          if (item.id === randomNumber) {
            item.display = true;
          }
          return item.id === randomNumber
        })
        this.props.updatePlayer(player[0]);
        this.playersToLoad.splice(this.playersToLoad.findIndex(item => { return item === randomNumber }), 1);
        if (this.playersToLoad.length > 0) {
          pickPlayer();
        }
        console.log(this.props.players);
      }, 1000);
    }

    const randomPlayer = () => {
      this.props.players.forEach(item => {
        this.playersToLoad.push(item.id)
      });
      pickPlayer()
    }

    const loadPlayers = () => {
     if (!this.isPlayersLoaded) {
        this.props.addPlayer({ id: 1, name: 'North Player', display: false, winner: false, team: 'Team A', cards: [],img:'member1.png' })
        this.props?.addPlayer({ id: 2, name: 'East Player', display: false, winner: false, team: 'Team B', cards: [],img:'member2.png' })
        this.props?.addPlayer({ id: 3, name: 'South Player', display: false, winner: false, team: 'Team A', cards: [],img:'member3.png' })
        this.props?.addPlayer({ id: 4, name: 'West Player', display: false, winner: false, team: 'Team B', cards: [],img:'member4.png' })
        this.isPlayersLoaded = true;
        randomPlayer()
      }
    }

    setTimeout(() => {
      loadPlayers();
    }, 1000);

    const renderPlayer = (player) => {

      if (player) {
        let isExists = this.props.players.filter(item => {
          return item.id === player.id && item.display
        })
        if (isExists && isExists.length > 0) {
          return <span><img className="user-image" alt={isExists[0].name} src={window.location.origin + '/assets/images/'+isExists[0].img}></img><br></br>
          {isExists[0].name} - <b>  {isExists[0].team} </b><br></br>
            {isAllPlayersJoined() === 4 ? (
              !this.state.isCardDistributed ? <button onClick={() => {
                serveCardsForPlayer(isExists[0].id)
              }}>Serve</button> : '') : ''}
              </span>
           
          ;
        } else {
          return <span><img style={{ width: '30px' }} alt="loader" src={window.location.origin + '/assets/images/loader.gif'}></img> <br></br>{'Joining...'}<br></br></span>;
        }
      }
    }

    const renderCards = (index) => {
      let cards = JSON.parse(JSON.stringify(this.props.players[index].cards));
      let sortedCards = _.orderBy(cards, 'value', 'desc')
      console.log('cards', sortedCards)
      var showCards = this.state.showCards;
      return <div className="loadCards"><div className="hand fan active-hand" data-fan="spacing: 0.1; radius :80">
        {sortedCards.map((el, i) => <img className='card' alt={'img_'+i} src={window.location.origin + '/assets/cards/' + (showCards ? el.name : 'RED_BACK') + '.svg'}></img>)}
      </div>
      </div>
    }

    const serveCardsForPlayer = (id) => {
      Rules.getCardsArray();
      let cards = Rules.cards;
      let index = this.props.players.findIndex(item => { return item.id === id });

      let sortedItems = [];
      let count = this.props.players.length;
      for (let i = 0; i < count; i++) {
        sortedItems.push(this.props.players[(index + (i + 1)) % count]);
      }

      for (let i = 0; i < 13; i++) {
       // setTimeout(() => {
          this.props.players.forEach(p => {

            let randomNumber = Math.floor(Math.random() * cards.length);
            let card = cards[randomNumber]
            p.cards.push(card)
            this.props.updatePlayer(p);
            cards.splice(randomNumber, 1);
          })
        //}, 1000);
      }
      console.log(cards)
      this.setState({ isCardDistributed: true });
    }
    const checkIsCardDistributed = () => {
      return this.state.isCardDistributed
    }
    

    const declareWinner = () => {
      this.props.players.map(item => {
         item.total = _.sumBy(item.cards, 'value')
         return item
      });
      let winner = _.maxBy(this.props.players, 'total');
      console.log('winner', winner);
      winner.winner = true;
      // delete winner['total'];
      // debugger;
      this.props.updatePlayer(winner);
      this.setState({ showWinner: true, winner: winner })
    }

    const resetGame = () => {
      let winner = this.props.players.filter(item => {
        item.cards = []
        return item.winner
      });
      winner[0].winner = false;
      this.props.updatePlayer(winner[0]);
      this.setState({ isCardDistributed: false, showCards: false, showWinner: false, winner: {} })
    }


    return (
      <div>
        <div className="main-container">

          <table className="table-container">
            <tr>
              <td className="blocks" colSpan={3}>
                {this.props?.players.length > 0 ? renderPlayer(this.props?.players[0]) : ''}
                {this.props?.players.length > 0 ?  ( this.props?.players[0].cards.length > 0 ? renderCards(0) : '') : '' }                   
                {this.state.showWinner ?  <span><b>Total Points: {this.props?.players[0].total}</b> <br></br>{this.props?.players[0].winner? <span className="blink-winner">Winner</span>: ''}</span>  :''} 
              </td>
            </tr>
            <tr>
              <td className="left-right-blocks">
                {this.props?.players.length > 0 ? renderPlayer(this.props?.players[3]) : ''}
                {this.props?.players[3]?.cards?.length > 0 ? renderCards(3) : ''}
                {this.state.showWinner?  <span><b>Total Points: {this.props?.players[3].total }</b> <br></br> {this.props?.players[3].winner? <span className="blink-winner">Winner</span>: ''}</span>  :''} 
              </td>
              <td className="center-panel">
                <div>
                  {isAllPlayersJoined() < 4 ? 'Players are joining. Please wait...' :
                    (
                      !checkIsCardDistributed() ? <div>
                        <div >
                          <b>Cards are shuffling</b>
                          {<img alt="shuffl" style={{ width: "100%" }} src={window.location.origin + '/assets/images/shuffl.gif'}></img>
                          }
                          <br></br>
                        </div>
                      </div>
                        : (
                          this.state.showWinner ? 
                          <div> Hay, <b>
                          { this.state.winner.name + ' ' + this.state.winner.team }</b> is winner!<br></br>
                          <b>Total Points: {this.state.winner.total }</b> <br></br>
                          <button onClick={() => { this.setState({ showCards: true }) }}>Show Cards</button><br></br>
                          <button onClick={() => { resetGame() }}>Re-Play</button>
                          </div> 
                          : 
                          <button onClick={() => {  declareWinner() }}>Declare Winner</button>)
                        )
                  }
                </div>
              </td>
              <td className="left-right-blocks">
                
                {this.props?.players.length > 0 ? renderPlayer(this.props?.players[1]) : ''}
                
                {this.props?.players[1]?.cards?.length > 0 ? renderCards(1) : ''}
                {this.state.showWinner?  <span><b>Total Points: {this.props?.players[1].total }</b> <br></br>{this.props?.players[1].winner? <span className="blink-winner">Winner</span>: ''}</span>  :''} 
              </td>
            </tr>
            <tr>
              <td className="blocks" colSpan={3} >
                {this.props?.players.length > 0 ? renderPlayer(this.props?.players[2]) : ''}
                {this.props?.players[2]?.cards?.length > 0 ? renderCards(2) : ''}
                {this.state.showWinner?  <span><b>Total Points: {this.props?.players[2].total }</b> <br></br> {this.props?.players[2].winner? <span className="blink-winner">Winner</span>: ''} </span>  :''} 
              </td>
            </tr>
          </table>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    players: state.players.players
  }
}
const mapDispatchToProps = dispatch => {

  return {
    addPlayer: (payload) => {
      dispatch(addPlayer(payload))
    },
    updatePlayer: (payload) => {
      dispatch(updatePlayer(payload))
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Deck);