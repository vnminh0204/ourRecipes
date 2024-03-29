import React from "react";
import {useState} from "react";
import {IoIosAddCircle} from "react-icons/io";
import {RiCloseCircleFill} from "react-icons/ri";
import {FaCheck} from "react-icons/fa";
import "./search.scss";

const MealsSearchList = ({data, addItem}) => {
    const [selectedFilterOption, setSelectedFilterOption] = useState("Breakfast");
    const [inputValue, setInputValue] = useState(1);
    const [selectedItem, setSelectedItem] = useState();
    const editItem = (item) => {
        item.quantity = 1;
        setSelectedItem(item.id);
        setSelectedFilterOption("Breakfast");
        setInputValue(1);
        // addItem(item, "Breakfast");
    };

    const confirmItem = (item) => {
        item.quantity = inputValue;
        setSelectedItem();
        addItem(item, selectedFilterOption);
    };

    const options = ["Breakfast", "Lunch", "Dinner", "Snack"];
    const onOptionChangeHandler = (event) => {
        setSelectedFilterOption(event.target.value);
    };

    const onInputChangeHandler = ({currentTarget: input}) => {
        setInputValue(parseInt(input.value));
    };

    return (
        <div
            className="meal-list"
        >
            {data.map((item) => {
                const {id, title} = item;
                return (
                    <article
                        className={
                            "ingredient-item " +
                            (selectedItem === item.id && "border-highlight")
                        }
                        key={id}
                    >
                        <p className="title">{title}</p>
                        <div className="btn-container">
                            {selectedItem === item.id ? (
                                <div className="edit-block">
                                    <input
                                        type="number"
                                        className="quantity-btn input-field"
                                        min="1"
                                        max="100"
                                        defaultValue="1"
                                        onChange={onInputChangeHandler}
                                    />
                                    <select
                                        className="quantity-btn"
                                        onChange={onOptionChangeHandler}
                                    >
                                        {options.map((option, index) => {
                                            return <option key={index}>{option}</option>;
                                        })}
                                    </select>
                                    <button
                                        type="button"
                                        className="add-btn"
                                        onClick={() => {
                                            setSelectedItem();
                                        }}
                                    >
                                        <RiCloseCircleFill size={20}/>
                                    </button>
                                    <button
                                        type="button"
                                        className="add-btn"
                                        onClick={() => confirmItem(item)}
                                    >
                                        <FaCheck size={20}/>
                                    </button>
                                </div>
                            ) : (
                                <button
                                    type="button"
                                    className="add-btn"
                                    onClick={() => editItem(item)}
                                >
                                    <IoIosAddCircle size={20}/>
                                </button>
                            )}
                        </div>
                    </article>
                );
            })}
        </div>
    );
};

export default MealsSearchList;
