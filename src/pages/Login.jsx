
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "../redux/slice/userSlice";
import plusImage from "../assets/loginImg.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill all the fields");
      return;
    }
    try {
      setIsSubmitting(true);
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/login`, {
        email,
        password,
      });

      if (response.status === 200) {
        toast.success("Login successfully");
        const token = response.data.data.token;
        const userData = response.data.data.user;

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("role", userData.role);
        dispatch(login({
          user: userData, token 
        }));

        if(userData.role === "student"){
          if(!userData.isProfileCompleted){
            navigate("/userdashboard");
          }else{
            navigate("/");
          }
        }else if(userData.role === "company"){
          if(!userData.isProfileCompleted){
            navigate("/companydashboard");
          }else{
            navigate("/");
          }
        }
        else{
          navigate("/dashboard");
        }
      }
    } catch (error) {
      setIsSubmitting(false);
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div className=" grid grid-cols-1 md:grid-cols-2">
      {/* left */}
      <div className="hidden md:flex flex-col min-h-screen justify-center items-center rounded-r-3xl" style={{
        backgroundImage: `url(${plusImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
        
      </div>

      {/* right */}
      <div className="flex items-center justify-center min-h-screen p-4 md:p-6 text-primary">
        <section className="bg-white w-full max-w-md ">
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
            Unlock Opportunities, Connect, Learn, and Grow.
            </h2>
            <form className="flex flex-col" onSubmit={handleSubmit}>
              <label className="text-lg font-medium mb-1">Enter Email</label>
              <input
                className="py-2 px-4 rounded-md border border-gray-300 outline-none focus:border-techBlue-500"
                type="email"
                placeholder="example@gmail.com"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <label className="text-lg font-medium mt-4 mb-1">
                Enter Password
              </label>
              <input
                className="py-2 px-4 rounded-md border border-gray-300 outline-none focus:border-techBlue-500"
                type="password"
                placeholder="Password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              {isSubmitting ? (
                <button
                  type="button"
                  disabled
                  className="mt-10 p-0 bg-primary rounded d-flex align-items-center justify-content-center w-full text-xl py-2 cursor-not-allowed"
                >
                  Submitting...
                </button>
              ) : (
                <button
                  type="submit"
                  className="text-white mt-10 bg-primary rounded w-full text-xl py-2"
                >
                  Log In
                </button>
              )}
            </form>
            <div className="flex text-lg">
              <p>Create new account ?</p>
              <Link className="ml-4" to="/signup">
                Sign Up
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Login;
