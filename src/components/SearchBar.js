import React from 'react'
import './SearchBar.css'
const SearchBar = (props) => {
    return (
        <div className="searchBar">
           <input type="text" onChange={props.onChange} placeholder="enter company name or symbol"/> 
        </div>
    )
}

export default SearchBar
