import { useEffect, useState } from "react";
import SmallScreenLoading from "./SmallScreenLoading";
import { useForm } from "react-hook-form";
import axios from "axios";
import TodoView from "./TodoView";

function Categories({ category, setTodoData }) {
  const [edit, setEdit] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [viewAll, setViewAll] = useState(false);
  const [active, setActive] = useState("Pending");
  const [addTodo, setAddTodo] = useState(false);
  const { register, handleSubmit } = useForm();
  const apiUri = import.meta.env.VITE_API_URI;

  const [pendingTodos, setPendingTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);

  useEffect(() => {
    setCategoryName(category.categoryName);
  }, [category]);

  useEffect(() => {
    // console.log(category);
    const pending = category.todosDetails
      .filter((todo) => todo.isActive)
      .map((todo) => ({ ...todo, categoryId: category._id }));
    const completed = category.todosDetails
      .filter((todo) => !todo.isActive)
      .map((todo) => ({ ...todo, categoryId: category._id }));
    setPendingTodos(pending);
    setCompletedTodos(completed);
  }, [category]);

  const handleToggle = (status) => {
    setActive(status);
  };
  const handleTodoSubmit = async (data) => {
    setAddTodo(false);
    try {
      const response = await axios.post(
        `${apiUri}/todo/addTodo`,
        { ...data, categoryId: category._id },
        {
          withCredentials: true,
        }
      );
      const res = await axios.get(`${apiUri}/todo/getAllTodo`, {
        withCredentials: true,
      });
      setTodoData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteCategory = async () => {
    try {
      await axios.post(
        `${apiUri}/todo/deleteCategory`,
        { categoryId: category._id },
        { withCredentials: true }
      );
      const res = await axios.get(`${apiUri}/todo/getAllTodo`, {
        withCredentials: true,
      });
      setTodoData(res.data.data);
    } catch (error) {
      console.log();
    }
  };

  const handleCategoryEditClick = async () => {
    setEdit(!edit);
    try {
      await axios.post(
        `${apiUri}/todo/updateCategoryName`,
        { categoryName, categoryId: category._id },
        { withCredentials: true }
      );
      const res = await axios.get(`${apiUri}/todo/getAllTodo`, {
        withCredentials: true,
      });
      setTodoData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateTodoStatus = async (todoData) => {
    try {
      const response = await axios.post(
        `${apiUri}/todo/updateTodo`,
        { isActive: !todoData.isActive, todoId: todoData._id },
        {
          withCredentials: true,
        }
      );
      
      const res = await axios.get(`${apiUri}/todo/getAllTodo`, {
        withCredentials: true,
      });
      setTodoData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteTodo = async (todoData) => {
    try {
      const response = await axios.post(
        `${apiUri}/todo/deleteTodo`,
        { categoryId: todoData.categoryId, todoId: todoData._id },
        {
          withCredentials: true,
        }
      );
      
      const res = await axios.get(`${apiUri}/todo/getAllTodo`, {
        withCredentials: true,
      });
      setTodoData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full flex flex-col gap-1 select-none">
      <div className="w-full md:p-8 py-7 px-5  rounded-lg border border-[rgba(255,255,255,0.10)] flex items-center justify-between">
        <div>
          {!edit ? (
            <h1 className="text-white">{categoryName}</h1>
          ) : (
            <input
              autoFocus
              onChange={(e) => setCategoryName(e.target.value)}
              className="md:p-4 p-1 md:w-full w-32 bg-transparent border border-[rgba(255,255,255,0.10)] rounded-lg text-white "
              value={categoryName}
              type="text"
            />
          )}
        </div>
        <div className="flex items-center gap-8">
          {edit ? (
            <button
              onClick={handleCategoryEditClick}
              className="text-white hover:bg-white hover:text-black ease-in transition-all font-semibold border px-2 py-1 rounded-md"
            >
              Save
            </button>
          ) : (
            <svg
              onClick={() => setEdit(!edit)}
              className="cursor-pointer"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_54_41)">
                <path
                  d="M13 3C13.2549 3.00028 13.5 3.09788 13.6854 3.27285C13.8707 3.44782 13.9822 3.68695 13.9972 3.94139C14.0121 4.19584 13.9293 4.44638 13.7657 4.64183C13.6021 4.83729 13.3701 4.9629 13.117 4.993L13 5H5V19H19V11C19.0003 10.7451 19.0979 10.5 19.2728 10.3146C19.4478 10.1293 19.687 10.0178 19.9414 10.0028C20.1958 9.98789 20.4464 10.0707 20.6418 10.2343C20.8373 10.3979 20.9629 10.6299 20.993 10.883L21 11V19C21.0002 19.5046 20.8096 19.9906 20.4665 20.3605C20.1234 20.7305 19.6532 20.9572 19.15 20.995L19 21H5C4.49542 21.0002 4.00943 20.8096 3.63945 20.4665C3.26947 20.1234 3.04284 19.6532 3.005 19.15L3 19V5C2.99984 4.49542 3.19041 4.00943 3.5335 3.63945C3.87659 3.26947 4.34684 3.04284 4.85 3.005L5 3H13ZM19.243 3.343C19.423 3.16365 19.6644 3.05953 19.9184 3.05177C20.1723 3.04402 20.4197 3.13322 20.6103 3.30125C20.8008 3.46928 20.9203 3.70355 20.9444 3.95647C20.9685 4.2094 20.8954 4.46201 20.74 4.663L20.657 4.758L10.757 14.657C10.577 14.8363 10.3356 14.9405 10.0816 14.9482C9.82767 14.956 9.58029 14.8668 9.38972 14.6988C9.19916 14.5307 9.07969 14.2964 9.0556 14.0435C9.03151 13.7906 9.10459 13.538 9.26 13.337L9.343 13.243L19.243 3.343Z"
                  fill="#565656"
                />
              </g>
              <defs>
                <clipPath id="clip0_54_41">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          )}

          <svg
            onClick={handleDeleteCategory}
            className="cursor-pointer"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 19C6 19.5304 6.21071 20.0391 6.58579 20.4142C6.96086 20.7893 7.46957 21 8 21H16C16.5304 21 17.0391 20.7893 17.4142 20.4142C17.7893 20.0391 18 19.5304 18 19V7H6V19ZM8 9H16V19H8V9ZM15.5 4L14.5 3H9.5L8.5 4H5V6H19V4H15.5Z"
              fill="#565656"
            />
          </svg>

          {viewAll ? (
            <svg
              onClick={() => setViewAll(!viewAll)}
              className="cursor-pointer"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 7L17 17M7 17L17 7"
                stroke="#565656"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg
              onClick={() => setViewAll(!viewAll)}
              className="cursor-pointer"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_58_55)">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.7071 15.7071C12.5196 15.8946 12.2653 15.9999 12.0001 15.9999C11.7349 15.9999 11.4806 15.8946 11.2931 15.7071L5.6361 10.0501C5.54059 9.95785 5.46441 9.84751 5.412 9.7255C5.35959 9.6035 5.332 9.47228 5.33085 9.3395C5.32969 9.20672 5.355 9.07504 5.40528 8.95215C5.45556 8.82925 5.52981 8.7176 5.6237 8.6237C5.7176 8.52981 5.82925 8.45556 5.95214 8.40528C6.07504 8.355 6.20672 8.32969 6.3395 8.33085C6.47228 8.332 6.6035 8.35959 6.7255 8.412C6.84751 8.46441 6.95785 8.54059 7.0501 8.6361L12.0001 13.5861L16.9501 8.6361C17.1387 8.45394 17.3913 8.35315 17.6535 8.35542C17.9157 8.3577 18.1665 8.46287 18.3519 8.64828C18.5373 8.83369 18.6425 9.0845 18.6448 9.3467C18.6471 9.60889 18.5463 9.8615 18.3641 10.0501L12.7071 15.7071Z"
                  fill="#565656"
                />
              </g>
              <defs>
                <clipPath id="clip0_58_55">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          )}
        </div>
      </div>

      {viewAll ? (
        <div className="w-full md:p-8 p-1 rounded-lg border border-[rgba(255,255,255,0.10)] flex flex-col gap-2">
          <div
            onClick={() => setAddTodo(!addTodo)}
            className="w-full hover:bg-[#202020] p-1 text-white flex flex-col justify-center rounded-lg border border-[rgba(255,255,255,0.10)] items-center"
          >
            <h1>+</h1>
          </div>
          {/* add todo */}
          {addTodo ? (
            <div className="w-full">
              <div className=" rounded-lg  border border-[rgba(255,255,255,0.10)] p-1">
                <form
                  onSubmit={handleSubmit(handleTodoSubmit)}
                  className="flex flex-col gap-1 text-white"
                >
                  <input
                    {...register("todoTitle", { required: true })}
                    placeholder="Todo title"
                    className="p-2 rounded-lg border border-[rgba(255,255,255,0.10)] bg-transparent"
                    type="text"
                    name="todoTitle"
                    id="todoTitle"
                  />
                  <input
                    {...register("todoContent", { required: true })}
                    placeholder="Todo description"
                    className="p-2 rounded-lg border border-[rgba(255,255,255,0.10)] bg-transparent"
                    type="text"
                    name="todoContent"
                    id="todoContent"
                  />
                  <button type="submit">Save</button>
                </form>
              </div>
            </div>
          ) : // --------------------------------------------------------
          null}
          <div className="w-full flex items-center text-white">
            <div
              onClick={() => handleToggle("Pending")}
              className={`hover:bg-[#212121] w-1/2 flex justify-center items-center p-1 rounded-lg border border-[rgba(255,255,255,0.10)] ${
                active === "Pending" ? "bg-[#212121]" : ""
              }`}
            >
              <h3>Pending</h3>
            </div>
            <div
              onClick={() => handleToggle("Completed")}
              className={`hover:bg-[#212121] w-1/2 flex justify-center items-center p-1 rounded-lg border border-[rgba(255,255,255,0.10)] ${
                active === "Completed" ? "bg-[#212121]" : ""
              }`}
            >
              <h3>Completed</h3>
            </div>
          </div>
          {active === "Pending"
            ? pendingTodos.map((todo, index) => (
                <TodoView
                  active="Pending"
                  deleteTodo= {deleteTodo}
                  updateTodoStatus={updateTodoStatus}
                  todoData={todo}
                  key={index}
                />
              ))
            : completedTodos.map((todo, index) => (
                <TodoView
                  active="Completed"
                  deleteTodo= {deleteTodo}
                  updateTodoStatus={updateTodoStatus}
                  todoData={todo}
                  key={index}
                />
              ))}

          {/* <SmallScreenLoading /> */}
        </div>
      ) : null}
    </div>
  );
}

export default Categories;
