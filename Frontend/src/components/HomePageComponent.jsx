import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { logout as authLogout } from "../store/authSlice";
import { useEffect, useState } from "react";

function HomePageComponent() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);
  const [username, setUsername] = useState("");
  useEffect(() => {
    setUsername(userData?.data.username);
  }, [userData]);
  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:4000/users/logout",
        {},
        { withCredentials: true }
      );
      dispatch(authLogout());
    } catch (error) {
      console.log();
    }
  };
  return (
    <div className="bg-[#151515] w-full min-h-screen flex justify-center items-center">
      <div className="absolute top-9 right-9 flex gap-5 items-center">
        <h1 className="text-white font-semibold text-lg">
          {username?.charAt(0).toUpperCase() + username?.slice(1)}
        </h1>
        <img
          onClick={handleLogout}
          className="cursor-pointer w-6 h-6"
          src="./src/assets/logout.png"
        />
      </div>

      <div className="md:w-[45%] border border-[rgba(255,255,255,0.45)] p-6 rounded-lg">
        <div className="text-white flex">
          <input
            type="text"
            placeholder="Category"
            className="rounded-l-lg w-full bg-transparent border border-[rgba(255,255,255,0.25)] p-4"
          />
          <button className="w-[25%] bg-[#191919] border border-[rgba(255,255,255,0.25)] p-4 rounded-r-lg hover:bg-white ease-in transition-all hover:text-black font-semibold">
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePageComponent;
