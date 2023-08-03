import React, { Component } from 'react';
import { FaRegCheckSquare, FaTrashAlt, FaArchive } from 'react-icons/fa';
import { MdMode } from 'react-icons/md';
import styles from './Todo.module.css';
import MyModal from './UI/MyModal/MyModal';
import MyButton from './UI/buttons/MyButton';

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editTitle: this.props.todo.title,
      editDescription: this.props.todo.description,
      titleError: '',
    };
    this.onValueEditTitle = this.onValueEditTitle.bind(this);
    this.onValueEditDescription = this.onValueEditDescription.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onValueEditTitle = (event) => {
    this.setState({ editTitle: event.target.value });
    if (event.target.value.length < 2) {
      this.setState({ titleError: 'Title must be at least 2 characters' });
      if (!event.target.value) {
        this.setState({ titleError: 'Title must not be empty' });
      }
    } else {
      this.setState({ titleError: '' });
    }
  };

  onValueEditDescription = (event) => {
    this.setState({ editDescription: event.target.value });
  };

  onSubmit(event) {
    event.preventDefault();
    this.props.onEditTodo(
      this.props.todo.id,
      this.state.editTitle,
      this.state.editDescription
    );
  }
  render() {
    const { todo, onDelete, onIsComplited, onIsArchive, onEdit } = this.props;

    return (
      <>
        {todo.isEditing ? (
          <MyModal visible={todo.isEditing} onVisibleModal={onEdit}>
            <form onSubmit={this.onSubmit}>
              {this.state.titleError && (
                <div style={{ color: 'red' }}>{this.state.titleError}</div>
              )}
              <input
                className={styles.todoInputEdit}
                type='text'
                value={this.state.editTitle}
                onChange={this.onValueEditTitle}
              />
              <input
                className={styles.todoInputEdit}
                type='text'
                value={this.state.editDescription}
                onChange={this.onValueEditDescription}
              />
              <MyButton
                disabled={this.state.editTitle.length < 2}
                type='Submit'>
                Save
              </MyButton>
              <MyButton type='button' onClick={onEdit}>
                Cancel
              </MyButton>
            </form>
          </MyModal>
        ) : (
          <div
            className={`${styles.todo} ${
              todo.isComplited ? styles.todoIsComplited : ''
            } ${todo.isArchive ? styles.todoIsArchive : ''}`}>
            <FaRegCheckSquare
              className={`${
                todo.isComplited
                  ? styles.todoIconCheckPress
                  : styles.todoIconCheck
              }`}
              onClick={onIsComplited}
            />
            <div className={styles.todoText}>
              <strong>{todo.title}</strong>
              <p className={styles.todoTextTitle}>{todo.description}</p>
            </div>
            <MdMode className={styles.todoIconEdit} onClick={onEdit} />
            <FaTrashAlt className={styles.todoIconTrash} onClick={onDelete} />
            <FaArchive
              className={styles.todoIconArchive}
              onClick={onIsArchive}
            />
          </div>
        )}
      </>
    );
  }
}

export default Todo;
