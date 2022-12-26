import React from 'react'
import data from './data'
import Card from './Card'
import './List.scss'

const List = ({recipes}) => {

    return (
        <div className='list'>
            {
                recipes.map(item => (
                    <Card key={item.id} {...item} />
                ))
            }
        </div>
    )
}

export default List