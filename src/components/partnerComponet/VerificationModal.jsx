import React, { useState } from "react";
import { Modal, Button } from "antd";
import { MdVerified } from "react-icons/md";
import { FaExclamationTriangle } from "react-icons/fa";
import { useSelector } from "react-redux";

const VerificationModal = () => {
  const { status: userStatus } = useSelector((state) => state.auth);
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      open={isModalOpen}
      onCancel={handleCloseModal}
      footer={null}
      centered
      bodyStyle={{
        padding: "32px",
        textAlign: "center",
        backgroundColor: "#f9f9f9", // Light gray background
        borderRadius: "12px",
      }}
      title={
        <div
          className={`flex items-center ${
            userStatus === "verified" ? "text-green-600" : "text-red-500"
          }`}
        >
          {userStatus === "verified" ? (
            <MdVerified className="text-3xl mr-2" />
          ) : (
            <FaExclamationTriangle className="text-3xl mr-2" />
          )}
          <span className="font-semibold text-xl">
            {userStatus === "verified"
              ? "Congratulations, Your Account is Verified!"
              : "Verification Required to Access Full Features"}
          </span>
        </div>
      }
    >
      <div>
        {userStatus === "verified" ? (
          <div className="text-green-600">
            <p className="text-lg">
              🎉 Your account verification is complete, and you're ready to
              explore all features.
            </p>
            <p className="text-gray-600 mt-2">
              Documents like identity proof and address verification have been
              successfully checked.
            </p>
            <p className="text-gray-600 mt-2">
              You can now access premium services like transaction tracking,
              analytics, and more.
            </p>
          </div>
        ) : (
          <div className="text-red-500">
            <p className="text-lg">
              ⚠️ Your account isn't verified yet. Verification is essential to
              secure your account and unlock all features.
            </p>
            <p className="text-gray-600 mt-2">
              Please complete the process to enjoy benefits like secure
              transactions, account insights, and personalized services.
            </p>
          </div>
        )}
        <div className="mt-6">
          <Button
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-md"
            onClick={handleCloseModal}
          >
            {userStatus === "verified" ? "Explore Services" : "Start Verification"}
          </Button>
          {userStatus !== "verified" && (
            <div className="mt-4 text-gray-500 text-sm">
              Need help? Contact our{" "}
              <span className="text-green-600 font-medium">support team</span>.
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default VerificationModal;
