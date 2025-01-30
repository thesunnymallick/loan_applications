import React from "react";
import HomeNavbar from "../../layouts/HomeNavbar";
import Hero from "../../components/homeCom/Hero";
import SubscriptionPlans from "../../components/homeCom/SubscriptionPlans";
import Footer from "./Footer";
import AllBanks from "../../components/homeCom/AllBanks";
import RegisterProcess from "../../components/homeCom/RegisterProcess";
import BusinessOverview from "../../components/homeCom/BusinessOverview";
import FinancialProducts from "../../components/homeCom/FinancialProducts";
import BusinessOverview2 from "../../components/homeCom/BusinessOverview2";
import MobileAppAdd from "../../components/homeCom/MobileAppAdd";
import Services from "../../components/homeCom/Services";
import OurCompany from "../../components/homeCom/OurCompany";
import ContactInfo from "../../components/homeCom/ContactInfo";
import OurTeam from "../../components/homeCom/OurTeam";

const Home = () => {
  return (
    <>
      <HomeNavbar />
      <Hero />
      <div className="container mx-auto py-10">
        <AllBanks />
      </div>
      <div className="container mx-auto py-10 space-y-10">
        <RegisterProcess />
        <SubscriptionPlans />
        <OurTeam/>
        <BusinessOverview />
        <FinancialProducts />
        <BusinessOverview2 />
      </div>

      <MobileAppAdd />
      <div className="container mx-auto px-4">
        <Services />
        <OurCompany />
        <ContactInfo />
      </div>

      <Footer />
    </>
  );
};

export default Home;
