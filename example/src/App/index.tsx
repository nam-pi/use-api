import { useAuth } from "nampi-use-api/bundle";
import { Route, Router, Switch } from "react-router";
import { Act } from "./components/Act";
import { Acts } from "./components/Acts";
import { Aspect } from "./components/Aspect";
import { Aspects } from "./components/Aspects";
import { Author } from "./components/Author";
import { Authors } from "./components/Authors";
import { Event } from "./components/Event";
import { Events } from "./components/Events";
import { Group } from "./components/Group";
import { Groups } from "./components/Groups";
import { Home } from "./components/Home";
import { LoadingPlaceholder } from "./components/LoadingPlaceholder";
import { Login } from "./components/Login";
import { Navbar } from "./components/Navbar";
import { NoMatch } from "./components/NoMatch";
import { Person } from "./components/Person";
import { Persons } from "./components/Persons";
import { Place } from "./components/Place";
import { Places } from "./components/Places";
import { PrivateRoute } from "./components/PrivateRoute";
import { Profile } from "./components/Profile";
import { Source } from "./components/Source";
import { Sources } from "./components/Sources";
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
            <Route exact path="/persons/:idLocal" component={Person} />
            <Route exact path="/persons" component={Persons} />
            <Route exact path="/events/:idLocal" component={Event} />
            <Route exact path="/events" component={Events} />
            <Route exact path="/aspects/:idLocal" component={Aspect} />
            <Route exact path="/aspects" component={Aspects} />
            <Route exact path="/acts/:idLocal" component={Act} />
            <Route exact path="/acts" component={Acts} />
            <Route exact path="/authors/:idLocal" component={Author} />
            <Route exact path="/authors" component={Authors} />
            <Route exact path="/places/:idLocal" component={Place} />
            <Route exact path="/places" component={Places} />
            <Route exact path="/groups/:idLocal" component={Group} />
            <Route exact path="/groups" component={Groups} />
            <Route exact path="/sources/:idLocal" component={Source} />
            <Route exact path="/sources" component={Sources} />
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
