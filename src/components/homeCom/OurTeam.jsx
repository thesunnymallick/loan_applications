import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const teamMembers = [
  {
    name: 'Sam Wister',
    role: 'Laravel Developer',
    image: 'https://via.placeholder.com/200',
    description: 'Passionate about building scalable web applications using Laravel and modern technologies.'
  },
  {
    name: 'Maria Joseph',
    role: 'Graphics Designer',
    image: 'https://via.placeholder.com/200',
    description: 'Creative designer specializing in branding, UI/UX, and visual storytelling.'
  },
  {
    name: 'Maria Gatondi',
    role: 'Web Designer',
    image: 'https://via.placeholder.com/200',
    description: 'Expert in creating visually stunning and user-friendly web interfaces.'
  },
  {
    name: 'Leo Min Pardese',
    role: 'Product Designer',
    image: 'https://via.placeholder.com/200',
    description: 'Innovative product designer with a passion for crafting exceptional user experiences.'
  },
];

const OurTeam = () => {
  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-5xl font-extrabold text-green-700 mb-4  tracking-wide">Meet the Brilliant Minds Behind Our Success</h2>
        <p className="text-lg text-gray-600 mb-8">Our talented team is committed to creativity, innovation, and excellence. Get to know the experts who bring our vision to life.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className={`p-8 rounded-xl shadow-lg text-center ${index === 1 ? 'bg-green-700 text-white' : 'bg-white'}`}>
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 mx-auto rounded-full border-4 border-green-500 mb-6"
              />
              <h3 className="text-2xl font-semibold">{member.name}</h3>
              <p className="text-lg mt-2 font-medium">{member.role}</p>
              <p className="text-base mt-4  opacity-70">{member.description}</p>
              <div className="mt-6 flex justify-center space-x-4 text-green-500 text-xl">
                <FaFacebookF />
                <FaTwitter />
                <FaInstagram />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurTeam;
