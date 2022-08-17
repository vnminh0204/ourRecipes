const recipes = [
  {
    _id: "5b21ca3eeb7f6fbccd471815",
    title: "Sear Tuna",
    mealType: "Dinner",
    author: "Minh",
    nutriScore: 2.5,
    publishDate: "2018-01-03T19:04:28.809Z",
    liked: true,
  },
  {
    _id: "5b21ca3eeb7f6fbccd471816",
    title: "Stampot",
    mealType: "Dinner",
    author: "Minh",
    nutriScore: 2.5,
  },
  {
    _id: "5b21ca3eeb7f6fbccd471817",
    title: "BBQ",
    mealType: "Dinner",
    author: "Minh",
    nutriScore: 3.5,
  },
  {
    _id: "5b21ca3eeb7f6fbccd471819",
    title: "Steamed Scrimp with Beer",
    mealType: "Lunch",
    author: "Minh",
    nutriScore: 3.5,
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181a",
    title: "Spaghetti",
    mealType: "Dinner",
    author: "Minh",
    nutriScore: 3.5,
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181b",
    title: "Boiled Bacon",
    mealType: "Lunch",
    author: "Minh",
    nutriScore: 3.5,
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181e",
    title: "Steak",
    mealType: "Dinner",
    author: "Minh",
    nutriScore: 4.5,
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181f",
    title: "Kapsalon",
    mealType: "Lunch",
    author: "Minh",
    nutriScore: 3.5,
  },
  {
    _id: "5b21ca3eeb7f6fbccd471821",
    title: "Boiled Vegetables",
    mealType: "Lunch",
    author: "Minh",
    nutriScore: 3.5,
  },
];

export function getRecipes() {
  return recipes;
}

export function getMovie(id) {
  return recipes.find((r) => r._id === id);
}

// export function saveMovie(movie) {
//   let movieInDb = movies.find((m) => m._id === movie._id) || {};
//   movieInDb.title = movie.title;
//   movieInDb.genre = genresAPI.genres.find((g) => g._id === movie.genreId);
//   movieInDb.author: "Minh"movie.author: "Minh"/   movieInDb.nutriScore = movie.nutriScore;

//   if (!movieInDb._id) {
//     movieInDb._id = Date.now().toString();
//     movies.push(movieInDb);
//   }

//   return movieInDb;
// }

export function deleteRecipe(id) {
  let recipeInDb = recipes.find((r) => r._id === id);
  recipes.splice(recipes.indexOf(recipeInDb), 1);
  return recipeInDb;
}
