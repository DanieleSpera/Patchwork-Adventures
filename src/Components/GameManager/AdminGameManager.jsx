import React, {Component} from 'react';
import AdminQuestionGame from '../QuestionGame/AdminQuestionGame'

import {gameSessionCollection} from '../../firebase';

import {gameList} from'./GameList';

import MessageCard from '../Common/MessageCard'

import _ from 'lodash';

class AdmingGameManager extends Component{
    constructor(props){
        super(props)
        this.state = {
            sessionId : '',
            sessionData : '',
            selectedGameList : {},
        }
        this.renderGame = this.renderGame.bind(this)
    }

    componentDidMount(){
        //Get Session
        gameSessionCollection.doc(this.props.idNode).onSnapshot(doc =>{
            this.setState({sessionData : doc.data() , sessionId : this.props.idNode})
        })
        gameSessionCollection.doc(this.props.idNode).collection('games').onSnapshot(queryDocumentSnapshot => {
            this.setState({selectedGameList : queryDocumentSnapshot.docs})
        })
    }

    renderGame(game){
        let gameData = game.data(), gameIndex = game.id
        switch (gameData.title)
        {
            case gameList[0]://QuestionGame
                return(<AdminQuestionGame roundCursor={this.state.sessionData.cursor.round} key={gameIndex}/>)
        }   
    }


    render(){
        if (this.state.sessionId === '' || _.isEmpty(this.state.selectedGameList)){
            return (
                <h1> Wait...</h1>
            )
        }
        else {
            let cursor = this.state.sessionData.cursor
            if (cursor.game < this.state.selectedGameList.length)//cursor in Game list
            {
                return(
                    <div>
                        {
                            this.state.selectedGameList.map(game => {
                                return(this.renderGame(game))
                            })
                        }
                    </div>
                )
            }
            else{//Cursor Over Game List
                return(
                    <div className="row text-center" >
                        <MessageCard>Game is Over</MessageCard>
                    </div>
                )
            }     
         }
    }
}

export default AdmingGameManager