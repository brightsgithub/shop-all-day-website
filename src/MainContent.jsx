import pngImage from './assets/no_img_pic.png';

function MainContent({productStocksForMainDisplay, onProductClick}) {

    if (productStocksForMainDisplay === undefined || productStocksForMainDisplay.size == 0) return;

    return (
        <div className={`main-content`}>
            <div>
                {productStocksForMainDisplay.map(productStockDto => (

                    <div
                        className="main-content-titles"
                        key={productStockDto.productDto.productId}
                        onClick={() => onProductClick(productStockDto)}
                    >
                        <img className="row-image" src={pngImage} alt="product image 1"/>
                        <p>{productStockDto.productDto.shortTitle}:&nbsp;</p><p className="main-content-titles_price">£{productStockDto.price}</p>
                    </div>

                ))}
            </div>
        </div>
    )
}

export default MainContent;