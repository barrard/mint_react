import React from 'react';
import utils from '../utils/utils'

class RoutesSelectDropdown extends React.Component{
  constructor(props) {
    super(props);
    this.state={
    }
  }

  componentDidMount(){
    this.interval = setInterval(()=>{
      if(this.props.closingTime === undefined) return
      const time_remaining=utils.format_date_time_remaining(this.props.closingTime)
      // console.log(time_remaining)
      // console.log(this.state.current_crowdsale.closingTime)

      this.setState({
         time_remaining,
      })
      clearInterval(this.interval)
      // console.log('timmerrrrrr')
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render(){
    return(
      <div>Time remaining {this.state.time_remaining}</div>
    )
  }
}
export default RoutesSelectDropdown