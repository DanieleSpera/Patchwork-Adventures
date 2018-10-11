import React, {Component} from 'react';
import {questionGame} from '../../firebase';

import CustomList from '../Common/CustomList'

import _ from 'lodash';

const gameName = "QuestionGame"

class AdminQuestionGame extends Component{
    constructor(props){
        super(props)
        this.state = {
            gameItems : {},
        }
    }

    componentDidMount(){
        questionGame.on('value', snapshot => {
            this.setState({gameItems : snapshot.val()})
        })
    }

    render(){
        return(
            <CustomList
                    title = {<h3><b>Question Game</b></h3>}
                    items = {_.map(this.state.gameItems, (value,index)=>{
                        return(
                            {
                                content : value.question,
                                highlight : _.map(this.state.gameItems).indexOf(value) === this.props.roundCursor
                            }
                    )})}
            />
        )
    }

}


export default AdminQuestionGame