"use client"

import DonationFormContext from "@/app/context/donationContext";
import Link from "next/link"
import { useContext } from "react";

const UrgentDonation = () => {
    const donationInfo = useContext(DonationFormContext);
    return (
        <section className=" bg-[url('/images/background/donate-banner.jpg')] bg-cover bg-center sm:py-52 lg:py-20 py-16 bg-no-repeat">
            <div className="container mx-auto lg:max-w-(--breakpoint-xl) px-4">
                <div className="bg-white dark:bg-dark max-w-xl w-full px-10 py-14 rounded-lg text-center mx-auto" data-aos="fade-right">
                    <h3 className="sm:text-3xl text-lg font-medium mb-5">
                        জরুরি চিকিৎসার জন্য আপনার সহায়তা প্রয়োজন
                    </h3>
                    <p className="text-dustGray dark:text-white/60 sm:text-base text-sm mb-7">
                    একটি শিশুর জরুরি চিকিৎসা প্রয়োজন। আপনার অনুদান জীবন বাঁচাতে এবং চিকিৎসার ব্যবস্থা করতে সহায়তা করতে পারে।
                    </p>
                    <button onClick={() => donationInfo?.setIsDonationOpen(true)} className="text-white text-base bg-primary px-7 py-4 border font-semibold border-primary hover:border-primary hover:bg-transparent hover:text-primary rounded-md cursor-pointer">
                        জরুরি অনুদান দিন
                    </button>
                </div>
            </div>
        </section>
    )
}

export default UrgentDonation;