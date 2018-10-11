import React, {Component} from 'react';
import CustomPanel from './CustomPanel'

class MissingPage extends Component{

    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-12 m-4 text-center">
                        <CustomPanel title={ <h1>Missing Url</h1> }>
                            <h2><i>Please Check the Url</i></h2>
                        </CustomPanel>
                    </div>
                </div>
            </div>
        )
    }
}

export default MissingPage