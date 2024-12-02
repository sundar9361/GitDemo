import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [errMsg, setErrMsg] = useState('');
  const [msg, setMsg] = useState('');

  const userloginId = useSelector((state) => state.User.userId); // Redux userId

  const userId = userloginId ;

  useEffect(() => {
    if (!userId) {
      setErrMsg('Please log in to view your orders.');
      return;
    }

    // Fetch the order details for the logged-in user
    
    fetch("http://localhost:8080/VastRestaurant/getorders", {
        method: "GET",
        credentials: "include",
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data.error) {
          setErrMsg(data.error);  // Handle error from backend
        } else if (Array.isArray(data.orders)) {
          setOrders(data.orders);
          setErrMsg(''); // Clear error message if data is successfully retrieved
        } else {
          setErrMsg("No orders found.");
        }
      })
      .catch(error => {
        console.error('Error fetching orders:', error);
        setErrMsg("Error fetching order details.");
      });
  }, [userId]);

  return (
    <div className="container">
      <h1>My Orders</h1>
      {errMsg && <div className="text-danger">{errMsg}</div>}
      {msg && <div className="text-success">{msg}</div>}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Food Items</th>
            <th>Total Price</th>
            <th>Payment Option</th>
            <th>Order Date</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map(order => (
              <tr key={order.order_id}>
                <td>{order.order_id}</td>
                <td>
                  {Array.isArray(order.cart_items) && order.cart_items.length > 0 ? (
                    order.cart_items.map((item, index) => (
                      <div key={index}>
                        {item.foodName} (x{item.quantity}) - ₹{item.foodPrice * item.quantity}
                      </div>
                    ))
                  ) : (
                    <div>No items found</div>
                  )}
                </td>
                <td>{order.total_price}</td>
                <td>{order.payment_option}</td>
                <td>{order.order_date}</td>
                <td>{order.location || 'N/A'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">No orders available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MyOrders;

