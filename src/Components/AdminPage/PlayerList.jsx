import React, {Component} from 'react';
import {gameSessionCollection} from '../../firebase';
import _ from 'lodash';

class PlayerList extends Component{
    constructor(props){
        super(props);
        this.state = {
            newName : '',
            players : {},
            dbPath : this.props.dbPath
        }
        this.insertPlayer = this.insertPlayer.bind(this);
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount(){
        gameSessionCollection.doc(this.state.dbPath).collection('players').onSnapshot(doc => {
            this.setState({players : doc.docs})
        })
    }

    insertPlayer(event){
        if (event.key === 'Enter') {
            gameSessionCollection.doc(this.state.dbPath).collection('players').add({playerName : this.state.newName})
            this.setState({newName : ''})
        }
    }
    
    removeNode(index){
        gameSessionCollection.doc(this.state.dbPath).collection('players').doc(index).delete()
    }

    handleChange(e){
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    render(){
        return(
            <div className="row">

                {/* {this.state.players
                ? <div className="col-12">  <h4>Players</h4>  </div>
                : null
                } */}
                {/* INSERT PLAYER DISABLED */}
                {/* <div className="col-8 text-right">
                    <input type="text"
                        name="newName"
                        value= {this.state.newName}
                        onChange = {this.handleChange}
                        placeholder="Insert Player..."
                        onKeyPress={this.insertPlayer}
                    />
                </div> */}

                <div className="col-12">
                    <div className="row">
                        {_.map(this.state.players, (player,index) => {
                            let playerData = player.data()
                            return(
                            <div key={player.id} className="col-12">
                                <div className="row">
                                     
                                        <div className="col-2">
                                            <i className="material-icons">person</i>
                                        </div>
                                        <div className="col-8">
                                            <i>{playerData.playerName}</i>
                                        </div>
                                        <div className="col-2">
                                            <i className="material-icons pointer" onClick={() => {this.removeNode(player.id)}}>highlight_off</i>
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

export default PlayerList