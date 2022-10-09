import React from "react";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import RecipesTable from "./recipesTable";
import { Link } from "react-router-dom";
import { paginate } from "../utils/paginate";
import SearchBox from "./common/searchBox";
import _ from "lodash";
import { useState, useEffect } from "react";
import config from "../config.json";

const Recipes = ({ toast }) => {
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(4);
  const [sortColumn, setSortColumn] = useState({ path: "title", order: "asc" });
  const [selectedFilterOption, setSelectedFilterOption] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const filterOptions = [
    { name: "All Type" },
    { name: "Breakfast" },
    { name: "Lunch" },
    { name: "Dinner" },
    { name: "Snack" },
  ];

  const handleExpectedError = (response) => {
    if (!response.ok) {
      throw new Error("Server error: Error code " + response.status + "!");
    }

    return response;
  };

  //replace componentDidMount
  useEffect(() => {
    const getAllRecipes = async () => {
      //get request
      const apiEndpoint = config.apiEndpoint + "/recipes";
      await fetch(apiEndpoint)
        .then((response) => {
          handleExpectedError(response);
          return response.json();
        })
        .then((data) => {
          var recipes = new Array(data.Count);
          var i = 0;
          for (const item of data.Items) {
            //TODO change author
            const recipe = {
              ...item.data,
              date: item.date,
              id: item.id,
              nutriScore: item.nutriScore,
              author: "Minh",
            };
            // console.log(recipe);
            recipes[i] = recipe;
            i++;
          }
          setRecipes(recipes);
        })
        .catch((error) => {
          toast.error(error.message);
          return;
        });
    };
    getAllRecipes();
  }, [toast]);

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

  const handleLike = (recipe) => {
    console.log("Clicked");
    if (recipes) {
      const clonerecipes = [...recipes];
      const index = clonerecipes.indexOf(recipe);
      clonerecipes[index] = { ...clonerecipes[index] };
      clonerecipes[index].liked = !clonerecipes[index].liked;
      setRecipes(clonerecipes);
    }
  };

  const handleFilterOptionSelect = (option) => {
    setSelectedFilterOption(option);
    setCurrentPage(1);
  };

  const handleSearch = (searchQuery) => {
    setSearchQuery(searchQuery);
    setCurrentPage(1);
  };

  const getPagedData = () => {
    //filter

    if (recipes) {
      // TODO
      var filteredrecipes =
        selectedFilterOption &&
        selectedFilterOption.name &&
        selectedFilterOption.name !== "All Type"
          ? recipes.filter((r) => r.mealType === selectedFilterOption.name)
          : recipes;

      if (searchQuery) {
        filteredrecipes = filteredrecipes.filter((r) =>
          r.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      //order we can change [] to have more criterias to sort
      const sortedrecipes = _.orderBy(
        filteredrecipes,
        [sortColumn.path],
        [sortColumn.order]
      );

      //paginate
      const pageRecipes = paginate(sortedrecipes, currentPage, pageSize);
      return { totalCount: filteredrecipes.length, data: pageRecipes };
    }
  };

  if (!recipes || recipes.length === 0)
    return (
      <React.Fragment>
        <p>There are no recipes in the database!</p>
        <span className="float-right">
          <Link to="/recipes/new" className="btn btn-primary">
            New recipe
          </Link>
        </span>
      </React.Fragment>
    );
  const { totalCount, data: pageRecipes } = getPagedData();

  return (
    <div className="row">
      {/* left col with size 3 */}
      <div className="col-2">
        <ListGroup
          items={filterOptions}
          selectedItem={selectedFilterOption}
          onItemSelect={handleFilterOptionSelect}
        />
      </div>
      {/* rest col */}
      <div className="col">
        <span>
          <span className="float-right">
            <Link to="/recipes/new" className="btn btn-primary">
              New recipe
            </Link>
          </span>
          <span className="w-50">
            <SearchBox value={searchQuery} onChange={handleSearch} />
            <p className="w-50">
              Showing {totalCount} recipes in the database!
            </p>
          </span>
        </span>

        <RecipesTable
          recipes={pageRecipes}
          sortColumn={sortColumn}
          onLike={handleLike}
          onDelete={handleDelete}
          onSort={setSortColumn}
        />
        <Pagination
          itemsCount={totalCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default Recipes;
