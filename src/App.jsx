import './App.css'
import './Header.jsx'
import React, { useState, useEffect } from 'react';
import categoryService from './services/categoryService.js';
import productStockService from './services/productStockService.js';
import LeftMenu from "./LeftMenu.jsx";
import CategoryTopMenu from "./CategoryTopMenu.jsx";
import MainContent from "./MainContent.jsx";


function App() {
    // useState() hooks which allows the creation of a stateful variable and setter function to update its value in the
    // Virtual DOM
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [categories, setCategories] = useState([]);

    const [productStocks, setProductStocks] = useState([]);
    const [brandsByProductTypeMap, setBrandsByProductTypeMap] = useState(new Map());

    const [productsByProductTypeMap, setProductsByProductTypeMap] = useState(new Map());
    const [productStocksForMainDisplay, setProductStocksForMainDisplay] = useState(new Map());
    const [selectedProductTypeId, setSelectedProductTypeId] = useState(null);

    const [loadingCategories, setLoadingCategories] = useState(true);
    const [loadingProductStocks, setLoadingProductStocks] = useState(true);

    const [categoryError, setCategoryError] = useState(null);
    const [productStockError, setProductStockError] = useState(null);


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
        async function fetchProductStocks(categoryId) {
            if (categoryId === null) return;
            setLoadingProductStocks(true);
            try {
                const data = await productStockService.getProductStocksByCategory(categoryId);

                const groupProductsByProductTypeMap = groupProductsByProductType(data);

                var productStocks = null;
                if (selectedProductTypeId == null) {
                    console.log(data[0].productDto.productTypeDto)
                    productStocks = groupProductsByProductTypeMap.get(data[0].productDto.productTypeDto.productTypeId);
                } else {
                    productStocks = groupProductsByProductTypeMap.get(selectedProductTypeId);
                }
                console.log("productStocks "+ productStocks)
                // console.log(groupProductsByProductTypeMap.get(99))
                // console.log("end")
                setProductsByProductTypeMap(groupProductsByProductTypeMap);
                setProductStocksForMainDisplay(productStocks);

                const brandsByProductTypeMap = groupBrandsByProductType(data)
                setBrandsByProductTypeMap(brandsByProductTypeMap);

                const productTypes = removeProductTypeDuplicates(data)
                setProductStocks(productTypes);
            } catch (error) {
                setProductStockError(error.message);
            } finally {
                setLoadingProductStocks(false);
            }
        }
        fetchProductStocks(selectedCategoryId);
    },[selectedCategoryId, selectedProductTypeId]); // when the state variable selectedCategoryId changes, call fetchProductStocks(id)

    function groupBrandsByProductType(data) {
        var groupBrandsByProductTypeMap = new Map();
        var brandsForProductId = [];
        for (let i = 0; i < data.length; i++) {
            const productStock = data[i];
            var nextProductStock = null
            var nextIndex = i + 1;

            if (nextIndex === data.length) {
                nextProductStock = null;
            } else {
                nextProductStock = data[nextIndex];
            }

            var brand = productStock.productDto.brandDto;
            brandsForProductId.push(brand);

            if(nextProductStock == null
                || (productStock.productDto.productTypeDto.productTypeId
                !== nextProductStock.productDto.productTypeDto.productTypeId)
            ) {
                const uniqueBrands = removeBrandDuplicates(brandsForProductId);
                groupBrandsByProductTypeMap.set(productStock.productDto.productTypeDto.productTypeId, uniqueBrands);
                brandsForProductId = [];
                console.log(">>>>>>>>>>>Made unique Brands List for "+ productStock.productDto.productTypeDto.productTypeName);
                uniqueBrands.forEach(element => {
                    console.log(element);
                });
                console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");

            }
        }

        console.log(" ");
        console.log("Final map result ");
        console.log(groupBrandsByProductTypeMap);

        return groupBrandsByProductTypeMap;
    }

    /**
     * Gets the first products of each product type, where the key is the product type.
     * Essentially we have a key of product type with a list of unique products for that product type, picking the
     * first for each for display on the center page. This is so we can show at least one of each product and its price.
     * @param data
     * @returns {Map<any, any>}
     */
    function groupProductsByProductType(data) {
        var groupProductsByProductTypeMap = new Map();
        var productStocks = [];
        var previousProductId = null
        var previousProductTypeId = null
        for (let i = 0; i < data.length; i++) {
            const productStock = data[i];
            const product = productStock.productDto;
            const productType = productStock.productDto.productTypeDto;

            if (previousProductTypeId !== productType.productTypeId) {
                previousProductTypeId = productType.productTypeId;
                // create new entry in map with new list
                productStocks = [];
                groupProductsByProductTypeMap.set(productType.productTypeId, productStocks);
            }

            if (product.productId !== previousProductId) {
                previousProductId = product.productId;
                productStocks.push(productStock);
            }
        }
        console.log(groupProductsByProductTypeMap);

        return groupProductsByProductTypeMap;
    }

    /**
     * This function iterates over the original array (arr).
     * It uses a Set called uniqueIds to keep track of productTypeIds that have already been encountered.
     * The filter method returns only the first occurrence of each unique productTypeId, effectively removing duplicates.
     * @param arr
     * @returns {*}
     */
    const removeProductTypeDuplicates = (arr) => {
        const uniqueIds = new Set();
        return arr.filter(productStock => {
            if (uniqueIds.has(productStock.productDto.productTypeDto.productTypeId)) {
                return false;
            } else {
                uniqueIds.add(productStock.productDto.productTypeDto.productTypeId);
                return true;
            }
        });
    };

    const removeBrandDuplicates = (arr) => {
        const uniqueIds = new Set();
        return arr.filter(brandDto => {
            if (uniqueIds.has(brandDto.brandId)) {
                return false;
            } else {
                uniqueIds.add(brandDto.brandId);
                return true;
            }
        });
    };

    return (
        <>
            <div className="container">
                <div className="container_child_2">
                    <LeftMenu
                        brandsByProductTypeMap={brandsByProductTypeMap}
                        productStocks={productStocks}
                        loading={loadingProductStocks}
                        error={productStockError}
                        setSelectedProductTypeId={setSelectedProductTypeId}
                    />
                    <div className="main-content-container">
                        <CategoryTopMenu
                            categories={categories}
                            selectedCategoryId={selectedCategoryId}
                            setSelectedCategoryId={setSelectedCategoryId}
                        />
                        <MainContent
                            productStocksForMainDisplay={productStocksForMainDisplay}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default App
