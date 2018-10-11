import React, {Component} from 'react';

class CustomPanel extends Component{

    render(){
        return(
            <div className="teamCard card border-danger bg-warning mb-3">
                <div className="card-header text-center">
                    {this.props.title}
                </div>
            
                <div className="card-body">
                    {this.props.children}
                </div>
            </div>
        )
    }
}



export default CustomPanel