import Home from '../components/Home'
import Blog from '../components/Blog'
import Login from '../components/Login'
import Manage from '../components/Manage'
import Resume from '../components/Resume'


let routes = [
  {
    path: '/',
    component: Home,
    exact: true,
  },
  {
    path: '/blog',
    component: Blog,
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/manage',
    component: Manage,
  },
  {
    path: '/resume',
    component: Resume,
  }
]
export default routes
