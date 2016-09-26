import React, { Component } from 'react';
import {Link} from 'react-router';
import InviteBottom from './components/invitebottom';
import GiftBottom from './components/GiftBottom';
import Loading from './components/loading'

function getLocalTime(nS) {     
  return new Date(parseInt(nS)).toISOString().replace(/\//g,'.').replace(/\-/g,'.').replace(/\.0/g,'.').substring(0,9)
}


class UserInvite extends Component {
  
  constructor(props){
    super(props);
  }

  componentDidMount() {
    document.getElementsByTagName('body')[0].scrollTop = 0;
    this.props.fetchInviteIfNeeded(this.props.params.uid);
    this.props.fetchHomeIfNeeded(this.props.params.uid);
    window.localStorage.giftamount = this.props.userdata.amounts;
  }


  render() {
    const { invitedata, isFetching, lastUpdated, userdata } = this.props;
    let kong = <div className="empty">
      <img src="/winaward/a/static/images/empty3x.png" alt=""/>
      <p>邀请到好友列表空</p>
      <p>你还未邀请到好友</p>
      <a href="https://mvp.youqiantu.com/discovery/a/"><div className="bottom2">去邀请好友</div></a>
    </div>;
    return (
      <div className="invite">
        {isFetching&&<Loading />}
        {!isFetching&&invitedata.length>0&&
          <div className="invitepage">
            <div className="avatar">
              <img src={userdata.avatar} alt=""/>
            </div>
            <div className="pageline">
              我邀请成功的好友
              <span className="abo">已邀请{invitedata.length}人</span>
            </div>
            <div className="invitelist">
              <ul>
                {invitedata.map((item,index)=>
                  <li key={index}>
                    <img src={item.avatar} alt=""/>
                    <span className="name">{item.nickname}</span>
                    <span className="invitetime">{getLocalTime(item.created)}</span>
                  </li>
                )}
              </ul>
            </div>
            {invitedata.length>=10?<GiftBottom />:<InviteBottom />}
          </div>
        }
        {!isFetching&&invitedata.length<1&&kong}
      </div>
    );
  }
}

UserInvite.defaultProps = {
  invitedata: [],
  userdata: {}
};

export default UserInvite;