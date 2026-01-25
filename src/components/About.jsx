import React from "react";
import SideNav from "./Template/SideNav";

const AboutUs = () => {
  return (
    <>
      <SideNav />
      <div className="w-full min-h-screen  text-white px-10 py-12">
        {/* Page Title */}
        <h1 className="text-4xl font-bold mb-6 ">About MovieZ</h1>

        {/* Intro */}
        <p className="text-lg text-zinc-300 leading-relaxed max-w-4xl">
          <span className="text-white font-semibold">MovieZ</span> is a modern
          movie discovery platform where you can explore trending movies,
          popular shows, TV series, and celebrities — all in one place. Our goal
          is to make discovering entertainment simple, fast, and visually
          engaging.
        </p>

        {/* Divider */}
        <hr className="my-10 border-zinc-700" />

        {/* Features */}
        <h2 className="text-2xl font-semibold mb-4 text-white">
          What You Can Do on MovieZ
        </h2>

        <ul className="list-disc list-inside space-y-3 text-zinc-300 text-lg">
          <li>Browse trending movies and TV shows</li>
          <li>Search for movies, shows, and people</li>
          <li>Explore popular and top-rated content</li>
          <li>Get detailed information about films and celebrities</li>
        </ul>

        {/* Divider */}
        <hr className="my-10 border-zinc-700" />

        {/* Tech Stack */}
        <h2 className="text-2xl font-semibold mb-4 text-white">Built With</h2>

        <p className="text-lg text-zinc-300">
          MovieZ is built using modern web technologies including
          <span className="text-white font-medium">
            {" "}
            React, Tailwind CSS, React Router
          </span>{" "}
          and a movie database API to deliver real-time content with a smooth
          user experience.
        </p>

        {/* Footer Note */}
        <p className="mt-12 text-sm text-zinc-500">
          © {new Date().getFullYear()} MovieZ. All rights reserved.
        </p>
      </div>
    </>
  );
};

export default AboutUs;
