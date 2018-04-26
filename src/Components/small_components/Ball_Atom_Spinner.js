import React from 'react';

class Ball_atom_spinner extends React.Component{
  constructor(props) {
    super(props);
    this.state={
    }
  }


  render(){
    return(
      <div className="item">
          <div className="item-inner">
              <div className="item-loader-container">
                  <div className="la-ball-atom la-2x">
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                  </div>
              </div>
          </div>
      </div>

    )
  }
}
export default Ball_atom_spinner