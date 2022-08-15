import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Joi from "joi-browser";
import Form from "./common/form";

const MovieForm = () => {
  // const navigate = useNavigate();
  // const { id: movieID } = useParams();
  // const [genres, setGenres] = useState([]);
  // const initialData = {
  //   title: "",
  //   genreId: "",
  //   numberInStock: "",
  //   dailyRentalRate: "",
  // };
  // const [data, setData] = useState(initialData);
  // useEffect(() => {
  //   const newGenres = getGenres();
  //   setGenres(newGenres);
  //   if (movieID === "new") return;
  //   const movie = getMovie(movieID);
  //   if (!movie) return navigate("/not-found", { replace: true });
  //   setData(mapToViewModel(movie));
  // },[movieID, navigate]);
  // const schema = {
  //   _id: Joi.string(),
  //   title: Joi.string().required().label("Title"),
  //   genreId: Joi.string().required().label("Genre"),
  //   numberInStock: Joi.number()
  //     .required()
  //     .min(0)
  //     .max(100)
  //     .label("Number in Stock"),
  //   dailyRentalRate: Joi.number()
  //     .required()
  //     .min(0)
  //     .max(10)
  //     .label("Daily Rental Rate"),
  // };
  // const mapToViewModel = (movie) => {
  //   return {
  //     _id: movie._id,
  //     title: movie.title,
  //     genreId: movie.genre._id,
  //     numberInStock: movie.numberInStock,
  //     dailyRentalRate: movie.dailyRentalRate,
  //   };
  // };
  // const doSubmit = () => {
  //   console.log("Here");
  //   console.log(data);
  //   saveMovie(data);
  //   navigate("/movies");
  // };
  // const buttons = [
  //   {
  //     buttonType: "Input",
  //     name: "title",
  //     label: "Title",
  //     type: "text",
  //   },
  //   {
  //     buttonType: "Select",
  //     name: "genreId",
  //     label: "Genre",
  //     options: genres,
  //   },
  //   {
  //     buttonType: "Input",
  //     name: "numberInStock",
  //     label: "Number in Stock",
  //     type: "number",
  //   },
  //   {
  //     buttonType: "Input",
  //     name: "dailyRentalRate",
  //     label: "Rate",
  //   },
  //   {
  //     buttonType: "Submit",
  //     label: "Save",
  //   },
  // ];
  // return (
  //   <div>
  //     <h1>Movie Form</h1>
  //     <Form
  //       doSubmit={doSubmit}
  //       buttons={buttons}
  //       schema={schema}
  //       data={data}
  //       setData={setData}
  //     />
  //   </div>
  // );
};

export default MovieForm;
