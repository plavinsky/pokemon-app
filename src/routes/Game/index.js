
import { Route, Switch, useRouteMatch } from "react-router";
import StartPage from "./routes/Start";

const GamePage = () => {
    

    const match = useRouteMatch();

    return (
        <Switch>
            <Route path={`${match.path}/`} exact component={StartPage} />
        </Switch>
    )

};




export default GamePage;