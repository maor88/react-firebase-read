import React from 'react';
import './App.css';
import firebase from 'firebase';
import Rebase from 're-base'
import {DB_CONFIG} from './config'
import FadeIn from 'react-fade-in';


class App extends React.Component {

  constructor() {
    super();

    this.app = firebase.initializeApp(DB_CONFIG)
    this.base = Rebase.createClass(this.app.database());
    this.database = this.app.database().ref().child('names');
    this.names = []
    this.state = {
      name: ""
    }
  }

  componentDidMount() {
    this.namesRef = this.base.syncState('names',{
      context:this,
      state: 'name'
    })
  }

  componentWillUnmount() {
    this.base.removeBinding(this.namesRef)
  }

  showNames = () => {
    this.names.push(this.state.name);
    // let names = [...this.names]
    // names.push(this.state.name)
    console.log(this.names.length)
    const names =  this.names.map((name,index) => 
      // <div className = "names"> {name}</div>

      <FadeIn key={index} delay = {250}>
        <div className = "names"> {name}</div>
      </FadeIn>
      )
    return (
      names
    );
  }

  render () {
    return (
      <div className="App">
        <header className="App-header">
          <label>
            Names:
          </label>
          {this.showNames()}
        </header>
      </div>
    );
  }

}

export default App;
