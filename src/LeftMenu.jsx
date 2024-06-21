import React from 'react';

function LeftMenu({
                      setSelectedProductTypeId,
                      brandsByProductTypeMap,
                      productStocks,
                      loading,
                      error,
                      handleBrandClick,
                      checkboxRefs,
                      capitalizeFirstLetter
                  }) {
    var brandsCount = 0;
    return (
        <div className="left-menu">
            <ul>
                {
                    productStocks.map((productStock) => {
                        const productTypeId = productStock.productDto.productTypeDto.productTypeId;
                        const productTypeName = productStock.productDto.productTypeDto.productTypeName;
                        const brands = brandsByProductTypeMap.get(productTypeId) || []; // Retrieve brands for the current product type

                        return (
                            <li className="left-menu-titles_li"
                                key={productTypeId}>
                            <span className="left-menu-titles"
                                onClick={(event) => {
                                    handleBrandClick(null, event, productTypeId);
                                    setSelectedProductTypeId(productTypeId);
                                }
                                }
                            >{productTypeName}</span>
                                <div >
                                    <label htmlFor={`agree-${productTypeId}`}>
                                        <ul>
                                            {brands.map((brand) => (
                                                <li className="submenu-brand-name" key={brand.brandId}>
                                                    <span>{capitalizeFirstLetter(brand.brandName)}</span>
                                                    <input type="checkbox"
                                                           id={brand.brandId}
                                                           onClick={(event) => handleBrandClick(brand.brandId, event, productTypeId)}
                                                           name={brand.brandId}
                                                           ref={(el) => (checkboxRefs.current[brandsCount++] = el)}
                                                    />
                                                </li>
                                            ))}
                                        </ul>
                                    </label>
                                </div>
                            </li>
                        );
                    })}
            </ul>
        </div>
    );
}

export default LeftMenu;
