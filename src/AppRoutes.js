import Home from './pages/home/Home';
import Loigin from './pages/auth/Loigin';
import SalesExcutivedDashboard from "./pages/salesExcutive/SalesExcutivedDashboard";
import Partner from './pages/salesExcutive/Partner';
import AddNewMember from './pages/salesExcutive/AddNewMember';
import AdminDashboard from "./pages/admin/AdminDashboard"
import PartnerDashboard from "./pages/partner/PartnerDashboard"
import RelationshipManagerDashboard  from "./pages/relationshipManager/RelationshipManagerDashboard"
import RootLayout from './layouts/RootLayout'; 
import RoleAssigned from './pages/admin/RoleAssigned';
import CreateRole from './pages/admin/CreateRole';
import AllUsers from './pages/admin/AllUsers';
import PartnerProfile from './pages/partner/PartnerProfile';
import UploadDocuments from './pages/partner/UploadDocuments';
import Subscriptions from './pages/admin/Subscriptions';

 const routes = [
  {
    path: '/',
    element: Home,
    layout: (props) => <RootLayout {...props} showSidebar={false} showNavbar={false} />,
    protected: false,
    name: 'Home',
  },
  {
    path: '/partner/login',
    element: Loigin,
    layout: (props) => <RootLayout {...props} showSidebar={false} showNavbar={false} />,
    protected: false,
    name: 'Partner Login',
    loginType: 'Partner',
  },
  {
    path: '/admin/login',
    element: Loigin,
    layout: (props) => <RootLayout {...props} showSidebar={false} showNavbar={false} />,
    protected: false,
    name: 'Admin Login',
    loginType: 'Admin',
  },
  {
    path: '/sales-executive/login',
    element: Loigin,
    layout: (props) => <RootLayout {...props} showSidebar={false} showNavbar={false} />,
    protected: false,
    name: 'Sales Executive Login',
    loginType: 'SalesExecutive',
  },
  {
    path: '/relationship-manager/login',
    element: Loigin,
    layout: (props) => <RootLayout {...props} showSidebar={false} showNavbar={false} />,
    protected: false,
    name: 'Relationship Manager Login',
    loginType: 'RelationshipManager',
  },
  {
    path: '/sales-executive/dashboard',
    element: SalesExcutivedDashboard,
    layout: RootLayout,
    protected: true,
    name: 'Sales Executive Dashboard',
  },
  {
    path: '/sales-executive/partner',
    element: Partner,
    layout: RootLayout,
    protected: true,
    name: 'Partner Management',
  },
  {
    path: '/sales-executive/add-new-member',
    element: AddNewMember,
    layout: RootLayout,
    protected: true,
    name: 'Add New Member',
  },
  {
    path:"/admin/dashboard",
    element: AdminDashboard,
    layout: RootLayout,
    protected: true,
    name:"Admin Dashboard",
  },

  {
    path:"/admin/role-assigned",
    element: RoleAssigned,
    layout: RootLayout,
    protected: true,
    name:"Admin Dashboard",
  },

  {
    path:"/admin/create-role",
    element: CreateRole,
    layout: RootLayout,
    protected: true,
    name:"Admin Dashboard",
  },
  {
    path:"/admin/users",
    element:AllUsers,
    layout: RootLayout,
    protected: true,
    name:"Admin Dashboard",
  },
  {
    path:"/admin/subscriptions",
    element:Subscriptions,
    layout: RootLayout,
    protected: true,
    name:"Admin Dashboard",
  },
 

  {
    path:"/partner/dashboard",
    element: PartnerDashboard,
    layout: RootLayout,
    protected: true,
    name:"Partner Dashboard",
  },
  {
    path:"/partner/profile",
    element: PartnerProfile,
    layout: RootLayout,
    protected: true,
    name:"Partner Dashboard",
  },
  {
    path:"/partner/upload-doc",
    element: UploadDocuments,
    layout: RootLayout,
    protected: true,
    name:"Partner Dashboard",
  },
  {
    path:"/rm/dashboard",
    element: RelationshipManagerDashboard,
    layout: RootLayout,
    protected: true,
    name:"RM Dashboard",
  }

];

export default routes;
