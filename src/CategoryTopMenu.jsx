import React, { useState, useEffect } from 'react';

function CategoryTopMenu({categories, handleOnCategoryClick}) {
    return (
        <nav>
            <ul>
                {categories.map(category => (
                    <li className="top-menu-titles" key={category.categoryId} onClick={
                        () => {handleOnCategoryClick(category.categoryId)}
                    }>
                        {category.categoryName}
                    </li>
                ))}
            </ul>
        </nav>
    );

}

export default CategoryTopMenu;