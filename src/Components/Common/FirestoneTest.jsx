import React, {Component} from 'react';
import * as firebase from 'firebase';

class FirestoneTest extends Component{
    constructor(props){
        super(props);
        this.state = {
            docRef : firebase.firestore().collection("samples").doc("sandwichData"),
            hotdogStatus : ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    componentWillMount(){
        this.state.docRef.onSnapshot(doc =>{
            this.setState({hotdogStatus : doc.data().hotdogStatus})
        })
    }

    handleChange(e){
        this.state.docRef.set({
            hotdogStatus : e.target.value
        })
    }

    handleClick(){
        this.state.docRef.get().then(doc => {
            this.setState({hotdogStatus : doc.data().hotdogStatus})
        })
    }

    render(){
        return(
            <div>
                <h1 id="hotDogOutPut">Hot dog: {this.state.hotdogStatus}</h1>
                <div>
                    <input  type="text" 
                            id="latestHotDogStatus"
                            onChange = {
                                this.handleChange}
                    />      
                    
                    <button id="load"onClick={this.handleClick}>Read</button></div>
            </div>
        )
    }
}

export default FirestoneTest