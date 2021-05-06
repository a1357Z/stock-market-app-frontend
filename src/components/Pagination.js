import React from 'react'
import './Pagination.css'

const Pagination = (props) => {
    return (
        <div className="Pagination">
            <button onClick={props.previous}>
            Previous Page
            </button>
            <button onClick={props.next}>
            Next Page
            </button>
        </div>
    )
}

export default Pagination
