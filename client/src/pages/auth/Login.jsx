import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../../config/axios";
import { LuLoaderCircle } from "react-icons/lu";
import { userContext } from "../../context/userContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(userContext);
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axiosInstance.post("/api/v1/user/login", {
        email,
        password,
      });
      toast.success(response.data.message);
      setUser(response.data.user);
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <form
        className="max-w-3xl mx-auto text-center flex flex-col items-center"
        onSubmit={handleLogin}
      >
        <h1 className="text-3xl mt-5 font-semibold">Login</h1>
        <input
          type="text"
          placeholder="example@gmail.com"
          className="border px-3 py-2 mt-5 w-80 rounded-2xl"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="*********"
          className="border px-3 py-2 mt-2 w-80 rounded-2xl"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className={`bg-[#ff385c] text-white font-medium mt-5 w-80 py-2 rounded-2xl flex items-center justify-center ${
            loading ? "bg-opacity-50" : ""
          }`}
          disabled={loading}
        >
          {loading ? <LuLoaderCircle className="animate-spin" /> : "Login"}
        </button>
        <Link to={"/register"} className="text-xs mt-3 hover:underline">
          Don't have an account? Register
        </Link>
      </form>
    </>
  );
}
