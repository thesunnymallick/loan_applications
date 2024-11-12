import { Button, Col, Input, notification, Row } from "antd";
import React, { useRef, useState } from "react";
import { partnerOTPVerify } from "../../../api/salesExecutive/partnerApi";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useNavigate } from "react-router-dom";
const EmailVerify = ({ email, setIsOpen}) => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const navigate =useNavigate();
  const inputRefs = useRef([]);
  const [isCountdownComplete, setIsCountdownComplete] = useState(false);

  const handleComplete = () => {
    setIsCountdownComplete(true);
  };

  // Email OTP Verify
  const emailOtpVerify = async () => {
    try {
      setLoading(true);
      const payload = {
        email: email,
        otp: otp.join(""),
      };
      const { status } = await partnerOTPVerify(payload);
      setLoading(false);
  
      if (status === 200) {
        setIsOpen(false);
        setOtp(new Array(6).fill(""))
        // Assuming that a status of 200 indicates successful OTP verification
        notification.success({
          message: "Verification Successful",
          description:
            "Your OTP has been verified successfully. A password has been sent to your registered email.",
        });
       
        // redirect Another Page
          navigate(`/sales-executive/partner`);
          setIsCountdownComplete(false);
      } else {
        notification.error({
          message: "Verification Failed",
          description:
            "OTP verification failed. Please check your OTP and try again.",
        });
      }
    } catch (error) {
      setLoading(false);
      notification.error({
        message: "Error",
        description:
          error.message || "An unexpected error occurred during verification.",
      });
    }
  };

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    const otpArray = [...otp];
    otpArray[index] = element.value;
    setOtp(otpArray);

    // Move focus to the next input if available
    if (index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  return (
    <div className="px-6 pb-8">
      <div className="flex flex-col  justify-center gap-2 py-4">
        <h1 className="text-zinc-800 font-semibold text-2xl">
          OTP Verification
        </h1>
        <span className="text-zinc-600 text-sm">{`Please enter the 6-digit verification code that was sent to your email`}</span>
      </div>

      {!isCountdownComplete && (
        <div className="flex justify-center py-4">
          <CountdownCircleTimer
            isPlaying={true}
            duration={30}
            colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
            colorsTime={[30, 20, 10, 0]}
            onComplete={() => {
              handleComplete();
              return { shouldRepeat: false }; // Stops the timer after countdown
            }}
          >
            {({ remainingTime }) => (
              <div>
                <span className="text-2xl text-green-700 font-semibold">
                  00.{remainingTime}
                </span>
              </div>
            )}
          </CountdownCircleTimer>
        </div>
      )}

      <div className="py-6">
        <Row justify="center" gutter={8} style={{ marginBottom: "20px" }}>
          {otp.map((data, index) => (
            <Col key={index}>
              <Input
               disabled={isCountdownComplete===false ? true: false}
                type="text"
                maxLength={1}
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                ref={(el) => (inputRefs.current[index] = el)}
                style={{
                  width: "50px",
                  height: "50px",
                  textAlign: "center",
                  fontSize: "20px",
                  borderRadius: "10px",
                  borderColor: "#007500",
                }}
              />
            </Col>
          ))}
        </Row>
      </div>

      <div className="flex justify-center py-2  px-4">
        <Button
          disabled={isCountdownComplete===false ? true : false}
          onClick={emailOtpVerify}
          loading={loading}
          className={"w-full h-12 bg-green-700 text-white rounded-xl text-lg"}
        >
          Verify
        </Button>
      </div>

      <div className="flex justify-center text-sm cursor-pointer py-3">
        <span className="text-zinc-600">
          Don not have code? <span className="text-green-700">Resend</span>
        </span>
      </div>
    </div>
  );
};

export default EmailVerify;
