import {Link,Routes,Route} from 'react-router-dom';
import ViewAllVeg from './ViewAllVeg';
import ViewAllNonVeg from './ViewAllNonVeg';
import Login from './login';
import CartView from './viewtocart';
import MyOrders from './myoders';
import Logout from './Logout';
import Home from './Home';


const AppRoutes=()=>{
   

    return(
        <>
            <nav className='bg-dark m-2 p-2 d-flex'>
                <div className='m-1'><Link to="/viewallveg" className='btn btn-danger text-white'>View All Veg</Link></div>
                <div className='m-1'><Link to="/viewallnonveg" className='btn btn-danger text-white'>View All NonVeg</Link></div>
                <div className='m-1'><Link to="/login" className='btn btn-danger text-white'>Login</Link></div>
                <div className='m-1'><Link to="/viewcart" className='btn btn-danger text-white'>View Cart</Link></div>
                <div className='m-1'><Link to="/myorders" className='btn btn-danger text-white'>My Orders</Link></div>
                <div className='m-1'><Link to="/logout" className='btn btn-danger text-white'>Log out</Link></div>
                <div className='m-1'><Link to="/home" className='btn btn-danger text-white'>Home</Link></div>

            </nav>
            <section className='col-12 mx-auto '>
                <Routes>
                    <Route  path='/viewallveg' element={<ViewAllVeg/>}/>
                    <Route path='/viewallnonveg' element={<ViewAllNonVeg/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/viewcart' element={<CartView />} />
                    <Route path='/myorders' element={<MyOrders />} />
                    <Route path='/logout' element={<Logout/>} />
                    <Route path='/home' element={<Home/>} />
                       
                </Routes>
                
               
            </section>
           
        </>
    );

}
export default AppRoutes;











// // import { Link, Routes, Route } from 'react-router-dom';
// // import { useDispatch, useSelector } from 'react-redux';
// // import ViewAllVeg from './ViewAllVeg';
// // import ViewAllNonVeg from './ViewAllNonVeg';

// // import CartView from './viewtocart';
// // import Login from './login';
// // import MyOrders from './myoders';



// // const AppRoutes = () => {
// //     const userId = useSelector(state => state.userId); // Assuming userId is stored in Redux
// //     const dispatch = useDispatch();

// //     const handleLogout = () => {
// //         dispatch({ type: 'CLEAR_USER_ID' });
// //     };

// //     return (
// //         <>
// //             <nav className='bg-dark m-2 p-2 d-flex'>
// //                 <div className='m-1'><Link to="/viewallveg" className='btn btn-danger text-white'>View All Veg</Link></div>
// //                 <div className='m-1'><Link to="/viewallnonveg" className='btn btn-danger text-white'>View All NonVeg</Link></div>
// //                 <div className='m-1'><Link to="/viewcart" className='btn btn-danger text-white'>View Cart</Link></div>
// //                 <div className='m-1'><Link to="/myorders" className='btn btn-danger text-white'>My Orders</Link></div>
// //                 <div className='m-1'>
// //                 {!userId ? (
// //                     <Link to="/login" className='btn btn-danger text-white'>Login</Link>
// //                 ) : (   
// //                     <button onClick={handleLogout} className='btn btn-danger text-white'>Logout</button>
// //                 )}
// //                 </div>
// //             </nav>

// //             <section className='col-12 mx-auto'>
// //                 <Routes>
// //                     <Route path='/viewallveg' element={<ViewAllVeg />} />
// //                     <Route path='/viewallnonveg' element={<ViewAllNonVeg />} />
// //                     <Route path='/login' element={<Login />} />
// //                     <Route path='/viewcart' element={<CartView />} />
// //                     <Route path='/myorders' element={<MyOrders />} />
                    
// //                 </Routes>
// //             </section>
// //         </>
// //     );
// // };

// // export default AppRoutes;
// import { useState } from 'react';
// import { Link, Routes, Route } from 'react-router-dom';
// import ViewAllVeg from './ViewAllVeg';
// import ViewAllNonVeg from './ViewAllNonVeg';
// import Login from './login';
// import CartView from './viewtocart';
// import MyOrders from './myoders';
// import Logout from './Logout';

// const AppRoutes = () => {
//   const [showHome, setShowHome] = useState(true); // Control for toggling between Home and menu views

//   return (
//     <>
//       <header className="bg-dark text-white text-center p-4">
//         <h1>Welcome to Vast Restaurant</h1>
//         <p className="lead">Delicious Food Delivered to Your Doorstep</p>
//       </header>

//       <nav className="bg-dark p-2 d-flex justify-content-around">
//         <button className="btn btn-light text-dark mx-1" onClick={() => setShowHome(true)}>Home</button>
//         <Link to="/viewallveg" onClick={() => setShowHome(false)} className="btn btn-danger text-white mx-1">
//           <img src="path-to-veg-image.jpg" alt="Veg" style={{ width: '20px', marginRight: '8px' }} />
//           View All Veg
//         </Link>
//         <Link to="/viewallnonveg" onClick={() => setShowHome(false)} className="btn btn-danger text-white mx-1">
//           <img src="path-to-nonveg-image.jpg" alt="Non-Veg" style={{ width: '20px', marginRight: '8px' }} />
//           View All Non-Veg
//         </Link>
//         <Link to="/login" className="btn btn-danger text-white mx-1">Login</Link>
//         <Link to="/viewcart" className="btn btn-danger text-white mx-1">View Cart</Link>
//         <Link to="/myorders" className="btn btn-danger text-white mx-1">My Orders</Link>
//         <Link to="/logout" className="btn btn-danger text-white mx-1">Log Out</Link>
//       </nav>

//       {showHome ? (
//         <section className="container my-4">
//           <div className="text-center mb-5">
//             <h2>Explore Our Menu</h2>
//             <p>Choose from our wide variety of delicious dishes.</p>
//           </div>
//           <div className="row text-center">
//             <div className="col-md-6 mb-4">
//               <Link to="/viewallveg" onClick={() => setShowHome(false)} className="btn btn-lg btn-outline-success w-100 p-4">
//                 <img
//                   src="path-to-veg-image.jpg"
//                   alt="Veg"
//                   className="img-fluid"
//                   style={{ width: '100%', height: '200px', objectFit: 'cover' }}
//                 />
//                 <h3 className="mt-2">Explore Veg Menu</h3>
//               </Link>
//             </div>
//             <div className="col-md-6 mb-4">
//               <Link to="/viewallnonveg" onClick={() => setShowHome(false)} className="btn btn-lg btn-outline-danger w-100 p-4">
//                 <img
//                   src="path-to-nonveg-image.jpg"
//                   alt="Non-Veg"
//                   className="img-fluid"
//                   style={{ width: '100%', height: '200px', objectFit: 'cover' }}
//                 />
//                 <h3 className="mt-2">Explore Non-Veg Menu</h3>
//               </Link>
//             </div>
//           </div>
//         </section>
//       ) : (
//         <section className="container my-4">
//           <Routes>
//             <Route path="/viewallveg" element={<ViewAllVeg />} />
//             <Route path="/viewallnonveg" element={<ViewAllNonVeg />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/viewcart" element={<CartView />} />
//             <Route path="/myorders" element={<MyOrders />} />
//             <Route path="/logout" element={<Logout />} />
//           </Routes>
//         </section>
//       )}
//     </>
//   );
// };

// export default AppRoutes;
