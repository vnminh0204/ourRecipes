import React from "react";
import Like from "./common/like";
import Table from "./common/table";
import { Link } from "react-router-dom";
const RecipesTable = (props) => {
  const columns = [
    {
      path: "title",
      label: "Title",
      content: (recipe) => (
        <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
      ),
    },
    { path: "mealType", label: "MealType" },
    { path: "author", label: "Author" },
    { path: "nutriScore", label: "Nutri-Score" },
    {
      key: "like",
      content: (recipe) => (
        <Like liked={recipe.liked} onClick={() => props.onLike(recipe)}></Like>
      ),
    }, //for Like
    {
      key: "delete",
      content: (recipe) => (
        <button
          onClick={() => props.onDelete(recipe)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      ),
    }, //for Delete
  ];

  const { recipes, onSort, sortColumn } = props;

  return (
    <Table
      columns={columns}
      data={recipes}
      sortColumn={sortColumn}
      onSort={onSort}
    />
  );
};

export default RecipesTable;
