import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CTA from "./components/CTA";
import Testimonial from "./components/Testimonial";

export default function Landing() {
  return (
    <>
      <Navbar />
      <CTA />
      <Testimonial />
      <Footer />
    </>
  );
}
