import React, { useEffect, useState } from "react";
import { Modal, Button, Checkbox } from "antd";
import { MdVerified } from "react-icons/md";
import { FaExclamationTriangle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  accpectAgrement,
  getAgrementDetails,
} from "../../api/partner/uploadDocApi";
import { updateAgrement } from "../../features/authSlice";
import AgreementPDF from "../../pages/partner/AgreementPDF";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ErrorHandler from "../../utils/ErrorHandler";

const VerificationModal = () => {
  const { status: userStatus, is_agreement } = useSelector(
    (state) => state.auth
  );
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isChecked, setIsChecked] = useState(false)
  const [aggrementDetails, setAgreementDeatils]=useState(null)

  const dispatch = useDispatch();

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };



  const handleAcceptAgreement = async () => {
    try {
      const { status } = await accpectAgrement({ agreement: 1 });
      if (status === 200) {
        dispatch(updateAgrement({ is_agreement: true }));
      }
    } catch (error) {
      ErrorHandler.handleError(error);
    }
  };

  useEffect(()=>{
  const fetchAgrementDetails=async()=>{
   try {
    const {data, status}=await getAgrementDetails();
    if(status===200){
      setAgreementDeatils(data)
    }
   } catch (error) {
    ErrorHandler.handleError(error);
   }
  }
  fetchAgrementDetails()
  },[])

  return (
    <Modal
      open={isModalOpen}
      onCancel={handleCloseModal}
      footer={null}
      centered
      bodyStyle={{
        padding: "32px",
        textAlign: "center",
        backgroundColor: "#f3f4f6",
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
              ? "Account Verification Complete"
              : "Account Not Verified"}
          </span>
        </div>
      }
    >
      {userStatus === "verified" &&
        (is_agreement ? (
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
            <Button
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-md mt-6"
              onClick={handleCloseModal}
            >
              Explore Services
            </Button>
          </div>
        ) : (
          <div>
            <p className="text-gray-700 text-lg mb-4">
              Please review and accept the agreement to complete your account
              verification.
            </p>
            <div className="text-left bg-white p-4 rounded-md shadow-md border mb-4">
              <p className="text-gray-600">
                <strong>Agreement Terms:</strong> Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Phasellus interdum lectus at ex
                auctor, nec venenatis nulla vehicula. Vivamus feugiat metus nec
                massa varius, sed tincidunt lacus venenatis.
              </p>
              <p className="text-gray-600 mt-2">
                By accepting this agreement, you acknowledge and agree to the
                terms and conditions stated here.
              </p>
            </div>
            <Checkbox
              className="mb-4 text-sm text-gray-700"
              onChange={(e) => setIsChecked(e.target.checked)}
            >
              I accept the terms and conditions of the agreement.
            </Checkbox>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md"
                disabled={!isChecked}
                // onClick={handleDownloadAgreement}
              >
                <PDFDownloadLink
                  document={<AgreementPDF aggrementDetails={aggrementDetails} />}
                  fileName="Agreement.pdf"
                >
                  {({ loading }) =>
                    loading ? "Preparing document..." : "Download Agreement"
                  }
                </PDFDownloadLink>
              </Button>
              <Button
                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-md"
                disabled={!isChecked}
                onClick={handleAcceptAgreement}
              >
                Accept and Continue
              </Button>
            </div>
          </div>
        ))}
      {!userStatus === "verified" && (
        <div className="text-red-500">
          <p className="text-lg">
            ⚠️ Your account isn't verified yet. Verification is essential to
            secure your account and unlock all features.
          </p>
          <p className="text-gray-600 mt-2">
            Please complete the process to enjoy benefits like secure
            transactions, account insights, and personalized services.
          </p>
          <Button
            className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold px-6 py-2 rounded-md mt-6"
            onClick={handleCloseModal}
          >
            Start Verification
          </Button>
        </div>
      )}
    </Modal>
  );
};

export default VerificationModal;
