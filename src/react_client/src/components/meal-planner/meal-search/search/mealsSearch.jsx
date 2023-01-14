import React, { useState } from "react";
import MealsSearchList from "./mealsSearchList";
import "./search.css";
import config from "../../../../config.json";

const MealsSearch = ({ addItem, toast }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [list, setList] = useState([]);
  const [selectedFilterOption, setSelectedFilterOption] = useState("All Type");

  const handleExpectedError = (response) => {
    if (!response.ok) {
      throw new Error("Server error: Error code " + response.status + "!");
    }
    return response;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setList([]);
    const apiEndpoint = config.apiEndpoint + "/recipes";
    await fetch(apiEndpoint)
      .then((response) => {
        handleExpectedError(response);
        return response.json();
      })
      .then((data) => {
        if (data.length === 0) {
          toast.error("No matched meals found");
        } else {
          toast.success("Here is top matched meals");
        }

        var recipes = new Array(data.Count);
        var i = 0;
        for (const item of data.Items) {
          const recipe = {
            ...item.data,
            dateObject: new Date(item.date),
            date: new Date(item.date).toLocaleDateString("en-GB"),
            id: item.id,
            nutriScore: item.nutriScore,
            author: item.author,
          };
          recipes[i] = recipe;
          i++;
        }

        var filteredrecipes =
          selectedFilterOption &&
          selectedFilterOption &&
          selectedFilterOption !== "All Type"
            ? recipes.filter((r) => r.mealType === selectedFilterOption)
            : recipes;

        if (searchQuery) {
          filteredrecipes = filteredrecipes.filter((r) =>
            r.title.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }
        setList(filteredrecipes);
        setSearchQuery("");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const options = ["All Type", "Breakfast", "Lunch", "Dinner", "Snack"];
  const onOptionChangeHandler = (event) => {
    setSelectedFilterOption(event.target.value);
  };

  return (
    <section className="section-meal-search">
      <form className="ingredient-search-form" onSubmit={handleSubmit}>
        <h3 className="fs-3 search-title">Meals Search</h3>
        <div className="ingredient-search-form-control">
          <input
            type="text"
            className="ingredient w-50"
            placeholder="e.g. overnight oats"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select className="select-btn" onChange={onOptionChangeHandler}>
            {options.map((option, index) => {
              return <option key={index}>{option}</option>;
            })}
          </select>
          <button type="submit" className="submit-btn format-right-btn">
            Search
          </button>
        </div>
      </form>
      <div className="ingredient-container">
        <MealsSearchList data={list} addItem={addItem} />
      </div>
    </section>
  );
};

export default MealsSearch;
