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
    const [filteredProductStocksForMainDisplay, setFilteredProductStocksForMainDisplay] = useState([]);
    const [selectedBrandsFilter, setSelectedBrandsFilter] = useState(new Map());
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

            console.log("first check >>   selectedBrandsFilter");
            console.log(selectedBrandsFilter);
            console.log(categoryId);
            console.log(selectedProductTypeId);

            try {
                const data = await productStockService.getProductStocksByCategory(categoryId);

                const groupProductsByProductTypeMap = groupProductsByProductType(data);

                var productStocks = null;
                if (selectedProductTypeId == null) {
                    console.log("using initial value for product stocks");
                    productStocks = groupProductsByProductTypeMap.get(data[0].productDto.productTypeDto.productTypeId);
                } else {
                    console.log("using selected value for product stocks");
                    productStocks = groupProductsByProductTypeMap.get(selectedProductTypeId);
                }

                console.log("printing product stocks for main view");
                console.log(productStocks);
                console.log("printing product stocks for main view END");
                setProductsByProductTypeMap(groupProductsByProductTypeMap);
                setProductStocksForMainDisplay(productStocks);
                setFilteredProductStocksForMainDisplay(populateFilteredProductStocks(productStocks, selectedBrandsFilter))

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
    },[selectedCategoryId, selectedProductTypeId, selectedBrandsFilter]); // when the state variable selectedCategoryId changes, call fetchProductStocks(id)



    function populateFilteredProductStocks(productStocksForMainDisplay, userSelectedBrandsFilter) {
        const newFilteredProductStocks = [];
        console.log("populateFilteredProductStocks start");
        console.log(userSelectedBrandsFilter);
        if (userSelectedBrandsFilter === undefined || userSelectedBrandsFilter === null || userSelectedBrandsFilter.size === 0) {
            for (let i = 0; i < productStocksForMainDisplay.length; i++) {
                const productStock = productStocksForMainDisplay[i];
                newFilteredProductStocks.push(productStock);
            }
            return newFilteredProductStocks;
        }

        for (let i = 0; i < productStocksForMainDisplay.length; i++) {
            const productStock = productStocksForMainDisplay[i];
            const brandId = productStock.productDto.brandDto.brandId;
            if (userSelectedBrandsFilter.get(brandId) != null) {
                newFilteredProductStocks.push(productStock);
            }
        }
        return newFilteredProductStocks;
    }

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
        console.log("Final map result of unique brands for a product type");
        console.log(groupBrandsByProductTypeMap);
        console.log("Final map result of unique brands for a product type END");

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
        console.log("Map of first products of each product type");
        console.log(groupProductsByProductTypeMap);
        console.log("Map of first products of each product type END");

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

    const handleBrandClick = (brandId, event) => {
        // This will stop the event from bubbling up to parent elements
        // this is because the parent <li> has a child of brand <li> and clicking the
        // child will call the parent onclick. to prevent the parent from being called,
        // we stopPropagation
        event.stopPropagation();
        if (brandId === null) {
            console.log("handleBrandClick CLEAR1!!!!!!");
            setSelectedBrandsFilter(new Map());
            return;
        }

        if (event.target.checked === true) {
            selectedBrandsFilter.set(brandId, brandId);
        } else {
            selectedBrandsFilter.delete(brandId);
        }
        console.log(selectedBrandsFilter);
        setSelectedBrandsFilter(new Map(selectedBrandsFilter));
        console.log("handleBrandClick end!");

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
                        handleBrandClick={handleBrandClick}
                    />
                    <div className="main-content-container">
                        <CategoryTopMenu
                            categories={categories}
                            selectedCategoryId={selectedCategoryId}
                            setSelectedCategoryId={setSelectedCategoryId}
                            setSelectedProductTypeId={setSelectedProductTypeId}
                        />
                        <MainContent
                            productStocksForMainDisplay={filteredProductStocksForMainDisplay}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default App
