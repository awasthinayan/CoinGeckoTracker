import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { COINGECKO_Auth_API } from "../Services/Common";

const VerifyOTP = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpverified, setOtpverified] = useState(false);

  const navigate = useNavigate();
  const { state } = useLocation();
  const email = state?.email;

  if (!email) navigate("/forgot-password");

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${COINGECKO_Auth_API}/user/verifyotp`, {
        email,
        otp,
      });

      setOtpverified(true);
      navigate("/reset-password", { state: { email } });
    } catch (err) {
      alert(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <form
        onSubmit={handleVerifyOTP}
        className="bg-white/5 p-8 rounded-xl w-full max-w-md"
      >
        <h2 className="text-2xl text-white mb-6">Verify OTP</h2>

        <input
          type="text"
          required
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full mb-4 p-3 rounded bg-white/10 text-white"
        />

        <button
          disabled={loading}
          className="w-full bg-green-600 py-3 rounded text-white hover:bg-green-700 hover:cursor-pointer disabled:bg-green-400 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        {otpverified && (
          <p className="text-green-500 mt-4">
            OTP sent successfully to {email}
          </p>
        )}
      </form>
    </div>
  );
};

export default VerifyOTP;
