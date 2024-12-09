import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Landing from './Pages/Landing/Landing'
import Auth from './Pages/Auth/Auth';
import Payment from './Pages/Payment/Payment';
import Orders from './Pages/Orders/Orders';
import Cart from './Pages/Cart/Cart';
import Result from './Pages/Result/Result';
import ProductDetail from './Pages/ProductDetail/ProductDetail';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
const stripePromise = loadStripe(
  "pk_test_51QQbwmCRwQa3zJtnU0m1siRFLOVsyejvXMF85lPg1RanlErJ9BG3MsNS0FOYNdqfQ4DdO3INhWRq387PTmLcjtvX00ScgVpqRO"
);
function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/payment"
          element={
            <ProtectedRoute
              message={"you have to sign in to pay"}
              redirect={"/payment"}
            >
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute message={"you have sign in to see your orders"} redirect={"/orders"}>
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/category/:categoryName" element={<Result />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router