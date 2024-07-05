import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from 'axios'

function LoginComponent() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate()
  const login = async (data) => {
    const response = await axios.post("http://localhost:4000/users/logout",data)
    console.log(response.data);
    navigate("/")
  };
  return (
    <div className="w-full min-h-screen bg-[#151515] flex justify-center items-center flex-col ">
      <form 
        onSubmit={handleSubmit(login)}
        className="rounded-lg w-[70%] sm:w-[60%] md:w-[50%] lg:w-[35%] xl:w-[30%] text-white border border-[rgba(255,255,255,0.45)] p-6 gap-4  flex flex-col"
      >
        <h1 className="text-center text-2xl text-white mb-4">Login</h1>
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
          Login
        </button>
        <p className="text-center">
          Dont have an account{" "}
          <u>
            <Link to={"/signup"}>Signup</Link>
          </u>
        </p>
      </form>
    </div>
  );
}

export default LoginComponent