import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link,withRouter,setRouteLeaveHook } from 'react-router';


class Fio extends Component {

  constructor(props) {
    super(props);
    // this.routerWillLeave = this.routerWillLeave.bind(this);
    // this.handleRefreshClick = this.handleRefreshClick.bind(this);
  }
  routerWillLeave(nextLocation) {
    // alert(nextLocation, 'title');
    // console.log('确定离开？', nextLocation.pathname.split('/')[2]);
    let id = nextLocation.pathname.split('/')[2];
    this.props.deleteDetailIfNeeded(id);
  }

  componentDidMount() {
    // this.props.router.setRouteLeaveHook(
    //     this.props.route, 
    //     this.routerWillLeave
    // );
    // console.log("FIO...this.props",this.props);
    this.props.fetchListsIfNeeded();
  }

  componentWillReceiveProps(nextProps) {
  }

  handleRefreshClick(e) {
    e.preventDefault();
    this.props.fetchListsIfNeeded();
  }

  render () {
    console.log('this.fio.props',this.props);
    const { lists, isFetching, lastUpdated, error } = this.props;
    return (
      <div>
        <p className="post-tag">
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toUTCString()}.
              {' '}
            </span>
          }
        </p>
        {isFetching &&
          <h3>Loading...</h3>
        }
        {!isFetching &&
          <a href='#'
             onClick={this.handleRefreshClick.bind(this)}>
            Refresh
          </a>
        }
        {isFetching &&
          <h3>Loading...</h3>
        }
        {!isFetching && error && typeof(lists)!="object" &&
          <h3 className="post-error">There has been an Error</h3>
        }
        {!isFetching && !error && typeof(lists)!="object" &&
          <h3>Empty</h3>
        }
        {lists &&
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
          <div>
            {lists.map((list, i) =>
              <Link className="title" key={i} to={`/detail/${list.pk_id}`} >
                <blockquote key={i}>{list.title} <span>{list.source}</span></blockquote>
                <img src={"https://read.dianrong.com"+list.image_urls} alt=""/>
              </Link>
            )}
          </div>
          </div>
        }
      </div>
    );
  }
}

Fio.propTypes = {
  lists: PropTypes.array.isRequired,
  error: PropTypes.object,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number
};

export default Fio;