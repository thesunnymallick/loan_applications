import React, { lazy } from "react";

import RootLayout from "./layouts/RootLayout";

 // Home Page Component
const Home = lazy(() => import("./pages/home/Home"));
const About =lazy(()=>import("./pages/home/About"))
const ContactUs =lazy(()=>import("./pages/home/ContactUs"))
const Loigin =lazy(()=>import("./pages/auth/Loigin"));
const Register = lazy(()=>import("./pages/auth/Register"));

// Partner's Page
const PartnerDashboard=lazy(()=>import("./pages/partner/PartnerDashboard"));
const PartnerProfile =lazy(()=>import("./pages/partner/PartnerProfile"));
const UploadDocuments=lazy(()=>import ("./pages/partner/UploadDocuments"));
const OurPanels =lazy(()=>import("./pages/partner/OurPanels"));
const LoanPanels= lazy(()=>import("./pages/partner/LoanPanels"));
const LoanForm =lazy(()=>import("./pages/partner/LoanForm"));
const UploadDocForLoan =lazy(()=>import("./pages/partner/UploadDocForLoan"));
const TaxationPanel =lazy(()=>import("./pages/partner/TaxationPanel"));
const PlaceOrder =lazy(()=>import("./pages/partner/PlaceOrder"));
const AddClient =lazy(()=>import("./pages/partner/AddClient"));
const CreditCard =lazy(()=>import("./pages/partner/CreditCard"));
const  CreditCardApply=lazy(()=>import("./pages/partner/CreditCardApply")) ;
const  GovermentLoan=lazy(()=>import("./pages/partner/GovermentLoan")) ;
const  GovermentLoanForm=lazy(()=>import("./pages/partner/GovermentLoanForm")) ;
const  AllClient=lazy(()=>import("./pages/partner/AllClient")) ;
const  TaxationUploadDoc=lazy(()=>import("./pages/partner/TaxationUploadDoc")) ;
const  CreditCardDocUpload =lazy(()=>import("./pages/partner/CreditCardDocUpload"));
const  InsurancePanel =lazy(()=>import("./pages/partner/InsurancePanel"));
const  InsuranceApply=lazy(()=>import("./pages/partner/InsuranceApply")) ;
const  Wallet=lazy(()=>import("./pages/partner/Wallet")) ;
const  GovermentLoanDocUpload=lazy(()=>import("./pages/partner/GovermentLoanDocUpload")) ;
const  InstantLoginPanel=lazy(()=>import("./pages/partner/InstantLoginPanel")) ;
const  EligiblePanel=lazy(()=>import("./pages/partner/EligiblePanel")) ;
const  InsuranceDocUpload=lazy(()=>import("./pages/partner/InsuranceDocUpload")) ;
const  Policy=lazy(()=>import("./pages/partner/Policy")) ;
const  InstantLoginCreditCard=lazy(()=>import("./pages/partner/InstantLoginCreditCard")) ;
const  Certificate=lazy(()=>import("./pages/partner/Certificate")) ;

// Sales Executive Pages
const  SalesExcutivedDashboard =lazy(()=>import("./pages/salesExcutive/SalesExcutivedDashboard")) ;
const  Partner =lazy(()=>import("./pages/salesExcutive/Partner")) ;
const  AddNewMember =lazy(()=>import("./pages/salesExcutive/AddNewMember")) ;

