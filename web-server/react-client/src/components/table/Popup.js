// https://www.cluemediator.com/create-simple-popup-in-reactjs
import React from "react";
import { Button } from 'semantic-ui-react'

import './Popup.css'
 
const Popup = (props) => {
  return (
    <div className="popup-box">
      <div className="box">
          <Button circular inverted onClick={props.handleClose} className="close-icon"> X </Button>
          {props.content}
      </div>
    </div>
  );
};
 
export default Popup;