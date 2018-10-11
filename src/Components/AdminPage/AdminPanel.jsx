import React, {Component} from 'react';

import GameSessionManag from './GameSessionManag';
import AddQuestion from '../QuestionGame/AddQuestion'
import CustomButton from '../Common/CustomButton'

class AdminPanel extends Component{
    constructor(props){
        super(props)
        this.state = {
            selection : "GameSessionManag"
        }

        this.changeSelection = this.changeSelection.bind(this) 
    }

    changeSelection(selection){
        this.setState({ selection : selection})
    }

    render(){
        return(
            <div className="container">

                <div className="row d-flex justify-content-center">
                    <h1>Admin Panel</h1>
                </div>

                {/*ADM Menu*/}
                <div className="row d-flex justify-content-center"> 
                    <CustomButton callBack={() => {this.changeSelection("GameSessionManag")}} >Session Manager</CustomButton>
                    <CustomButton callBack={() => {this.changeSelection("AddQuestion")}} >Question Game Manager</CustomButton>
                </div>
                
                {this.state.selection === "GameSessionManag" && <GameSessionManag/>}
                {this.state.selection === "AddQuestion"      && <AddQuestion/>}

            </div>
        )
    }

}

export default AdminPanel