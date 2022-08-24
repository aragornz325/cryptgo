import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import EditProfile from "./layout/EditProfile/index.js";
import Feedback from "./layout/feedback/Feedback.js";
import PokerOnline from './layout/PokerOnline';
import {
	Home,
	Blackjack,
	Error,
	Profile,
	Poker,
	Roulette,
	Admin,
	Transaction,
	PokerRooms,
	Language,
	PasswordAndSecurity,
	Settings,
	TermsOfService,
	Wallet,
	Points,
} from "./layout/index.js";
import RecentlyPlayed from "./layout/RecentlyPlayed/index.js";
import Favorites from "./layout/Favorites/index.js";

function App() {
	return (
		<Router>
			<Switch>
				<Route exact path="/">
					<Home />
				</Route>
				<Route path="/settings">
					<Settings />
				</Route>
				<Route path="/editprofile">
					<EditProfile />
				</Route>
				<Route path="/language">
					<Language />
				</Route>
				<Route path="/password&security">
					<PasswordAndSecurity />
				</Route>
				<Route path="/termsofservice">
					<TermsOfService />
				</Route>
				<Route path="/rooms">
					<PokerRooms />
				</Route>
				<Route path="/wallet">
					<Wallet />
				</Route>
				<Route path="/points">
					<Points />
				</Route>
				<Route path="/recent">
					<RecentlyPlayed />
				</Route>
				<Route path="/favorites">
					<Favorites />
				</Route>
				<Route path="/blackjack">
					<Blackjack />
				</Route>
				<Route path="/poker">
					<Poker />
				</Route>
				<Route path="/pokerOnline">
					<PokerOnline />
				</Route>
				<Route path="/roulette">
					<Roulette />
				</Route>
				<Route path="/profile">
					<Profile />
				</Route>
				<Route path="/admin">
					<Admin />
				</Route>
				<Route path="/feedback">
					<Feedback />
				</Route>
				<Route path="/transaction">
					<Transaction />
				</Route>
				<Route path="*">
					<Error />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
