
// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// const CartView = () => {
//     const reduxUserId = useSelector(state => state.User.userId);
//     const [cartItems, setCartItems] = useState([]);
//     const [totalPrice, setTotalPrice] = useState(0);
//     const [error, setError] = useState('');
//     const [successMsg, setSuccessMsg] = useState('');
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [location, setLocation] = useState('');
//     const [paymentOption] = useState('Cash on Delivery');
//     const [isLocationValid, setIsLocationValid] = useState(true);
//     const navigate = useNavigate();

//     useEffect(() => {
//         fetch("http://localhost:8080/VastRestaurant/viewcart", {
//             method: "GET",
//             credentials: "include",
//         })
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error("Failed to fetch cart items.");
//             }
//             return response.json();
//         })
//         .then(data => {
//             if (data && Array.isArray(data.carts)) {
//                 setCartItems(data.carts);
//                 const total = data.carts.reduce((sum, item) => sum + item.foodPrice * item.quantity, 0);
//                 setTotalPrice(total);
//             } else {
//                 setError("Unexpected response format from server.");
//             }
//         })
//         .catch(error => {
//             console.error("Error fetching cart items:", error);
//             setError("Error fetching cart items. Please try again later.");
//         });
//     }, [reduxUserId]);

//     const handlePlaceOrder = () => {
//         if (cartItems.length === 0) {
//             setError("Cart is empty. Add items to your cart before placing an order.");
//             return;
//         }
//         setIsModalOpen(true);
//     };

//     const handleConfirmOrder = () => {
//         if (!location.trim()) {
//             setIsLocationValid(false);
//             setError("Please enter a valid location.");
//             return;
//         }
//         setIsLocationValid(true);

//         const orderDetails = {
//             userId: reduxUserId,
//             cartId: cartItems.map(item => item.cartId),
//             items: cartItems,
//             totalPrice,
//             location,
//             paymentOption,
//             date: new Date().toISOString(),
//         };

//         fetch("http://localhost:8080/VastRestaurant/placeorder", {
//             method: "POST",
//             Headers: {
//                 "Content-Type": "application/json",
//             },
//             credentials: "include",
//             body: JSON.stringify(orderDetails),
//         })
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error("Failed to place order.");
//             }
//             return response.json();
//         })
//         .then(data => {
//             if (data.success) {
//                 setSuccessMsg(`Order placed successfully! Your order will be delivered to ${location}. Total Bill: $${totalPrice.toFixed(2)}`);
//                 setCartItems([]);
//                 setTotalPrice(0);
//                 setLocation('');
//             } else {
//                 setError(data.message || "Failed to place order.");
//             }
//         })
//         .catch(error => {
//             console.error("Error placing order:", error);
//             setError("Error placing order: " + error.message);
//         })
//         .finally(() => {
//             setIsModalOpen(false);
//         });
//     };

//     const navigateHome = () => {
//         navigate("/");
//     };

//     return (
//         <div className="container mt-4">
//             <h2>Your Cart</h2>
//             {error && <div className="alert alert-danger text-center">{error}</div>}

//             {successMsg ? (
//                 <div className="alert alert-success text-center">{successMsg}</div>
//             ) : (
//                 cartItems.length === 0 && <div className="alert alert-info text-center">No items in cart.</div>
//             )}

//             {cartItems.length > 0 && (
//                 <>
//                     <table className="table table-hover">
//                         <thead>
//                             <tr>
//                                 <th>Food Name</th>
//                                 <th>Price</th>
//                                 <th>Quantity</th>
//                                 <th>Total Price</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {cartItems.map(item => (
//                                 <tr key={item.cartId}>
//                                     <td>{item.foodName}</td>
//                                     <td>${item.foodPrice.toFixed(2)}</td>
//                                     <td>{item.quantity}</td>
//                                     <td>${(item.foodPrice * item.quantity).toFixed(2)}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>

//                     <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
//                     <button className="btn btn-primary mt-3" onClick={handlePlaceOrder}>
//                         Place Order
//                     </button>
//                 </>
//             )}

//             {isModalOpen && (
//                 <div className="modal fade show" style={{ display: 'block' }}>
//                     <div className="modal-dialog">
//                         <div className="modal-content">
//                             <div className="modal-header">
//                                 <h5 className="modal-title">Order Confirmation</h5>
//                                 <button type="button" className="close" onClick={() => setIsModalOpen(false)}>
//                                     &times;
//                                 </button>
//                             </div>
//                             <div className="modal-body">
//                                 <p><strong>User ID:</strong> {reduxUserId}</p>
//                                 <p><strong>Total Amount:</strong> ${totalPrice.toFixed(2)}</p>
//                                 <div className="form-group">
//                                     <label htmlFor="location">Enter Location</label>
//                                     <input
//                                         id="location"
//                                         className="form-control"
//                                         value={location}
//                                         onChange={(e) => setLocation(e.target.value)}
//                                         placeholder="Enter your delivery location"
//                                     />
//                                     {!isLocationValid && <small className="text-danger">Please enter a valid location.</small>}
//                                 </div>
//                                 <div className="form-group">
//                                     <label htmlFor="payment">Payment Option</label>
//                                     <select
//                                         id="payment"
//                                         className="form-control"
//                                         value={paymentOption}
//                                         onChange={() => {}}
//                                         disabled
//                                     >
//                                         <option>Cash on Delivery</option>
//                                     </select>
//                                 </div>
//                             </div>
//                             <div className="modal-footer">
//                                 <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
//                                     Cancel
//                                 </button>
//                                 <button type="button" className="btn btn-primary" onClick={handleConfirmOrder}>
//                                     Confirm Order
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             <button className="btn btn-secondary mt-3" onClick={navigateHome}>
//                 Go to Home
//             </button>
//         </div>
//     );
// };

