import React, {Component} from 'react';
import {questionGame} from '../../firebase';
import _ from 'lodash';

import CustomPanel from '../Common/CustomPanel';
import CustomButton from '../Common/CustomButton';
import CustomList from '../Common/CustomList';
import EditTextInput from '../Common/EditTextInput';

class AddQuestion extends Component{
    constructor(props){
        super(props)
        this.state = {
            question    : '',
            rightAnswer : '',
            fakeAnswer1 : '',
            fakeAnswer2 : '',
            fakeAnswer3 : '',
            questionList: '',
        }
        this.handleChange = this.handleChange.bind(this)
        this.pushQuestion = this.pushQuestion.bind(this)
        this.clearInputs = this.clearInputs.bind(this)
    }

    componentDidMount(){
        //Get Session
        questionGame.on('value',snapshot =>{
            this.setState({questionList : snapshot.val()})
        })
    }

    handleChange(e){
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    pushQuestion(){

        var newKey = questionGame.push().key;

        questionGame.child(newKey+'/question').set(this.state.question)
        questionGame.child(newKey+'/answers').push({answer : this.state.rightAnswer, check : true})
        questionGame.child(newKey+'/answers').push({answer : this.state.fakeAnswer1, check : false})
        questionGame.child(newKey+'/answers').push({answer : this.state.fakeAnswer2, check : false})
        questionGame.child(newKey+'/answers').push({answer : this.state.fakeAnswer3, check : false})

        this.clearInputs()
    }

    clearInputs(){
        this.setState({
            question    : '',
            rightAnswer : '',
            fakeAnswer1 : '',
            fakeAnswer2 : '',
            fakeAnswer3 : '',
        })
    }

    render(){
        return(
            <div className="container">

                <div className="row d-flex justify-content-center">
                    <h1>Question Game Managment</h1>
                </div>

                <div className="row"> 
                
                    <div className="col-12">

                        <CustomPanel title={<h1> Add Question </h1>}>
                            <div className="row">
                                <div className="col-12">
                                    <input className="form-control" 
                                                type="text" 
                                                placeholder="Insert Question..."
                                                name = "question"
                                                onChange = {this.handleChange}
                                                value = {this.state.question}
                                                required
                                    />
                                </div>
                            </div>
                            
                            <div className="row">


                                <div className="col-6 p-3">
                                    <input className="form-control" 
                                                type="text" 
                                                placeholder="Insert The Right Answer..."
                                                name = "rightAnswer"
                                                onChange = {this.handleChange}
                                                value = {this.state.rightAnswer}
                                                required
                                                />
                                </div>

                                <div className="col-6 p-3">
                                    <input className="form-control" 
                                                type="text" 
                                                placeholder="Insert Fake Answer..."
                                                name = "fakeAnswer1"
                                                onChange = {this.handleChange}
                                                value = {this.state.fakeAnswer1}
                                                required
                                                />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-6">
                                    <input className="form-control" 
                                                type="text" 
                                                placeholder="Insert Fake Answer..."
                                                name = "fakeAnswer2"
                                                onChange = {this.handleChange}
                                                value = {this.state.fakeAnswer2}
                                                required
                                                />
                                </div>
                                <div className="col-6">
                                    <input className="form-control" 
                                                type="text" 
                                                placeholder="Insert Fake Answer..."
                                                name = "fakeAnswer3"
                                                onChange = {this.handleChange}
                                                value = {this.state.fakeAnswer3}
                                                required
                                                />
                                </div>
                            </div>

                            <div className="col-12 p-3 d-flex justify-content-center">
                                <CustomButton callBack={() => this.pushQuestion()}>
                                    <h3> ADD </h3>
                                </CustomButton>
                            </div>

                        </CustomPanel>      

                        <CustomList
                            title = {<h3><b>Questions List</b></h3>}
                            items = {_.map(this.state.questionList, (value,qindex)=>{return(
                                    
                                
                                    {
                                        content : <div className="row" key={qindex}>
                                                  <div className="col-12">
                                                  <EditTextInput 
                                                        dbRef={questionGame}
                                                        itemId={qindex}
                                                        path={""}
                                                        field = {"question"}
                                                        value= {value.question}
                                                        delete = {true}
                                                    />
                                                  </div>
                                                    {_.map(value.answers,(item,index)=>{return(
                                                        <div className="col-6" key={index}>
                                                                    <EditTextInput 
                                                                    dbRef={questionGame}
                                                                    itemId={qindex}
                                                                    path={""}
                                                                    field = {"answers/"+index+"/answer"}
                                                                    value= {item.answer}
                                                                    delete = {false}
                                                                />
                                                       </div>
                                                    )})}
                                                  </div>,
                                    }
                                )})}
                        />          


                    </div>{/*End col*/}

                </div>{/*End row*/}
            </div>
        )
    }

}


export default AddQuestion