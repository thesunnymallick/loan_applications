import React from 'react';

const services = [
  {
    title: "Web Development",
    description: "Creating and maintaining websites or web applications, including front-end (user interface) and back-end (server-side) development.",
    icon: "🌐", 
  },
  {
    title: "Mobile App Development",
    description: "Developing applications for mobile devices on platforms such as iOS, Android, or cross-platform.",
    icon: "📱",
  },
  {
    title: "Digital Marketing",
    description: "Want to connect with more potential leads for your online business? Consider a complete 360° Digital Marketing Solution.",
    icon: "📊",
  },
  {
    title: "Software Development",
    description: "Offering expert advice on system architecture, best practices, technology stack selection, and improving software efficiency.",
    icon: "💻",
  },
  {
    title: "ERP",
    description: "Managing your company only gets easier when you incorporate an Enterprise Resource Planning (ERP) Suite. Plan how your business works!",
    icon: "🏢",
  },
  {
    title: "Graphics & Videos",
    description: "Creative videos and attractive branding posts are now just a thought away. Your creative group of media content creators is waiting.",
    icon: "🎥",
  },
];

const Services = () => {
  return (
    <div className="bg-gray-50 rounded-lg py-10">
      <h2 className="text-center text-3xl font-bold text-black mb-8">Our Services</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 lg:px-20">
        {services.map((service, index) => (
          <div
            key={index}
            className={`service-card p-6 rounded-lg shadow-md 
            bg-white text-black transition-transform cursor-pointer hover:text-white`}
          >
            <div className="text-4xl mb-4">{service.icon}</div>
            <h3 className="text-xl font-bold mb-2">{service.title}</h3>
            <p className="text-sm">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
