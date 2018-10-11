import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter,Route} from 'react-router-dom'
import {firebaseApp} from './firebase';
import {logUser} from './Actions';

import {createStore} from 'redux';
    import reducer from './Reducers'; 

import App from './Components/App';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import AdminPanel from './Components/AdminPage/AdminPanel';
import PlayerPanel from './Components/PlayerPage/PlayerPanel';
import QuestionGame from './Components/QuestionGame/QuestionGame';
import AddQuestion from './Components/QuestionGame/AddQuestion';
import MessageReader from './Components/Common/MessageReader';

import firestoneTest from './Components/Common/FirestoneTest';

import './Style/common.css'
// import './index.css';
// import registerServiceWorker from './registerServiceWorker';

const store = createStore(reducer);

firebaseApp.auth().onAuthStateChanged(user => {
    if (user) {
        const {email} = user;
        store.dispatch(logUser(email));
        console.log('user signed');
    }
    else{
        console.log('second option');
    }
})

ReactDOM.render(
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <div>
                <Route path="/app" component={App} />
                <Route path="/singin" component={SignIn} />
                <Route path="/singin" component={SignIn} />
                <Route path="/singup" component={SignUp} />
                
                <Route path="/multiplayeradm" component={AdminPanel} />
                <Route path="/player/:gameSession" component={PlayerPanel} />
                <Route path="/testGame" component={QuestionGame} />
                <Route path="/addQuestion" component={AddQuestion} />

                <Route path="/messageModule" component={MessageReader} />
                <Route path="/firestoneTest" component={firestoneTest} />
                
            </div>
        </BrowserRouter>
, document.getElementById('root')
);
// registerServiceWorker();
