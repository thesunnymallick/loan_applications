import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { Upload, Image, Button } from "antd";
import {  CloseCircleOutlined } from "@ant-design/icons";

const UploadDocuments = () => {
  const [images, setImages] = useState({
    profilePhoto: null,
    aadharFront: null,
    aadharBack: null,
    panCard: null,
    chequePhoto: null,
  });

  const handlePreview = (file, key) => {
    const reader = new FileReader();
    reader.onload = e => {
      setImages(prev => ({ ...prev, [key]: e.target.result }));
    };
    reader.readAsDataURL(file);
    return false; 
  };

  const handleRemove = (key) => {
    setImages(prev => ({ ...prev, [key]: null }));
  };

  const renderUploadBox = (label, key) => (
    <div className="px-2">
      <h2 className="text-zinc-700 font-semibold">{label}</h2>
      <div className="w-full flex justify-center items-center overflow-hidden rounded-lg border-dashed border-2 border-zinc-300 bg-zinc-100 h-64 my-2 relative">
        {images[key] ? (
          <div className="relative h-full w-full">
            <Image src={images[key]} alt={label} className="h-full w-full object-cover" />
            <Button
              shape="circle"
              icon={<CloseCircleOutlined />}
              className="absolute top-2 right-2 bg-white text-zinc-700 hover:bg-red-500 hover:text-white"
              onClick={() => handleRemove(key)}
            />
          </div>
        ) : (
          <Upload
            showUploadList={false}
            beforeUpload={file => handlePreview(file, key)}
          >
            <div className="flex flex-col items-center gap-2">
              <FaCloudUploadAlt className="text-3xl text-zinc-500" />
              <span className="text-sm text-zinc-700">Drag and Drop file here</span>
              <span className="text-sm text-zinc-700">Or</span>
              <button className="w-full h-7 border-1 border-zinc-400 text-zinc-700 rounded-md">
                Browse Files
              </button>
            </div>
          </Upload>
        )}
      </div>
    </div>
  );

  return (
    <div className="p-6 flex gap-3">
      <div className="w-[25%] bg-white rounded-lg shadow-sm p-4 ">
        <h2 className="text-zinc-700 font-semibold">Upload Profile Photo</h2>
        <div className="w-full flex justify-center items-center overflow-hidden rounded-lg border-dashed border-2 border-zinc-300 bg-zinc-100 h-72 my-2 relative">
          {images.profilePhoto ? (
            <div className="relative h-full w-full">
              <Image src={images.profilePhoto} alt="Profile Photo" className="h-full w-full object-cover" />
              <Button
                shape="circle"
                icon={<CloseCircleOutlined />}
                className="absolute top-2 right-2 bg-white text-zinc-700 hover:bg-red-500 hover:text-white"
                onClick={() => handleRemove('profilePhoto')}
              />
            </div>
          ) : (
            <Upload
              showUploadList={false}
              beforeUpload={file => handlePreview(file, 'profilePhoto')}
            >
              <div className="flex flex-col items-center gap-2">
                <FaCloudUploadAlt className="text-3xl text-zinc-500" />
                <span className="text-sm text-zinc-700">Drag and Drop file here</span>
                <span className="text-sm text-zinc-700">Or</span>
                <button className="w-full h-7 border-1 border-zinc-400 text-zinc-700 rounded-md">
                  Browse Files
                </button>
              </div>
            </Upload>
          )}
        </div>
        <div className="px-2">
          <div className="flex flex-col items-center py-3">
            <h1 className="text-zinc-700 font-semibold text-2xl">Sunny Mallick</h1>
            <span className="flex items-center gap-2 text-base text-zinc-600">
              (<span>ID:</span> <span className="font-semibold">12334</span>)
            </span>
          </div>
        </div>
      </div>

      <div className="w-[75%] bg-white rounded-lg shadow-sm p-4">
        <div className="border-b-1 border-b-zinc-100 pb-2 flex justify-between items-center">
        <h2 className="text-zinc-700 font-semibold text-xl">Upload Documents</h2>
        <Button className="w-[18%] h-10 bg-green-700 text-white rounded-lg">Submit</Button>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-5">
          {renderUploadBox("Aadhar Front Image", "aadharFront")}
          {renderUploadBox("Aadhar Back Image", "aadharBack")}
          {renderUploadBox("Pan Card Image", "panCard")}
          {renderUploadBox("Cancel Cheque Photo", "chequePhoto")}
        </div>
      </div>
    </div>
  );
};

export default UploadDocuments;
