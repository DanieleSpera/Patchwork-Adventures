import React, {Component} from 'react';
import {connect} from 'react-redux';
import {completeGoalRef} from '../firebase';

class GoalItem extends Component{
    completeGoal(){
        const{email} = this.props.user;
        const{title} = this.props.goal;
        completeGoalRef.push({email,title});
    }

    render(){
        const {email, title} =  this.props.goal;
        return(
            <div>
            <strong>{title}</strong>
            <span>submitted by <em>{email}</em></span>
            <button
                className="btn btn-sm btn-primary"
                onClick ={() => this.completeGoal()}
                >
                    Complete
                </button>
            </div> 
        )
    }
}

function mapStateToProps(state){
    const {user} = this.state;
    return{
        user
    }
}

export default connect(mapStateToProps,null)(GoalItem);