import React, {Component} from 'react';
import {gameSessionCollection, firebaseApp} from '../../firebase';

import _ from 'lodash';

import Cookies from 'universal-cookie';

import PlayerSummary from './PlayerSummary';
import MissingPage from '../Common/MissingPage';
import InputTeam from '../PlayerPage/InputTeam';
import InputPlayer from '../PlayerPage/InputPlayer';
import GameManager from '../GameManager/GameManager';
import MessageCard from '../Common/MessageCard';
import {messages} from '../Common/Messages'
import RealtimeInfo from '../Common/Modules/RealtimeInfo';

class PlayerPanel extends Component{
    constructor(props){
        super(props)
        this.state = {
            gameSessionId : null,
            gameSession : '',
            teamList : [],
            messageList : [],
            team : '',
            player: '',
        }
        this.chooseTeam = this.chooseTeam.bind(this)
        this.insertPlayer = this.insertPlayer.bind(this)
    }
    
    componentDidMount(){
        //Get and Load GameSession
        let nameSession = this.props.match.params.gameSession
        gameSessionCollection.where('title','==',nameSession).onSnapshot(querySnapshot => {
            if (!querySnapshot.empty){
                //Read Cookie
                let cookie = this.getCookieItems(querySnapshot.docs[0].id)
                //Set State
                // console.log('session',querySnapshot.docs[0].data())
                this.setState({gameSession : querySnapshot.docs[0].data() , gameSessionId : querySnapshot.docs[0].id, team : cookie.team , player : cookie.player} )
            }
            else{
                this.setState({gameSession : '' , gameSessionId : '' , player :'' ,team:''} )
            }
        })
        
        //Retrieve Lists
        gameSessionCollection.where('title','==',nameSession).get().then(querySnapshot => {
            let currentSession = querySnapshot.docs[0]
            if (currentSession && !currentSession.empty){
            
                //Retrieve TeamsList
                gameSessionCollection.doc(currentSession.id).collection('teams').onSnapshot(querySnapshot => {
                    let teamList = querySnapshot.docs.map(x => x.data())
                    this.setState({ teamList : teamList })              
                })
                
                //Retrieve MessagesList
                gameSessionCollection.doc(currentSession.id).collection('messages').orderBy("timestamp", "asc").onSnapshot(querySnapshot => {
                    let messageList = querySnapshot.docs.map(x => x.data())
                    this.setState({ messageList: messageList })              
                })
            }
        })

    }


    getCookieItems(sessionId){
        let itemsObj = {team : '' , player : ''}
        const cookies = new Cookies();

        //Get Team
        let cookieTeam = cookies.get('PWATeam');//Get TeamCookie: {index: index , team : team}
        
        if (cookieTeam){
            let team = gameSessionCollection.doc(sessionId+'/teams/'+cookieTeam.index) //check db consistency
            itemsObj.team = team ? cookieTeam : ''
            
            //Check Player
            if(itemsObj.team !== ''){
                let cookieplayer = cookies.get('PWAPlayer');//Get PlayerCookie: {index: index , player : player}
                let player = cookieplayer? gameSessionCollection.doc(sessionId+'/teams/'+cookieTeam.index+'/players/'+cookieplayer.index) : undefined
                itemsObj.player = player ? cookieplayer : ''
            }
        }
        //reset Cookie if needed
        if (itemsObj.player === '' || true){
            cookies.remove('PWAPlayer')
            if (itemsObj.team || true){
                cookies.remove('PWATeam')
            }
        }

        return itemsObj
    }

    
    chooseTeam(dataTeam){
        const cookies = new Cookies();
        cookies.set('PWATeam', dataTeam, { path: '/' });
        this.setState({team : dataTeam})
    }

    insertPlayer(playerName){
        playerName = playerName.toUpperCase()
        let sessPath = this.state.gameSessionId
        let teamPath = '/teams/'+ this.state.team.index
        
        let playerData =  {playerName : playerName}
        gameSessionCollection.doc(sessPath+teamPath).collection('players').add(playerData).then(playerSnap => {
            //set Cookie
            let dataPlayer = {index: playerSnap.id, playerData : playerData}
            const cookies = new Cookies();
            cookies.set('PWAPlayer', dataPlayer , { path: '/' });
            this.setState({player : dataPlayer})
        })

        gameSessionCollection.doc(sessPath).collection('messages').add({message : messages.joinedUser(playerName,this.state.team.team.teamName), timestamp: Date.now()})
    }

    getTeamName(teamObj){
        let tempName = ''
        _.map(teamObj,(team,index) => {return(
            tempName = team.teamName
        )}).then(() => {return tempName})

    }

    render(){
        if(this.state.gameSessionId === null)
        {
            return(
                <div className="row text-center">
                    <MessageCard>
                        Loading...
                    </MessageCard>
                </div>
            )
        }
        else if(this.state.gameSessionId === '')
        {
            return( <MissingPage/>)
        }
        else{
        return(
            <div className="container">
                <PlayerSummary
                    title = {
                                <h3>{this.state.player === '' ? "Player Page" : this.state.player.playerData.playerName + '\'S PAGE'}</h3>
                            }
                    sessionName = {
                                 this.state.gameSession !== ""? this.state.gameSession.title : null
                            }
                    teamName = {
                                this.state.team !== ""? this.state.team.team.teamName : null
                            }
                >
                </PlayerSummary>

                <div className="row text-center">
                    <div className="col-12 ">
                        {this.state.team === '' && this.state.gameSession !== ""
                        ?   <InputTeam sessionId={this.state.gameSessionId} callBack={this.chooseTeam}/>
                        :    <h3>{this.state.team.teamName}</h3>
                        }
                    </div>
                </div>

                {this.state.team !== '' && this.state.player === '' && <InputPlayer callBack = {this.insertPlayer}/>}

                <div className="row text-center">
                    <div className="col-12">
                        {this.state.player && this.state.playerplayerName !== '' && this.state.gameSession !== ""
                        && <GameManager playerRef={{
                            sessionId : this.state.gameSessionId,
                            sessionData : this.state.gameSession,
                            playerName : this.state.player.playerData.playerName,
                            team : this.state.team.index
                            }}/>
                        }
                    </div>
                </div>
                
                <RealtimeInfo
                    teamList = {this.state.teamList}
                    messageList = {this.state.messageList}
                />
                {/* <button onClick={this.info}>info</button> */}
            </div>
        )
        }
    }

}


export default PlayerPanel