// PanelCard.js
import React from "react";
import { Card, Button } from "antd";
import { useNavigate } from "react-router-dom";

const PanelCard = ({ title, description, image, services, link }) => {
  const navigate=useNavigate();
  return (
    <Card
      hoverable
      cover={<img alt={title} src={image} className="h-auto w-full object-cover rounded-t-lg" />}
      className="rounded-lg shadow-md relative pb-6"
    >
      <h2 className="text-2xl font-bold mb-1">{title}</h2>
      <p className="text-gray-600 mb-3">{description}</p>
      <ul className="mb-6 pb-4 list-disc list-inside text-gray-700">
        {services.map((service, index) => (
          <li key={index}>{service}</li>
        ))}
      </ul>
      <div className="absolute bottom-2 py-6 w-[90%] flex justify-center">
      <Button 
      onClick={()=>navigate(link)}
       className="w-full bg-green-700 text-white h-10">
        Apply Now
      </Button>
      </div>
    </Card>
  );
};

export default PanelCard;
