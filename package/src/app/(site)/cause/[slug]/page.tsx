import CauseDetail from "@/components/Home/Causes/CauseDetail";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "কার্যক্রমের বিবরণ | আল আহসান ফাউন্ডেশন বাংলাদেশ",
};

const Page = () => {
    return (
        <>
            <CauseDetail/>
        </>
    )
}

export default Page;
