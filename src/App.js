import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import TodosSearch from './components/TodosSearch';
import TodoFilter from './components/TodoFilter';
import MyModal from './components/UI/MyModal/MyModal';
import MyButton from './components/UI/buttons/MyButton';
import { ThemeContext, themes } from './components/UI/context/themeContext';
import ThemedButton from './components/UI/context/ThemeButton';

function Toolbar(props) {
  return <ThemedButton onClick={props.changeTheme}>Change Theme</ThemedButton>;
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      term: '',
      filter: 'All',
      modal: false,
      theme: themes.light,
    };

    this.toggleTheme = () => {
      this.setState(
        (state) => ({
          theme: state.theme === themes.dark ? themes.light : themes.dark,
        }),
        () => {
          document.body.classList.toggle('lightTheme');
          document.body.classList.toggle('darkTheme');
        }
      );
    };
    this.deleteTodo = this.deleteTodo.bind(this);
    this.onIsComplited = this.onIsComplited.bind(this);
    this.onIsArchive = this.onIsArchive.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.valueEdit = this.valueEdit.bind(this);
    this.onUpdateSearch = this.onUpdateSearch.bind(this);
    this.onFilter = this.onFilter.bind(this);
    this.onVisibleModal = this.onVisibleModal.bind(this);
  }

  deleteTodo(id) {
    this.setState({
      todos: this.state.todos.filter((todo) => todo.id !== id),
    });
  }

  onIsComplited(id) {
    this.setState({
      todos: this.state.todos.map((todo) =>
        todo.id === id
          ? { ...todo, isComplited: !todo.isComplited }
          : { ...todo }
      ),
    });
  }

  onIsArchive(id) {
    this.setState({
      todos: this.state.todos.map((todo) =>
        todo.id === id ? { ...todo, isArchive: !todo.isArchive } : { ...todo }
      ),
    });
  }

  onEdit(id) {
    this.setState({
      todos: this.state.todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : { ...todo }
      ),
    });
  }
  componentDidMount() {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      this.setState({ todos: JSON.parse(storedTodos) });
    }
  }

  componentDidUpdate() {
    localStorage.setItem('todos', JSON.stringify(this.state.todos));
  }

  addTodo(title, description) {
    const newTodo = {
      id: uuidv4(),
      title,
      description,
      isComplited: false,
      isEditing: false,
      isArchive: false,
    };

    this.setState({
      todos: [...this.state.todos, newTodo],
      modal: !this.state.modal,
    });
  }

  valueEdit(id, editTitle, editDescription) {
    this.setState({
      todos: this.state.todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              title: editTitle,
              description: editDescription,
              isEditing: !todo.isEditing,
            }
          : { ...todo }
      ),
    });
  }

  searchTodo(todos, term) {
    return !term
      ? todos
      : todos.filter((todo) =>
          todo.title.toLowerCase().includes(term.toLowerCase())
        );
  }

  onUpdateSearch(term) {
    this.setState({ term });
  }

  filterTodo(todos, filter) {
    if (filter === 'All') {
      return todos;
    } else if (filter === 'Complited') {
      return todos.filter((todo) => todo.isComplited);
    } else if (filter === 'Archive') {
      return todos.filter((todo) => todo.isArchive);
    } else if (filter === 'Active') {
      return todos.filter((todo) => !todo.isComplited && !todo.isArchive);
    }
  }

  onFilter(filter) {
    this.setState({ filter });
  }

  onVisibleModal() {
    this.setState({ modal: !this.state.modal });
  }

  render() {
    const { todos, term, filter, modal } = this.state;
    const visibaleTodos = this.filterTodo(this.searchTodo(todos, term), filter);

    return (
      <ThemeContext.Provider value={this.state.theme}>
        <Toolbar changeTheme={this.toggleTheme} />
        <div className='App'>
          <h1>To-do list</h1>
          <MyModal visible={modal} onVisibleModal={this.onVisibleModal}>
            <TodoForm onAdd={this.addTodo} />
          </MyModal>
          {!!todos.length && (
            <>
              <TodosSearch onUpdateSearch={this.onUpdateSearch} />
              <TodoFilter filter={filter} onFilter={this.onFilter} />
            </>
          )}
          <TodoList
            todos={visibaleTodos}
            onIsComplited={this.onIsComplited}
            onIsArchive={this.onIsArchive}
            onDelete={this.deleteTodo}
            onEdit={this.onEdit}
            onEditTodo={this.valueEdit}
          />
          <MyButton className='btn' onClick={() => this.onVisibleModal()}>
            + New todo
          </MyButton>
        </div>
      </ThemeContext.Provider>
    );
  }
}

export default App;
