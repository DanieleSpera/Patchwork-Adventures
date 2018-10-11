import React, {Component} from 'react';
import _ from 'lodash';



class MessageReader extends Component{
    //To Delete
    constructor(props){
        super(props)
        this.state = {
            //delete
            timer: 2000,
            timeFilter: function(){return Date.now() - 3000},
            tempMessages : [],
        }
        this.updateMessageList = this.updateMessageList.bind(this)
    }

    // props:
    //     - messageList
    
    componentDidUpdate(prevProps){
        if (prevProps.messageList !== this.props.messageList) {
            // console.log('UPDATE COMPONENT')
            let messageList = _.filter(this.props.messageList , item => item.timestamp > this.state.timeFilter())
            this.setState({tempMessages : messageList})
            
            // console.log('componentDidUpdate',this.props.messageList)
            // console.log('componentDidUpdate messageList',messageList)
            
            // messageList2.forEach(item =>{console.log(item)})
            // console.log('messageList',messageList)

            this.updateMessageList()
        }
    }

    updateMessageList(){
        // console.log('UPDATE MESSAGE')
        
        setTimeout(() => {
            if (this.state.tempMessages.length > 0){
                let messageList = this.state.tempMessages
                messageList.forEach(element => {
                    if(element.timestamp < this.state.timeFilter()){
                        let index = messageList.indexOf(element)
                        messageList.splice(index,1)                        
                    }
                });
                this.setState({tempMessages : messageList})
                this.updateMessageList()
            }
        }, this.state.timer);

    }

    render(){
        return(
            <div className="row d-flex justify-content-center">
                {_.map(this.state.tempMessages,(item,index) => {
                    if(item.timestamp > this.state.timer){
                        return(
                            <div className="col-12 text-center" key = {index}>
                                <hr/>
                                <i>
                                    {item.message}
                                </i> 
                            </div>   
                        )
                    }
                })}
            </div>
        )
    }
}

export default MessageReader