import React from 'react';
import Link_Btn from '../boots/Link_Btn.js';

class RoutesSelectDropdown extends React.Component{
  constructor(props) {
    super(props);
    this.state={
    }
  }

  render(){
    return(<div>
            <h2>{this.props.title}</h2>
      <p>{this.props.content}</p>
      {this.props.btn === true &&
        <Link_Btn color={this.props.btn_color} link={this.props.link} btn_text={this.props.btn_text}>
        
          {/*<Link className="white" to="/">Create your Crowdsale</Link>*/}
        </Link_Btn>
      }

      </div>

    )
  }
}
export default RoutesSelectDropdown