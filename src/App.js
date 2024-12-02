
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import {BrowserRouter} from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { setUserId } from "./action_reducer_store/vastAction";
import { useEffect} from 'react';
import { useDispatch } from "react-redux";

function App(){
  const dispatch = useDispatch();
  useEffect(() => {
    const storedUserId = sessionStorage.getItem("userSession");
    if (storedUserId) {
        dispatch(setUserId(storedUserId)); 
    }
  }, [dispatch]);
  return (
    <div>
      <header className="text-white-50 bg-dark p-2 h-200">
        <h1>VAST RESTAURANT</h1>
      </header>
      <BrowserRouter>
        <AppRoutes/>
      </BrowserRouter>
    </div>
  );
}
export default App;