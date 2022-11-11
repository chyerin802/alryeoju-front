import React, { useEffect } from "react";
import { Link } from "react-router-dom";


import './ProductCard.css'

const ProductCard = ({ sool }) => {  
    const url = `/detail/${sool.al_id}`
    return(
      <Link className="productCard row-center" to={url}>
        <div className="productCard__wrapper" id={sool.al_id}>
              <div className="productCard--img">
                <img src={sool.img_link} alt={sool.al_name}></img>  
              </div>
              <div className="productCard__content col">
                <span className="productCard--name">{sool.al_name}</span>
                <span className="productCard--price">{sool.category}</span>
                <span className="productCard--price">{sool.price}원</span>
                <div className="row">
                <span className="productCard--degree">{sool.degree}%</span>
                  {/* {sool.token_rank.map((token) => <span>{token}</span>)} */}
                </div>
              </div>
        </div>
      </Link>
    )
}

export default ProductCard;