// export default CartView;
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CartView = () => {
    const reduxUserId = useSelector(state => state.User.userId);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [location, setLocation] = useState('');
    const [paymentOption] = useState('Cash on Delivery');
    const [isLocationValid, setIsLocationValid] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:8080/VastRestaurant/viewcart", {
            method: "GET",
            credentials: "include",
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch cart items.");
            }
            return response.json();
        })
        .then(data => {
            if (data && Array.isArray(data.carts)) {
                setCartItems(data.carts);
                const total = data.carts.reduce((sum, item) => sum + item.foodPrice * item.quantity, 0);
                setTotalPrice(total);
            } else {
                setError("Unexpected response format from server.");
            }
        })
        .catch(error => {
            console.error("Error fetching cart items:", error);
            setError("Please log in to view your cart items.");
        });
    }, [reduxUserId]);

    const handlePlaceOrder = () => {
        if (cartItems.length === 0) {
            setError("Cart is empty. Add items to your cart before placing an order.");
            return;
        }
        setIsModalOpen(true);
    };

    const handleConfirmOrder = () => {
        if (!location.trim()) {
            setIsLocationValid(false);
            setError("Please enter a valid location.");
            return;
        }
        setIsLocationValid(true);

        const orderDetails = {
            userId: reduxUserId,
            cartId: cartItems.map(item => item.cartId),
            items: cartItems,
            totalPrice,
            location,
            paymentOption,
            date: new Date().toISOString(),
        };

        fetch("http://localhost:8080/VastRestaurant/placeorder", {
            method: "POST",
            Headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(orderDetails),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to place order.");
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                setSuccessMsg(`Order placed successfully! Your order will be delivered to ${location}. Total Bill: $${totalPrice.toFixed(2)}`);
                setCartItems([]);
                setTotalPrice(0);
                setLocation('');
            } else {
                setError(data.message || "Failed to place order.");
            }
        })
        .catch(error => {
            console.error("Error placing order:", error);
            setError("Error placing order: " + error.message);
        })
        .finally(() => {
            setIsModalOpen(false);
        });
    };

    const navigateHome = () => {
        navigate("/");
    };

    return (
        <div className="container mt-4">
            <h2>Your Cart</h2>
            {error && <div className="alert alert-danger text-center">{error}</div>}

            {successMsg ? (
                <div className="alert alert-success text-center">{successMsg}</div>
            ) : (
                cartItems.length === 0 && !error && <div className="alert alert-info text-center">No items in cart.</div>
            )}

            {reduxUserId && cartItems.length > 0 && (
                <>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Food Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map(item => (
                                <tr key={item.cartId}>
                                    <td>{item.foodName}</td>
                                    <td>${item.foodPrice.toFixed(2)}</td>
                                    <td>{item.quantity}</td>
                                    <td>${(item.foodPrice * item.quantity).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
                    <button className="btn btn-primary mt-3" onClick={handlePlaceOrder}>
                        Place Order
                    </button>
                </>
            )}

            {isModalOpen && (
                <div className="modal fade show" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Order Confirmation</h5>
                                <button type="button" className="close" onClick={() => setIsModalOpen(false)}>
                                    &times;
                                </button>
                            </div>
                            <div className="modal-body">
                                <p><strong>User ID:</strong> {reduxUserId}</p>
                                <p><strong>Total Amount:</strong> ${totalPrice.toFixed(2)}</p>
                                <div className="form-group">
                                    <label htmlFor="location">Enter Location</label>
                                    <input
                                        id="location"
                                        className="form-control"
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        placeholder="Enter your delivery location"
                                    />
                                    {!isLocationValid && <small className="text-danger">Please enter a valid location.</small>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="payment">Payment Option</label>
                                    <select
                                        id="payment"
                                        className="form-control"
                                        value={paymentOption}
                                        onChange={() => {}}
                                        disabled
                                    >
                                        <option>Cash on Delivery</option>
                                    </select>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
                                    Cancel
                                </button>
                                <button type="button" className="btn btn-primary" onClick={handleConfirmOrder}>
                                    Confirm Order
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <button className="btn btn-secondary mt-3" onClick={navigateHome}>
                Go to Home
            </button>
        </div>
    );
};

export default CartView;
