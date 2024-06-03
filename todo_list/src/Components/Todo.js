import React from "react";
import "./Todo.css";
import { useState, useRef, useEffect } from "react";
import { IoMdDoneAll } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";

export default function Todo() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditID] = useState(0);
  const inputRef = useRef("null");
  useEffect(() => {
    inputRef.current.focus();
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const addTodo = () => {
    if (todo !== "") {
      setTodos([...todos, { list: todo, id: Date.now(), status: false }]);
      setTodo("");
    }else{
      
    }
    if (editId) {
      const editTodo = todos.find((todo) => todo.id === editId);
      const updateTodo = todos.map((to) =>
        to.id === editTodo.id
          ? (to = { id: to.id, list: todo })
          : (to = { id: to.id, list: to.list })
      );
      setTodos(updateTodo);
      setEditID(0);
      setTodo("");
    }
  };
  const onDelete = (id) => {
    setTodos(todos.filter((data) => data.id !== id));
  };
  const onComplete = (id) => {
    let complete = todos.map((list) => {
      if (list.id === id) {
        return { ...list, status: !list.status };
      }
      return list;
    });
    setTodos(complete);
  };
  const onEdit = (id) => {
    const editTodo = todos.find((data) => data.id === id);
    setTodo(editTodo.list);
    setEditID(editTodo.id);
  };
  return (
    <div className="container">
      <h2>TODO APP</h2>
      <form className="form-group" onSubmit={handleSubmit}>
        <input
          type="text"
          value={todo}
          ref={inputRef}
          placeholder="Ender your todo.. "
          className="form-control"
          onChange={(event) => setTodo(event.target.value)}
        />
        <button onClick={addTodo}>{editId ? "EDIT" : "ADD"}</button>
      </form>
      <div className="list">
        <ul>
          {todos.map((data) => (
            <li className="list-items">
              <div
                className="list-items-list"
                id={data.status ? "list-item" : ""}
              >
                {data.list}
              </div>
              <span className="icons">
                <IoMdDoneAll
                  className="list-item-icon"
                  id="complete"
                  title="Complete"
                  onClick={() => onComplete(data.id)}
                />
                <FiEdit
                  className="list-item-icon"
                  id="edit"
                  title="Edit"
                  onClick={() => onEdit(data.id)}
                />
                <MdDelete
                  className="list-item-icon"
                  id="delete"
                  title="Delete"
                  onClick={() => onDelete(data.id)}
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
