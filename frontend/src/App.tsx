import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";

import CssBaseline from "@mui/material/CssBaseline";
import React from "react";
import UserSettingsPage from "./Pages/UserSettingsPage";
import VerifyEmailPage from "./Pages/VerifyEmailPage";
import ForgotPasswordPage from "./Pages/ForgotPasswordPage";
import ResetPasswordPage from "./Pages/ResetPasswordPage";
import NotFoundPage from "./Pages/NotFoundPage";
import PricingPage from "./Pages/PricingPage";

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
