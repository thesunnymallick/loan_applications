import React from "react";
import ourCompanyImg from "../../assets/ourCompany.jpg"
const OurCompany = () => {
  return (
    <div className="p-4">
      <div className="container mx-auto flex items-center gap-4">
        <div className=" flex-1 flex flex-col gap-4">
          <h1 className="text-3xl text-green-700 font-semibold">Our Company</h1>
          <p className="text-zinc-400">
            <span className="text-zinc-500 font-semibold">INCOMEKARO SOFTWARE PRIVATE LIMITED</span> uses a custom built ERP-CRM
            suite for running the business smoothly. We rely on the power of
            modern age tools to properly manage the business complexities, sales
            pipelines, and all everything about record keeping. Along with, we
            also bring into the picture our own Block Chain setup for
            maintaining absolute Data Distribution, in our enterprise; for
            establishing a better client monitoring infrastructure. Together,
            the power to achieve pure data management is infinite. We Try To
            Give Wings To The Innovative Minds Of India By Implementing The
            Novel Ideas Of People Which Majorly Aims In Serving Nation In Better
            Manner.
          </p>
          <button className="w-[20%] h-10 bg-green-700 text-white rounded-lg">Know more</button>
        </div>

        <div className="flex-1" >
           <img className="w-full object-cover" src={ourCompanyImg} alt="ourCompany" />
        </div>
      </div>
    </div>
  );
};

export default OurCompany;
