import React, { Component } from 'react';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    };
  }  

  componentDidMount () {
    console.log("did mount")
    console.log("did mount123123123123")

    setInterval( () => {
      this.increment()
    },1000)
  }

  // Methoden werden mittels proxys ausgetauscht
  increment () {
    // console.log(this.state)
    //   console.log("Do something", this.state)
    //   this.setState({
    //     value: this.state.value+10
    //   })
    this.setState({
      value: this.state.value+2
      // value: 0
    })
  }

  render() {
    return (
      <div>
        <h1>Hello, world. {this.state.value}</h1>
      </div>
    );
  }
}


// Reapplying redux actions (auf gerade bestehenden state?)

// Im use case actions zurücknehmen etc.. ?