import React, { Component, PropTypes } from 'react';
import request from 'axios';

class MailPage extends Component {
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      showhint:false,
      hint:'',
      giftname:[],
      giftaward:[],
      choose:-1
    };
  }
  componentDidMount() {
    let giftamount = window.localStorage.giftamount||10000;
    let giftname,giftaward;
    if(giftamount>=5000){
      giftname= ['Macbook Ari','格兰仕iK2（TM）智能烘焙烤箱','美的C21电磁炉','疯狂动物城玩偶兔子狐狸一对','疯狂动物城玩偶兔子一只','5元微信红包'];
      giftaward=['一等奖','二等奖','三等奖','四等奖','五等奖','鼓励奖'];
    }
    else if(giftamount>=200){
      giftname= ['格兰仕iK2（TM）智能烘焙烤箱','美的C21电磁炉','疯狂动物城玩偶兔子狐狸一对','疯狂动物城玩偶兔子一只','5元微信红包'];
      giftaward=['二等奖','三等奖','四等奖','五等奖','鼓励奖'];
    }
    else if(giftamount>=120){
      giftname= ['疯狂动物城玩偶兔子狐狸一对','疯狂动物城玩偶兔子一只','5元微信红包'];
      giftaward=['四等奖','五等奖','鼓励奖'];
    }
    else if(giftamount>=80){
      giftname= ['美的C21电磁炉','疯狂动物城玩偶兔子狐狸一对','疯狂动物城玩偶兔子一只','5元微信红包'];
      giftaward=['三等奖','四等奖','五等奖','鼓励奖'];
    }
    else if(giftamount>=40){
      giftname= ['疯狂动物城玩偶兔子一只','5元微信红包'];
      giftaward=['五等奖','鼓励奖'];
    }
    else if(giftamount>=10){
      giftname= ['5元微信红包'];
      giftaward=['鼓励奖'];
    }
    this.setState({giftname:giftname,giftaward:giftaward});
  }
  onValueChange(name, value) {
    this.setState({
      [name]: value
    });
  }
  showhint(hint){
    this.setState({showhint:true,hint:hint});
    setTimeout(() => {
      this.setState({showhint:false,hint:''});
    }, 1000);
  }

  handleSubmit(){
    let awardid;
    if(this.state.choose==-1){
      this.showhint('请选择奖品');
      return;
    }else{
      awardid = 7-this.state.giftaward.length+this.state.choose;
    }
    request.post('/winaward/a/api/mail', {
      address:this.state.address,
      name: this.state.name,
      phone: this.state.phone,
      awardid: this.state.choose,
    })
    .then( (response) => {
      if(response.data=="success"){
        this.context.router.push('/success');
      }else{
        this.showhint(response.data);
      }
    })
    .catch( (response) => {
      this.showhint("error");
      console.log(response);
    });
  }

  render() {
    let hint = this.state.showhint?
                <div className="hint">
                  <div className="content">{this.state.hint}</div>
                </div>:'';
    return (
      <div>
        {hint}
        <div className="mail">
          <h1>邮递信息</h1>
          <p className="yellowp">请填写以下信息，我们将尽快把奖品寄给你！</p>
          <input type="text" name="address" placeholder="邮寄地址" onChange={(e) => this.onValueChange('address', e.target.value)}/>
          <input type="text" name="name" placeholder="真实姓名" onChange={(e) => this.onValueChange('name', e.target.value)}/>
          <input type="text" name="phone" placeholder="联系电话" onChange={(e) => this.onValueChange('phone', e.target.value)}/>
          <h1 className="middleh">选择奖品</h1>
          <div className="scroll">
          {this.state.giftname.map((item,index)=>
            <div key={index} onClick={ ()=>this.setState({choose:index}) } className={this.state.choose==index?"active one":'one'}>
              <img src={"./static/images/gift"+(7-this.state.giftname.length+index)+".png"} alt=""/>
              {this.state.choose==index?<img src="./static/images/choose.png" className="choose"/>:''}
              <p>{this.state.giftaward[index]}</p>
              <p>{item}</p>
            </div>
            )}
          </div>
        </div>
        <div className="invitebottom">
          <img src="./static/images/back.png" alt="" onClick={()=>history.go(-1)}/>
          <span onClick={()=>this.handleSubmit()}>提交</span>
        </div>
      </div>
    );
  }
}

MailPage.contextTypes = {
   router: PropTypes.any
};

export default MailPage;