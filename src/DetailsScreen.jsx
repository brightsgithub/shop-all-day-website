// DetailsScreen.jsx
import React, { useEffect } from 'react';
import pngImage from './assets/no_img_pic.png';

function DetailsScreen({product, goBack}) {

    useEffect(() => {
        const handlePopState = () => {
            goBack();
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [goBack]);

    return (
        <div className={`details-screen-container`}>


            <div className={`details-screen-container-left-side`}>

                <div className="image-with-desc-container">
                    <img className={`details-image`} src={pngImage}/>
                    <div className={`details-screen-desc-container`}>
                        <span className="details-long-title">{product.productDto.longTitle}</span><br/><br/>
                        <span className="details-long-desc">{product.productDto.longDescription}</span>
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

                <div className={`details-screen-title-and-select-container-quantity`}>
                    <span className={`details-screen-select-title`}>Quantity</span>
                    <select className={`details-screen-select`}>
                        <option key={`1`}>Value 1</option>
                        <option key={`2`}>Value 2</option>
                        <option key={`3`}>Value 3</option>
                        <option key={`4`}>Value 4</option>
                        <option key={`5`}>Value 5</option>
                        <option key={`6`}>Value 6</option>
                    </select>
                </div>

                <div className={`details-screen-title-and-select-container`}>
                    <span className={`details-screen-select-title`}>Available sizes</span>
                    <select className={`details-screen-select`}>
                        <option key={`1`}>Value 1</option>
                        <option key={`2`}>Value 2</option>
                        <option key={`3`}>Value 3</option>
                        <option key={`4`}>Value 4</option>
                        <option key={`5`}>Value 5</option>
                        <option key={`6`}>Value 6</option>
                    </select>
                </div>

                <div className={`details-screen-title-and-select-container`}>
                    <span className={`details-screen-select-title`}>Available colours</span>
                    <select className={`details-screen-select`}>
                        <option key={`1`}>Value 1</option>
                        <option key={`2`}>Value 2</option>
                        <option key={`3`}>Value 3</option>
                        <option key={`4`}>Value 4</option>
                        <option key={`5`}>Value 5</option>
                        <option key={`6`}>Value 6</option>
                    </select>
                </div>

                <div className={`details-price-container`}>
                    <span className={`details-price-title`}>Price</span><br/>
                    <span className={`details-price-value`}>£599.00</span>
                </div>

                <div className="checkout-button-container">
                    <button className="checkout-button">Add to Basket</button>
                </div>

            </div>

        </div>
    );
}

export default DetailsScreen;
