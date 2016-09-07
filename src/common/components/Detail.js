import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class Detail extends Component {
  constructor(props) {
    super(props);
    // this.handleRefreshClick = this.handleRefreshClick.bind(this);
  }

  componentDidMount() {
    document.getElementsByTagName('body')[0].scrollTop = 0;
    this.props.fetchDetailIfNeeded(this.props.id);
  }

  componentWillReceiveProps(nextProps) {
  }


  render () {
    const { detaildata, isFetching, lastUpdated, error } = this.props;
    console.log("detaildatadetaildatadetaildatadetaildata"+isFetching);
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
        {detaildata &&
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <h2>{detaildata.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: detaildata.contexts }}></div>
          </div>
        }
      </div>
    );
  }
}

Detail.propTypes = {
  detaildata: PropTypes.object.isRequired,
  error: PropTypes.object,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number
};

export default Detail;