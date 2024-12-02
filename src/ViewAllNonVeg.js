import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import './App.css';

const ViewAllNonVeg = () => {
    const [nonVeg, setNonVeg] = useState([]);
    const [errMsg, setErrMsg] = useState('');
    const [msg, setMsg] = useState('');
    
    const userloginId = useSelector((state) => state.User.userId); // Redux userId

    const fetchAllNonVeg = () => {
        fetch("http://localhost:8080/VastRestaurant/viewnonvegfoods")
            .then(response => response.json())
            .then(json => {
                if (json && Array.isArray(json.foods)) {
                    const foodsWithQuantity = json.foods.map(food => ({ ...food, quantity: 0 }));
                    setNonVeg(foodsWithQuantity); 
                } else {
                    setErrMsg("Unexpected response format");
                    setTimeout(() => setErrMsg(''), 1500);
                }
            })
            .catch(error => {
                setErrMsg("Error fetching data: " + error.message);
                setTimeout(() => setErrMsg(''), 1500);
            });
    };

    useEffect(() => {
        fetchAllNonVeg(); 
    }, []);

    const incrementQuantity = (foodId) => {
        setNonVeg(prevNonVeg =>
            prevNonVeg.map(item => 
                item.foodId === foodId ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const decrementQuantity = (foodId) => {
        setNonVeg(prevNonVeg =>
            prevNonVeg.map(item => 
                item.foodId === foodId && item.quantity > 0 ? { ...item, quantity: item.quantity - 1 } : item
            )
        );
    };

    const handleAddToCart = (food) => {
        const userId = userloginId

        if (!userId) {
            setErrMsg("User not logged in.");
            return;
        }
    
        fetch("http://localhost:8080/VastRestaurant/addtocart", {
            method: "POST",
            Headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId : userId,
                foodId: food.foodId,
                foodName: food.foodName,
                foodPrice: food.foodPrice,
                quantity: food.quantity
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                setMsg("Item added to cart successfully!");
            } else {
                setErrMsg("Failed to add item to cart.");
            }
            setTimeout(() => setErrMsg(''), 1500);
            setTimeout(() => setMsg(''), 1500);
        })
        .catch(error => {
            console.error("Error adding to cart:", error);
            setErrMsg("Error adding to cart: " + error.message);
        });
    };

    return (
        <article className="m-2">
            <div>
                <h1>Welcome, {userloginId}</h1>
            </div>
            <div className="text-danger text-center view"><h3>{errMsg}</h3></div>
            <div className="text-success text-center"><h3>{msg}</h3></div>
            <div className="container col-8">
                <table className="table table-primary table-hover">
                    <thead>
                        <tr className="table-danger">
                            <th>Food Id</th>
                            <th>Food Name</th>
                            <th>Food Price</th>
                            <th>Food Rating</th>
                            <th>Food Type</th>
                            <th>Quantity</th>
                            <th>Add To Cart</th>
                        </tr>
                    </thead>
                    <tbody>
                        {nonVeg.map(e => (
                            <tr key={e.foodId}>
                                <td>{e.foodId}</td>
                                <td>{e.foodName}</td>
                                <td>{e.foodPrice}</td>
                                <td>{e.foodRating}</td>
                                <td>{e.foodType}</td>
                                <td>
                                    <button className="btn btn-dark text-white" onClick={() => incrementQuantity(e.foodId)}>+</button>
                                    {e.quantity}
                                    <button className="btn btn-dark text-white" onClick={() => decrementQuantity(e.foodId)}>-</button>
                                </td>
                                <td>
                                    <button className="btn btn-success" onClick={() => handleAddToCart(e)}>Add to Cart</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </article>
    );
};

export default ViewAllNonVeg;
