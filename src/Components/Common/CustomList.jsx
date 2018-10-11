import React, {Component} from 'react';
import _ from 'lodash';

class CustomList extends Component{

    render(){
        return(
            <div className="row">
                <div className="col-12">
                    <ul className="list-group border-danger">
                        <li className="list-group-item bg-transparent border-danger">{this.props.title}</li>
                        {_.map(this.props.items, (item,index)=> {return (
                           <li key = {index} className=
                                {item.highlight ? "list-group-item bg-danger text-warning" : "list-group-item border-danger bg-transparent"}
                                >{item.content}</li>
                        )})}

                    </ul>
                </div>
            </div>
        )
    }
}

export default CustomList