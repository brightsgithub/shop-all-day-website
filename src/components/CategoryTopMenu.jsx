import React, { useState, useEffect } from 'react';

function CategoryTopMenu({categories, handleOnCategoryClick, selectedCategoryId}) {
    return (
        <nav>
            <ul>
                {categories.map(category => (
                    <li
                        className={`top-menu-titles ${selectedCategoryId === category.categoryId ? 'selected' : ''}`}
                        key={category.categoryId} onClick={
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