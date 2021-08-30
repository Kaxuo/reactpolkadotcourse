import { useState, useReducer, createContext } from 'react';
import PropTypes from 'prop-types';

const ACTIONS = {
  ADD_TODO: 'add-todo',
  TOGGLE_TODO: 'toggle-todo',
  DELETE_TODO: 'delete-todo',
};

const reducer = (todos, action) => {
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      return [...todos, newTodo(action.payload.name)];
    case ACTIONS.TOGGLE_TODO:
      return todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, complete: !todo.complete };
        }
        return todo;
      });
    case ACTIONS.DELETE_TODO:
      return todos.filter((todo) => todo.id !== action.payload.id);
    default:
      return todos;
  }
};

const newTodo = (name) => {
  return { id: Date.now(), name: name, complete: false };
};

export const UserContext = createContext();

export const ContextProvider = ({ children }) => {
  const [todos, dispatch] = useReducer(reducer, [{ id: 1, name: 'Cook' }]);
  const [name, setname] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: ACTIONS.ADD_TODO, payload: { name: name } });
    setname('');
  };

  return (
    <UserContext.Provider
      value={{ todos, handleSubmit, name, setname, dispatch }}
    >
      {children}
    </UserContext.Provider>
  );
};

ContextProvider.propType = {
  children: PropTypes.node.isRequired,
};
