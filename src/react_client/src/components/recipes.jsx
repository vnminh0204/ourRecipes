import React from "react";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import RecipesTable from "./recipesTable";
import { Link } from "react-router-dom";
import { paginate } from "../utils/paginate";
import SearchBox from "./common/searchBox";
import _ from "lodash";
import { useState, useEffect } from "react";
import { getRecipes } from "../services/fakeRecipeService";

const Recipes = () => {
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

  //replace componentDidMount
  useEffect(() => {
    const promise = getAllRecipes();
    promise.then((result) => {setRecipes(result);});
    
  }, []);

  const getAllRecipes = async () => {
    //get request
    const apiEndpoint = "http://127.0.0.1:5000" + "/recipes";

    const response = await fetch(apiEndpoint);
    const data = await response.json();
    var recipes = new Array(data.Count);
    var i = 0;
    for (const item of data.Items) {
      //TODO change author
      const recipe = {...item.data, "date": item.date, "id" : item.id, "nutriScore" : item.nutriScore, "author": "Minh"};
      // console.log(recipe);
      recipes[i] = recipe;
      i++;
    }
    console.log(recipes);
    return recipes;
  };

  const handleDelete = (recipe) => {
    const newrecipes = recipes.filter((r) => r._id !== recipe._id);
    setRecipes(newrecipes);
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
          r.title.toLowerCase().startsWith(searchQuery.toLowerCase())
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
    return <p>There are no recipes in the database!</p>;
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
