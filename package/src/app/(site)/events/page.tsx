import HeroSub from "@/components/SharedComponent/HeroSub";
import EventList from "@/components/Events/EventList";
import Volunteer from "@/components/SharedComponent/Volunteer";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "ইভেন্ট সমূহ | আল আহসান ফাউন্ডেশন বাংলাদেশ",
};

const Page = () => {
    return (
        <>
            <HeroSub
                title="ইভেন্ট সমূহ"
            />
            <EventList />
            <Volunteer />
        </>
    )
}

export default Page;
