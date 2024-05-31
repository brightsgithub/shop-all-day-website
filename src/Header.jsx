// import React from 'react'
 import React, { useState, useEffect } from 'react';
import categoryService from './services/categoryService.js';

function Header() {

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchCategories() {
            try {
                const data = await categoryService.getCategories();
                setCategories(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchCategories();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>Category List</h1>
            <ul>
                <p>
                {categories.map(category => (
                    <strong key={category.categoryId}>{category.categoryName}</strong>
                ))}
                </p>
            </ul>
        </div>
    );
}

export default Header