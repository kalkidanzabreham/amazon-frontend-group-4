import React, { useContext, useState } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import classes from "./Payment.module.css";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import { db } from "../../Utility/firebase";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormatter from "../../Components/CurrencyFormatter/CurrencyFormatter";
import { axiosInstant } from "../../API/axiox";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { TYPE } from "../../Utility/action.type";

function Payment() {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  const [loading,setLoading] = useState(false)
  const [error, setError] = useState("");
  const total = basket.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);
  const totalPrice = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate()
  const handleChange = (e) => {
    e?.error?.message ? setError(e.error.message) : setError("");
  };
  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)

      const response = await axiosInstant({
        method: "POST",
        url: `/payment/create?total=${totalPrice * 100}`,
      });
      const clientSecret = response.data?.clientSecret;



      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });


      console.log(paymentIntent);

      await db
        .collection("user")
        .doc(user.uid)
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });
        setLoading(false)
        dispatch({
          type:TYPE.EMPTY_BASKET
        })
        navigate("/orders")
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  };
  return (
    <LayOut>
      {/* header */}
      <div className={classes.payment_header}>Checkout ({total}) items</div>
      <section className={classes.payment}>
        {/* address */}
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>123 Addis road 23</div>
            <div>4 kilo , AAU</div>
          </div>
        </div>
        <hr />
        {/* product */}
        <div className={classes.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item, i) => (
              <ProductCard key={i} product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />
        {/* card from  */}
        <div className={classes.flex}>
          <h3>Payment method</h3>
          <div className={classes.payment_card_container}>
            <div className={classes.payment_detail}>
              <form onSubmit={handlePayment}>
                {error && <small style={{ color: "red" }}>{error}</small>}
                <CardElement onChange={handleChange} />

                {/* price */}
                <div className={classes.payment_price}>
                  <div>
                    <span>
                      Total Order | <CurrencyFormatter amount={totalPrice} />
                    </span>
                  </div>
                  <button type="submit">
                    {loading ? (
                      <div className={classes.loading}>
                        <ClipLoader size={12} color="gray" />
                        <p>Please wait ...</p>
                      </div>
                    ) : (
                      "Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment;
