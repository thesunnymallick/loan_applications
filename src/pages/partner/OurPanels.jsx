import React from "react";
import PanelCard from "../../components/partnerComponet/PanelCard";
import loanPanelBg from "../../assets/loanPanel.jpg";
import taxPanelBg from "../../assets/taxPanel.jpg";
import creditcardPanelBg from "../../assets/creditcardPanel.jpg";
import insurancePanelBg from "../../assets/insurancePanel.jpg";
import governmentPanelBg from "../../assets/governmentPanel.jpg";
import microPanelBg from "../../assets/microPanel.jpg";
const OurPanels = () => {
  // data.js
  const panels = [
    {
      title: "Loan Panel",
      description: "Explore various loan services tailored to meet your needs.",
      image: loanPanelBg,
      services: [
        "Home Loan",
        "Business Loan",
        "Car Loan",
        "Personal Loan",
        "Old Car Loan",
      ],
    },
    {
      title: "Taxation Panel",
      description: "Our taxation services help you manage taxes efficiently.",
      image: taxPanelBg,
      services: ["Tax Filing", "GST Registration", "Income Tax"],
    },
    {
      title: "Credit Card Panel",
      description: "Find the perfect credit card with exclusive benefits.",
      image: creditcardPanelBg,
      services: ["Rewards Card", "Travel Card", "Cashback Card"],
    },
    {
      title: "Micro Panel",
      description:
        "Access micro-loans and funding solutions for small businesses.",
      image: microPanelBg,
      services: ["Micro Loans", "SME Loans"],
    },
    {
      title: "Government Panel",
      description: "Get information on government-backed schemes and support.",
      image: governmentPanelBg,
      services: ["Government Schemes", "Subsidized Loans"],
    },
    {
      title: "Insurance Panel",
      description: "Secure your future with our range of insurance options.",
      image: insurancePanelBg,
      services: ["Life Insurance", "Health Insurance", "Vehicle Insurance"],
    },
  ];

  return (
    <div className=" p-6">
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {panels.map((panel, index) => (
          <PanelCard
            key={index}
            title={panel.title}
            description={panel.description}
            image={panel.image}
            services={panel.services}
          />
        ))}
      </div>
    </div>
  );
};

export default OurPanels;
