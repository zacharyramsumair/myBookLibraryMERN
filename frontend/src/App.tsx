import "normalize.css"
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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


function App() {
	return (
		<React.Fragment>
			<CssBaseline />
			<Router>
				{/* <Container maxWidth="sm"> */}
				<Routes>
					{/* public pages */}
					<Route path="/home" element={<LandingPage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/register" element={<RegisterPage />} />
					<Route path="/verifyEmail" element={<VerifyEmailPage />} />
					<Route path="/forgotPassword" element={<ForgotPasswordPage />} />
					<Route path="/resetPassword" element={<ResetPasswordPage />} />
					<Route path="/prices" element={<PricingPage />} />
					{/* protected pages */}
					<Route path="/settings" element={<UserSettingsPage />} />
					{/* 404 Not Found */}
					<Route path="*" element={<NotFoundPage />} />
				</Routes>
				{/* </Container> */}
			</Router>
		</React.Fragment>
	);
}

export default App;
