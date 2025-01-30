import React, { useEffect, useState } from "react";
import { Input, AutoComplete } from "antd";
import { getAllInstantLoginCreditBank } from "../../api/partner/panelApi";
import ErrorHandler from "../../utils/ErrorHandler";
import Loader from "../../components/Loader";

const InstantLoginCreditCard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [allPanel, setAllPanel] = useState([]);
  const [loading, setLoading]=useState(false);

  useEffect(() => {
    const getInstantPanel = async () => {
      try {
         setLoading(true);
        const { data, status } = await getAllInstantLoginCreditBank();
        if (status === 200) {
          setAllPanel(data?.data);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        ErrorHandler.handleError(error);
      }
    };

    getInstantPanel();
  }, []);

  // Function to handle search term update
  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  // Filter the panels based on the search term
  const filteredPanel = allPanel.filter((panel) =>
    panel.bank_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
     <>
      {
        loading!==true ? (  <div className="p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
              Instant Login Credit Card Panel
            </h2>
    
            {/* Ant Design AutoComplete Component for Search */}
            <AutoComplete
              onSearch={handleSearch}
              value={searchTerm}
              className="w-full sm:w-[50%] md:w-[30%] lg:w-[20%] mb-6"
              placeholder="Search for a bank..."
            >
              <Input.Search size="large" enterButton style={{ width: "100%" }} />
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
                    <a href={panel.url} target="_blank" rel="noopener noreferrer">
                      <img
                        src={panel.image}
                        alt={panel.bank_name}
                        className="h-full object-contain"
                      />
                    </a>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {panel.bank_name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">{""}</p>
                  </div>
    
                  <div className="absolute bottom-4 w-full px-4 mt-4">
                    <a
                      href={panel.url}
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
        </div>) : (<Loader/>)
      }
     </>
  );
};

export default InstantLoginCreditCard;
