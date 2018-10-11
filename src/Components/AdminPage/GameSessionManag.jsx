import React, {Component} from 'react';
import {gameSessionCollection} from '../../firebase';
import GameSessionList from './GameSessionList';

class GameSessionManag extends Component{
    constructor(props){
        super(props)
        this.state = {
            currentAddSession : '',
            newSessionName: '',
            selectedGames : []
        }
        this.setCurrentSection = this.setCurrentSection.bind(this)
        this.toggleGame = this.toggleGame.bind(this)
        this.insertNewSession = this.insertNewSession.bind(this)
    }

    setCurrentSection(sectionId){
        this.setState({currentaddSession : sectionId});
    }

    toggleGame(game){
        let currentArray = this.state.selectedGames;
        let gameIndex = currentArray.indexOf(game)
        if (gameIndex === -1){
            currentArray.push(game)
        }
        else {
            currentArray.splice(gameIndex,1)
        }
        this.setState({selectedGames : currentArray})
    }

    insertNewSession(event){
        if (event.key === 'Enter') {
            const sessionName = this.state.newSessionName.replace(/\s/g, '') 
            
            gameSessionCollection.where("title", "==", sessionName).get().then(querySnapshot => {
                if(querySnapshot.empty){
                    gameSessionCollection.add({title:sessionName})
                }
                else{
                    alert('Session Name Already Exists')
                }
            })

            this.setState({newSessionName : ''})//clear Input
        }
        else{
            this.setState({newSessionName : event.target.value})
        }
    }

    render(){
        return(
            <div className="row">

                <div className="input-group col-12 p-3">
                    <input type="text"
                        className="form-control"
                        name="newSessionName"
                        placeholder="Insert New Session..."
                        onChange = {this.insertNewSession}
                        value = {this.state.newSessionName  } 
                        onKeyDown = {this.insertNewSession}
                    />
                </div>

                <hr/>

                <div className="col-12">
                        <GameSessionList />
                </div>
                
            </div>
        )
    }

}

export default GameSessionManag