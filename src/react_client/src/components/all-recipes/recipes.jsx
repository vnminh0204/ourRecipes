import React from "react";
import { useState, useEffect } from "react";
import config from "../../config.json";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import theme from "./theme.png";
import List from "./List";
import _ from "lodash";
import "./recipes.scss";

const Recipes = ({ toast }) => {
  const PAGE_SIZE = 4;
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("All Type");
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [pageNr, setPageNr] = useState(0);
  const [displayedRecipes, setDisplayedRecipes] = useState([]);
  const types = ["All Type", "Breakfast", "Lunch", "Dinner", "Snack"];
  const [sortbyFilter, setSortbyFilter] = useState("title-asc");
  //replace componentDidMount
  useEffect(() => {
    const getData = async () => {
      //get request
      const apiEndpoint = config.apiEndpoint + "/recipes";
      await fetch(apiEndpoint)
        .then((response) => {
          handleExpectedError(response);
          return response.json();
        })
        .then((data) => {
          //TODO change author
          const recipes = data.Items.map((item) => ({
            ...item.data,
            dateObject: new Date(item.date),
            date: new Date(item.date).toLocaleDateString("en-GB"),
            id: item.id,
            nutriScore: item.nutriScore,
            author: item.author,
            imgUrl:
              "https://iamafoodblog.b-cdn.net/wp-content/uploads/2017/11/spatchcock-turkey-3194w-2048x1366.webp",
          }));
          setRecipes(recipes);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    };
    getData();
  }, [toast]);

  useEffect(() => {
    console.log(recipes);
    setPageNr(0);
    var filteredrecipes =
      filterType && filterType && filterType !== "All Type"
        ? recipes.filter((r) => r.mealType === filterType)
        : recipes;

    if (searchQuery) {
      filteredrecipes = filteredrecipes.filter((r) =>
        r.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (sortbyFilter) {
      const sortOption = convertSortType(sortbyFilter);
      filteredrecipes = _.orderBy(
        filteredrecipes,
        [sortOption.path],
        [sortOption.order]
      );
    }

    setFilteredRecipes(filteredrecipes);
  }, [searchQuery, filterType, recipes, sortbyFilter]);

  useEffect(() => {
    const indStart = pageNr * PAGE_SIZE;
    const indEnd = Math.min(indStart + PAGE_SIZE, filteredRecipes.length);
    setDisplayedRecipes(filteredRecipes.slice(indStart, indEnd));
  }, [filteredRecipes, pageNr]);

  const handleExpectedError = (response) => {
    if (!response.ok) {
      throw new Error("Server error: Error code " + response.status + "!");
    }

    return response;
  };

  const handleDelete = async (recipe) => {
    const originnalRecipes = recipes;
    console.log("DELETE");
    const newRecipes = recipes.filter((r) => r.id !== recipe.id);
    console.log(newRecipes);
    setRecipes(newRecipes);
    const jwt = localStorage.getItem("token");
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ "x-access-token": jwt }),
    };

    await fetch(config.apiEndpoint + "/recipes/" + recipe.id, requestOptions)
      .then(async (response) => {
        handleExpectedError(response);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data.error === "false") {
          toast.success("Recipe is deleted");
        } else {
          toast.error("Recipe cannot be removed in database");
        }
      })
      .catch((error) => {
        toast.error(error.message);
        setRecipes(originnalRecipes);
      });
  };

  const options = [
    { value: "title-asc", displayText: "Title - A to Z" },
    { value: "title-desc", displayText: "Title - Z to A" },
    { value: "nutriScore-desc", displayText: "Score - highest to lowest" },
    { value: "nutriScore-asc", displayText: "Score - lowest to highest" },
    { value: "dateObject-desc", displayText: "Date - latest to oldest" },
    { value: "dateObject-asc", displayText: "Date - oldest to lastest" },
  ];

  const convertSortType = (option) => {
    var returnVal = { path: "title", order: "desc" };
    switch (option) {
      case "title-asc":
        returnVal = { path: "title", order: "asc" };
        break;
      case "title-desc":
        returnVal = { path: "title", order: "desc" };
        break;
      case "nutriScore-desc":
        returnVal = { path: "nutriScore", order: "desc" };
        break;
      case "nutriScore-asc":
        returnVal = { path: "nutriScore", order: "asc" };
        break;
      case "dateObject-desc":
        returnVal = { path: "dateObject", order: "desc" };
        break;
      case "dateObject-asc":
        returnVal = { path: "dateObject", order: "asc" };
        break;
      default:
        returnVal = { path: "title", order: "desc" };
    }
    return returnVal;
  };

  const onChangeSortByFilter = (value) => {
    console.log("here");
    console.log(value);
    setSortbyFilter(value);
  };

  return (
    <div className="recipes">
      <div className="left">
        <h1>Filter</h1>

        <div className="filterItem">
          <h2>Search</h2>
          <div className="search">
            <input
              className="searchInput"
              type="text"
              required
              placeholder="Calories"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="filterItem">
          <h2>Meal type</h2>
          <select onChange={(e) => setFilterType(e.target.value)}>
            {types.map((item, index) => (
              <option className="optionTab" key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="filterItem">
          <h2>Sort by</h2>
          <div>
            {options.map((opt) => {
              return (
                <div key={opt.value} className="inputItem">
                  <label>
                    <input
                      name={opt.value}
                      onChange={(e) => onChangeSortByFilter(e.target.value)}
                      value={opt.value}
                      checked={sortbyFilter.indexOf(opt.value) > -1}
                      type="radio"
                    />
                    {opt.displayText}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="right">
        <img className="coverImg" src={theme} alt="" />

        <div className="tbl">
          <h1 className="title">Recipes</h1>

          <List recipes={displayedRecipes} />

          <div className="pagination">
            <div
              className="page"
              onClick={() => setPageNr((prev) => Math.max(0, prev - 1))}
            >
              <ArrowBackIosIcon />
            </div>
            {[
              ...Array(Math.ceil(filteredRecipes.length / PAGE_SIZE)).keys(),
            ].map((num) => (
              <div
                key={num + 1}
                className="page"
                onClick={() => setPageNr(num)}
              >
                {num + 1}
              </div>
            ))}
            <div
              className="page"
              onClick={() =>
                setPageNr((prev) =>
                  Math.min(
                    Math.ceil(filteredRecipes.length / PAGE_SIZE) - 1,
                    prev + 1
                  )
                )
              }
            >
              <ArrowForwardIosIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recipes;
