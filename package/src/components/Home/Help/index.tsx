import { helpdata } from "@/app/api/data";
import Image from 'next/image';

const Help = () => {
    return (
        <section className="lg:py-28 py-16 bg-white dark:bg-dark">
            <div className="container mx-auto lg:max-w-(--breakpoint-xl) px-4">
                <div className="text-center">
                    <h2 className="text-3xl mb-3 font-semibold">
                        আপনি কীভাবে পাশে দাঁড়াতে পারেন?
                    </h2>
                    <p className="text-dustGray dark:text-white/60 text-base">
                        অনুদান দিয়ে, স্বেচ্ছাসেবী হয়ে কিংবা খাদ্যসামগ্রী দিয়ে আমাদের কার্যক্রমে সহায়তা করুন।<br className="lg:block hidden" /> আপনার প্রতিটি প্রচেষ্টাই গুরুত্বপূর্ণ!
                    </p>
                    <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-center gap-8">
                        {helpdata.map((item, index) => (
                            <div key={index} className="flex flex-col gap-5 items-center xl:px-3">
                                <div>
                                    <Image src={item?.icon} alt="icon" width={60} height={60} />
                                </div>
                                <div className="flex flex-col gap-3.5">
                                    <h4 className="text-2xl font-medium">
                                        {item.title}
                                    </h4>
                                    <p className="text-dustGray dark:text-white/60 text-base">
                                        {item.text}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Help;