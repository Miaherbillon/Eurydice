import React, { createContext, useContext, useReducer } from "react";
import INITIAL_STATE from "./init.jsx";

export const TodoContext = createContext();

const todoReducer = (state, action) => {
  switch (action.type) {
    case "selectTab":
      return {
        ...state,
        selectedTab: action.payload,
      };
    case "setlistTab":
      return {
        ...state,
        listTab: action.payload,
      };
    case "setListColonnes":
      return {
        ...state,
        listColonnes: action.payload,
      };
    case "setListNote":
      return {
        ...state,
        listNotes: action.payload,
      };
    default:
      return state;
  }
};

const TodoProvider = ({ children }) => {
  const [context, dispatch] = useReducer(todoReducer, INITIAL_STATE);

  return (
    <TodoContext.Provider value={[context, dispatch]}>
      {children}
    </TodoContext.Provider>
  );
};

const useTodoProvider = () => useContext(TodoContext);

export { TodoProvider, useTodoProvider };
