import React, { useState } from "react";
import List from "./List";
import "./App.css";
import Modal from "./modal/Modal";

const App = () => {
  const [list, setList] = useState([]);
  const [name, setName] = useState("");
  const [edit, setEdit] = useState("");
  const [show, setShow] = useState(false);
  const [id, setId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      console.log("pleas enter a value");
    } else {
      const newItem = {
        id: new Date().getTime().toString(),
        title: name,
      };
      setList([...list, newItem]);
      setName("");
    }
  };

  const removeItem = (id) => {
    setList(list.filter((item) => item.id !== id));
  };

  const editItem = (id) => {
    setId(id);
    showModal();
  };

  const updateItem = () => {
    if (edit !== "") {
      setList(
        list.map((item) => (item.id === id ? { ...item, title: edit } : item))
      );
    }
    setShow(false);
  };

  const clearList = () => {
    setList([]);
  };

  const showModal = function () {
    setShow(!show);
  };

  return (
    <div>
      <Modal
        show={show}
        edit={edit}
        setEdit={setEdit}
        updateItem={updateItem}
        showModal={showModal}
      />
      <section className="section-center">
        <form className="regform">
          <h3> shopping list </h3>
          <div className="form-control">
            <input
              type="text"
              className="input-control"
              placeholder="e.g. eggs"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <button className="btn-add" onClick={handleSubmit}>
              submit
            </button>
          </div>
        </form>

        <div className="items-container">
          <List
            items={list}
            removeItem={removeItem}
            editItem={editItem}
            showModal={showModal}
          />
          <button className="btn-danger" onClick={clearList}>
            Clear Items
          </button>
        </div>
      </section>
    </div>
  );
};

export default App;
