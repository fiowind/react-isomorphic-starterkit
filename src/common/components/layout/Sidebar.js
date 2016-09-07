import React, { Component } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';

class Sidebar extends Component {

  constructor(props){
		super(props);
  }

  render() {

  	const {version,user} = this.props;

    return (

    	<div className="sidebar">

		  <div className="sidebar-item">
		    <p>This is an example of a isomorphic website built with Redux and React</p>
		    <p>Logged in as <b className="user-name">{user.name}</b></p>
		  </div>

		  <nav className="sidebar-nav">
		    <Link to="/home" className="sidebar-nav-item" activeClassName="active">Home <span className="nav-note">[static]</span></Link>
		    <Link to="/about" className="sidebar-nav-item" activeClassName="active">About <span className="nav-note">[static]</span></Link>
		    <Link to="/fio" className="sidebar-nav-item" activeClassName="active">Fio <span className="nav-note">[static]</span></Link>
		    
		    <span className="sidebar-nav-item"><span className="nav-note version">{`Currently version ${version}`}</span></span>
		  </nav>

		  <div className="sidebar-item sidebar-footer">
		    <p>
				Visit <a href="https://github.com/fiowind/react-isomorphic-startkit">GitHub Repo</a><br/>
				Based on <a href="http://lanyon.getpoole.com/">Lanyon Theme</a> <br/>
				Inspired  <a href="https://github.com/caljrimmer/isomorphic-redux-app">Callum Rimmer</a>
		    </p>
		  </div>

		</div>
    );
  }
}

export default Sidebar;