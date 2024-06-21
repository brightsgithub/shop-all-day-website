import pngImage from './assets/no_img_pic.png';

function MainContent({productStocksForMainDisplay}) {

    if (productStocksForMainDisplay === undefined || productStocksForMainDisplay.size == 0) return;

    return (
        <div className={`main-content`}>
            <div>
                {productStocksForMainDisplay.map(productStockDto => (

                    <div className="main-content-titles" key={productStockDto.productDto.productId}>
                        <img className="row-image" src={pngImage} alt="product image 1"/>
                        <p>{productStockDto.productDto.productId}: {productStockDto.productDto.shortTitle}: {productStockDto.price}</p>
                    </div>

                ))}
            </div>
        </div>
    )
}

export default MainContent;