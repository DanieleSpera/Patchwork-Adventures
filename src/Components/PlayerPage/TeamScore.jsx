import React, {Component} from 'react';
import CustomPanel from '../Common/CustomPanel';
import _ from 'lodash';

class TeamScore extends Component{

    render(){
        return(

            <CustomPanel title = {<h3>Score</h3>} >  
                <div className="row d-flex justify-content-center">
                    {_.map(this.props.teams, (team,index) => {return(
                        <div className="col-6 text-center" key={index}>
                            <div className="card bg-transparent text-danger mb-3">    
                                <h2>
                                    {team.teamName} : {team.score}
                                </h2>
                            </div>
                        </div>
                    )})}
                </div>
            </CustomPanel>
        )
    }

}

export default TeamScore