import React from 'react';
import { Button, NavLink, Container, Row, Col} from 'reactstrap';
import My_jumbotron from './boots/jumbotron.js';
import Headline from './small_components/Headline.js';
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
          <Headline
            title={`Strart a Crowdsale, why?`}
            content={`Todays financing options are monopolized by big banks.  You can now take control of the system, and 
            participate in creating a financial system that helps everyone.`}
            btn={true}
            link={`/Create`}
            btn_text={`Create your Crowdsale`}
          />

          <hr />

          <Headline
            title={`Fund other crowdsales`}
            content={`Find crowdsasles that appeal to you. Invest your money to help make the future better for everyone`}
            btn={true}
            link={`/Crowdsale_list`}
            btn_text={`Search Crowdsales`}
          />

        </Col>
        <Col xs={12} md={6}>
          <My_jumbotron 
            title="Welcome!"
            subscript={`This is a platform for creating and funding Crowdsales around the world.
              Investing, contribute, lend with the Etherium blockchain.  Fast, Secure, and reliable technology.`}
            hook={`To learn more about the future of blockchain technologies, click below`}
            btn_text={`The Future is Now`}
            link={`/About`}
            btn_color={`primary`}
          />
        </Col>
      </Row>
    )
  }
}
export default Home