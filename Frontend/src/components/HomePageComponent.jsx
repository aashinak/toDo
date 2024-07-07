import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { logout as authLogout } from "../store/authSlice";
import { useEffect, useState } from "react";
import Categories from "./Categories";
import FullScreenLoading from "./FullScreenLoading";

function HomePageComponent() {
  const apiUri = import.meta.env.VITE_API_URI;
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);
  const [username, setUsername] = useState("");
  const [fullScreenLoading, setFullScreenLoading] = useState(false);
  const [todoData, setTodoData] = useState([]);
  const [category, setCategory] = useState("");

  useEffect(() => {
    setUsername(userData?.data.username);
    const fetchData = async () => {
      try {
        setFullScreenLoading(true); // Start loading

        const response = await axios.get(`${apiUri}/todo/getAllTodo`, {
          withCredentials: true,
        });
        setTodoData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setFullScreenLoading(false);
      }
    };
    if (userData && apiUri) {
      fetchData();
    }
  }, [userData, apiUri]);

  const handleLogout = async () => {
    try {
      setFullScreenLoading(true);
      await axios.post(`${apiUri}/users/logout`, {}, { withCredentials: true });
      dispatch(authLogout());
      setFullScreenLoading(false);
    } catch (error) {
      console.log();
    }
  };

  

  const handleCreateCategory = async () => {
    if (category !== "") {
      try {
        const response = await axios.post(
          `${apiUri}/todo/createCategory`,
          { categoryName: category },
          { withCredentials: true }
        );
        

        setFullScreenLoading(true); // Start loading

        const res = await axios.get(`${apiUri}/todo/getAllTodo`, {
          withCredentials: true,
        });
        setTodoData(res.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setFullScreenLoading(false);
      }
    }
  };

  
  return fullScreenLoading ? (
    <FullScreenLoading />
  ) : (
    <div className="bg-[#151515] w-full min-h-screen flex justify-center">
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

      <div className="md:w-[45%] h-min md:mt-20 border border-[rgba(255,255,255,0.45)] p-6 rounded-lg flex flex-col gap-4 ">
        <div className="text-white flex">
          <input
            onChange={(e) => setCategory(e.target.value)}
            type="text"
            placeholder="Category"
            className="rounded-l-lg w-full bg-transparent border border-[rgba(255,255,255,0.25)] p-4"
          />
          <button
            onClick={handleCreateCategory}
            className="w-[25%] bg-[#191919] border border-[rgba(255,255,255,0.25)] p-4 rounded-r-lg hover:bg-white ease-in transition-all hover:text-black font-semibold"
          >
            Create
          </button>
        </div>

        {todoData.map((category, index) => {
          return <Categories setTodoData={setTodoData} category={category} key={index} />;
        })}
      </div>
    </div>
  );
}

export default HomePageComponent;
