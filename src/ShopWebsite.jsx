import './App.css'
import './Header.jsx'
import React, { useState, useEffect, useRef } from 'react';
import categoryService from './services/categoryService.js';
import productStockService from './services/productStockService.js';
import LeftMenu from "./LeftMenu.jsx";
import CategoryTopMenu from "./CategoryTopMenu.jsx";
import MainContent from "./MainContent.jsx";
import DetailsScreen from "./DetailsScreen.jsx";


function ShopWebsite() {
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
    const [selectedProduct, setSelectedProduct] = useState(null);  // State for the selected product
    const [selectedProductStock, setSelectedProductStock] = useState(null);  // State for the selected product
    const checkboxRefs = useRef([]); // keep a reference on all checkBoxes

    // A map containing all the product stock info for a product. This is so we can show all product stock info for a given product
    const [productStocksForAProductMap, setProductStocksForAProductMap] = useState(new Map());



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

            log("first check >>   selectedBrandsFilter");
            log(selectedBrandsFilter);
            log(categoryId);
            log(selectedProductTypeId);

            try {
                const data = await productStockService.getProductStocksByCategory(categoryId);
                setProductStocksForAProductMap(groupProductStocksByProductId(data));

                const groupProductsByProductTypeMap = groupProductsByProductType(data);

                var productStocks = null;
                if (selectedProductTypeId == null) {
                    log("using initial value for product stocks");
                    productStocks = groupProductsByProductTypeMap.get(data[0].productDto.productTypeDto.productTypeId);
                } else {
                    log("using selected value for product stocks");
                    productStocks = groupProductsByProductTypeMap.get(selectedProductTypeId);
                }

                log("printing product stocks for main view");
                log(productStocks);
                log("printing product stocks for main view END");
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

    /**
     * Group productStocks by productId. This allows us to look up all product stocks for a product when viewing the details page.
     * @param {Array} productStocks - Array of product stock objects.
     * @returns {Map} - A map where the key is productId and the value is an array of product stocks for that product.
     */
    function groupProductStocksByProductId(productStocks) {
        const productStocksForAProductMap = new Map();

        productStocks.forEach((productStock) => {
            const productId = productStock.productDto.productId;

            // When the product id returns no results, create an empty list to be populated
            if (!productStocksForAProductMap.has(productId)) {
                productStocksForAProductMap.set(productId, []);
            }

            // get the list by product id and populate it
            productStocksForAProductMap.get(productId).push(productStock);
        });

        log(productStocksForAProductMap);
        return productStocksForAProductMap;
    }


    function populateFilteredProductStocks(productStocksForMainDisplay, userSelectedBrandsFilter) {
        const newFilteredProductStocks = [];
        log("populateFilteredProductStocks start");
        log(userSelectedBrandsFilter);
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
                log(">>>>>>>>>>>Made unique Brands List for "+ productStock.productDto.productTypeDto.productTypeName);
                uniqueBrands.forEach(element => {
                    log(element);
                });
                log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");

            }
        }

        log(" ");
        log("Final map result of unique brands for a product type");
        log(groupBrandsByProductTypeMap);
        log("Final map result of unique brands for a product type END");

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
        log("Map of first products of each product type");
        log(groupProductsByProductTypeMap);
        log("Map of first products of each product type END");

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

    const handleBrandClick = (brandId, event, productTypeId) => {
        goBack();
        // If a different brand has been selected within a different product type, clear brands filter and set the new
        // setSelectedProductTypeId
        if (productTypeId !== selectedProductTypeId || brandId === null) {
            resetSelectedBrands();
            setSelectedProductTypeId(productTypeId);
        }

        // checkboxRefs.current.forEach((checkbox) => {
        //     if(checkbox != null && checkbox.id == brandId && !checkbox.checked) {
        //         console.log("checkbox.id "+checkbox.id);console.log();
        //         console.log("BRAND ID "+brandId);
        //         console.log("YESSSSSSSS");
        //         checkbox.checked = true;
        //     } else if(checkbox!=null) {
        //
        //     }
        // });


        // if the checkbox has been checked, add it to the brand filter
        if (event.target.checked === true) {
            // event.target.checked = true;
            selectedBrandsFilter.set(brandId, brandId);
        } else {
            selectedBrandsFilter.delete(brandId);
        }
        setSelectedBrandsFilter(new Map(selectedBrandsFilter));


    };

    /**
     * handleOnCategoryClick
     * @param categoryId
     */
    const handleOnCategoryClick = (categoryId) => {
        goBack();
        setSelectedCategoryId(categoryId);
        setSelectedProductTypeId(null); // reset the previous ProductTypeId
        resetSelectedBrands();
    }

    /**
     * clear the brands filter
     */
    function resetSelectedBrands() {
        goBack();
        handleResetAll();
        selectedBrandsFilter.clear();
        setSelectedBrandsFilter(selectedBrandsFilter);
    }

    /**
     * Reset all the checkboxes on screen
     */
    const handleResetAll = () => {
        goBack();
        log("checkboxRefs.length");
        log(checkboxRefs.current.length)
        checkboxRefs.current.forEach((checkbox) => {
            if(checkbox !== null) {
                checkbox.checked = false;
            }
        });
    }

    function log(msg) {
        //console.log(msg);
    }

    // Function to capitalize the first letter and make the rest lowercase
    const capitalizeFirstLetter = (text) => {
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    };

    const handleProductClick = (productDto) => {
        // console.log("Product Clicked start");
        // console.log(productDto);
        // console.log("Product Clicked end");
        // console.log("productStocksForAProductMap start");
        // console.log(productStocksForAProductMap);
        // console.log("productStocksForAProductMap end");
        setSelectedProduct(productDto);  // Set the selected product
    };

    const goBack = () => {
        setSelectedProduct(null);  // Clear the selected product
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
                        checkboxRefs={checkboxRefs}
                        capitalizeFirstLetter={capitalizeFirstLetter}
                    />
                    <div className="main-content-container">
                        <CategoryTopMenu
                            categories={categories}
                            handleOnCategoryClick={handleOnCategoryClick}
                        />
                        {selectedProduct ? (
                            <DetailsScreen
                                productDto={selectedProduct}
                                productStocksForAProductMap={productStocksForAProductMap}
                                goBack={goBack} />
                        ) : (
                            <MainContent
                                productStocksForMainDisplay={filteredProductStocksForMainDisplay}
                                onProductClick={handleProductClick}  // Pass the click handler
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ShopWebsite
