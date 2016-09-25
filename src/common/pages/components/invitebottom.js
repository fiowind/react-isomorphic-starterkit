import React, { Component } from 'react';


class InviteBottom extends Component {

  render() {
    return (
      <div className="invitebottom">
        <img src="/winaward/a/static/images/back.png" alt="" onClick={()=>history.go(-1)}/>
        <a href="https://mvp.youqiantu.com/discovery/a/"><span>去邀请好友</span></a>
      </div>
    );
  }
}

export default InviteBottom;