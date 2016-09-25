import React, { Component } from 'react';
import Mingci from './components/Mingci';
import Panhang from './components/Panhang.js';
import InviteBottom from './components/invitebottom';
import Loading from './components/loading';


class RankPage extends Component {

  componentWillMount() {
    this.props.fetchHomeIfNeeded();
    document.getElementsByTagName('body')[0].scrollTop = 0;
  }

  render() {
    const { homedata, isFetching, lastUpdated, error } = this.props;
    return (
      <div>
        {isFetching&&<Loading />}
        {!isFetching&& homedata &&
        	<div className="invite">
            <div>
              <Mingci userdata = {homedata.userdata} />
              <Panhang inside="true" ranklist = {homedata.ranklist}/>
              <InviteBottom />
            </div>
        	</div>
        }
      </div>
    );
  }
}

export default RankPage;