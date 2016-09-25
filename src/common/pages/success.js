import React, { Component } from 'react';


class Success extends Component {

  render() {
  	let i = this.props.params.pid;
    return (
    	<div className="success">
        <img src="/winaward/a/static/images/success.png" alt=""/>
        <h2>兑换成功！</h2>
        <p>关注公众号随时和小编联系，查看奖品邮寄进度。</p>
        <img src="/winaward/a/static/images/erweima.png" alt="" className="erweima"/>
        <h3>有钱兔</h3>
        <p>帮你摆脱理财焦虑</p>
    	</div>
    );
  }
}

export default Success;