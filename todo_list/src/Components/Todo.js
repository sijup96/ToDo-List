import React, { useState, useRef, useEffect } from "react";
import "./Todo.css";
import { IoMdDoneAll } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import Swal from "sweetalert2";

export default function Todo() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditID] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  useEffect(() => {
    try {
      const todoList = JSON.parse(localStorage.getItem("localTodos")) || [];
      setTodos(todoList);
    } catch (e) {
      console.error("Error reading local storage", e);
      setTodos([]);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const saveToLocalStorage = (todos) => {
    try {
      localStorage.setItem("localTodos", JSON.stringify(todos));
    } catch (e) {
      console.error("Error saving to local storage", e);
    }
  };

  const addTodo = () => {
    if (todo !== "") {
      if (editId) {
        const editTodo = todos.find((todo) => todo.id === editId);
        const updateTodo = todos.map((to) =>
          to.id === editTodo.id ? { ...to, list: todo } : to
        );
        setTodos(updateTodo);
        saveToLocalStorage(updateTodo);
        setEditID(0);
      } else {
        const newTodos = [...todos, { list: todo, id: Date.now(), status: false }];
        setTodos(newTodos);
        saveToLocalStorage(newTodos);
      }
      setTodo("");
    }
  };

  const onDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedTodos = todos.filter((data) => data.id !== id);
        setTodos(updatedTodos);
        saveToLocalStorage(updatedTodos);
        Swal.fire(
          'Deleted!',
          'Your todo has been deleted.',
          'success'
        );
      }
    });
  };

  const onComplete = (id) => {
    const updatedTodos = todos.map((list) => {
      if (list.id === id) {
        return { ...list, status: !list.status };
      }
      return list;
    });
    setTodos(updatedTodos);
    saveToLocalStorage(updatedTodos);
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
          placeholder="Enter your todo.."
          className="form-control"
          onChange={(event) => setTodo(event.target.value)}
        />
        <button type="button" onClick={addTodo}>
          {editId ? "EDIT" : "ADD"}
        </button>
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
