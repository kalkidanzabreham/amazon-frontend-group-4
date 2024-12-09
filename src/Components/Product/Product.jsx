import React from 'react'
import axios from "axios";
import { useState, useEffect } from "react";
import classes from "./Product.module.css";
import ProductCard from './ProductCard';
import Loader from '../Loader/Loader';
function Product() {
   const [product, setProduct] = useState([]);
   const [isLoading,setIsLoading] = useState(false)
   useEffect(() => {
    setIsLoading(true)
     axios
       .get("https://fakestoreapi.com/products")
       .then((res) => {
         setProduct(res.data);
         setIsLoading(false)
       })
       .catch((err) => {
         console.log(err);
         setIsLoading(false)
       });
   }, []);
  //  console.log(product);

   return (
     <>
       {isLoading ? (
         <Loader />
       ) : (
         <div className={classes.products_container}>
           {product.map((singleProduct, i) => (
             <ProductCard key={i} product={singleProduct}
             renderAdd={true} />
           ))}
         </div>
       )}
     </>
   );
}


export default Product