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
import Register from './pages/auth/Register';
import OurPanels from './pages/partner/OurPanels';
import PartnerEdit from './pages/admin/PartnerEdit';
import InterestUser from './pages/admin/InterestUser';
import EditRole from './pages/admin/EditRole';
import LoanPanels from './pages/partner/LoanPanels';
import LoanForm from './pages/partner/LoanForm';
import UploadDocForLoan from './pages/partner/UploadDocForLoan';
import AllLoans from './pages/relationshipManager/AllLoans';
import LoanInfo from './pages/relationshipManager/LoanInfo';
import TaxationPanel from './pages/partner/TaxationPanel';
import PlaceOrder from './pages/partner/PlaceOrder';
import AddClient from './pages/partner/AddClient';
import LoanStatusSetting from './pages/admin/LoanStatusSetting';
import CreditCard from './pages/partner/CreditCard';
import CreditCardApply from './pages/partner/CreditCardApply';
import GovermentLoan from './pages/partner/GovermentLoan';
import GovermentLoanForm from './pages/partner/GovermentLoanForm';
import ServiceSetting from './pages/admin/ServiceSetting';
import AllClient from './pages/partner/AllClient';
import TaxationUploadDoc from './pages/partner/TaxationUploadDoc';
import CreditCardDocUpload from './pages/partner/CreditCardDocUpload';
import InsurancePanel from './pages/partner/InsurancePanel';
import InsuranceApply from './pages/partner/InsuranceApply';
import Wallet from './pages/partner/Wallet';


 const routes = [
  {
    path: '/',
    element: Home,
    layout: (props) => <RootLayout {...props} showSidebar={false} showNavbar={false} />,
    protected: false,
    name: 'Home',
  },

  {
    path: '/partner-apply',
    element: Register,
    layout: (props) => <RootLayout {...props} showSidebar={false} showNavbar={false} />,
    protected: false,
    name: 'Partner Apply',
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
    allowedRoles:['Sales Executive'],
    name: 'Sales Executive Dashboard',
  },
  {
    path: '/sales-executive/partner',
    element: Partner,
    layout: RootLayout,
    protected: true,
    allowedRoles:['Sales Executive'],
    name: 'Partner Management',
  },
  {
    path: '/sales-executive/add-new-member',
    element: AddNewMember,
    layout: RootLayout,
    protected: true,
    allowedRoles:['Sales Executive'],
    name: 'Add New Member',
  },
  {
    path:"/admin/dashboard",
    element: AdminDashboard,
    layout: RootLayout,
    protected: true,
    allowedRoles: ['admin'],
    name:"Admin Dashboard",
  },

  {
    path:"/admin/role-assigned",
    element: RoleAssigned,
    layout: RootLayout,
    protected: true,
    allowedRoles: ['admin'],
    name:"Admin Dashboard",
  },

  {
    path:"/admin/create-role",
    element: CreateRole,
    layout: RootLayout,
    protected: true,
    allowedRoles: ['admin'],
    name:"Admin Dashboard",
  },
  {
    path:"/admin/edit-role/:id",
    element: EditRole,
    layout: RootLayout,
    protected: true,
    allowedRoles: ['admin'],
    name:"Admin Dashboard",
  },
  {
    path:"/admin/users",
    element:AllUsers,
    layout: RootLayout,
    protected: true,
    allowedRoles: ['admin'],
    name:"Admin Dashboard",
  },
  {
    path:"/admin/user/edit/:id",
    element:PartnerEdit,
    layout: RootLayout,
    protected: true,
    allowedRoles: ['admin'],
    name:"Admin Dashboard",
  },
  {
    path:"/admin/interestUsers",
    element:InterestUser,
    layout: RootLayout,
    protected: true,
    allowedRoles: ['admin'],
    name:"Admin Dashboard",
  },
  {
    path:"/admin/subscriptions",
    element:Subscriptions,
    layout: RootLayout,
    protected: true,
    allowedRoles: ['admin'],
    name:"Admin Dashboard",
  },
  {
    path:"/setting/loanStatus",
    element:LoanStatusSetting,
    layout: RootLayout,
    protected: true,
    allowedRoles: ['admin'],
    name:"Admin Dashboard",
  },

  {
    path:"/setting/service",
    element:ServiceSetting,
    layout: RootLayout,
    protected: true,
    allowedRoles: ['admin'],
    name:"Admin Dashboard",
  },
 

  {
    path:"/partner/dashboard",
    element: PartnerDashboard,
    layout: RootLayout,
    protected: true,
    allowedRoles: ['partner'],
    name:"Partner Dashboard",
  },
  {
    path:"/partner/profile",
    element: PartnerProfile,
    layout: RootLayout,
    protected: true,
    allowedRoles: ['partner'],
    name:"Partner Dashboard",
  },
  
  {
    path:"/partner/wallet",
    element: Wallet,
    layout: RootLayout,
    protected: true,
    allowedRoles: ['partner'],
    name:"Partner Dashboard",
  },
  
  {
    path:"/partner/upload-doc",
    element: UploadDocuments,
    layout: RootLayout,
    protected: true,
    allowedRoles: ['partner'],
    name:"Partner Dashboard",
  },
  {
    path:"/our-panels",
    element: OurPanels,
    layout: RootLayout,
    protected: true,
    allowedRoles: ['partner'],
    name:"Partner Dashboard",
  },
  {
    path:"/our-panels/loan-panels",
    element: LoanPanels,
    layout: RootLayout,
    protected: true,
    allowedRoles: ['partner'],
    name:"Partner Dashboard",
  },
  {
    path:"/our-panels/loan-panels/pl",
    element: LoanForm,
    layout: RootLayout,
    protected: true,
    allowedRoles: ['partner'],
    loanType:"personalLoan",
    name:"Partner Dashboard",
  },
  {
    path:"/our-panels/loan-panels/bl",
    element: LoanForm,
    layout: RootLayout,
    protected: true,
    allowedRoles: ['partner'],
    loanType:"businessLoan",
    name:"Partner Dashboard",
  },
  {
    path:"/our-panels/loan-panels/hl",
    element: LoanForm,
    layout: RootLayout,
    protected: true,
    allowedRoles: ['partner'],
    loanType:"homeLoan",
    name:"Partner Dashboard",
  },
  {
    path:"/our-panels/loan-panels/lap",
    element: LoanForm,
    layout: RootLayout,
    protected: true,
    allowedRoles: ['partner'],
    loanType:"loanAgainstProperty",
    name:"Partner Dashboard",
  },
  {
    path:"/our-panels/loan-panels/cl",
    element: LoanForm,
    layout: RootLayout,
    protected: true,
    allowedRoles: ['partner'],
    loanType:"carLoan",
    name:"Partner Dashboard",
  },
  {
    path:"/our-panels/loan-panels/ocl",
    element: LoanForm,
    layout: RootLayout,
    protected: true,
    allowedRoles: ['partner'],
    loanType:"oldCarLoan",
    name:"Partner Dashboard",
  },
  {
    path:"/our-panels/loan-panels/:loanType/upload-doc/:fileNo",
    element: UploadDocForLoan,
    layout: RootLayout,
    protected: true,
    allowedRoles: ['partner'],
    name:"Partner Dashboard",
  },

  {
    path:"/our-panels/taxation-panel",
    element: TaxationPanel,
    layout: RootLayout,
    protected: true,
    allowedRoles: ['partner'],
    name:"Partner Dashboard",
  },
  {
    path:"/our-panels/taxation-panel/place-order",
    element: PlaceOrder,
    layout: RootLayout,
    protected: true,
    allowedRoles: ['partner'],
    name:"Partner Dashboard",
  },
  {
    path:"/our-panels/taxation-panel/add-client",
    element: AddClient,
    layout: RootLayout,
    protected: true,
    allowedRoles: ['partner'],
    name:"Partner Dashboard",
  },

  {
    path:"/our-panels/taxation-panel/all-client",
    element: AllClient,
    layout: RootLayout,
    protected: true,
    allowedRoles: ['partner'],
    name:"Partner Dashboard",
  },

  {
    path:"/our-panels/taxation-panel/upload-doc/:id",
    element: TaxationUploadDoc,
    layout: RootLayout,
    protected: true,
    allowedRoles: ['partner'],
    name:"Partner Dashboard",
  },

  {
    path:"/our-panels/creditCard-panel",
    element: CreditCard,
    layout: RootLayout,
    protected: true,
    allowedRoles: ['partner'],
    name:"Partner Dashboard",
  },

  {
    path:"/our-panels/creditCard-panel/creditcard-apply",
    element: CreditCardApply,
    layout: RootLayout,
    protected: true,
    allowedRoles: ['partner'],
    name:"Partner Dashboard",
  },
  {
    path:"/our-panels/creditCard-panel/upload-doc/:id",
    element: CreditCardDocUpload,
    layout: RootLayout,
    protected: true,
    allowedRoles: ['partner'],
    name:"Partner Dashboard",
  },

  {
    path:"/our-panels/govermentLoan",
    element: GovermentLoan,
    layout: RootLayout,
    protected: true,
    allowedRoles: ['partner'],
    name:"Partner Dashboard",
  },
  {
    path:"/our-panels/govermentLoan/:loanType",
    element: GovermentLoanForm,
    layout: RootLayout,
    protected: true,
    allowedRoles: ['partner'],
    name:"Partner Dashboard",
  },
  {
    path:"/our-panels/govermentLoan/:loantype",
    element: GovermentLoanForm,
    layout: RootLayout,
    protected: true,
    allowedRoles: ['partner'],
    name:"Partner Dashboard",
  },

  {
    path:"/our-panels/govermentLoan/:loanType",
    element: GovermentLoanForm,
    layout: RootLayout,
    protected: true,
    allowedRoles: ['partner'],
    name:"Partner Dashboard",
  },

  {
    path:"/our-panels/govermentLoan/:loanType",
    element: GovermentLoanForm,
    layout: RootLayout,
    protected: true,
    allowedRoles: ['partner'],
    name:"Partner Dashboard",
  },

  {
    path:"/our-panels/insurancePanel",
    element: InsurancePanel,
    layout: RootLayout,
    protected: true,
    allowedRoles: ['partner'],
    name:"Partner Dashboard",
  },
  {
    path:"/our-panels/insurancePanel/insurance/apply",
    element: InsuranceApply,
    layout: RootLayout,
    protected: true,
    allowedRoles: ['partner'],
    name:"Partner Dashboard",
  },
  
  {
    path:"/rm/dashboard",
    element: RelationshipManagerDashboard,
    layout: RootLayout,
    protected: true,
    name:"RM Dashboard",
    allowedRoles: ['RM'],
  },
  {
    path:"/rm/loan",
    element: AllLoans,
    layout: RootLayout,
    protected: true,
    name:"RM Dashboard",
    allowedRoles: ['RM'],
  },
  {
    path:"/rm/loaninfo/:fileNo",
    element: LoanInfo,
    layout: RootLayout,
    protected: true,
    name:"RM Dashboard",
    allowedRoles: ['RM'],
  }

];

export default routes;
