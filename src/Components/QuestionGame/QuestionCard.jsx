import React, {Component} from 'react';
import _ from 'lodash';

import CustomPanel from '../Common/CustomPanel'
import CustomButton from '../Common/CustomButton'

class QuestionCard extends Component{

    render(){
        return(
            <div className="col-12">
                    <CustomPanel title = {<h3>{this.props.gameItem.question}</h3>} >  
                        <div className="row">
                            {_.map(this.props.gameItem.answers,(answer,index) => {return(
                                <CustomButton key={index} callBack={() => this.props.callBack(answer.answer)}>
                                    <h4>{answer.answer}</h4>
                                </CustomButton>
                            )})}
                        </div>
                    </CustomPanel>
            </div>
        )
    }   
}

export default QuestionCard