import React, { Component } from 'react';
import {Link} from 'react-router';

class GiftBottom extends Component {

  render() {
    return (
    	<div className="giftbottom"> 
    		<p>恭喜你获奖啦！</p>
	      <div className="bottom">
	        <Link to=""><span>去兑换奖励</span></Link>
	        <a href="https://mvp.youqiantu.com/discovery/a/"><span>去邀请好友</span></a>
	      </div>
      </div>
    );
  }
}

export default GiftBottom;