import Home from '../components/Home';

import Category from '../components/category'
import Product from '../components/Product'
import Saveupdate from '../components/Product/save-update'


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
    },
    {
        path:'/product',
        exact:true,
        component:Product
    },
    {
        path:'/product/saveupdate',
        exact:true,
        component:Saveupdate
    }
];

export default routes
