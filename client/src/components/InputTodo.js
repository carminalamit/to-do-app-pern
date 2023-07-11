import React, { useState } from 'react';

const InputTodo = () => {

  const [description, setDescription] = useState('');

  const onSubmitForm = async e => {
    e.preventDefault()
    try {
       const body = { description }
       const response = await fetch('http://localhost:3000/todo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(body)
       })

       window.location = '/'
    } catch (error) {
        console.log(error.message)
    }
  }

  return (
    <>
      <h1 className="text-center mt-5">To Do List</h1>
      <form className="d-flex mt-5" onSubmit={onSubmitForm}>
        <input
          type="text"
          className="form-control mr-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></input>
        <button className="btn btn-success">Add</button>
      </form>
    </>
  );
};

export default InputTodo;
