import React from 'react';
import {Link} from "react-router-dom";
import {LOGIN_ROUTE, REGISTER_ROUT} from "../../processes/utils/consts";

const Home = () => {
    return (
        <div>
            <Link to={LOGIN_ROUTE}>Login</Link> <br/>
            <Link to={REGISTER_ROUT}>Registration</Link>

        </div>
    );
};

export default Home;