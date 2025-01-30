import React from "react";
import { Card, Tooltip } from "antd";
import { useNavigate, Link } from "react-router-dom";
import LazyIamge from "../LazyImage"
const PanelCard = ({ title, description, image, services, link, isAccessible }) => {
  console.log("Title", title);

  // Check if the title matches the condition
  const useAnchorTag = title === "Micro Panel" || title === "I2I Elegible Panel";

  return (
    <Tooltip
      title={!isAccessible ? "You are not eligible for this service" : ""}
      placement="top"
    >
      <Card
        hoverable={isAccessible}
        cover={<LazyIamge alt={title} src={image} className="h-auto w-full object-cover rounded-t-lg" />}
        className={`rounded-lg shadow-md relative pb-6 ${
          !isAccessible ? "cursor-not-allowed opacity-60" : ""
        }`}
      >
        <h2 className="text-2xl font-bold mb-1">{title}</h2>
        <p className="text-gray-600 mb-3">{description}</p>
        <ul className="mb-6 pb-4 list-disc list-inside text-gray-700">
          {services.map((service, index) => (
            <li key={index}>{service}</li>
          ))}
        </ul>
        <div className="absolute bottom-2 py-6 w-[90%] flex justify-center">
          {useAnchorTag ? (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full h-10 flex justify-center items-center rounded-lg ${
                isAccessible ? "bg-green-700 text-white" : "bg-gray-300 text-gray-600"
              }`}
            >
              Apply Now
            </a>
          ) : (
            <Link
              to={isAccessible ? link : "#"}
              className={`w-full h-10 flex justify-center items-center rounded-lg ${
                isAccessible ? "bg-green-700 text-white" : "bg-gray-300 text-gray-600"
              }`}
              onClick={(e) => {
                if (!isAccessible) e.preventDefault();
              }}
            >
              Apply Now
            </Link>
          )}
        </div>
      </Card>
    </Tooltip>
  );
};

export default PanelCard;
