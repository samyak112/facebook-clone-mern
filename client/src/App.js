import Navbar from "./components/navbar/Navbar";
import Home from "./components/Home/Home";
import 'bootstrap/dist/css/bootstrap.min.css'
import Forgot_password from "./components/login_and_reg/Forgot_password/Forgot_password";
import Weather from "./components/Weather/Weather";
import Friends from './components/Friends/Friends'
import Landing_page from './components/login_and_reg/Landing_page/Landing_page'
import Profile from "./components/Profile/Profile";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate
  } from "react-router-dom";
import Verification from "./components/login_and_reg/Verification/Verification";
import Protected_routes from './components/Protected_routes'
import Protected_routes_2 from "./components/Protected_routes_2";
import { useSelector } from "react-redux";
import appcss from './App.module.css'

function App() {
    const isloggedin = sessionStorage.getItem('isloggedin');
    const rememberMe = localStorage.getItem('rememberMe')

	
return (
	<div className={appcss.main}>
			<Router>
				{/* <Navbar/> */}
				<Routes>
					<Route exact path="/" element={<Protected_routes/>}></Route>
					<Route path="/verify/:first_name/:email" element={<Verification/>}></Route>
					<Route path="/forgot_password" element={<Forgot_password/>}></Route>
					<Route path="/weather" element={
						<Protected_routes_2>
							<Weather/>
						</Protected_routes_2>}>
					</Route>
					<Route path="/friends" element={
						<Protected_routes_2>
							<Friends/>
						</Protected_routes_2>}>
					</Route>
					<Route path="/profile/:id" element={
						<Protected_routes_2>
							<Profile/>
						</Protected_routes_2>}>
					</Route>


				</Routes>
			</Router>
				
			
			
		
	</div>
);
}

export default App;
