import "./index.css";
import Header from "./components/header";
import Footer from "./components/footer";
import Login from "./components/login";
import Register from "./components/register";
import Logout from "./components/logout";
// import Home from "./components/home";
import Chatbot from "./components/chatbot";
import Quiz from "./components/quiz_component/Quiz";
import Product_search from "./components/search_component/Product_search";
import SkinType from "./components/skintype_components/SkinType";
import ProtectedRoute from "./components/ProtectedRoute";
import Comingsoon from "./components/comingsoon";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React, { useEffect, useState } from "react";
import ResponsiveAppBar from "./components/Headers/Header";
// import Header from "./components/header";
import Home from "./components/Home/Home";
import ChatBot from "./components/ChatBot/ChatBot";
// import { JSHash, CONSTANTS } from "react-native-hash";

function App() {
	const clearCacheData = () => {
		caches.keys().then((names) => {
			names.forEach((name) => {
				caches.delete(name);
			});
		});
		// alert('Complete Cache Cleared')
	};

	clearCacheData();

	return (
		<Router>
			{/* <Header /> */}
			<ResponsiveAppBar />
			<SkinType />
			{/* <Skin /> */}
			{/* <div className="App">
				<Switch>
					<ProtectedRoute exact path="/Home" component={Home} />
					<Route exact path="/Register" component={Register} />
					<Route exact path="/Login" component={Login} />
					<Route exact path="/Logout" component={Logout} />
					<Route exact path="/" component={Login} />
					<Route exact path="/chatbot" component={ChatBot} />
					<Route exact path="/quiz" component={Quiz} />
					<Route exact path="/skintype" component={SkinType} />
					<Route exact path="/product_search" component={Product_search} />
				</Switch>
			</div> */}
			{/* <Footer /> */}
		</Router>
	);
}

export default App;
