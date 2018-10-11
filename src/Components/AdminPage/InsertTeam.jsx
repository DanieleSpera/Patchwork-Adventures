import React, {Component} from 'react';
import {gameSessionCollection} from '../../firebase';

class InsertTeam extends Component{
    constructor(props){
        super(props);
        this.state = {
            newName : '',
            dbPath : this.props.idNode+'/teams',

        }
        this.insertTeam = this.insertTeam.bind(this);
        this.handleChange = this.handleChange.bind(this)
    }

    insertTeam(event){
        if (event.key === 'Enter') {
            gameSessionCollection.doc(this.props.idNode).collection('teams').add({teamName :this.state.newName, score: 0})
            this.setState({newName : ''})
        }
    }
    
    handleChange(e){
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    render(){
        return(
            <div className="row">
                <div className="input-group col-12 p-3">
                    <input type="text"
                        className="form-control"
                        name="newName"
                        placeholder="Insert New Team..."
                        onChange = {
                            this.handleChange}
                        value = {this.state.newName} 
                        onKeyDown = {this.insertTeam}
                    />
                </div>
            </div>
        )
    }
}

export default InsertTeam