import React, { useContext, useEffect, useState } from 'react'
import LayOut from '../../Components/LayOut/LayOut';
import classes from "./Orders.module.css";
import { db } from '../../Utility/firebase';
import { DataContext } from '../../Components/DataProvider/DataProvider';
import ProductCard from '../../Components/Product/ProductCard';
function Orders() {
  const [{user},dispatch]= useContext(DataContext)
  const [orders,setOrders] = useState([])
  useEffect(() => {
    if (user) {
      db.collection("user")
        .doc(user.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) => {
          // console.log(snapshot);
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
    } else {
      setOrders([]);
    }
  },[]);

  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.orders_Container}>
          <h2>Your Orders</h2>
          {/* ordered items */}
          {orders?.length == 0 && (
            <div style={{ padding: "20px" }}>you don't have orders yet.</div>
          )}
          <div>
            {orders?.map((eachOrder, i) => {
              return (
                <div key={i}>
                  <hr />
                  <p>Order ID: {eachOrder.id}</p>
                  {eachOrder?.data?.basket?.map((order) => {
                    return (
                      <ProductCard product={order} key={order.id} flex={true} />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Orders