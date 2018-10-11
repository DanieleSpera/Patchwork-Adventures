import React, {Component} from 'react';

class CustomButton extends Component{

    render(){
        return(
            <div className="col-6 text-center" onClick={() => this.props.callBack()}>
                <div className="card bg-danger text-warning mb-3 pointer">    
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default CustomButton