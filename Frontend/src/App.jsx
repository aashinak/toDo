import { Outlet } from "react-router-dom";
import "./App.css";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login as authLogin } from "./store/authSlice";

function App() {
  const dispatch = useDispatch()
  const apiUri = import.meta.env.VITE_API_URI;
  
  useEffect(() => {
    axios
      .get(`${apiUri}/users/getCurrentUser`, {
        withCredentials: true,
      })
      .then((res) => {
        const userData = res.data
        if(userData){
          dispatch(authLogin({userData}))
        }
      });
  });
  return (
    <div className="overflow-auto scrollbar-hidden relative h-screen">
      <Outlet />
    </div>
  );
}

export default App;
