import React from "react";
import Link from "next/link";

const Location = () => {
  const breadcrumbLinks = [
    { href: "/", text: "Home" },
    { href: "/contact", text: "Contact" },
  ];
  return (
    <>
      <section className="bg-primary lg:py-24 py-16">
        <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4">
          <div className="">
            <div className="grid md:grid-cols-6 lg:grid-cols-9 grid-cols-1 gap-7 border-b border-solid border-white/50 pb-11">
              <div className="col-span-3">
                <h2 className="text-white text-[34px] leading-tight font-semibold">Pune head office</h2>
              </div>
              <div className="col-span-3">
                <p className="text-lg text-white font-normal max-w-72">2030 Dewanganj, Jamalpur Zip code 2030 </p>
              </div>
              <div className="col-span-3">
                <Link href="mailto: alahsanfoundationbangladesh@gmail.com" className="text-lg text-white hover:text-black font-semibold">headoffice@endeavor.com</Link>
                <Link href="tel:+8809611399315" className="text-lg font-semibold text-white hover:text-black flex items-center gap-2 w-fit"><span className="text-white">Call:</span>+8809611399315</Link>
              </div>
            </div>
            <div className="grid md:grid-cols-6 lg:grid-cols-9 grid-cols-1 gap-7 pt-12">
              <div className="col-span-3">
                <h2 className="text-white text-[34px] leading-tight font-bold">Bengaluru office</h2>
              </div>
              <div className="col-span-3">
                <p className="text-lg text-white font-normal max-w-72">4292 Dewanganj, Jamalpur Zip code 2030 </p>
              </div>
              <div className="col-span-3">
                <Link href="mailto: alahsanfoundationbangladesh@gmail.com" className="text-lg text-white hover:text-black font-semibold">office@endeavor.com</Link>
                <Link href="tel:731-235-7993" className="text-lg font-semibold text-white hover:text-black flex items-center gap-2 w-fit"><span className="text-white">Call</span>731-235-7993</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Location;
