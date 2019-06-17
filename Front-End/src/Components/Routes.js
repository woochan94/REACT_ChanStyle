import React from "react"; 
import PropTypes from "prop-types"; 
import { Route, Switch } from "react-router-dom"; 
import Main from "../Routes/Main/Main";
import MyPage from "../Routes/Mypage/MyPage";
import Auth from "../Routes/Auth/Auth";
import Store from "../Routes/Store/Store";
import Product from "../Routes/Product/Product";
import Payment from "../Routes/Payment/Payment";
import Admin from "../Routes/Admin/Admin";
import Sale from "../Routes/Sale/Sale";

const AppRouter = ({ isLoggedIn, isAdmin }) => (
    <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/store" component={Store} />
        <Route exact path="/sale" component={Sale} />
        <Route exact path="/payment" component={Payment} />
        <Route path = "/product/:productname" component={Product} />
        <Route path = "/:username" component={ isLoggedIn ? (isAdmin ? Admin : MyPage) : Auth} />
    </Switch>
); 

// Router는 항상 proptypes를 가져야 함 
AppRouter.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired
}

export default AppRouter;