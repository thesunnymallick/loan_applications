import React, { useEffect, useState } from "react";
import { Card, List, Button, Typography, Input, notification } from "antd";
import { FilePdfOutlined, EyeOutlined } from "@ant-design/icons";
import { getAllPolice } from "../../api/partner/policeApi";
import PanelsShimmerUi from "../../components/shimmerUi/PanelsShimmerUi";
const { Search } = Input;


const Policy = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [policeList, setPoliceList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPolice = async () => {
    setLoading(true);
    try {
      const {  data } = await getAllPolice(); // assuming this function is fetching the API response
      setLoading(false);
      setPoliceList(data?.data); 
    } catch (error) {
      notification.error({ message: 'Failed to fetch police data' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPolice();
  }, []);

  // Filtered policies based on search term
  const filteredPolicies = policeList
    .map((policy) => ({
      ...policy,
      files: [
        {
          name: policy.policy_name,
          link: policy.policy_file_url,
        },
      ],
    }))
    .filter((policy) =>
      policy.files.some((file) => file.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );

  const handleViewPdf = (link) => {
    window.open(link, "_blank");
  };

  return (
    <>
     {
      loading!==true ? (<div className="px-6 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <h2 className="text-2xl font-semibold mb-6">Policies</h2>
          <Search
            size="large"
            placeholder="Search for a policy..."
            allowClear
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ marginBottom: "20px", maxWidth: "400px" }}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPolicies.length > 0 ? (
            filteredPolicies.map((policy, index) => (
              <Card key={index} title={policy.policy_type} className="shadow-lg px-1">
                <List
                  itemLayout="horizontal"
                  dataSource={policy.files}
                  renderItem={(file, idx) => (
                    <List.Item
                      actions={[
                        <Button
                          type="link"
                          icon={<EyeOutlined />}
                          onClick={() => handleViewPdf(file.link)}
                        >
                          View
                        </Button>,
                      ]}
                    >
                      <List.Item.Meta
                        avatar={<FilePdfOutlined style={{ fontSize: "1.5rem", color: "red" }} />}
                        title={
                          <span>
                            <strong>{idx + 1}. </strong>
                            {file.name}
                          </span>
                        }
                      />
                    </List.Item>
                  )}
                />
              </Card>
            ))
          ) : (
            <Typography.Text type="secondary">No policies found.</Typography.Text>
          )}
        </div>
      </div>) : (<PanelsShimmerUi/>)
     }
    </>
  );
};

  
  export default Policy;
