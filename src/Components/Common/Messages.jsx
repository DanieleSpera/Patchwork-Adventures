export const messages = {

    joinedUser : (player, team) => {return player + " Joined in " + team},
    
    playerAnswer : (player,text) => {return player + " Says: " + text},
    
    rightAnswer : (player) => {return player + " Was Right!"},
    
    wrongAnswer : (player) => {return player + " Was Wrong!"},
    
    teamGetPoint : (team) => {return "Point for team: " + team},
    
    teamLosePoint : (team) => {return "Point Less for team: " + team},
}