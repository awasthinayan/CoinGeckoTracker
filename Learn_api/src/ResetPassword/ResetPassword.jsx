import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { COINGECKO_Auth_API } from "../Services/Common";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { state } = useLocation();
  const navigate = useNavigate();
  const email = state?.email;

  if (!email) navigate("/forgot-password");

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${COINGECKO_Auth_API}/user/resetpassword`, {
        email,
        password,
      });

      alert("Password reset successful");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <form
        onSubmit={handleResetPassword}
        className="bg-white/5 p-8 rounded-xl w-full max-w-md"
      >
        <h2 className="text-2xl text-white mb-6">Reset Password</h2>

        <input
          type="password"
          required
          minLength={6}
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-3 rounded bg-white/10 text-white"
        />

        <button
          disabled={loading}
          className="w-full bg-blue-600 py-3 rounded text-white"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
