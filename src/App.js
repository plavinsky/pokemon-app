import MenuHeader from "./components/MenuHeader";
import {NotificationContainer} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import Footer from "./components/Footer";

import GamePage from "./routes/Game";
import HomePage from "./routes/Home";
import AboutPage from "./routes/About";
import ContactPage from "./routes/Contact";
import NotFound from "./routes/404";

import { Route, Switch, useLocation} from "react-router-dom";
import cn from "classnames";

import s from "./style.module.css";
import { FireBaseContext } from "./context/firebaseContext";
import Firebase from "./services/firebase";
import FirebaseClass from "./services/firebase";



const App = () => {
  const location = useLocation();
  const isPadding = location.pathname === "/" || location.pathname === "/game/board";
  
  return (
          <>
          <Switch>
            <Route>
              <>
                <MenuHeader bgActive={!isPadding}/>
                <div className={cn(s.wrap, {
                  [s.isHomePage]: isPadding
                  })}>
                <Switch>
                  <Route path="/" exact component={HomePage}/>
                  <Route path="/home" component={HomePage}/>
                  <Route path="/game" component={GamePage}/>
                  <Route path="/about" component={AboutPage}/>
                  <Route path="/contact" component={ContactPage}/>
                </Switch> 
                </div>
                <Footer />
              </>
            </Route>

            <Route component={NotFound} />

          </Switch>
          <NotificationContainer/>
          </>
  )


}


export default App;