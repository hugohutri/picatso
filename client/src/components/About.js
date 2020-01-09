import React from "react";

import "../styles.css";


// This page will contain basic information about the microblogging service
function About() {
  const logoStyle = { fontSize: 300 };
  const logoStyleSmall = { fontSize: 150 };

  return (
    <div className="about">
      <div className="row">
        <div className="col s12 center-align">
          <i
            className="material-icons white-text hide-on-small-and-down"
            style={logoStyle}
          >
            terrain
          </i>
          <i
            className="material-icons white-text hide-on-med-and-up"
            style={logoStyleSmall}
          >
            terrain
          </i>
        </div>
        <div className="col s12 m8 offset-m2 l8 offset-l2">
          <div className="card-panel">
            <div className="fidget col"></div>
            <span className="black-text">
              Vuori is a Finnish microblogging and social networking service on
              which users post and interact with messages. Registered users can
              post, but unregistered users can only read them.
              Users access Vuori through its website interface. Vuori, Inc. is
              based in Korvatunturi, Finland, and has less than 0 offices around
              the world.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
