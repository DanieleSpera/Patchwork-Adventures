import React, {Component} from 'react';
import CustomPanel from '../Common/CustomPanel'
import CustomButton from '../Common/CustomButton'

class InputPlayer extends Component{

    constructor(props){
        super(props);
        this.state = {
            playerName : '',
            dbPath : this.props.idNode+'/teams',
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e){
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    render(){
        return(
            <div className="row justify-content-center">
                <div className="col-12">
                    <CustomPanel title={<h2>Insert Your Name</h2>}>
                        <div className="row">
                            
                            <div className="input-group col-12 mb-4">
                                <input className="form-control" 
                                        type="text" 
                                        placeholder="Insert Name..."
                                        name = "playerName"
                                        onChange = {this.handleChange}
                                        required
                                        />
                            </div>

                            <div className="col-12 d-flex justify-content-center">
                                <CustomButton callBack={()=>this.props.callBack(this.state.playerName)}>
                                    <h3> GO! </h3>
                                </CustomButton>
                            </div>

                        </div>
                    </CustomPanel>             
                </div>

            </div>
        )
    }

}

export default InputPlayer