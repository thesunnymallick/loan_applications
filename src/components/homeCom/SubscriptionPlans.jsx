import React, { useEffect, useState } from "react";
import { getAllSubscriptions } from "../../api/partner/homeApi";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const SubscriptionPlans = () => {
  const [plans, setPlans] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubcriptions = async () => {
      try {
        const { data, status } = await getAllSubscriptions();
        if (status === 200) {
          console.log(data);
          setPlans(data?.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchSubcriptions();
  }, []);

  return (
    <div className="py-10 px-5">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-green-700">
        We Help You to Incomekaro
      </h2>
      <p className="text-lg text-center mb-10 text-gray-500">
        Subscription Plan (<span className="font-semibold">*Life Time*</span>)
      </p>
      {/* Grid Layout */}
      <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            className={`relative p-6 rounded-xl shadow-md transform transition duration-300 ${
              plan.is_offer
                ? "bg-green-700 text-white"
                : "bg-white border border-gray-300 hover:border-green-500"
            }`}
            initial={{ opacity: 0, y: 50 }} // Start from below
            whileInView={{
              opacity: 1,
              y: 0, // Move to normal position
              transition: {
                duration: 0.7, // Smooth animation duration
                delay: index * 0.15, // Staggered animation effect
                ease: "easeOut",
              },
            }} // Animation triggers when in view
            viewport={{ once: true }} // Trigger once when the element enters the viewport
            whileHover={{
              scale: 1.03, // Slight scale up on hover
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)", // Add shadow effect on hover
            }}
          >
            {plan.is_offer ? (
              <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                Offer Active
              </div>
            ) : null}
            <h3 className="text-xl font-bold mb-4">{plan.subscription_name}</h3>
            <p className="text-2xl font-semibold">
              ₹{plan.offer_price || plan.price}{" "}
              <span className="text-sm">(Incl. GST: {plan.gst}%)</span>
            </p>
            <ul className="mt-4 space-y-2">
              {plan.services.map((service, i) => (
                <li key={i} className="text-sm">
                  <span className="text-green-500 font-bold">•</span> {service}
                </li>
              ))}
            </ul>
            <button
              onClick={() => navigate(`/partner-apply`)}
              className={`mt-6 px-4 py-2 w-full rounded-full font-semibold transition duration-300 ${
                plan.is_offer
                  ? "bg-white text-green-700 hover:bg-gray-100"
                  : "bg-green-700 text-white hover:bg-green-800"
              }`}
            >
              Choose Plan
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPlans;
