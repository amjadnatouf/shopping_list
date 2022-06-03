import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const List = ({ items, removeItem, editItem, iscompleted }) => {
  const handelCom = (id) => {
    iscompleted(id);
  };
  return (
    <div className="grocery-list">
      {items.map((item) => {
        const { id, title } = item;
        return (
          <article className="list-item" key={id}>
            <p
              className={`title ${item.completed && "completed"}`}
              onClick={(e) => handelCom(item.id)}
            >
              {title}
            </p>
            <div className="btn-container">
              <button
                className="btn-edit"
                onClick={() => {
                  editItem(id);
                }}
              >
                <FaEdit />
              </button>
              <button
                type="button"
                className="btn-delete"
                onClick={() => {
                  removeItem(id);
                }}
              >
                <FaTrash />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default List;
