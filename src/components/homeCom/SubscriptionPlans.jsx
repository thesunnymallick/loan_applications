import React from "react";

const SubscriptionPlans = () => {
  const plans = [
    {
      title: "DSA LITE",
      price: "₹ 1,499",
      gst: "Incl. 18% GST",
      features: [
        "Private Bank Loan Panel",
        "Govt Bank Loan Panel",
        "Offline Credit Card Panel",
      ],
    },
    {
      title: "DSA LITE PRO",
      price: "₹ 4,999",
      gst: "Incl. 18% GST",
      features: [
        "Private Bank Loan Panel",
        "Govt Bank Loan Panel",
        "Offline Credit Card Panel",
        "Tax, GST, ROC Service Panel",
        "Instant Normal Payout",
        "RM Support",
      ],
    },
    {
      title: "DSA DELIGHT",
      price: "₹ 9,999",
      gst: "Incl. 18% GST",
      features: [
        "Private Bank Loan Panel",
        "Govt Bank Loan Panel",
        "Online Credit Card Panel",
        "Tax, GST, ROC Service Panel",
        "Monthly Highly Payout",
        "RM Support",
      ],
    },
    {
      title: "DSA DELIGHT PRO",
      price: "₹ 18,999",
      gst: "Incl. 18% GST",
      features: [
        "Private Bank Loan Panel",
        "Govt Bank Loan Panel",
        "Online Credit Card Panel",
        "Tax, GST, ROC Service Panel",
        "Micro Panel Instant & Direct Login Panel",
        "AADHAR CARD & PAN CARD LOAN PANEL",
        "Credit Score Check Panel",
        "Instant Highly Payout & Special RM Team Support",
      ],
    },
    {
      title: "Franchise Plan",
      price: "For pricing call +91 9091963351",
      features: [
        "DSA Delight Pro Active",
        "Up Front Income",
        "Passive Income",
        "Instant Income",
        "RM Support",
        "BM Support",
        "Lead Support",
      ],
      badge: "Pre Booking Deposit 40%",
    },
  ];

  return (
    <div className="py-10 px-5">
      <h2 className="text-2xl md:text-4xl font-bold text-center mb-6 text-green-700">
        We Help You to Lenderway
      </h2>
      <p className="text-lg text-center mb-10 text-gray-500">
        Subscription Plan (<span className="font-semibold">*Life Time*</span>)
      </p>
      {/* Grid Layout */}
      <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`p-6 rounded-xl shadow-md transform transition duration-300  hover:bg-green-100 ${
              plan.highlighted
                ? "bg-green-700 text-white"
                : "bg-white border border-gray-300 hover:border-green-500"
            }`}
          >
            {plan.badge && (
              <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full absolute top-2 right-2">
                {plan.badge}
              </div>
            )}
            <h3 className="text-xl font-bold mb-4">{plan.title}</h3>
            <p className="text-2xl font-semibold">
              {plan.price} <span className="text-sm">{plan.gst}</span>
            </p>
            <ul className="mt-4 space-y-2">
              {plan.features.map((feature, i) => (
                <li key={i} className="text-sm">
                  <span className="text-green-500 font-bold">•</span> {feature}
                </li>
              ))}
            </ul>
            <button
              className={`mt-6 px-4 py-2 w-full rounded-full font-semibold transition duration-300 ${
                plan.highlighted
                  ? "bg-white text-green-700 hover:bg-gray-100"
                  : "bg-green-700 text-white hover:bg-green-800"
              }`}
            >
              Choose Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPlans;
