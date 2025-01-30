import React, { useEffect, useState } from "react";
import PanelCard from "../../components/partnerComponet/PanelCard";
import { getAllPanel, partnerPanelAccess } from "../../api/partner/panelApi";
import PanelsShimmerUi from "../../components/shimmerUi/PanelsShimmerUi";

const OurPanels = () => {
  const [panelAccess, setPanelAccess] = useState([]);
  const [allPanel, setAllPanel] = useState([]);
  const [loading, setLoading]=useState(false);

  const fetchPanleAccessPartner = async () => {
    try {
      const { data, status } = await partnerPanelAccess();
      if (status === 200) {
        setPanelAccess(data?.data?.subscription_details?.panel_access || []);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllPanel = async () => {
    try {
       setLoading(true);
      const { data, status } = await getAllPanel();
      if (status === 200) {
        setLoading(false)
        setAllPanel(data?.data || []);
      }
    } catch (error) {
       setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPanleAccessPartner();
    // fetchAllPanel();
  }, []);

  useEffect(()=>{
     fetchAllPanel();
  },[])

  return (
    <>
    {
      loading!==true ? (<div className="p-6">
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allPanel.map((panel, index) => (
            <PanelCard
              key={index}
              title={panel.title}
              description={panel.description}
              image={panel.image}
              services={panel.services}
              link={panel.url}
              isAccessible={panelAccess.includes(panel.uuid)}
              isAnchar={panel.title==="Micro Panel" || "I2I Elegible Panel"? true :false }
            />
          ))}
        </div>
      </div>) : (<PanelsShimmerUi/>)
    }
    </>
  );
};

export default OurPanels;
