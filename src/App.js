import React from 'react';
import './App.css';
import firebase from 'firebase';
import Rebase from 're-base'
import {DB_CONFIG} from './config'

class App extends React.Component {

  constructor() {
    super();

    this.app = firebase.initializeApp(DB_CONFIG)
    this.base = Rebase.createClass(this.app.database());
    this.database = this.app.database().ref().child('names');
    this.state = {
      inputval: "",
      names:"fff"
    }
  }

  componentDidMount() {
    this.namesRef = this.base.syncState('names',{
      context:this,
      state: 'names'
    })
  }

  componentWillUnmount() {
    this.base.removeBinding(this.namesRef)
  }

  handleSubmit = () =>  {
    this.base.post( 'name' , {data: {name: this.state.inputval}} )
    this.setState({
      inputval:""
    })
  }

  onChangeHundle = (event) => {
    this.setState({
      inputval:event.target.value
    })
  }

  render () {
    return (
      <div className="App">
        <header className="App-header">
          <label>
            Insert name:
            <input onChange = {this.onChangeHundle} value = {this.state.inputval} type="text" name="name" />
          </label>
          <input onClick ={this.handleSubmit} type="submit" value="Submit" />
          {/* <div className={"names"}> {this.state.names}</div> */}
        </header>
      </div>
    );
  }

}

export default App;
