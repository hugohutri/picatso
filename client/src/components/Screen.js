import React, {Component} from "react";

import CreateLobby from "./screen/CreateLobby"

// Everyting rendered in the main screen or tv, will be here
class Screen extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                <CreateLobby/>
            </div>
         );
    }
}
 
export default Screen;