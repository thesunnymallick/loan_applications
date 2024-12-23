import React, { useState } from "react";
import bank1 from "../../assets/banks/bank1.png";
import bank2 from "../../assets/banks/bank2.png";
import bank3 from "../../assets/banks/bank3.png";
import bank4 from "../../assets/banks/bank4.png";
import bank11 from "../../assets/banks/bank11.jpg";
import bank12 from "../../assets/banks/bank12.png";
import { Input, AutoComplete } from "antd"; 

const InstantLoginPanel = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const allPanel = [
    {
      title: "POONAWALA PERSONAL LOAN",
      description: "Get instant personal loans with minimal documentation.",
      link: "https://instant-pocket-loan.poonawallafincorp.com/?utm_DSA_Code=PDL00142&UTM_Partner_Name=MyMoneyMantra&UTM_Partner_Medium=B2BApp&UTM_Partner_AgentCode=PFLEARN&UTM_Partner_ReferenceID=ENT95128",
      image: bank2,
    },
    {
      title: "ADITYA BIRLA PERSONAL LOAN",
      description: "Quick and secure banking services at your fingertips.",
      link: "https://abfl.finbox.in/?partnerCode=MP_DRJJZG&agentCode=951282",
      image: bank11,
    },
    {
      title: "PROTIUM BUSINESS LOAN",
      description: "Experience seamless financial solutions.",
      link: "https://dbl.protium.co.in/?utm_source=my_money_mantra&utm_medium=digital&utm_campaign=Earntra_95128",
      image: bank12,
    },
    {
      title: "Bank 3",
      description: "Your trusted partner in financial growth.",
      link: "#",
      image: bank4,
    },
    // Add more banks as needed
  ];

  // Function to handle search term update
  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  // Filter the panels based on the search term
  const filteredPanel = allPanel.filter(panel =>
    panel.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Instant Login Panel</h2>
        
        {/* Ant Design AutoComplete Component for Search */}
        <AutoComplete
          onSearch={handleSearch}
          value={searchTerm}
          className="mb-6 w-[20%]"
          placeholder="Search for a bank..."
        >
          <Input.Search size="large" enterButton style={{ width: '100%' }} />
        </AutoComplete>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredPanel.length > 0 ? (
          filteredPanel.map((panel, index) => (
            <div
              key={index}
              className="relative bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300 h-[40vh]"
            >
              <div className="h-32 bg-gray-100 flex items-center justify-center">
                <a href={panel.link} target="_blank" rel="noopener noreferrer">
                  <img
                    src={panel.image}
                    alt={panel.title}
                    className="h-full object-contain"
                  />
                </a>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {panel.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4">{panel.description}</p>
              </div>

              <div className="absolute bottom-4 w-full px-4 mt-4">
                <a
                  href={panel.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-8 bg-green-700 text-white rounded-md flex items-center justify-center no-underline"
                >
                  Apply Now
                </a>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-lg text-gray-600">
            No search results found
          </div>
        )}
      </div>
    </div>
  );
};

export default InstantLoginPanel;
