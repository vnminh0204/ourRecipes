import React from "react";
import { IoIosAddCircle } from "react-icons/io";
import "./search.css";

const MealsSearchList = ({ data, addItem }) => {
  return (
    <div className="ingredient-list">
      {data.map((item) => {
        // console.log(item);
        const { id, title } = item;
        return (
          <article className="ingredient-item" key={id}>
            <p className="title">{title}</p>
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

export default MealsSearchList;
