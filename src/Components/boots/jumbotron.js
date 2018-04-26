import React from 'react';
import { Jumbotron, Button } from 'reactstrap';
import Link_Btn from './Link_Btn.js';


const my_jumbotron = (props) => {
  return (
    <div>
      <Jumbotron>
        <h1 className="display-3">{props.title}</h1>
        <p className="lead">{props.subscript}</p>
        <hr className="my-2" />
        <p>{props.hook}</p>
        <p className="lead">
          <Link_Btn btn_text={props.btn_text} link="/About" color={props.btn_color}></Link_Btn>

          
        </p>
      </Jumbotron>
    </div>
  );
};

export default my_jumbotron;