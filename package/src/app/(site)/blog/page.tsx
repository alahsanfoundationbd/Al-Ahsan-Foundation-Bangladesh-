import React from "react";
import BlogList from "@/components/Blog/BlogList";
import HeroSub from "@/components/SharedComponent/HeroSub";
import Volunteer from "@/components/SharedComponent/Volunteer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ব্লগ ও সংবাদ | আল আহসান ফাউন্ডেশন বাংলাদেশ",
};

const BlogPage = () => {
    return (
        <>
            <HeroSub
                title="ব্লগ ও সংবাদ"
                bgImage="/images/background/blog-banner-img.avif"
            />
            <BlogList />
            <Volunteer />
        </>
    );
};

export default BlogPage;
