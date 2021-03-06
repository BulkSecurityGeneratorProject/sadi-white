import UserAccount from 'views/UserAccount/UserAccount'
import Login from 'views/Login/Login'
import Signup from '../views/Signup/Signup'
import Test from 'views/Test/Test'
import TestManagement from 'containers/TestManagement/test-management'
import TestForm from 'views/Test/TestForm'
import AllUsers from "../views/AllUsers/AllUsers";
import AllResult from "../views/AllResults/AllResults";
import TopScorer from "../views/TopScorers/TopScorers"

const appRoutes = [
  {
    path: '/login',
    name: 'Login',
    icon: 'pe-7s-id',
    component: Login,
  },
  {
    path: '/signup',
    name: 'Signup',
    icon: 'pe-7s-science',
    component: Signup,
  },
  {
    path: '/user',
    name: 'User Account',
    icon: 'pe-7s-user',
    component: UserAccount,
    requiredLogin: true,
  },
  {
    path: '/allUsers',
    name: 'All Users',
    icon: 'pe-7s-smile',
    component: AllUsers,
    requiredLogin: true,
    adminOnly: true,
  },
  {
    path: '/allResults',
    name: 'All Results',
    icon: 'pe-7s-study',
    component: AllResult,
    requiredLogin: true,
    adminOnly: true,
  },
  {
    path: '/topScorers',
    name: 'Top Scorers',
    icon: 'pe-7s-study',
    component: TopScorer,
    requiredLogin: true,
  },
  {
    path: '/test',
    name: 'Test',
    icon: 'pe-7s-news-paper',
    component: Test,
    requiredLogin: true,
  },
  {
    path: '/takeTest/:testId',
    name: 'Take Test',
    component: TestForm,
    hiddenLink: true,
  },
  {
    path: '/admin-test-management',
    name: 'Manage Test',
    icon: 'pe-7s-bookmarks',
    component: TestManagement,
    adminOnly: true,
  },
  {
    redirect: true,
    path: '/',
    to: '/login',
    name: 'Login',
  },
]

export default appRoutes
