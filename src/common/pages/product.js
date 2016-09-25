import React, { Component } from 'react';

const products = ['Macbook Air','格兰仕iK2（TM）智能烘焙烤箱','美的C21电磁炉','疯狂动物城玩偶兔子狐狸一对','疯狂动物城玩偶兔子一只','5元微信红包'];
const awards = ['一等奖','二等奖','三等奖','四等奖','五等奖','鼓励奖'];
const worth = ['5999','2222','1209','450','50','5'];

class Product extends Component {

  render() {
  	let i = this.props.params.pid;
    return (
    	<div className="product">
    		<img src={"/winaward/a/static/images/award"+this.props.params.pid+".png"} alt=""/>
    		<h1>{awards[i]}</h1>
    		<h2>{products[i]}</h2>
    		<a href="https://mvp.youqiantu.com/discovery/a/"><div className="bottom">邀请好友赢奖品</div></a>
    	</div>
    );
  }
}

export default Product;