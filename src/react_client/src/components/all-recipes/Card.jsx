import React from 'react'
import { Link } from 'react-router-dom'
import './Card.scss'


const recipesCard = ({ id, title, author, date, mealType, nutriScore, imgUrl }) => {

  return (
    <Link to={`/recipies/${id}`}>
      <div className='card'>
        <div className="img">
          <img src={imgUrl} />
        </div>
        <div className="details">
          <div className="details-left">
            <p className='type'>{mealType}</p>
            <h1>{title}</h1>

          </div>
          <div className="details-right">
            <div className="score">{Math.round(nutriScore)}/100</div>
            {author && <span className='authorLine'>Suggested by <span className='author'>{author}</span></span>}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default recipesCard