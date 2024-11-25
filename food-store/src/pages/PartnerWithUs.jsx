import Features from "../components/PartnerData/Feature";
import StepSection from "../components/PartnerData/StepSection";
import WhyJoin from "../components/PartnerData/WhyJoin";
import { useNavigate } from "react-router-dom";
import { Button } from "@nextui-org/react";

function PartnerWithUs() {
  const navigate = useNavigate();

  return (
    <div>
      <section className="bg-gray-100 py-16 bg-hero-pattern bg-cover relative overflow-hidden h-[50vh]">
      <div className="absolute inset-0 bg-black opacity-40"></div>

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
          <Button color="primary" onClick={()=> navigate("/business/register")}>
            Register as a Partner
          </Button>
          {/* <div className="flex gap-5">
            <LoginForm />
            <SignupForm />
          </div> */}
        </div>
      </section>
      <WhyJoin />

      <Features />
      <StepSection />
    </div>
  );
}

export default PartnerWithUs;
