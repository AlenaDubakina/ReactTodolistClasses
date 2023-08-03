import React from 'react';
import Todo from './Todo';

const TodoList = ({
  todos,
  onDelete,
  onIsComplited,
  onEdit,
  onEditTodo,
  onIsArchive,
}) => {
  return (
    <div>
      {todos.map((todo) => (
        <Todo
          key={todo.id}
          todo={todo}
          onDelete={() => onDelete(todo.id)}
          onIsComplited={() => onIsComplited(todo.id)}
          onIsArchive={() => onIsArchive(todo.id)}
          onEdit={() => onEdit(todo.id)}
          onEditTodo={onEditTodo}
        />
      ))}
    </div>
  );
};

export default TodoList;
