import React from "react";
import { Link } from "react-router-dom";
import "./Card.scss";
import {FiMenu} from "react-icons/fi";

const recipesCard = ({
  id,
  title,
  author,
  date,
  mealType,
  nutriScore,
  imgUrl,
}) => {
  return (
    <Link to={`/recipes/${id}`}>
      <div className="card">
        <div className="details">
          <div className="img">
            <img src={imgUrl} />
          </div>
          <div className="details-left">
            <small className="mealType">{mealType}</small>
            <h3 className="mealTitle">{title}</h3>
          </div>
          <div className="details-right">
            <div className="top-right-block">
              <div className="score">{Math.round(nutriScore)}/100</div>
              <div><FiMenu></FiMenu></div>
            </div>

            <span className="authorLine">
              Posted {date}
              {author && <span className="author"> by {author}</span>}
            </span>
          </div>
          <hr />
        </div>
      </div>
    </Link>
  );
};

export default recipesCard;
