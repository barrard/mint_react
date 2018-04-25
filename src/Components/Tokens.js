import React from 'react';
import {connect} from 'react-redux';
import toastr from 'toastr'

    let container;

class Top_infobar extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      account:'',
      balance:'',
    }

  }

  onClick = () => {
    // this.count = this.count || 1
    // // toastr.options = {
    // //   positionClass : 'toast-top-full-width',
    // //   hideDuration: 300,
    // //   timeOut: 6000
    // // }
    // // toastr.clear()
    toastr.success(`Settings updated`)
  }


  componentWillMount(){
    // const bc = new BC_Data();
    // var data = bc.get_data()
    // console.log(data)
  }

  render(){
    var coins = []
    console.log('RENDER TOP INFO BAR!!!!!!')
    if (this.props.my_tokens) {
      console.log('GOT TOKENS!!!!!!!')
      this.props.my_tokens.forEach((i)=>{ 
      console.log('ANOTHER COOOOIIIINN!!!!!!!')
      
        coins.push(<Coin key={i} id={i} />)
      })
    }else{

    }




    return(

      <div className='topbar'>
        {/*<button onClick={this.onClick}>click me</button>       */}
        {/*<div>Top bar</div>*/}
        <p>ERC721MintableToken Address:{this.props.token_address}</p>
          <div>Your tokens {coins}</div>
        <p>Your Address:{this.props.address}</p>
        <p>ERC721MintableToken Balance:{this.props.tokens_balance}</p>
        <p>{this.props.crowdsales} Crowdsales already started</p>
      </div>

    )
  }


}

const Coin = (props)=>{
  return(
    <div className="coin_container">
      <div className="Coin_face">{props.id}</div>
      <div className='coin_right'></div>
      <div className='coin_left'></div>
    </div>
  )
}

const mapStateToProps = (state)=>{
    return{
      address:state.web3.address,
      tokens_balance:state.tokens.ERC721MintableToken_balance,
      token_address:state.tokens.ERC721MintableToken_address,
      my_tokens:state.tokens.get_my_tokens,
      crowdsales:state.tokens._crowdsale_counter
    }
  }
export default connect(mapStateToProps)(Top_infobar);