import "normalize.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./Pages/LandingPage/LandingPage";
import LoginPage from "./Pages/Auth/LoginPage";
import CssBaseline from "@mui/material/CssBaseline";
import RegisterPage from "./Pages/Auth/RegisterPage";
import VerifyEmailPage from "./Pages/Auth/VerifyEmailPage";
import ForgotPasswordPage from "./Pages/Auth/ForgotPasswordPage";
import ResetPasswordPage from "./Pages/Auth/ResetPasswordPage";
import PricingPage from "./Pages/Auth/PricingPage";
import UserSettingsPage from "./Pages/Auth/UserSettingsPage";
import NotFoundPage from "./Pages/Auth/NotFoundPage";
import React from "react";
import { UserContext } from "./Contexts/UserContext";
import { Box, CircularProgress } from "@mui/material";

function App() {
  const { isLoading, user } = React.useContext(UserContext);

  return (
    <React.Fragment>
      <CssBaseline />

      {isLoading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            minWidth: "100vw",
          }}
        >
          <CircularProgress />
        </Box>
      )}

      {!isLoading && (
        <Router>
          <Routes>
            {/* public pages */}
            <Route path="/home" element={<LandingPage />} />
            <Route path="/login" element={!user ? <LoginPage/> : <Navigate to="/settings" />} />
            <Route path="/register" element={!user ? <RegisterPage/> : <Navigate to="/settings" />} />
            <Route path="/verifyEmail" element={<VerifyEmailPage />} />
            <Route path="/forgotPassword" element={<ForgotPasswordPage />} />
            <Route path="/resetPassword" element={<ResetPasswordPage />} />
            <Route path="/prices" element={<PricingPage />} />
            {/* protected pages */}
			<Route path="settings" element={user ? <UserSettingsPage/> : <Navigate to="/login" />}/>

            {/* <ProtectedRoute path="/settings">
              <UserSettingsPage />
            </ProtectedRoute> */}
            {/* 404 Not Found */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      )}
    </React.Fragment>
  );
}

export default App;
