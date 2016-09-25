import React, { Component } from 'react';
import {Link} from 'react-router';
import Mingci from './components/Mingci.js';
import Panhang from './components/Panhang.js';
import { connect } from 'react-redux';
import Loading from './components/loading';

class Home extends Component {
	constructor(props) {
	  super(props);
	}

	componentDidMount(){
		this.props.fetchHomeIfNeeded();
	}

  render() {
  	const { homedata, isFetching, lastUpdated, error } = this.props;
  	// console.log(homedata.userdata);
    return (
    	<div>
    	{isFetching&&<Loading />}
    	{!isFetching&& homedata.userdata &&
    	<div className="home">
				<div className="top">
					<img src="/winaward/a/static/images/banner.png" alt=""/>
				</div>
				<div className="time">
					<p>距离活动结束还有</p>
					<p><img src="/winaward/a/static/images/time.png" alt=""/>5天9小时23分</p>
				</div>
				<div className="scroll">
					<Link to="/product/0"><img src="/winaward/a/static/images/onegift.png" alt=""/></Link>
					<Link to="/product/1"><img src="/winaward/a/static/images/twogift.png" alt=""/></Link>
					<Link to="/product/2"><img src="/winaward/a/static/images/threegift.png" alt=""/></Link>
					<Link to="/product/3"><img src="/winaward/a/static/images/fourgift.png" alt=""/></Link>
					<Link to="/product/4"><img src="/winaward/a/static/images/fivegift.png" alt=""/></Link>
					<Link to="/product/5"><img src="/winaward/a/static/images/sixgift.png" alt=""/></Link>
				</div>
				<p className="usershow">获奖用户照片秀</p>
				<div className="scroll scroll2">
					<img src="/winaward/a/static/images/photo1.png" alt=""/>
					<img src="/winaward/a/static/images/photo2.png" alt=""/>
					<img src="/winaward/a/static/images/photo3.png" alt=""/>
				</div>
				<div className="xindong">
					<img src="/winaward/a/static/images/xindong.png" alt=""/>
					<p>有木有一点小心动</p>
					<a href="https://mvp.youqiantu.com/discovery/a/"><span className="bottom">快邀请好友赢奖品吧</span></a>
				</div>
				<Link to="/userinvite/1">
					<Mingci userdata = {homedata.userdata}/>
				</Link>
				<Panhang inside="false" ranklist={homedata.ranklist}/>
				<div className="guize">
					<h2>活动规则</h2>
					<p>
						成功邀请好友登陆使用有钱兔游戏，即可兑换相应奖品。你可以在活动页面看到你邀请成功的人。<br/>
						满10人，保底5元微信红包<br/>
						满40人，疯狂动物城兔子玩偶<br/>
						满80人，疯狂动物城玩偶兔子狐狸一对！<br/>
						满120人，电磁炉<br/>
						满200人，烘焙烤箱<br/>
						满5000人，苹果笔记本电脑<br/>
					</p>
				</div>
				<a href="https://mvp.youqiantu.com/discovery/a/"><div className="lastyaoqing">快邀请好友赢奖品吧</div></a>
    	</div>
    	}
    	</div>
    );
  }
}

Home.propTypes = {};
Home.defaultProps = {
	homedata:{}
};

export default Home;