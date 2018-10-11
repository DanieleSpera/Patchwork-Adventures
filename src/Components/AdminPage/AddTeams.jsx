import React, {Component} from 'react';
import {patchWorkDb} from '../../firebase';
import _ from 'lodash';

class AddTeams extends Component{
    constructor(props){
        super(props);
        this.state = {
            newName : '',
            teams : {},
            dbPath : this.props.idNode+'/teams'
        }
        this.insertTeam = this.insertTeam.bind(this);
        this.handleChange = this.handleChange.bind(this)
    }

    removeNode(index){
        patchWorkDb.child(this.state.dbPath+'/'+index).remove()        
    }

    componentDidMount(){
        patchWorkDb.child(this.state.dbPath).on('value', snapshot => {
            this.setState({teams : snapshot.val() })
        })
    }

    insertTeam(){
        patchWorkDb.child(this.state.dbPath).push({teamName :this.state.newName})
        this.setState({newName : ''})
    }
    
    handleChange(e){
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    render(){
        return(
            <div className="row">

                <div className="col-12">
                    <h2>Teams</h2>
                </div>

                <div className="form-group col-12">
                    <input type="text"
                        className="col-10"
                        name="newName"
                        value = {this.state.newName}
                        onChange = {this.handleChange}
                    />
                    <button className="btn col-2"
                            onClick={() => {this.insertTeam()}}>Insert Team</button>
                </div>

                {_.map(this.state.teams, (team,index) => {return(
                    <div key={index}><h3>{team.teamName}</h3>
                    <button onClick={() => this.removeNode(index)}>Delete Team</button>
                    </div>
                )})}

            </div>
        )
    }
}

export default AddTeams