import React, { Component } from 'react';

class About extends Component {

  render() {
    return (
      	<div className="posts">
  
			    <h1 className="post-title">Why I coded this</h1>
    			<p>Redux and React are rapidly developing code bases. I was having difficultly finding a simple boiler plate example to base my Redux app on. I decided to create my own stripped down version.</p>

			<div className="message">
			  	<p>My name is <b>Fio</b>.</p> 
			  	<p>You can find me at my<br/> 
			  	<a href="https://github.com/fiowind">Github account (@fiowind)</a><br/> 
			  	<a href="https://twitter.com/fiowind1">Twitter account(@fiowind)</a></p>
			</div>
  		</div>
  
    );
  }
}

export default About;