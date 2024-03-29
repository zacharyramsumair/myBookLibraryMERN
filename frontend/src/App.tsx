import "normalize.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./App.css";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import LandingPage from "./Pages/LandingPage/LandingPage";
import LoginPage from "./Pages/Auth/LoginPage";
import CssBaseline from "@mui/material/CssBaseline";
import RegisterPage from "./Pages/Auth/RegisterPage";
import VerifyEmailPage from "./Pages/Auth/VerifyEmailPage";
import ForgotPasswordPage from "./Pages/Auth/ForgotPasswordPage";
import ResetPasswordPage from "./Pages/Auth/ResetPasswordPage";
import PricingPage from "./Pages/Auth/PricingPage";
import UserSettingsPage from "./Pages/Blocks/UserSettingsPage";
import NotFoundPage from "./Pages/NotFoundPage";
import React from "react";
import { UserContext } from "./Contexts/UserContext";
import { Box, CircularProgress } from "@mui/material";
import Dashboard from "./Pages/Blocks/Dashboard";
import ReadSingleBlock from "./Pages/Blocks/ReadSingleBlock";
import MyShelf from "./Pages/Blocks/MyShelf";
import MyFavorites from "./Pages/Blocks/MyFavorites";
import SearchBlocks from "./Pages/Blocks/SearchBlocks";
import CreatorStudio from "./Pages/Blocks/CreatorStudio";
import MyBlocks from "./Pages/Blocks/MyBlocks";
import CreateBlock from "./Pages/Blocks/CreateBlock";
import EditBlock from "./Pages/Blocks/EditBlock";
import UserProfile from "./Pages/Auth/UserProfile";
import Store from "./Pages/Store/Store";

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
						{/* landing page and greeting */}
						<Route path="/landingPage" element={<LandingPage />} />

						{/* auth */}
						<Route
							path="/login"
							element={!user ? <LoginPage /> : <Navigate to="/" />}
						/>
						<Route
							path="/register"
							element={!user ? <RegisterPage /> : <Navigate to="/" />}
						/>
						<Route
							path="/verifyEmail"
							element={!user ? <VerifyEmailPage /> : <Navigate to="/" />}
						/>

						<Route
							path="/forgotPassword"
							element={
								!user ? <ForgotPasswordPage /> : <Navigate to="/" />
							}
						/>

						<Route
							path="/resetPassword"
							element={<ResetPasswordPage />}
						/>

						{/* Blocks and main app area */}
						<Route path="/" element={<Dashboard />} />
						<Route path="/block/:id" element={<ReadSingleBlock />} />
						<Route path="/Shelf" element={<MyShelf />} />
						<Route path="/favorites" element={<MyFavorites />} />
						<Route path="/search" element={<SearchBlocks />} />

						<Route
							path="/creatorStudio"
							element={
								!user ? <Navigate to="/login" /> : <CreatorStudio />
							}
						/>

						<Route
							path="/myBlocks"
							element={!user ? <Navigate to="/login" /> : <MyBlocks />}
						/>

						<Route
							path="/create"
							element={
								!user ? <Navigate to="/login" /> : <CreateBlock />
							}
						/>
						<Route
							path="/edit/:id"
							element={!user ? <Navigate to="/login" /> : <EditBlock />}
						/>
						<Route
							path="/settings"
							element={
								!user ? <Navigate to="/login" /> : <UserSettingsPage />
							}
						/>
						<Route path="/profile/:id" element={<UserProfile />} />

						{/* store */}
						<Route path="/store" element={<Store />} />

						{/* 404 Not Found */}
						<Route path="*" element={<NotFoundPage />} />
					</Routes>
				</Router>
			)}
		</React.Fragment>
	);
}

export default App;
