import React, { Component } from 'react';
import styles from './TodoForm.module.css';
import MyButton from './UI/buttons/MyButton';

class TodoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      titleError: '',
    };
    this.onValueChange = this.onValueChangeTitle.bind(this);
    this.onValueChangeDescription = this.onValueChangeDescription.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onValueChangeTitle = (event) => {
    this.setState({ title: event.target.value });
    if (event.target.value.length < 2) {
      this.setState({ titleError: 'Title must be at least 2 characters' });
      if (!event.target.value) {
        this.setState({ titleError: 'Title must not be empty' });
      }
    } else {
      this.setState({ titleError: '' });
    }
  };

  onValueChangeDescription = (event) => {
    this.setState({ description: event.target.value });
  };

  onSubmit(event) {
    event.preventDefault();
    this.props.onAdd(this.state.title, this.state.description);
    this.setState({ title: '', description: '' });
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        {this.state.titleError && (
          <div style={{ color: 'red' }}>{this.state.titleError}</div>
        )}
        <input
          className={styles.todoFormInput}
          type='text'
          value={this.state.title}
          onChange={this.onValueChangeTitle}
          placeholder='Title...'
        />
        <input
          className={styles.todoFormInput}
          type='text'
          value={this.state.description}
          onChange={this.onValueChangeDescription}
          placeholder='Description...'
        />
        <MyButton disabled={this.state.title.length < 2} type='Submit'>
          Add todo
        </MyButton>
      </form>
    );
  }
}

export default TodoForm;
