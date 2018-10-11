import React, {Component} from 'react';

class SelectedGameList extends Component{

    render(){
        return(
            <div>
                <h2>Selectes Games</h2>
                {this.props.gamels.map((game,index)=>{return(
                    <div key={index}>
                        <h4><b>{game}</b></h4>
                    </div>
                )})}
            </div>
        )
    }
}

export default SelectedGameList