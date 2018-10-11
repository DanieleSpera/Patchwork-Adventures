import React, {Component} from 'react';
import {gameSessionCollection} from '../../firebase';

import TeamList from './TeamList';
import GameList from './GameList';

class EditSession extends Component{
    constructor(props){
        super(props);
        this.state = {
            session : this.props.session,
            sessionData : this.props.session.data(),
            teamCrud : {
                create : true,
                read: true,
                delete : true,
                update : true,
                score : false
            }
        }
    }

    removeNode(index){
        gameSessionCollection.doc(index).delete()        
    }

    startSession(index){
        gameSessionCollection.doc(index).update({cursor : {game : 0 , round : 0}})
        // gameSessionCollection.doc(index+'/games/').get().then((snapshot) => {
        //     let tempGameList = []
        //     snapshot.forEach((game) => {
        //         tempGameList.add(game.data().game.title)
        //     })
        //     // set as Cursor the first game
        //     gameSessionCollection.doc(index).set({cursor : {game : 0 , round : 0}})        
        // })
    }
    
    render(){
        return(
            <div className="row">
                <div className="col-12">

                    <div className="card mb-3 border-danger bg-warning text-danger">
                        
                        <div className="card-header">
                            <div className="row">
                                <div className="col-10">
                                    <h2>
                                        {this.state.sessionData.title} - EditSession
                                    </h2>
                                </div>
                                <div className="col-2">
                                    <div className="row">
                                        <div className="col-6">
                                            <h2><i className="material-icons pointer" onClick={() => {this.removeNode(this.state.session.id)}}> highlight_off </i></h2>
                                        </div>
                                        <div className="col-6">
                                            <h2><i className="material-icons pointer" onClick={() => {this.startSession(this.state.session.id)}}> play_circle_outline </i></h2>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        
                        <div className="card-body">
                            <div className="col-12">
                                <TeamList idNode={this.props.session.id} teamCrud={this.state.teamCrud}/>
                            </div>

                            <div className="col-12">
                                <hr/>
                            </div>
                            
                            <div className="col-12">
                                <GameList idNode={this.props.session.id}/>
                            </div>
                        </div>
                    </div>

                </div>



            </div>
        )
    }
}

export default EditSession