import HeroSub from "@/components/SharedComponent/HeroSub";
import CauseList from "@/components/Cause/CauseList";
import Volunteer from "@/components/SharedComponent/Volunteer";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "কার্যক্রম সমূহ | আল আহসান ফাউন্ডেশন বাংলাদেশ",
};

const Page = () => {
    return (
        <>
            <HeroSub
                title="কার্যক্রম সমূহ"
            />
            <CauseList />
            <Volunteer />
        </>
    )
}

export default Page;
