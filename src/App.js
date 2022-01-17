import './App.css';
import Deck from "./Components/deck";

import { connect } from "react-redux"


import {
  addPlayers,
} from "./redux/Players/players.actions"

function App(props) {
  const isLoggedIn = props.players.length;
  const myStyle={
            backgroundImage:`url(${window.location.origin+ "/assets/images/bg.png"})`,
            height:'100vh',
            backgroundSize: 'cover',
            backgroundRepeat: 'repeat',
            };

  return (
    <div style={myStyle}>      
        <Deck ></Deck> 
    </div>
  );
}

const mapStateToProps = state => {
  return {
    players: state.players.players
  }
}

const mapDispatchToProps = dispatch => {
  return {
    //addPlayers: (payload) => dispatch(addPlayers({id:0,name:'vikas'})),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
