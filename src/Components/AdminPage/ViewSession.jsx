import React, {Component} from 'react';
import {gameSessionCollection} from '../../firebase';
import _ from 'lodash';

import TeamList from './TeamList';
import AdmingGameManager from '../GameManager/AdminGameManager'
import MessageCard from '../Common/MessageCard';


class ViewSession extends Component{
    constructor(props){
        super(props);
        // props : session={{
        //     index : index , 
        //     data : data}
        // }
        this.state = {
            teamCrud : {
                create : false,
                read: true,
                delete : false,
                update : false,
                score : true
            }
        }
    }

    removeNode(index){
        this.resetNode(index)
        gameSessionCollection.doc(index).delete()        
        gameSessionCollection.doc(index).collection('games').get().then((snapshot) => {
                snapshot.forEach(item => {item.ref.delete()}
            )
        })

        gameSessionCollection.doc(index).collection('teams').get().then((snapshot) => {
            snapshot.forEach(item => {
                item.ref.collection('players').get().then(querySnapshot => querySnapshot.forEach(item => item.ref.delete()))//delete Player Collection
                item.ref.delete()
            }
            )
        })
    }

    resetNode(index){    
        gameSessionCollection.doc(index).update({
            cursor : {game : 0 , round : 0},
        })        
        //ResetMessage
        gameSessionCollection.doc(index).collection('messages').get().then(querySnapshot => {
            querySnapshot.docs.forEach(element => element.ref.delete())
        })

        gameSessionCollection.doc(index).collection('teams').get().then((snapshot) => {
          snapshot.forEach(item => 
                {
                    item.ref.update({score : 0 })
                }
            )
        } )

    }

    readSessionMessage(){
        let message =  _.last(_.map(this.props.session.data.messages)).message
        return message
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
                                        {this.props.session.data().title} - StartedSession
                                    </h2>
                                </div>
                                <div className="col-2">
                                    <div className="row">
                                        <div className="col-6">
                                            <h2><i className="material-icons pointer" onClick={() => {this.removeNode(this.props.session.id)}}> highlight_off </i></h2>
                                        </div>
                                        <div className="col-6">
                                            <h2><i className="material-icons pointer" onClick={() => {this.resetNode(this.props.session.id)}}> refresh </i></h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        
                        <div className="card-body">
                            <div className="col-12">
                                <TeamList idNode={this.props.session.id} teamCrud={this.props.teamCrud}/>
                            </div>

                            <div className="col-12">
                                <hr/>
                            </div>

                            {this.props.session.data.messages ? 
                                <div className="col-12 text-center">
                                    <div className="row">
                                        <MessageCard>
                                            {this.readSessionMessage()}
                                        </MessageCard>
                                    </div>
                                </div>
                            :null}

                            <div className="col-12">
                                <hr/>
                            </div>
                            
                            <div className="col-12">
                                <AdmingGameManager idNode={this.props.session.id}/>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        )
    }
}



export default ViewSession