import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';

class Feature extends Component {
  componentWillMount(){
    this.props.fetchMessge();
  }

  render(){
    return (
      <div>Authenticated User</div>
    );
  }
}

export default connect(null, actions)(Feature);
