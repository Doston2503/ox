import React from 'react';
import SignUp from "./component/SignUp";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Product from "./component/Product";
import ProtectedPath from "./component/ProtectedPath";

function App(props) {
    return (
        <div>
            <Router>
                <div>
                    {/*    <nav>
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/about">About</Link>
                            </li>
                            <li>
                                <Link to="/users">Users</Link>
                            </li>
                        </ul>
                    </nav>*/}

                    <Switch>
                        <Route exact path="/" component={SignUp}/>
                        <Route exact path="/product">
                            <ProtectedPath><Product/></ProtectedPath>
                        </Route>
                    </Switch>
                </div>
            </Router>

            <ToastContainer/>
        </div>
    );
}

export default App;