import React, {Component} from 'react';
import {firebaseApp} from '../firebase';
import {connect} from 'react-redux';
import AddGoal from './AddGoal'
import GoalList from './GoalList'

class App extends Component  {
    signOut(){
        firebaseApp.auth().signOut();

    }
    render() {
        return(
            <div>
                <AddGoal />
                <div>Goals</div>
                <GoalList />
                <button
                    className="btn btn-danger"
                    onClick={ () => this.signOut()}>
                    SignOut
                </button>

            </div>
        )
    }
}

function mapStateToProps(state){
    return

}

export default connect(mapStateToProps,null) (App);