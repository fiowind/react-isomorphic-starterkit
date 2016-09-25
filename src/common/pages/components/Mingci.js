import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';

class Mingci extends Component {
    handleDuihuan(event){
        // event.stopPropagation();
        event.preventDefault()
        this.context.router.push('/mail');
    }
    componentDidMount() {
      window.localStorage.giftamount = this.props.userdata.amounts;
    }

    render() {
    let userdata = this.props.userdata;
    return (
        <div className="mingci">
           <img src={userdata.avatar} alt=""/>
           <div className="block1">
             <span className="name">{userdata.name}</span>
             <span className="dijiming">第{userdata.ranking}名</span>
           </div>
           <div className="block2">
             <span className="yiyao">已邀请{userdata.amounts}人</span>
                {userdata.amounts>=10?<span className="duihuan" onClick={(e)=>this.handleDuihuan(e)}>去兑换奖励</span>:''}
           </div>
           <img className="jiantou" src="/winaward/a/static/images/jiantou.png" alt=""/>
        </div>
    );
    }
}
Mingci.contextTypes = {
    router: PropTypes.any
};
Mingci.defaultProps = {
  userdata:{}
};

export default Mingci;