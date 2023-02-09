import React from 'react'
import Card from './RecipeCard'
import './List.scss'
import RecipeCard from "./RecipeCard";

const List = ({handleDelete, handleEdit, recipes}) => {

    return (
        <div className='list'>
            {
                recipes.map(item => (
                    <RecipeCard handleDelete={handleDelete} handleEdit={handleEdit} key={item.id} recipe={item} />
                ))
            }
        </div>
    )
}

export default List