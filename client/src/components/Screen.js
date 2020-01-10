import React, {Component} from "react";

import Lobby from "./screen/Lobby"

// Everyting rendered in the main screen or tv, will be here
class Screen extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                <Lobby/>
            </div>
         );
    }
}
 
export default Screen;