import util from './utils.js'

const web3 = window.web3

const block_hash = [];


export default {
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

