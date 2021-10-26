import "./App.css";
import Movies from "../src/components/movies";
import Topbar from "../src/components/topbar";
import Customers from "../src/components/customers";
import Rentals from "../src/components/rentals";
import NotFound from "../src/common/notfound";
import MovieDetails from "./components/movieForm";
import LoginForm from "./components/LoginForm";
import { Switch, Route, Redirect } from "react-router-dom";
import RegisterForm from "./components/RegsiterForm";

function App() {
  return (
    <main className="container">
      <Topbar />
      <div>
        {" "}
        <Switch>
          <Route path="/register" component={RegisterForm}></Route>
          <Route path="/login" component={LoginForm}></Route>
          <Route path="/movies/:id" component={MovieDetails}></Route>
          <Route path="/movies" component={Movies}></Route>
          <Route path="/customers" component={Customers}></Route>
          <Route path="/rentals" component={Rentals}></Route>
          <Route path="/not-found" component={NotFound}></Route>
          <Redirect from="/" exact to="/movies" />
          <Redirect to="/not-found" />
        </Switch>
      </div>
    </main>
  );
}

export default App;
