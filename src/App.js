import React, { useEffect, useState } from "react";
import List from "./List";
import "./App.css";
import Modal from "./modal/Modal";
import { FaSort } from "react-icons/fa";

const App = () => {
  const getLocalStorage = () => {
    let list = localStorage.getItem("list");

    if (list) {
      return JSON.parse(localStorage.getItem("list"));
    } else {
      return [];
    }
  };

  const [list, setList] = useState(getLocalStorage());
  const [name, setName] = useState("");
  const [edit, setEdit] = useState("");
  const [show, setShow] = useState(false);
  const [id, setId] = useState(null);
  const [isfilter, setIsfilter] = useState("");

  const iscompleted = function (id) {
    setList(
      list.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      console.log("pleas enter a value");
    } else {
      const newItem = {
        id: new Date().getTime().toString(),
        title: name,
        completed: false,
      };
      setList([...list, newItem]);
      // localStorage.setItem(id, name);
      setName("");
    }
  };

  const removeItem = (id) => {
    setList(list.filter((item) => item.id !== id));
  };

  const filter = (e) => {
    if (e.target.value === "1") setIsfilter("1");
    else if (e.target.value === "2") setIsfilter("2");
    else setIsfilter("");
  };

  const sort = () => {
    setList((state) => {
      // state.sort((a, b) => a.title.localeCompare(b.title)).reverse(); //alfabet sort
      state.sort((a, b) => a.completed - b.completed); //status sort
      return [...state];
    });
  };

  const editItem = (id) => {
    setEdit(list.find((g) => g.id === id).title);
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

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

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
              placeholder="e.g. items"
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

        <div className="filter">
          <p>List Items: </p>
          <div>
            <button className="btn-sort" onClick={sort}>
              <FaSort />
            </button>

            <select name="select" onChange={filter}>
              <option value="">all</option>
              <option value="1">completed</option>
              <option value="2">not completed</option>
            </select>
          </div>
        </div>

        <div className="items-container">
          {isfilter === "1" ? (
            <List
              items={list.filter((e) => e.completed === true)}
              // items={!filter ? list : filterd}
              removeItem={removeItem}
              editItem={editItem}
              showModal={showModal}
              // setIscompleted={setIscompleted}
              iscompleted={iscompleted}
            />
          ) : isfilter === "2" ? (
            <List
              items={list.filter((e) => e.completed === false)}
              // items={!filter ? list : filterd}
              removeItem={removeItem}
              editItem={editItem}
              showModal={showModal}
              // setIscompleted={setIscompleted}
              iscompleted={iscompleted}
            />
          ) : (
            <List
              items={list}
              // items={!filter ? list : filterd}
              removeItem={removeItem}
              editItem={editItem}
              showModal={showModal}
              // setIscompleted={setIscompleted}
              iscompleted={iscompleted}
            />
          )}
          <button className="btn-danger" onClick={clearList}>
            Clear Items
          </button>
        </div>
      </section>
    </div>
  );
};

export default App;
