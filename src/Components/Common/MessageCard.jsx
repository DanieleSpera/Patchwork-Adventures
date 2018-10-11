import React, {Component} from 'react';

class MessageCard extends Component{

    render(){
        return(
            <div className="col-12" onClick={() => this.props.callBack()}>
                <div className="card border-danger text-danger  bg-warning mb-3">    
                    <h1>{this.props.children}</h1>
                </div>
            </div>
        )
    }
}

export default MessageCard