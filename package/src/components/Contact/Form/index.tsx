"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    specialist: "",
    date: "",
    time: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [loader, setLoader] = useState(false);
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };
  const reset = () => {
    formData.firstname = "";
    formData.lastname = "";
    formData.email = "design & branding";
    formData.specialist = "";
    formData.date = "";
    formData.time = "";
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoader(true);

    fetch("https://formsubmit.co/ajax/mdshamimaehsan@gmail.com", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        specialist: formData.specialist,
        date: formData.date,
        time: formData.time
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        setSubmitted(data.success);
        reset();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <>
      <section className="dark:bg-dark pb-24">
        <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4">
          <div className="grid lg:grid-cols-12 grid-cols-1 gap-8">
            <div className="lg:col-span-6 lg:order-1 order-2">
              <h2 className="max-w-72 text-[40px] leading-tight font-bold mb-9 text-midnight_text dark:text-white">আমাদের সঙ্গে যোগাযোগ করুন</h2>
              <form onSubmit={handleSubmit} className="flex flex-wrap w-full m-auto justify-between">
                <div className="sm:flex gap-3 w-full">
                  <div className="mx-0 my-2.5 flex-1">
                    <label htmlFor="first-name" className="pb-3 inline-block text-base">নামের প্রথম অংশ*</label>
                    <input
                      id='firstname'
                      type='text'
                      name='firstname'
                      value={formData.firstname}
                      onChange={handleChange}
                      className="w-full text-base px-4 rounded-lg py-2.5 border-border dark:border-dark_border border-solid dark:text-white  dark:bg-dark border transition-all duration-500 focus:border-primary dark:focus:border-primary focus:border-solid focus:outline-0"
                    />
                  </div>
                  <div className="mx-0 my-2.5 flex-1">
                    <label htmlFor="last-name" className="pb-3 inline-block text-base">নামের শেষ অংশ*</label>
                    <input
                      id='lastname'
                      type='text'
                      name='lastname'
                      value={formData.lastname}
                      onChange={handleChange}
                      className="w-full text-base px-4 py-2.5 rounded-lg border-border dark:border-dark_border border-solid dark:text-white  dark:bg-dark border transition-all duration-500 focus:border-primary dark:focus:border-primary focus:border-solid focus:outline-0"
                    />
                  </div>
                </div>
                <div className="sm:flex gap-3 w-full">
                  <div className="mx-0 my-2.5 flex-1">
                    <label htmlFor="email" className="pb-3 inline-block text-base">ইমেইল ঠিকানা*</label>
                    <input
                      id='email'
                      type='email'
                      name='email'
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full text-base px-4 py-2.5 rounded-lg border-border dark:border-dark_border border-solid dark:text-white  dark:bg-dark border transition-all duration-500 focus:border-primary dark:focus:border-primary focus:border-solid focus:outline-0"
                    />
                  </div>
                  <div className="mx-0 my-2.5 flex-1">
                    <label htmlFor="SpecialistSpecialist" className="pb-3 inline-block text-base">বিষয়ের ধরন*</label>
                    <select
                      name="specialist"
                      id="specialist"
                      value={formData.specialist}
                      onChange={handleChange} className="w-full text-base px-4 py-2.5 rounded-lg border-border dark:text-white border-solid dark:bg-dark border transition-all duration-500 focus:border-primary dark:focus:border-primary dark:border-dark_border focus:border-solid focus:outline-0">
                      <option value="">বিষয় বেছে নিন</option>
                      <option value="অনুদান ও সহায়তা">
                        বিষয় বেছে নিন
                      </option>
                      <option value="স্বেচ্ছাসেবক কার্যক্রম">স্বেচ্ছাসেবক কার্যক্রম</option>
                      <option value="সাধারণ জিজ্ঞাসা">সাধারণ জিজ্ঞাসা</option>
                      <option value="অন্যান্য বিষয়">
                        বিষয় বেছে নিন
                      </option>
                    </select>
                  </div>
                </div>
                <div className="sm:flex gap-3 w-full">
                  <div className="mx-0 my-2.5 flex-1">
                    <label htmlFor="date" className="pb-3 inline-block text-base">তারিখ*</label>
                    <input
                      id='date'
                      type='date'
                      name='date'
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full text-base px-4 rounded-lg  py-2.5 outline-hidden dark:text-white dark:bg-dark border-border border-solid border transition-all duration-500 focus:border-primary dark:focus:border-primary dark:border-dark_border focus:border-solid focus:outline-0"
                    />
                  </div>
                  <div className="mx-0 my-2.5 flex-1">
                    <label htmlFor="time" className="pb-3 inline-block text-base">সময়*</label>
                    <input
                      id='time'
                      type='time'
                      name='time'
                      value={formData.time}
                      onChange={handleChange}
                      className="w-full text-base px-4 rounded-lg py-2.5 border-border outline-hidden dark:text-white dark:bg-dark border-solid border transition-all duration-500 focus:border-primary dark:focus:border-primary dark:border-dark_border focus:border-solid focus:outline-0"
                    />
                  </div>
                </div>
                <div className="mx-0 my-2.5 w-full">
                  <button type="submit" className="bg-linear-to-r from-primary to-secondary rounded-lg text-white py-4 px-8 mt-4 inline-block hover:from-transparent hover:to-transparent hover:text-primary border hover:border-primary cursor-pointer">
                    বার্তা পাঠান
                  </button>
                </div>
              </form>
              {submitted && (
                <div className="flex gap-1.5 mt-3.5">
                  <div>
                    <Image src={"/images/icons/icon-right.svg"} alt="right-icon" width={20} height={20} />
                  </div>
                  <p className="text-secondary">ধন্যবাদ! আপনার বার্তা পাঠানো হয়েছে। আমরা যত দ্রুত সম্ভব যোগাযোগ করব।</p>
                </div>
              )}
            </div>
            <div className="lg:col-span-6 lg:order-2 order-1 h-[600px]">
              <Image
                src="/images/contact-page/contact.jpg"
                alt="Contact"
                width={1300}
                height={0}
                quality={100}
                className="w-full h-full object-cover bg-no-repeat rounded-md"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactForm;
