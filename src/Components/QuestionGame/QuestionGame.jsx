import React, {Component} from 'react';
import {questionGame} from '../../firebase';

import QuestionCard from './QuestionCard';
import _ from 'lodash';

class QuestionGame extends Component{
    constructor(props){
        super(props)
        this.state = {
            gameItem : {},
        }

        this.checkAnswer = this.checkAnswer.bind(this)
    }
    // Component Inputs
    // this.props.gameManager : {functions}
    // this.props.round : int

    componentDidMount(){
        this.loadItem(this.props.round)
    }


    componentWillReceiveProps(newProps){
        // setTimeout(() => {
        this.loadItem(newProps.round)
            // }, 2000);
    }
        
    loadItem(itemId){
        questionGame.once('value').then( snapshot => {
            let gameItem = _.map(snapshot.val())[itemId]
            gameItem.answers =  _.shuffle(gameItem.answers)//random answer order
            this.setState({gameItem : gameItem})
        })
    }

    checkAnswer (answer){
        questionGame.once('value').then(snapshot => {
            this.props.gameManager.playerAnswerMsg(answer)

            let selectAnswerObj = _.head(_.filter(_.map(snapshot.val())[this.props.round].answers, {'answer' : answer})) 
            this.props.gameManager.rightWrongAnswerMsg(selectAnswerObj.check)

            let roudNumber = snapshot.numChildren()
            let roundCursor = {current : this.props.round, total : roudNumber}
            this.props.gameManager.updateScoreGame(selectAnswerObj.check,roundCursor)
        })
    }

    givePoint(result) {
        if (result) {
            this.props.gameManager.updatePoint(+1);
        }
        else {
            this.props.gameManager.updatePoint(-1);
        }
    }

    render(){
        return(
            <div className="row">
                <QuestionCard gameItem={this.state.gameItem} callBack={this.checkAnswer}/>
            </div>
        )
    }

}


export default QuestionGame