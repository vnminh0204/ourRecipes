import React, {useState} from "react";
import {Link} from "react-router-dom";
import "./RecipeCard.scss";
import IconMenu from "./recipe-menu/recipeMenu";

const RecipeCard = ({handleDelete, handleEdit, recipe :{
                         id ,
                         title,
                         author,
                         date,
                         mealType,
                         nutriScore,
                        imgEncoding,
                     }}) => {
    const [isHovering, setIsHovering] = useState(false);
    const handleMouseOver = () => {
        setIsHovering(true);
    };

    const handleMouseOut = () => {
        setIsHovering(false);
    };

    return (

            <div className="card">
                <div className="details">
                    <Link className="details-link" to={`/recipes/${id}/false`}>
                        <div className="img">
                            <img src={imgEncoding} alt=""/>
                        </div>
                        <div className="details-left">
                            <small className="mealType">{mealType}</small>
                            <h3 className="mealTitle">{title}</h3>
                        </div>
                    </Link>
                    <div className="right-box" onMouseOver={handleMouseOver}>
                        <div className="details-right" >
                            <div className="top-right-block">
                            <span className={`score ${Math.round(nutriScore) >= 70? "score-excellent" : ""}${Math.round(nutriScore) < 70 && Math.round(nutriScore) >= 50? "score-ok" : ""}${Math.round(nutriScore) < 50? "score-bad" : ""}`}>
                                <span className="main-score">{Math.round(nutriScore)}</span> <span className="sub-score">/100</span>
                            </span>

                            </div>

                            <span className="authorLine">
                          Posted {date} {author && <span className="author"> by {author}</span>}
                        </span>
                        </div>
                        <hr/>
                        <div
                            onMouseOut={handleMouseOut}
                            className="show-options">

                            {isHovering ?
                                <IconMenu handleDelete={handleDelete} handleEdit={handleEdit} recipe={{
                                    id ,
                                    title,
                                    author,
                                    date,
                                    mealType,
                                    nutriScore,
                                    imgEncoding,
                                }}></IconMenu>
                                : <div className="empty"> </div>}
                        </div>
                    </div>

                    </div>

            </div>

    );
};

export default RecipeCard;
