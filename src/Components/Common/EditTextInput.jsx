import React, {Component} from 'react';

class EditTextInput extends Component{

    constructor(props){
        super(props)
        this.state= {
            itemValue : '',
            edit : false
        }
        this.handleChange = this.handleChange.bind(this)
        this.removeValue = this.removeValue.bind(this)
        this.updateValue = this.updateValue.bind(this)
        this.setEdit = this.setEdit.bind(this)
    }

    componentWillMount(){
        this.setState({
            itemValue : this.props.value
        })
    }

    handleChange(e){
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    
    setEdit(flag){
        this.setState({edit : flag})
    }

    updateValue(event){
        this.props.dbRef.child(this.props.path +"/" +this.props.itemId+"/" + this.props.field).set(this.state.itemValue)
        this.setEdit(false)
    }

    removeValue(){
        this.props.dbRef.child(this.props.path +"/" +this.props.itemId).remove()
    }


    render(){
        return(
            <div>
                {!this.state.edit? 
                    <div className="row">
                        <div className="col-10 pointer" onClick={() => this.setEdit(true)}>
                            {this.props.value}
                        </div>
                        <div className="col-2 text-right">
                            {this.props.delete? <i className="material-icons pointer" onClick={() => {this.removeValue() }}> highlight_off </i> : null }
                        </div>
                    </div>
                :
                    <div className="row">
                        <div className="input-group col-12 p-3">
                            <input type="text"
                                autoFocus = "true"
                                className="form-control"
                                name="itemValue"
                                onChange = {this.handleChange}
                                value = {this.state.itemValue} 
                                onKeyDown = {(event) => {if(event.key === 'Enter'){this.updateValue()}}}
                                onBlur = {this.updateValue}
                                />
                        </div>
                    </div>
                }

            </div>
        )
    }
}

export default EditTextInput