const routes = [
  {
    path: "/",
    element: Home,
    layout: (props) => (
      <RootLayout {...props} showSidebar={false} showNavbar={false} />
    ),
    protected: false,
    name: "Home",
  },
  {
    path: "/about",
    element: About,
    layout: (props) => (
      <RootLayout {...props} showSidebar={false} showNavbar={false} />
    ),
    protected: false,
    name: "Home",
  },
  {
    path: "/contact",
    element: ContactUs,
    layout: (props) => (
      <RootLayout {...props} showSidebar={false} showNavbar={false} />
    ),
    protected: false,
    name: "Home",
  },

  {
    path: "/partner-apply",
    element: Register,
    layout: (props) => (
      <RootLayout {...props} showSidebar={false} showNavbar={false} />
    ),
    protected: false,
    name: "Partner Apply",
  },
  {
    path: "/partner/login",
    element: Loigin,
    layout: (props) => (
      <RootLayout {...props} showSidebar={false} showNavbar={false} />
    ),
    protected: false,
    name: "Partner Login",
    loginType: "Partner",
  },

  {
    path: "/sales-executive/login",
    element: Loigin,
    layout: (props) => (
      <RootLayout {...props} showSidebar={false} showNavbar={false} />
    ),
    protected: false,
    name: "Sales Executive Login",
    loginType: "SalesExecutive",
  },
  {
    path: "/relationship-manager/login",
    element: Loigin,
    layout: (props) => (
      <RootLayout {...props} showSidebar={false} showNavbar={false} />
    ),
    protected: false,
    name: "Relationship Manager Login",
    loginType: "RelationshipManager",
  },
  {
    path: "/sales-executive/dashboard",
    element: SalesExcutivedDashboard,
    layout: RootLayout,
    protected: true,
    allowedRoles: ["Sales Executive"],
    name: "Sales Executive Dashboard",
  },
  {
    path: "/sales-executive/partner",
    element: Partner,
    layout: RootLayout,
    protected: true,
    allowedRoles: ["Sales Executive"],
    name: "Partner Management",
  },
  {
    path: "/sales-executive/add-new-member",
    element: AddNewMember,
    layout: RootLayout,
    protected: true,
    allowedRoles: ["Sales Executive"],
    name: "Add New Member",
  },

  {
    path: "/partner/dashboard",
    element: PartnerDashboard,
    layout: RootLayout,
    protected: true,
    allowedRoles: ["partner"],
    name: "Partner Dashboard",
  },
  {
    path: "/partner/profile",
    element: PartnerProfile,
    layout: RootLayout,
    protected: true,
    allowedRoles: ["partner"],
    name: "Partner Dashboard",
  },

  {
    path: "/partner/wallet",
    element: Wallet,
    layout: RootLayout,
    protected: true,
    allowedRoles: ["partner"],
    name: "Partner Dashboard",
  },

  {
    path: "/partner/upload-doc",
    element: UploadDocuments,
    layout: RootLayout,
    protected: true,
    allowedRoles: ["partner"],
    name: "Partner Dashboard",
  },
  {
    path: "/our-panels",
    element: OurPanels,
    layout: RootLayout,
    protected: true,
    allowedRoles: ["partner"],
    name: "Partner Dashboard",
  },
  {
    path: "/our-panels/loan-panels",
    element: LoanPanels,
    layout: RootLayout,
    protected: true,
    allowedRoles: ["partner"],
    name: "Partner Dashboard",
  },
  {
    path: "/our-panels/loan-panels/pl",
    element: LoanForm,
    layout: RootLayout,
    protected: true,
    allowedRoles: ["partner"],
    loanType: "personalLoan",
    name: "Partner Dashboard",
  },
  {
    path: "/our-panels/loan-panels/bl",
    element: LoanForm,
    layout: RootLayout,
    protected: true,
    allowedRoles: ["partner"],
    loanType: "businessLoan",
    name: "Partner Dashboard",
  },
  {
    path: "/our-panels/loan-panels/hl",
    element: LoanForm,
    layout: RootLayout,
    protected: true,
    allowedRoles: ["partner"],
    loanType: "homeLoan",
    name: "Partner Dashboard",
  },
  {
    path: "/our-panels/loan-panels/lap",
    element: LoanForm,
    layout: RootLayout,
    protected: true,
    allowedRoles: ["partner"],
    loanType: "loanAgainstProperty",
    name: "Partner Dashboard",
  },
  {
    path: "/our-panels/loan-panels/cl",
    element: LoanForm,
    layout: RootLayout,
    protected: true,
    allowedRoles: ["partner"],
    loanType: "carLoan",
    name: "Partner Dashboard",
  },
  {
    path: "/our-panels/loan-panels/ocl",
    element: LoanForm,
    layout: RootLayout,
    protected: true,
    allowedRoles: ["partner"],
    loanType: "oldCarLoan",
    name: "Partner Dashboard",
  },
  {
    path: "/our-panels/loan-panels/:loanType/upload-doc/:fileNo",
    element: UploadDocForLoan,
    layout: RootLayout,
    protected: true,
    allowedRoles: ["partner"],
    name: "Partner Dashboard",
  },

  {
    path: "/our-panels/taxation-panel",
    element: TaxationPanel,
    layout: RootLayout,
    protected: true,
    allowedRoles: ["partner"],
    name: "Partner Dashboard",
  },
  {
    path: "/our-panels/taxation-panel/place-order",
    element: PlaceOrder,
    layout: RootLayout,
    protected: true,
    allowedRoles: ["partner"],
    name: "Partner Dashboard",
  },
  {
    path: "/our-panels/taxation-panel/add-client",
    element: AddClient,
    layout: RootLayout,
    protected: true,
    allowedRoles: ["partner"],
    name: "Partner Dashboard",
  },

  {
    path: "/our-panels/taxation-panel/all-client",
    element: AllClient,
    layout: RootLayout,
    protected: true,
    allowedRoles: ["partner"],
    name: "Partner Dashboard",
  },

  {
    path: "/our-panels/taxation-panel/upload-doc/:fileNo",
    element: TaxationUploadDoc,
    layout: RootLayout,
    protected: true,
    allowedRoles: ["partner"],
    name: "Partner Dashboard",
  },

  {
    path: "/our-panels/creditCard-panel",
    element: CreditCard,
    layout: RootLayout,
    protected: true,
    allowedRoles: ["partner"],
    name: "Partner Dashboard",
  },

  {
    path: "/our-panels/creditCard-panel/creditcard-apply",
    element: CreditCardApply,
    layout: RootLayout,
    protected: true,
    allowedRoles: ["partner"],
    name: "Partner Dashboard",
  },
  {
    path: "/our-panels/creditCard-panel/upload-doc/:fileNo",
    element: CreditCardDocUpload,
    layout: RootLayout,
    protected: true,
    allowedRoles: ["partner"],
    name: "Partner Dashboard",
  },

  {
    path: "/our-panels/govermentLoan",
    element: GovermentLoan,
    layout: RootLayout,
    protected: true,
    allowedRoles: ["partner"],
    name: "Partner Dashboard",
  },
  {
    path: "/our-panels/govermentLoan/:loanType",
    element: GovermentLoanForm,
    layout: RootLayout,
    protected: true,
    allowedRoles: ["partner"],
    name: "Partner Dashboard",
  },

  {
    path: "/our-panels/govermentLoan/:loanType/uploadDoc/:fileNo",
    element: GovermentLoanDocUpload,
    layout: RootLayout,
    protected: true,
    allowedRoles: ["partner"],
    name: "Partner Dashboard",
  },

  {
    path: "/our-panels/insurancePanel",
    element: InsurancePanel,
    layout: RootLayout,
    protected: true,
    allowedRoles: ["partner"],
    name: "Partner Dashboard",
  },
  {
    path: "/our-panels/insurancePanel/insurance/apply",
    element: InsuranceApply,
    layout: RootLayout,
    protected: true,
    allowedRoles: ["partner"],
    name: "Partner Dashboard",
  },

  {
    path: "/our-panels/insurance/upload-doc/:fileNo",
    element: InsuranceDocUpload,
    layout: RootLayout,
    protected: true,
    allowedRoles: ["partner"],
    name: "Partner Dashboard",
  },

  {
    path: "/our-panels/instant-login-panel",
    element: InstantLoginPanel,
    layout: RootLayout,
    protected: true,
    allowedRoles: ["partner"],
    name: "Partner Dashboard",
  },
  {
    path: "/our-panels/instant-login-credit-card",
    element: InstantLoginCreditCard,
    layout: RootLayout,
    protected: true,
    allowedRoles: ["partner"],
    name: "Partner Dashboard",
  },

  {
    path: "/our-panels/i2i-eligible-panel",
    element: EligiblePanel,
    layout: RootLayout,
    protected: true,
    allowedRoles: ["partner"],
    name: "Partner Dashboard",
  },

  {
    path: "/policy",
    element: Policy,
    layout: RootLayout,
    protected: true,
    allowedRoles: ["partner"],
    name: "Partner Dashboard",
  },

  {
    path: "/certificate",
    element: Certificate,
    layout: RootLayout,
    protected: true,
    allowedRoles: ["partner"],
    name: "Partner Dashboard",
  },
];

export default routes;
