import React, { useState, useEffect } from 'react';

function CategoryTopMenu({categories, selectedCategoryId, setSelectedCategoryId}) {
    return (
        <nav>
            <ul>
                {categories.map(category => (
                    <li key={category.categoryId} onClick={() => setSelectedCategoryId(category.categoryId)}>
                        {category.categoryName}
                    </li>
                ))}
            </ul>
        </nav>
    );

}

export default CategoryTopMenu;