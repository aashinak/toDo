import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import FullScreenLoading from "./FullScreenLoading";
function SignUpComponent() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const signup = async (data) => {
    setLoading(true)
    const apiUri = import.meta.env.VITE_API_URI;
    const response = await axios.post(
     `${apiUri}/users/signup`,
      data
    );
    navigate("/login");
    setLoading(false)
  };

  return (
    loading? <FullScreenLoading/> :
    <div className="w-full min-h-screen bg-[#151515] flex justify-center items-center flex-col ">
      <form
        onSubmit={handleSubmit(signup)}
        className="rounded-lg w-[90%]  sm:w-[60%] md:w-[50%] lg:w-[35%] xl:w-[30%] text-white border border-[rgba(255,255,255,0.45)] p-6 gap-4  flex flex-col"
      >
        <h1 className="text-center text-2xl text-white mb-4">Signup</h1>
        <input
          placeholder="Username"
          className="bg-transparent border border-[rgba(255,255,255,0.25)] p-4 rounded-lg"
          type="text"
          name="username"
          id="username"
          {...register("username", { required: true })}
        />
        <input
          placeholder="Email"
          className="bg-transparent border border-[rgba(255,255,255,0.25)] p-4 rounded-lg"
          type="email"
          name="email"
          id="email"
          {...register("email", { required: true })}
        />
        <input
          placeholder="Password"
          className="bg-transparent border border-[rgba(255,255,255,0.25)] p-4 rounded-lg"
          type="password"
          name="password"
          id="password"
          {...register("password", { required: true })}
        />
        <button
          type="submit"
          className="hover:bg-white ease-in transition-all hover:text-black font-semibold rounded-lg bg-transparent border border-[rgba(255,255,255,0.25)] p-4"
        >
          Signup
        </button>
        <p className="text-center">
          Already have an account{" "}
          <u>
            <Link to={"/login"}>Login</Link>
          </u>
        </p>
      </form>
    </div>
  );
}

export default SignUpComponent;
