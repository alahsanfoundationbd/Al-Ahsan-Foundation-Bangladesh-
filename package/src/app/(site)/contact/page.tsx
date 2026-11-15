import ContactForm from "@/components/Contact/Form";
import ContactInfo from "@/components/Contact/ContactInfo";
import Location from "@/components/Contact/OfficeLocation";
import Volunteer from "@/components/SharedComponent/Volunteer";
import React from "react";
import HeroSub from "@/components/SharedComponent/HeroSub";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "যোগাযোগ | আল আহসান ফাউন্ডেশন বাংলাদেশ",
};

const page = () => {
  return (
    <>
      <HeroSub
        title="যোগাযোগ"
        bgImage="/images/background/contact-banner-img.avif"
      />
      <ContactInfo />
      <ContactForm />
      <Location />
      <Volunteer />
    </>
  );
};

export default page;
