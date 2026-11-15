import EventDetail from "@/components/Events/EventDetail/EventDetail";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "ইভেন্টের বিবরণ | আল আহসান ফাউন্ডেশন বাংলাদেশ",
};

const Page = () => {
    return (
        <>
            <EventDetail/>
        </>
    )
}

export default Page;
