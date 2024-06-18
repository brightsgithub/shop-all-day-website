import React from 'react';

function LeftMenu({
                      setSelectedProductTypeId,
                      brandsByProductTypeMap,
                      productStocks,
                      loading,
                      error,
                      handleBrandClick,
                      checkboxRefs
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
                        <li className="left-menu-titles"
                            key={productTypeId}
                            onClick={(event) => {
                                handleBrandClick(null, event, productTypeId);
                                setSelectedProductTypeId(productTypeId);
                            }
                        }>
                            {productTypeName}
                            <div className="submenu-brand-name">
                                <label htmlFor={`agree-${productTypeId}`}>
                                    <ul>
                                        {brands.map((brand) => (
                                            <li key={brand.brandId}>
                                                <span>{brand.brandName}</span>
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
