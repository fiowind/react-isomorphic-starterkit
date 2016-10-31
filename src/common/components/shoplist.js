import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link,withRouter,setRouteLeaveHook } from 'react-router';

class Shoplist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      loading: false
    }
  }

  componentDidMount() {
    this.props.fetchShopListsIfNeeded();
    window.onscroll = function() {
      var curTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
      if (curTop + document.documentElement.clientHeight + 40 >= document.documentElement.scrollHeight && !this.state.isLoadedFinished && !this.state.isLoading) {
        let page = this.state.page;
        if(!this.props.ispageFetching&&!this.state.loading&&this.state.page<5){
          page++;
          this.setState({
            page: page,
            loading: true
          });
          setTimeout(() => {
            this.setState({loading:false})
          },2000)
          this.props.addShopList(page);
        }
      }
    }.bind(this);
  }

  componentWillReceiveProps(nextProps) {
  }
  handleRefreshClick(e){
    e.preventDefault();
    this.props.fetchShopLists();
  }

  render () {
    const { shoplists, isFetching, error, lastUpdated } = this.props;
    console.log('sholist props', this.props);
    return (
      <div className="shoplist">
        <p className="post-tag">
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toUTCString()}.
              {' '}
            </span>
          }
        </p>
        {isFetching  &&
          <h3>Loading...</h3>
        }
        {!isFetching &&
          <a href='#'
             onClick={this.handleRefreshClick.bind(this)}>
            Refresh
          </a>
        }
        {!isFetching && error && typeof(shoplists)!="object" &&
          <h3 className="post-error">There has been an Error{error}</h3>
        }
        {!isFetching && !error  && typeof(shoplists)!="object" &&
          <h3>Empty</h3>
        }
        {shoplists && 
          <ul>
          {shoplists.map((item,index)=>
            <li key={index}>
            <Link to={`/shop/${item.entity_id}`}>
              <div>{item.name}</div>
              <div>投资额：{item.money}</div>
              <div>原价：{item.realprice}</div>
            </Link>
            </li>
            )}
          </ul>
        }
        {this.state.loading&&this.state.page<5?<h4>Loading...</h4>:''}
        {this.state.page>=5?<h4>没有了</h4>:''}
      </div>
    );
  }
}

Shoplist.propTypes = {};
Shoplist.defaultProps = {};

export default Shoplist;