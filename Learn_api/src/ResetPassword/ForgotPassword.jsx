import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { COINGECKO_Auth_API } from "../Services/Common";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(""); // <-- new state for error
  const navigate = useNavigate();

  const sendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(""); // reset error on new attempt

    try {
      await axios.post(
        `${COINGECKO_Auth_API}/user/otp`,
        { email },
        { headers: { "Content-Type": "application/json" } }
      );

      localStorage.setItem("resetEmail", email);
      setOtpSent(true);
      console.log("Sending OTP to email:", email);
      setTimeout(() => {
        navigate("/verify-otp", { state: { email } });
      }, 2000);
    } catch (err) {
      console.error("Error sending OTP:", err.response?.data);
      setErrorMsg(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <form
        onSubmit={sendOtp}
        className="bg-white/5 p-8 rounded-xl w-full max-w-md"
      >
        <h2 className="text-2xl text-white mb-6">Forgot Password</h2>

        <input
          type="email"
          required
          placeholder="Your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-3 rounded bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500/40"
        />

        <button
          disabled={loading}
          className={`w-full py-3 rounded text-white hover:cursor-pointer ${
            loading
              ? "bg-purple-400 opacity-70 cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-700"
          }`}
        >
          {loading ? "Sending OTP..." : "Send OTP"}
        </button>

        {/* Success message */}
        {otpSent && (
          <p className="text-green-500 mt-4">
            OTP sent successfully to {email}
          </p>
        )}

        {/* Error message */}
        {errorMsg && <p className="text-red-500 mt-4">❌ {errorMsg}</p>}

        <p className="text-sm text-white/50 mt-1">
          If you haven't received OTP, check your spam folder.
        </p>
      </form>
    </div>
  );
};

export default ForgotPassword;
