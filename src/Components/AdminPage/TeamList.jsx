import React, {Component} from 'react';
import {gameSessionCollection} from '../../firebase';
import _ from 'lodash';

import PlayerList from './PlayerList';
import InsertTeam from './InsertTeam';

class TeamList extends Component{
    constructor(props){
        super(props);
        this.state = {
            teams : {},
            dbPath : this.props.idNode+'/teams',
            teamCrud : {
                create : false,
                read: true,
                delete : true,
                update : true,
                score : true
            }
        }
    }

    componentDidMount(){
        gameSessionCollection.doc(this.props.idNode).collection('teams').onSnapshot(doc => {
            this.setState({teams : doc.docs})
        })
        
        if (this.props.teamCrud) {this.setState({teamCrud : this.props.teamCrud})}
    }

    removeNode(index){
        gameSessionCollection.doc(this.props.idNode+'/teams/'+index).delete()
    }
    
    render(){
        return(
            <div className="row justify-content-center">

                <div className="col-12">
                    <div className="row">
                        <div className="col-12 text-center">

                        <div className="teamCard card border-danger bg-transparent mb-3">
                            <h2>Teams</h2>
                        </div>

                        {this.state.teamCrud.create && <InsertTeam idNode = {this.props.idNode}/>}

                        </div>
                            {_.map(this.state.teams, (team,index) => {
                                let teamData = team.data()
                                return(
                                <div key={team.id} className="col-6"> 
                                    <div className="card mb-3 border-danger bg-warning text-danger" >
                                        <div className="card-header">
                                            
                                            <div className="row">
                                                <div className="col-10">
                                                    <h3>  {teamData.teamName} {this.state.teamCrud.score ? ' - ' + teamData.score : null}</h3>
                                                </div>
                                                <div className="col-2">
                                                    <h3>
                                                        {this.state.teamCrud.delete 
                                                        ? <i className="material-icons pointer" onClick={() => {this.removeNode(team.id)}}> highlight_off </i>
                                                        : null
                                                        }
                                                    </h3>
                                                </div>
                                            </div>


                                        </div>
                                    <div className="card-body text-danger ">
                                        <div className="card-text "><PlayerList dbPath={this.state.dbPath + "/" + team.id}/></div>
                                    </div>
                                    </div>
                                </div>
                            )})}
                        </div>
                </div>

            </div>
        )
    }
}

export default TeamList