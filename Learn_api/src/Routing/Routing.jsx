// ...existing code...
import { Route, Routes } from "react-router-dom";
import Layout from "../Layout/Layout";
import { lazy, Suspense } from "react";
import ErrorBoundaryComponent from "../ErrorBoundary/ErrorBoundary";
const Home = lazy(() => import("../Home/Home"));
const CoinDetails = lazy(() => import("../CoinDetails/CoinDetails"));
import Welcome from "../WelcomePage/Welcome";
import Register from "../CoinGecko_Auth/Registration_Page";
import Login from "../CoinGecko_Auth/Login_Page";
import ForgotPassword from "../ResetPassword/ForgotPassword.jsx";
import VerifyOTP from "../ResetPassword/VerifyOTP.jsx";
import ResetPassword from "../ResetPassword/ResetPassword.jsx";
import Compare from "../Comparison/Compare_Page";

const Routing = () => {
  return (
    <ErrorBoundaryComponent>
      <Suspense
        fallback={
          <div className="text-3xl text-red-600">⏳ Please wait...</div>
        }
      >
        <Routes>
          {/* Landing page (first page) */}
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          <Route path="/welcome" element={<Welcome />} />

          {/* Main app routes under /app so Welcome stays first */}
          <Route path="/layout" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/layout/coins/:coinId" element={<CoinDetails />} />
            <Route path="/layout/compare" element={<Compare />} />
          </Route>
        </Routes>
      </Suspense>
    </ErrorBoundaryComponent>
  );
};

export default Routing;
// ...existing code...
