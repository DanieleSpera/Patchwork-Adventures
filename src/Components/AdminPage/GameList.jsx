import React, {Component} from 'react'
import {gameSessionCollection} from '../../firebase';
import _ from 'lodash';

import {gameList} from '../GameManager/GameList'


class GameList extends Component{

    constructor(props){
        super(props);
        this.state = {
            sessionId : '',
            games : []
        }
    }

    componentWillMount(){
        let sessionId = this.props.idNode
        
        this.setState({sessionId : sessionId})    
        
        this.updateGameList(sessionId);
    }

    updateGameList(sessionId) {
        gameSessionCollection.doc(sessionId).collection('games').onSnapshot(snapshot =>{
            if (!snapshot.empty){
                this.setState({ games: snapshot.docs })
            }
            else{
                this.setState({ games: [] })
            }
        })
    }

    toggleGame(gameTitle){
        let sessionId = this.state.sessionId;
        gameSessionCollection.doc(sessionId).collection('games').where('title', '==' , gameTitle).get().then(querySnapshot => {
            if(!querySnapshot.empty){//Remove
                querySnapshot.forEach(function(doc) {
                    gameSessionCollection.doc(sessionId).collection("games").doc(doc.id).delete();
                });
            }
            else{ //Insert
                gameSessionCollection.doc(sessionId).collection("games").add({title :gameTitle})
            }
        })


        this.updateGameList(sessionId)

    }

    render(){
        return(
            <div className="row">

                <div className="col-12 text-center">
                    <div className="teamCard card border-danger bg-transparent mb-3">
                        <h2>Game List</h2>
                    </div>
                </div>

                {_.map(gameList, (game,index) => {
                    return(
                    <div className="col-6 text-center" key={index}>
                        <div className={(_.map(this.state.games, (doc) => doc.data().title)).indexOf(game) > -1 ? 'card bg-danger text-warning mb-3 pointer' : 'card border-danger bg-transparent mb-3 pointer'}
                             onClick={() => { this.toggleGame(game)} }>
                            <h3>{game}</h3>
                        </div>
                    </div>

                )})}
            </div>
        )
    }
}

export default GameList