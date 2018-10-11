import React, {Component} from 'react';
import CustomPanel from '../Common/CustomPanel';
import CustomButton from '../Common/CustomButton'
import {gameSessionCollection} from '../../firebase';
import _ from 'lodash';

class InputTeam extends Component{

    constructor(props){
        super(props)
        this.state = {
            teams : []
        }
    }

    componentDidMount(){
        gameSessionCollection.doc(this.props.sessionId).collection('teams').onSnapshot(querySnapshot => {
            this.setState({teams : querySnapshot.docs})
        })
    }

    render(){
        return(
            <div className="row">
                <div className="col-12">

                    <CustomPanel title = {<h2>Choose Your Team</h2>} >  
                        <div className="row d-flex justify-content-center">
                            {this.state.teams.map( team => {
                                let teamData = team.data()
                                return(
                                    <CustomButton key={team.id} callBack={() => this.props.callBack({team : team.data() , index : team.id})}>
                                        <h3> {teamData.teamName}</h3>
                                    </CustomButton>
                                )                            
                            })}
                        </div>
                    </CustomPanel>

                </div>
            </div>
        )
    }

}

export default InputTeam