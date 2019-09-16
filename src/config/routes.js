import Home from '../components/Home';

import Category from '../components/category'


const routes = [
    {
        path:'/',
        exact:true,
        component:Home
    },
    {
        path:'/category',
        exact:true,
        component:Category
    }
];

export default routes
