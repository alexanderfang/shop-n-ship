import Admin from "../containers/Admin";
import Cart from "../containers/Cart";
import Home from "../containers/Home";
import Login from "../containers/Login";
import Register from "../containers/Register";

const routes =  [
    {
        component: Home, //TODO
        isProtected: false,
        path: "/",
        shownOnAppbar: true,
        text: "Products"
    },
    {
        component: Cart, //TODO
        isProtected: false,
        path: "/cart",
        shownOnAppbar: true,
        text: "Cart"
    },
    {
        component: Login, //TODO
        isProtected: false,
        path: "/login",
        shownOnAppbar: false,
        text: "Login"
    },
    {
        component: Register, //TODO
        isProtected: false,
        path: "/register",
        shownOnAppbar: false,
        text: "Register"
    },
    {
        component: Admin, //TODO
        isProtected: true,
        path: "/admin",
        shownOnAppbar: false,
        text: ""
    },
];

export default routes;