import React from "react";
import { FaCreditCard, FaPiggyBank } from "react-icons/fa";
import { BiBriefcaseAlt2, BiShield } from "react-icons/bi";
import { MdOutlineBarChart, MdOutlineSavings } from "react-icons/md";

const FinancialProducts = () => {
  const products = [
    {
      icon: <FaCreditCard className="text-green-600 text-4xl mb-4" />,
      title: "Credit Card DSA",
      description:
        "Sell credit cards of SBI Credit Card DSA Registration, ICICI Bank Credit Card DSA, HDFC Bank Credit Card DSA, Citi Bank Credit Card DSA, RBL, American Express, Kotak, Axis Bank, SCB Credit Card DSA, IndusInd Bank, and many more.",
    },
    {
      icon: <BiBriefcaseAlt2 className="text-green-600 text-4xl mb-4" />,
      title: "Personal Loan DSA & Business Loan DSA",
      description:
        "Online Loan DSA Registration for selling instant personal loan, business loan, home loan, loan against property or lap, mortgage loan and credit cards.",
    },
    {
      icon: <BiShield className="text-green-600 text-4xl mb-4" />,
      title: "General & Life Insurance",
      description:
        "Become an Insurance Agent of Multiple Insurance Companies Online in India for selling two-wheeler insurance, car insurance, health insurance, term life insurance, from 47+ insurance companies.",
    },
    {
      icon: <MdOutlineBarChart className="text-green-600 text-4xl mb-4" />,
      title: "Demat, Mutual Funds & Forex",
      description:
        "Open FREE DEMAT Account with no annual charges for the first year and sell top mutual funds, and stock market products and FOREX services to individuals and Corporates.",
    },
    {
      icon: <MdOutlineSavings className="text-green-600 text-4xl mb-4" />,
      title: "FD, RD & Gold Bonds",
      description:
        "Open deposits accounts for your clients with top fixed deposit and recurring deposit plans from our partner banks and finance companies with the highest interest rates in the industry.",
    },
    {
      icon: <FaPiggyBank className="text-green-600 text-4xl mb-4" />,
      title: "Banking Services",
      description:
        "Become a loan DSA channel partner to offer a wide variety of paperless and fully online banking services to individuals and corporates with exciting features, benefits and offers for personal and corporate banking customers.",
    },
  ];

  return (
    <div className="bg-white min-h-screen flex flex-col items-center py-10 px-4">
      <h1 className="text-3xl font-bold text-green-600 mb-6 flex flex-col items-center gap-2">
        <span>Our Financial Products for</span>   <span className="text-black">Loan DSA Partners</span>
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
        {products.map((product, index) => (
          <div
            key={index}
            className="bg-white border-2 border-green-600 shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow"
          >
            <div>{product.icon}</div>
            <h2 className="text-xl font-semibold text-black mb-2">
              {product.title}
            </h2>
            <p className="text-gray-700 text-sm">{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FinancialProducts;
