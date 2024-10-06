import API from "../../env"; 
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    if (!email || !password) {
      toast.error("Please fill all the fields");
      return;
    }
    try {
      setIsSubmitting(true);
      const response = await axios.post(`${API}/api/login`, {
        email,
        password
      });

      if (response.status === 200) {
        toast.success("Login successfully");
        const token = response.data.data.token;
        localStorage.setItem("token", token);
        navigate("/");
      }
      
    } catch (error) {
      setIsSubmitting(false);
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message ); 
      } else {
        toast.error("Something went wrong");
      }
    } 
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 py-10">
      {/* left */}
      <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-tr from-techBlue-600 via-blue-500 to-techBlue-500 rounded-r-3xl">
        <h1 className="text-white text-4xl md:text-5xl font-bold mb-4 text-center">
          Welcome back to Tech Help
        </h1>
        <p className="text-white text-lg md:text-xl text-center">
          Your gateway to mentorship, blogs, and jobs.
        </p>
      </div>

      {/* right */}
      <div className="flex items-center justify-center min-h-screen p-4 md:p-6 text-primary">
        <section className="bg-white shadow-2xl p-6 md:p-10 rounded-md w-full max-w-md z-10">
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
              Sign Up
            </h2>
            <form className="flex flex-col" onSubmit={handleSubmit}>
              <label className="text-lg font-semibold mb-2">Enter Email</label>
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
            
              <label className="text-lg font-semibold mb-2">Enter Password</label>
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
                  Sign Up
                </button>
              )}
            </form>
            <div className="flex">
                <p>Create new account ?</p> 
                <Link className="ml-4" to = "/signup">Sign Up</Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Login;
