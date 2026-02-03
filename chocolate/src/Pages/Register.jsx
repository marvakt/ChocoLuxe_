import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../Context/UserContext";
import toast from "react-hot-toast";

function Register() {
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { register } = useUser();

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!user.username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!user.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(user.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!user.password) newErrors.password = "Password is required";
    else if (user.password.length < 8) newErrors.password = "Password must be at least 8 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) return;

    const result = await register(user);

    if (result.success) {
      toast.success("Registered successfully!");
      navigate("/login");
    } else {
      const errorMsg = result.error?.email?.[0] || result.error?.username?.[0] || "Registration failed. Please try again.";
      toast.error(errorMsg);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#fef6f3]">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-[#6f4e37] mb-6">Create Account</h2>
        <div className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
          </div>

          <div>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <button
            onClick={handleRegister}
            className="w-full bg-[#6f4e37] text-white py-2 rounded-md hover:bg-[#5a3f2d] transition"
          >
            Register
          </button>
          <button type="button" className="w-full text-blue-900 py-2" onClick={() => navigate("/Login")}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
