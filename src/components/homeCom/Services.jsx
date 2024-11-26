import React from 'react';

const services = [
  {
    title: "Web Development",
    description: "With a powerful team of expert coders and programmers, your website and web apps receive that extra attention to stand out from the rest.",
    icon: "🌐", 
  },
  {
    title: "Mobile App Development",
    description: "Launch your business application across all Operating Systems; be it Android, iOS, MacOS, or Windows. Your brand is now on all devices.",
    icon: "📱",
  },
  {
    title: "Digital Marketing",
    description: "Want to connect with more potential leads for your online business? Consider a complete 360° Digital Marketing Solution.",
    icon: "📊",
  },
  {
    title: "Software Development",
    description: "Cloud data storage, which enables you to run your enterprise smoothly with a perfect data synchronization environment.",
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
