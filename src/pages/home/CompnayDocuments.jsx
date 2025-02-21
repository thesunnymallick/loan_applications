import React from 'react';
import Footer from './Footer';
import HomeNavbar from '../../layouts/HomeNavbar';
import { Button, Card } from 'antd';
import { FilePdfOutlined } from '@ant-design/icons';
import panCardCompany from "../../assets/panCardCompany.pdf";
import CertificateofIncorporation from "../../assets/CertificateofIncorporation.pdf";
const documents = [
  {
    id: 1,
    title: 'Pan Card',
    description: 'Official government-issued identification for tax purposes.',
    url: panCardCompany
  },
  {
    id: 2,
    title: 'Certificate of Incorporation',
    description: 'Legal document proving the formation of the company.',
    url: CertificateofIncorporation
  },

];

const CompanyDocuments = () => {
  return (
    <>
    <HomeNavbar />
    <div className="py-10 px-5 md:px-20 mt-10">
      <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">Company Documents</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {documents.map((doc) => (
          <Card
            key={doc.id}
            className="border border-green-500 bg-green-100 shadow-lg hover:shadow-xl transition duration-300"
            title={<span className="text-green-700 font-semibold">{doc.title}</span>}
          >
            <p className="text-green-800 flex items-center mb-4">
              <FilePdfOutlined className="mr-2 text-xl" /> {doc.description}
            </p>
            <Button
              type="primary"
              icon={<FilePdfOutlined />}
              href={doc.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 border-none"
            >
              View PDF
            </Button>
          </Card>
        ))}
      </div>
    </div>
    <Footer />
  </>
  );
};

export default CompanyDocuments;