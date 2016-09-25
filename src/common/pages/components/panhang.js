import React, { Component } from 'react';
import {Link} from 'react-router';

class Panhang extends Component {

  render() {
    let ranklist = this.props.ranklist;
    let maplist = ranklist.slice(5,ranklist.length);
    return (
        <div className="panhang">
            <header>
                排行榜
                {this.props.inside==="false"?<Link to="/rank"><span className="abo">查看更多</span></Link>:''}
            </header>
            <content>
            <ul>
                <li>
                    <span className="li1">排名</span>
                    <span className="li2">昵称</span>
                    <span className="li3">邀请数</span>
                </li>
                <li className="dan">
                    <span className="li1"><img src="/winaward/a/static/images/mingci1.png" alt=""/></span>
                    <span className="li2"><img src="/winaward/a/static/images/photo1.png" alt=""/><p>{ranklist[0].nickname}</p></span>
                    <span className="li3">{ranklist[0].recommand}</span>
                </li>
                <li>
                    <span className="li1"><img src="/winaward/a/static/images/mingci2.png" alt=""/></span>
                    <span className="li2"><img src="/winaward/a/static/images/photo1.png" alt=""/><p>{ranklist[1].nickname}</p></span>
                    <span className="li3">{ranklist[1].recommand}</span>
                </li>
                <li className="dan">
                    <span className="li1"><img src="/winaward/a/static/images/mingci3.png" alt=""/></span>
                    <span className="li2"><img src="/winaward/a/static/images/photo1.png" alt=""/><p>{ranklist[2].nickname}</p></span>
                    <span className="li3">{ranklist[2].recommand}</span>
                </li>
                <li>
                    <span className="li1">4</span>
                    <span className="li2"><img src="/winaward/a/static/images/photo1.png" alt=""/><p>{ranklist[3].nickname}</p></span>
                    <span className="li3">{ranklist[3].recommand}</span>
                </li>
                <li className="dan">
                    <span className="li1">5</span>
                    <span className="li2"><img src="/winaward/a/static/images/photo1.png" alt=""/><p>{ranklist[4].nickname}</p></span>
                    <span className="li3">{ranklist[4].recommand}</span>
                </li>
                {this.props.inside==="true"?maplist.map((item,i)=>
                <li className={i%2?"dan":""} key={i}>
                    <span className="li1">{i+6}</span>
                    <span className="li2"><img src="/winaward/a/static/images/photo1.png" alt=""/><p>{item.nickname}</p></span>
                    <span className="li3">{item.recommand}</span>
                </li>
                ):''}
            </ul>
            </content>
        </div>
    );
  }
}


export default Panhang;