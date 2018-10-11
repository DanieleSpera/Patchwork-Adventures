import React, {Component} from 'react';
import QuestionGame from '../QuestionGame/QuestionGame'
import {gameSessionCollection, dbstore} from '../../firebase';

import {gameList} from'./GameList';
import _ from 'lodash';

import MessageCard from '../Common/MessageCard';
import {messages} from '../Common/Messages';

class GameManager extends Component{
    constructor(props){
        super(props)
        this.state ={
            gameList : {},
            tools : this.gameManagerTools
        }
        this.chooseGame = this.chooseGame.bind(this)

        // Component Inputs
        // this.props.playerRef{
            //     sessionId : sessionId,
            //     playerName : playerName,
            //     team : team
            //     sessionData : sessionData
            // }
    }

    componentDidMount(){
        gameSessionCollection.doc(this.props.playerRef.sessionId).collection('games').onSnapshot(querySnapshot => {
            this.setState({gameList : querySnapshot.docs})
        })
    }

    gameManagerTools = {
            updateScoreGame : (answerCheck, roundCursor) => {
                let sessionId = this.props.playerRef.sessionId
                let teamId = this.props.playerRef.team
                let point = answerCheck ? 1 : -1

                dbstore.runTransaction((transaction) => {
                    let cursorRef = gameSessionCollection.doc(sessionId)
                    transaction.get(cursorRef).then( documentSnapshot => {
                        let cursor = documentSnapshot.data().cursor
                        if (cursor.round === roundCursor.current && answerCheck)//dbRoundCursor = RoundsNumberAnswered
                        {
                            //Set Cursor Value
                            if(cursor.game < this.state.gameList.length){//compare/check game cursor
                                let newRoundIndex = cursor.round + 1
                                if(newRoundIndex < roundCursor.total){//compare/check round cursor
                                    documentSnapshot.ref.update({cursor : {game : cursor.game , round : newRoundIndex }}) 
                                }
                                else{//next game
                                    let newGameIndex = cursor.game + 1
                                    documentSnapshot.ref.update({cursor : {game : newGameIndex , round : 0}}) 
                                }
                            }
                            //Set Score
                            let teamRef = gameSessionCollection.doc(sessionId).collection('teams').doc(teamId)
                            transaction.get(teamRef).then( teamDocSnapshot => {
                                let score = teamDocSnapshot.data().score
                                score = score + point
                                teamDocSnapshot.ref.update({score : score})
                            })
                        }//End Current Matching
                    })
                }).then(function() {
                    console.log("Transaction successfully committed!");
                }).catch(function(error) {
                    console.log("Transaction failed: ", error);
                });
                
            },
            playerAnswerMsg : (answer) => {
                let message = messages.playerAnswer(this.props.playerRef.playerName,answer)
                gameSessionCollection.doc(this.props.playerRef.sessionId).collection('messages').add({message : message,timestamp: Date.now()})
            },
            rightWrongAnswerMsg : (check) => {
                let message = check
                    ? messages.rightAnswer(this.props.playerRef.playerName)
                    : messages.wrongAnswer(this.props.playerRef.playerName)
                    gameSessionCollection.doc(this.props.playerRef.sessionId).collection('messages').add({message : message, timestamp: Date.now()})
            },
            // nextCursor : (lastRound) =>{
            //     let sessionId = this.props.playerRef.sessionId
            //     let cursor = this.props.playerRef.sessionData.cursor

            //     if(cursor.game < this.state.gameList.length){//compare/check game cursor
            //         let newRoundIndex = cursor.round + 1
            //         if(newRoundIndex < lastRound){//compare/check round cursor
            //             gameSessionCollection.doc(sessionId).update({cursor : {game : cursor.game , round : newRoundIndex }})
            //         }
            //         else{//next game
            //             let newGameIndex = cursor.game + 1
            //             gameSessionCollection.doc(sessionId).update({cursor : {game : newGameIndex , round : 0}})
            //         }
            //     }
            //     else{
            //         alert("Game out of range")
            //     }
            // }

    }


    chooseGame(){
        let gamesObjects = this.state.gameList
        let gameCursor = this.props.playerRef.sessionData.cursor.game

        if (gameCursor < gamesObjects.length){
            let currentGame = gamesObjects[gameCursor]
            let gameTitle = currentGame ?  currentGame.data().title : ''
            let gameRound = this.props.playerRef.sessionData.cursor.round

            switch (gameTitle){
                case gameList[0]:
                    return <QuestionGame gameManager = {this.state.tools} round={gameRound}/>

                case gameList[1]:
                    return <div><h1>{gameList[1]}</h1></div>

                default:
                    return <div><MessageCard>2 Wait...</MessageCard></div>
            }
        }
        else if(gameCursor >= gamesObjects.length){
            return <MessageCard>Game is Over</MessageCard>
        }
    }

    render(){
            return(
                <div>
                    {this.props.playerRef.sessionData.cursor
                    ? this.chooseGame()
                    :<MessageCard>Wait...</MessageCard>}
                    {}
                </div>
        )
    }
}

export default GameManager