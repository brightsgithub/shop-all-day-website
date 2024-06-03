import React, { useState, useEffect } from 'react';

function LeftMenu({ productStocks, loading, error }) { // Add selectedCategoryId prop

    return (
        <div className="left-menu">
            <ul>
                {productStocks.map(productStock => (

                    <li className="left-menu-titles" key={productStock.productDto.productTypeDto.productTypeId}>{productStock.productDto.productTypeDto.productTypeName}
                        <div className="submenu-brand-name">
                            <label htmlFor="agree">Brand 1</label>
                            <input type="checkbox" id="agree" name="agree"/>
                        </div>
                        <div className="submenu-brand-name">
                            <label htmlFor="agree2">Brand 2</label>
                            <input type="checkbox" id="agree2" name="agree2"/>
                        </div>
                    </li>

                ))}
            </ul>
        </div>
    );
}

export default LeftMenu;