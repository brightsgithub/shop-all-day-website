import pngImage from './assets/no_img_pic.png';

function MainContent() {
    return(
        <div className="main-content">
            <div className="paragraph">
                <img className="row-image" src={pngImage} alt="product image 1"/>
                <p>This is a hidden paragraph 1 </p>
            </div>
            <div className="paragraph">
                <img className="row-image" src={pngImage} alt="product image 2 "/>
                <p>This is a hidden paragraph 2 </p>
            </div>
            <div className="paragraph">
                <img className="row-image" src={pngImage} alt="product image 3"/>
                <p>This is a hidden paragraph 3 </p>
            </div>
            <div className="paragraph">
                <img className="row-image" src={pngImage} alt="product image 4"/>
                <p>This is a hidden paragraph 4 </p>
            </div>
            <div className="paragraph">
                <img className="row-image" src={pngImage} alt="product image 5"/>
                <p>This is a hidden paragraph 5 </p>
            </div>
        </div>
    )
}

export default MainContent;