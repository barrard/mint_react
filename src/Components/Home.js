import React from 'react';
import { Button, NavLink, Container, Row, Col} from 'reactstrap';
import My_jumbotron from './boots/jumbotron.js';
import Link_Btn from './boots/Link_Btn.js';
import {
  Link
} from 'react-router-dom';


class Home extends React.Component{
  constructor(props) {
    super(props);
    this.state={
    }
  }

  render(){



    return(
      <Row>
        <Col xs={12} md={6}>
                  <h2>Strart a Crowdsale, why?</h2>
            <p>Todays financing options are monopolized by big banks.  You can now take control of the system, and 
            participate in creating a financial system that helps everyone.
            </p>
            <Link_Btn color="info" link="/" btn_text="Create your Crowdsale">
            
              {/*<Link className="white" to="/">Create your Crowdsale</Link>*/}
            </Link_Btn>

                  <h2>What is Lorem Ipsum?</h2>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </p>
                  <h2>What is Lorem Ipsum?</h2>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </p>
        </Col>
        <Col xs={12} md={6}>
          <My_jumbotron 
            title="Welcome!"
            subscript={`This is a platform for creating and funding Crowdsales around the world.
              Investing, contribute, lend with the Etherium blockchain.  Fast, Secure, and reliable technology.`}
            hook={`To learn more about the future of blockchain technologies, click below`}
            btnText={`The Future is Now`}
          />
        </Col>
      </Row>
    )
  }
}
export default Home