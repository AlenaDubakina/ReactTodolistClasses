import React, { Component } from 'react';
import styles from './TodosSearch.module.css';

class TodosSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
    };
    this.searchTimer = null;
    this.onUpdateSearch = this.onUpdateSearch.bind(this);
  }

  onUpdateSearch(e) {
    const term = e.target.value;
    this.setState({ term });
    clearTimeout(this.searchTimer);
    this.searchTimer = setTimeout(() => {
      this.props.onUpdateSearch(term);
    }, 500);
  }

  render() {
    return (
      <input
        className={styles.inputSearch}
        type='text'
        value={this.state.term}
        onChange={this.onUpdateSearch}
        placeholder='Search todo...'
      />
    );
  }
}
export default TodosSearch;
