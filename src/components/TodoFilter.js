import React, { Component } from 'react';
import styles from './TodoFilter.module.css';

class TodoFilter extends Component {
  constructor(props) {
    super(props);
    this.buttons = [
      { name: 'All' },
      { name: 'Active' },
      { name: 'Complited' },
      { name: 'Archive' },
    ];
  }
  render() {
    const { filter, onFilter } = this.props;

    return (
      <div>
        {this.buttons.map(({ name }) => (
          <button
            className={`${styles.btnFilter} ${
              filter === name ? styles.activeBtnFilter : ''
            }`}
            key={name}
            onClick={() => onFilter(name)}>
            {name}
          </button>
        ))}
      </div>
    );
  }
}

export default TodoFilter;
