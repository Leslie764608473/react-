import Home from '../components/Home';
import Login from '../components/Login';

const routes = [
    {
        path:'/',
        exact:true,
        component:Home
    },
    {
        path:'/Login',
        exact:true,
        component:Login
    }
];

export default routes
