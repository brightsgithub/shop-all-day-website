// DetailsScreen.jsx
import React, {useEffect} from 'react';
import pngImage from '../assets/no_img_pic.png';

function DetailsScreen({productDto, productStocksForAProductMap, goBack}) {

    const productStocks = productStocksForAProductMap.get(productDto.productId)

    return (
        <div className={`details-screen-container`}>


            <div className={`details-screen-container-left-side`}>

                <div className="image-with-desc-container">
                    <img className={`details-image`} src={pngImage}/>
                    <div className={`details-screen-desc-container`}>
                        <span className="details-long-title">{productDto.longTitle}</span><br/><br/>
                        <span className="details-long-desc">{productDto.longDescription}</span>
                    </div>
                </div>

                <div className="back-button-container">
                    <button className="back-button" onClick={goBack}>Back</button>
                </div>

            </div>

            <div className="details-screen-vertical-line-container">
                <div className="details-screen-vertical-line"></div>
            </div>

            <div className={`details-screen-container-right-side`}>

                <div className={`details-screen-title-and-select-container-sizes`}>
                    <span className={`details-screen-select-title`}>Sizes</span>
                    <select className={`details-screen-select`}>
                        {productStocks.map(productStock => (
                            <option id={productStock.productStockId} key={productStock.productStockId}
                                    value={productStock.size}>{productStock.size}</option>
                        ))}
                    </select>
                </div>

                <div className={`details-screen-title-and-select-container`}>
                    <span className={`details-screen-select-title`}>Colours</span>
                    <select className={`details-screen-select`}>
                        {productStocks.map(productStock => (
                            <option id={productStock.productStockId} key={productStock.productStockId}
                                    value={productStock.color}>{productStock.color}</option>
                        ))}
                    </select>
                </div>

                <div className={`details-price-container`}>
                    <span className={`details-price-title`}>Price</span>&nbsp;
                    <span className={`details-price-value`}>£{productStocks[0].price}</span>
                </div>

                <div className="checkout-button-container">
                    <button className="checkout-button">Add to Basket</button>
                </div>

            </div>

        </div>
    );
}

export default DetailsScreen;
