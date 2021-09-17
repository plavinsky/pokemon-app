import MenuHeader from "./components/MenuHeader";
import Footer from "./components/Footer";

import GamePage from "./routes/Game";
import HomePage from "./routes/Home";
import AboutPage from "./routes/About";
import ContactPage from "./routes/Contact";
import NotFound from "./routes/404";

import { useRouteMatch, Route, Switch } from "react-router-dom";
import cn from "classnames";

import s from "./style.module.css";



const App = () => {
  const match = useRouteMatch("/");
  
  return (
        <Switch>
          <Route>
            <>
              <MenuHeader bgActive={!match.isExact}/>
              <div className={cn(s.wrap, {
                [s.isHomePage]: match.isExact
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
      
  )


}


export default App;