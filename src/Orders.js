import React, { useEffect, useState } from 'react';
import './Orders.css';
import { db } from './firebase';
import { useStateValue } from "./StateProvider";
import Order from './Order';

// Import Firestore methods
import { collection, doc, query, orderBy, onSnapshot } from 'firebase/firestore';

function Orders() {
  const [{ user }] = useStateValue();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      // Use the new Firestore query syntax
      const userOrdersRef = collection(db, 'users', user?.uid, 'orders');
      const q = query(userOrdersRef, orderBy('created', 'desc'));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        setOrders(snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        })));
      });

      // Cleanup the subscription when the component unmounts
      return () => unsubscribe();
    } else {
      setOrders([]);
    }
  }, [user]);

  return (
    <div className='orders'>
      <h1>Your Orders</h1>
      <div className='orders__order'>
        {orders?.map(order => (
          <Order key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}

export default Orders;
