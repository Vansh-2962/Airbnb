import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axios";
import { toast } from "react-hot-toast";
import { LuLoaderCircle } from "react-icons/lu";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axiosInstance.post("/api/v1/user/register", {
        name,
        email,
        password,
      });
      setName("");
      setEmail("");
      setPassword("");
      navigate("/login");
      toast.success(response.data.message);
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
        onSubmit={handleRegister}
      >
        <h1 className="text-3xl mt-5 font-semibold">Register</h1>
        <input
          type="text"
          placeholder="John Doe"
          className="border px-3 py-2 mt-5 w-80 rounded-2xl"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="example@gmail.com"
          className="border px-3 py-2 mt-2 w-80 rounded-2xl"
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
          {loading ? <LuLoaderCircle className="animate-spin" /> : "Register"}
        </button>
        <Link to={"/Login"} className="text-xs mt-3 hover:underline">
          Already have an account? Login
        </Link>
      </form>
    </>
  );
}
