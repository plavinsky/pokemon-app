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
import PrivateRoute from "./components/PrivateRoute";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserAsync } from "./store/user";
import User from "./routes/User";



const App = () => {
  const location = useLocation();
  const isPadding = location.pathname === "/" || location.pathname === "/game/board";
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserAsync());
  }, [])

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
                  <PrivateRoute path="/game" component={GamePage}/>
                  <PrivateRoute path="/about" component={AboutPage}/>
                  <Route path="/contact" component={ContactPage}/>
                  <PrivateRoute path="/user" component={User}/>
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