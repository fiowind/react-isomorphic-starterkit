import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class ShopDetail extends Component {
  constructor(props) {
    super(props);
    // this.handleRefreshClick = this.handleRefreshClick.bind(this);
  }

  componentDidMount() {
    document.getElementsByTagName('body')[0].scrollTop = 0;
    this.props.fetchShopDetailIfNeeded(this.props.pid);
  }

  componentWillReceiveProps(nextProps) {
  }


  render () {
    const { detaildata, isFetching, lastUpdated, error } = this.props;
    // console.log("detaildatadetaildatadetaildatadetaildata",this.props);
    return (
      <div>
        {isFetching  &&
          <h3>Loading...</h3>
        }
        {!isFetching && error && typeof(detaildata)!="object" &&
          <h3 className="post-error">There has been an Error{error}</h3>
        }
        {!isFetching && !error  && typeof(detaildata)!="object" &&
          <h3>Empty</h3>
        }
        {detaildata && !isFetching &&
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <h2>{detaildata.name}</h2>
            <div dangerouslySetInnerHTML={{ __html: detaildata.short_description }}></div>
          </div>
        }
      </div>
    );
  }
}

ShopDetail.propTypes = {
  detaildata: PropTypes.object.isRequired,
  error: PropTypes.object,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number
};

export default ShopDetail;