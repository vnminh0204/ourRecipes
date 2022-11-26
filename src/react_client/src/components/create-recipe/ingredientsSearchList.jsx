import React from "react";
import { IoIosAddCircle } from "react-icons/io";
const IngredientsSearchList = ({ data, addItem }) => {
  return (
    <div className="ingredient-list">
      {data.map((item) => {
        // console.log(item);
        const { id, name } = item;
        return (
          <article className="ingredient-item" key={id}>
            <p className="title">{name}</p>
            <div className="btn-container">
              <button
                type="button"
                className="add-btn"
                onClick={() => addItem(item)}
              >
                <IoIosAddCircle size={20} />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default IngredientsSearchList;
