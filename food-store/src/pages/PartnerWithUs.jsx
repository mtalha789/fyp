import React from "react";
import MyNavbar from "../components/MyNavbar";
import Features from "../components/PartnerData/Feature";
import StepSection from "../components/PartnerData/StepSection";
import WhyJoin from "../components/PartnerData/WhyJoin";
import Footer from "../components/Footer";

function PartnerWithUs(props) {
<<<<<<< HEAD
  return (
    <div>
      <section className="bg-gray-100 py-16 bg-hero-pattern bg-cover relative overflow-hidden h-[50vh]">
        <div className="container mx-auto flex flex-col items-center text-center px-4">
          <h2 className="text-4xl font-bold mb-4 text-white">
            Mealo For Business
          </h2>
          <h2 className="text-4xl font-bold mb-4 text-white">
            Partner with Us
          </h2>
          <p className="text-xl mb-8 text-white">
            Join us and grow your business by reaching millions of customers.
          </p>
          <div className="flex gap-5">
            <LoginForm />
            <SignupForm />
          </div>
=======
    return (
        <div>
            <MyNavbar />
            <section className="bg-gray-100 py-16 bg-hero-pattern bg-cover relative overflow-hidden h-[50vh]">
                <div className="container mx-auto flex flex-col items-center text-center px-4">
                    <h2 className="text-4xl font-bold mb-4 text-white">
                        Mealo For Business
                    </h2>
                    <h2 className="text-4xl font-bold mb-4 text-white">
                        Partner with Us
                    </h2>
                    <p className="text-xl mb-8 text-white">
                        Join us and grow your business by reaching millions of customers.
                    </p>
                    {/* <div className="flex gap-5">
                        <LoginForm />
                        <SignupForm />
                    </div> */}
                </div>
            </section>
           <WhyJoin />


            <Features />
            <StepSection />
            <Footer />

                

           
>>>>>>> dev
        </div>
      </section>
      <WhyJoin />

      <Features />
      <StepSection />
    </div>
  );
}

export default PartnerWithUs;
