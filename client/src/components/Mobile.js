import React, {Component} from "react";

import Nav from "./Nav"
import MainMenu from "./mobile/MainMenu"

// Everything rendered in the mobile will be here
class Mobile extends Component {
    render() { 
        return ( 
            <div>
                <Nav/>
                <div className="window container blue lighten-4">
                    <MainMenu/>
                </div>
            </div>
         );
    }
}
 
export default Mobile;