import React, {Component} from 'react';
import MessageReader from '../../Common/MessageReader'
import CustomPanel from '../../Common/CustomPanel'
//To Delete
import _ from 'lodash';


class RealtimeInfo extends Component{
    //To Delete
    constructor(props){
        super(props)
    }

    // props:
    //     - teams
    //     - message List

    render(){
        return(
            <div className="row d-flex justify-content-center">
                <div className="col-12">

                    <CustomPanel title={ this.props.teamList != undefined ? 
                        <div className="row">
                            {_.map(this.props.teamList,(item,index) => {
                                return(
                                    <div className="col-6 text-center" key = {index}>
                                        <b>
                                            <h3>{item.teamName} - {item.score}</h3>
                                        </b> 
                                    </div>   
                                )
                            })}
                        </div>
                        : null
                        }>

                        <MessageReader
                            messageList = {this.props.messageList !== ""? this.props.messageList : null}
                        />

                    </CustomPanel>

                

                </div>
            </div>
        )
    }
}

export default RealtimeInfo