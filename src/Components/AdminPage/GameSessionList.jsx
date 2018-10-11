import React, {Component} from 'react';
import {gameSessionCollection} from '../../firebase';
import _ from 'lodash';

import EditSession from './EditSession'
import ViewSession from './ViewSession'

class GameSessionList extends Component{
    constructor(props){
        super(props);
        this.state = {
            gameSessionsList : {}
        }
    }

    componentDidMount(){
        gameSessionCollection.onSnapshot(doc =>{
            let documentList = doc.docs//.map(documentSnapShot => { return documentSnapShot.data()})
            this.setState({gameSessionsList : documentList })
        })
    }

    render(){
        return(
            <div>
                {_.map(this.state.gameSessionsList, (session, index) => {
                    let sessionData = session.data()
                    return(
                    <div key={session.id}>
                    {!sessionData.cursor
                        ? <EditSession session={session} key={index}/>
                        : <ViewSession session={session} key={index}/>
                    }
                    </div>


                )})}
            </div>

        )
    }
}



export default GameSessionList