import { Documentation } from "@/components/Documentation/Documentation";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "ডকুমেন্টেশন | আল আহসান ফাউন্ডেশন বাংলাদেশ",
};

export default function Page() {
    return (
        <>
        <Documentation/>
        </>
    );
};
