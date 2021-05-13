import { useAuth } from "nampi-use-api/bundle";
import { Route, Router, Switch } from "react-router";
import { Aspect } from "./components/Aspect";
import { Aspects } from "./components/Aspects";
import { Event } from "./components/Event";
import { Events } from "./components/Events";
import { Home } from "./components/Home";
import { LoadingPlaceholder } from "./components/LoadingPlaceholder";
import { Login } from "./components/Login";
import { Navbar } from "./components/Navbar";
import { NoMatch } from "./components/NoMatch";
import { Person } from "./components/Person";
import { Persons } from "./components/Persons";
import { PrivateRoute } from "./components/PrivateRoute";
import { Profile } from "./components/Profile";
import { HISTORY } from "./constants";

export const App = () => {
  const { initialized } = useAuth();
  return initialized ? (
    <Router history={HISTORY}>
      <div className="text-gray-800">
        <Navbar />
        <div className="m-3">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/persons" component={Persons} />
            <Route exact path="/person/:idLocal" component={Person} />
            <Route exact path="/events" component={Events} />
            <Route exact path="/event/:idLocal" component={Event} />
            <Route exact path="/aspects" component={Aspects} />
            <Route exact path="/aspect/:idLocal" component={Aspect} />
            <PrivateRoute exact path="/profile" component={Profile} />
            <Route path="*" component={NoMatch} />
          </Switch>
        </div>
      </div>
    </Router>
  ) : (
    <LoadingPlaceholder delay={1000} />
  );
};
