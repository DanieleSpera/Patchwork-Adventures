import React, {Component} from 'react';
import CustomPanel from '../Common/CustomPanel';
import MessageReader from '../Common/MessageReader'

class PlayerSummary extends Component{

    compo(){
        console.log('PlayerSummary')
        console.log('PlayerSummary',this.props.messageList)

    }

    render(){
        return(
            <div className="row">
                <div className="col-12">
                    <CustomPanel title = {<b>{this.props.title}</b>} >    
                       <div className="row d-flex justify-content-center">
                            <div className="col-6">
                                <div className="row">
                                    <div className="col-6"><i>Session</i></div>
                                    <div className="col-6"><b>{this.props.sessionName}</b></div>
                                </div>
                            </div>

                            <div className="col-6">
                                <div className="row">
                                    <div className="col-6"><i>Team</i></div>
                                    <div className="col-6"><b>{this.props.teamName}</b></div>
                                </div>
                            </div>
                        </div>
                    </CustomPanel>
                </div>
            </div>
        )
    }

}

export default PlayerSummary