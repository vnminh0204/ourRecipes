import React from "react";
import {Link} from "react-router-dom";
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
                        <img src={imgUrl}/>
                    </div>
                    <div className="details-left">
                        <small className="mealType">{mealType}</small>
                        <h3 className="mealTitle">{title}</h3>
                    </div>
                    <div className="details-right">
                        <div className="top-right-block">
                            <span className={`score ${Math.round(nutriScore) >= 70? "score-excellent" : ""}${Math.round(nutriScore) < 70 && Math.round(nutriScore) >= 50? "score-ok" : ""}${Math.round(nutriScore) < 50? "score-bad" : ""}`}>
                                <span className="main-score">{Math.round(nutriScore)}</span> <span className="sub-score">/100</span>
                            </span>
                            {/*<div><FiMenu></FiMenu></div>*/}
                        </div>

                        <span className="authorLine">
              Posted {date}
                            {author && <span className="author"> by {author}</span>}
            </span>
                    </div>
                    <hr/>
                </div>
            </div>
        </Link>
    );
};

export default recipesCard;
