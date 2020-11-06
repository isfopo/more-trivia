import React, { useEffect, useState } from 'react'

export const CategoryDropdown = props => {

    const [categoryOptions, setCategoryOptions] = useState([]);

    const getCategories = () => {
        fetch(`https://opentdb.com/api_category.php`)
            .then( response => {
                return response.json();
            })
            .then( response => {
                setCategoryOptions(response.trivia_categories);
            })
    }

    useEffect(() => {
        getCategories()
    }, [])

    return (
        <div className="categoryMenu">
            <label htmlFor="category">Category</label>
            <select name="Category" id="category" onChange={ e => props.handleSetCategory(e.target.value)}>
            
                <option value="0">Any</option>
                
                {categoryOptions.map( category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                ))}

            </select>        
        </div>
    )
}
