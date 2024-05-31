import './App.css'
import './Header.jsx'
import React, { useState, useEffect } from 'react';
import categoryService from './services/categoryService.js';
import productTypeService from './services/productTypeService.js';
import LeftMenu from "./LeftMenu.jsx";
import CategoryTopMenu from "./CategoryTopMenu.jsx";
import MainContent from "./MainContent.jsx";


function App() {
    // useState() hooks which allows the creation of a stateful variable and setter function to update its value in the
    // Virtual DOM
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [categories, setCategories] = useState([]);

    const [productTypes, setProductTypes] = useState([]);

    const [loadingCategories, setLoadingCategories] = useState(true);
    const [loadingProductTypes, setLoadingProductTypes] = useState(true);

    const [categoryError, setCategoryError] = useState(null);
    const [productTypeError, setProductTypeError] = useState(null);


    // useEffect() hooks tells react to run some code under certain conditions
    // 1. useEffect(() => {})       // Runs after every re-render
    // 1. useEffect(() => {}, [])   // Runs only on mount
    // 1. useEffect(() => {},[dep1, dep2, dep3, etc])       // Runs on mount + when dependency value changes.

    useEffect(() => {
        async function fetchCategories() {
            try {
                const data = await categoryService.getCategories();
                setCategories(data);
                if (data.length > 0) {
                    setSelectedCategoryId(data[0].categoryId);
                }
            } catch (error) {
                setCategoryError(error.message);
            } finally {
                setLoadingCategories(false);
            }
        }

        fetchCategories();
    }, []);

    useEffect( () => {
        async function fetchProductTypes(categoryId) {
            if (categoryId === null) return;
            setLoadingProductTypes(true);
            try {
                const data = await productTypeService.getProductTypesByCategory(categoryId);
                setProductTypes(data);
            } catch (error) {
                setProductTypeError(error.message);
            } finally {
                setLoadingProductTypes(false);
            }
        }
        fetchProductTypes(selectedCategoryId);
    },[selectedCategoryId]);

    return (
        <>
            <div className="container">
                <div className="container_child_2">
                    <LeftMenu
                        productTypes={productTypes}
                        loading={loadingProductTypes}
                        error={productTypeError}
                    />
                    <div className="main-content-container">
                        <CategoryTopMenu
                            categories={categories}
                            selectedCategoryId={selectedCategoryId}
                            setSelectedCategoryId={setSelectedCategoryId}
                        />
                        <MainContent/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App
