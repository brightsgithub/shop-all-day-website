import React, { useState, useEffect } from 'react';

function CategoryTopMenu({categories, selectedCategoryId, setSelectedCategoryId, setSelectedProductTypeId, handleOnCategoryClick}) {
    return (
        <nav>
            <ul>
                {categories.map(category => (
                    <li key={category.categoryId} onClick={
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