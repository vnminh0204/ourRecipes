import React, { useState } from "react";
import IngredientsSearchList from "./ingredientsSearchList";
import "./search.css";
import config from "../../config.json";

const IngredientsSearch = ({ addItem, toast }) => {
  const [name, setName] = useState("");
  const [list, setList] = useState([]);

  const handleExpectedError = (response) => {
    if (!response.ok) {
      throw new Error("Server error: Error code " + response.status + "!");
    }
    return response;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      toast.error("Please enter value");
    } else {
      setList([]);
      const apiEndpoint =
        config.spoonacularAPIEndpoint +
        "/food/ingredients/autocomplete?apiKey=" +
        config.spoonacularAPIKey +
        "&query=" +
        name +
        "&number=30" +
        "&metaInformation=true";
      console.log(apiEndpoint);
      await fetch(apiEndpoint)
        .then((response) => {
          handleExpectedError(response);
          return response.json();
        })
        .then((data) => {
          // console.log(data);
          if (data.length === 0) {
            toast.error("No matched ingredients found");
          } else {
            toast.success("Here is top matched ingredients");
          }

          const list = data.map((item) => {
            const { name, id, possibleUnits } = item;
            return { name, id, possibleUnits };
          });
          setList(list);
          setName("");
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  };

  return (
    <section className="section-ingredient-search">
      <form className="ingredient-search-form" onSubmit={handleSubmit}>
        <h3 className="fs-3">Ingredients Search</h3>
        <div className="ingredient-search-form-control">
          <input
            type="text"
            className="ingredient w-50"
            placeholder="e.g. apple"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="submit-btn fs-6">
            Search
          </button>
        </div>
      </form>
      <div className="ingredient-container">
        <IngredientsSearchList data={list} addItem={addItem} />
      </div>
    </section>
  );
};

export default IngredientsSearch;
