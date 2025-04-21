import Carsharing from "../carsharing/Carsharing";
import AuthForm from "../formLogin/FormLogin";
import HomePage from "../HomePage";
import Taxi from "../taxi/Taxi";

export const routes = [
    // { path: "/chort/", element: <HomePage /> },
    { path: "*", element: <HomePage /> },
    { path: "/carsharing/", element: <Carsharing /> },
    { path: "/taxi/", element: <Taxi /> },
    { path: "/login/", element: <AuthForm /> }
];