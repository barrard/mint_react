import React from 'react';
import { Jumbotron, Button } from 'reactstrap';

const my_jumbotron = (props) => {
  return (
    <div>
      <Jumbotron>
        <h1 className="display-3">{props.title}</h1>
        <p className="lead">{props.subscript}</p>
        <hr className="my-2" />
        <p>{props.hook}</p>
        <p className="lead">
          <Button color="primary">{props.btnText}</Button>
        </p>
      </Jumbotron>
    </div>
  );
};

export default my_jumbotron;