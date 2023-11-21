import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StarRating from "../components/StarRating";
import Loading from "../components/Loading";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const productData = await response.json();
        setProduct(productData);
      } catch (error) {
        console.error("Error fetching product data", error);
      }
    };

    fetchProductData();
  }, [id]);

  if (!product) {
    return <Loading />;
  }

  return (
    <div className="product-page">
      <div className="product_page_img">
        <img src={product.image} alt="product_img" />
      </div>
      <h4 className="product_title">{product.title}</h4>
      <p>{product.description}</p>
      <h3 className="product_price">{product.price}</h3>
      <StarRating rating={product.rating.rate} />
    </div>
  );
};

export default ProductPage;
