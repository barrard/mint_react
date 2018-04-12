import util from './utils.js'

const web3 = window.web3

const block_hash = [];


export default {
  format_date_time_stamp:(_num)=>{
    let date = new Date(_num)
    let seconds = date.getSeconds()
    let minutes = date.getMinutes()
    let hours = date.getHours()
    let day = date.getDate()
    let month = date.getMonth()+1
    let year = date.getFullYear()

    let _time_stamp = `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`
    return _time_stamp
  },
  format_date_time_remaining:(closing_time)=>{
    const d = new Date()
    const t = Math.floor(d.getTime()/1000)
    console.log(closing_time)
    console.log(t)
    const time_differnece = closing_time-t
    console.log(time_differnece)
    var seconds = time_differnece
    var minutes = seconds/60
    var hours = minutes/60
    var days = hours/24
    var years = days/365
    if (seconds < 0 || minutes < 0 || hours < 0 || days < 0 || years < 0 ) return '0 Days, 0 Hours, 0 Minutes. 0 Seconds'; 

    // console.log({
    //   seconds, minutes, hours, days, years
    // })

    return `${Math.floor(days%365)} Days, ${Math.floor(hours%24)} Hours, ${Math.floor(minutes%60)} Minutes, ${Math.floor(seconds%60)} seconds`
  },

  check_block:(_blockHash)=>{
    console.log(_blockHash.blockNumber)
    if( util.get_stored_block_hash().indexOf(_blockHash.blockNumber) === -1){
      util.add_blockhash_to_stored(_blockHash.blockNumber)
      console.log('new blockhash')
      console.log(_blockHash.blockNumber)

      return true
    }else{
      console.log('already have')
      // console.log(_blockHash)

      // return false
      return true
    }
  },
  
  get_stored_block_hash:()=>{
    return block_hash;
  },
  add_blockhash_to_stored:(_blockHash)=>{
    block_hash.push(_blockHash)
  },
  call_when_mined:(txHash, callback)=>{
    // console.log('call when mined')
    var that = this
    // console.log(that)
    web3.eth.getTransactionReceipt(txHash,(e, r)=>{
      if(e){console.log(e)}
        else{
          if(r==null){
            setTimeout(function(){
              // console.log(that)
              // console.log(this)
              that.a.call_when_mined(txHash, callback)
            }, 1500)
          }else{
            callback();
          }
        }
    })
  },
  call_when_done:(array, count, func)=>{
    if(count == array.length-1){
      func()
    }

  },

  activate_spinner:(_spinner)=>{
    console.log('activate_spinner')
    // $(_spinner).css({display:'block'})
  },
  hide_spinner:(_spinner)=>{
    console.log('hide_spinner')
    // $(_spinner).css({display:'none'})
  },
  playSound:(filename)=>{  
  console.log('play sound') 
      document.getElementById("sound").innerHTML=`
      <audio autoplay="autoplay"><source src=" ${filename}"  /></audio>
      `;
  }
}

