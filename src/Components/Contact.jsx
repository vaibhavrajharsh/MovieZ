import React from "react";
import SideNav from "./Template/SideNav";

const Contact = () => {
  return (
    <>
      <SideNav />
      <div className="w-full min-h-screen  text-white px-10 py-12">
        {/* Page Title */}
        <h1 className="text-4xl font-bold mb-6 text-white">Contact Us</h1>

        {/* Intro */}
        <p className="text-lg text-zinc-300 max-w-3xl leading-relaxed">
          Have questions, feedback, or suggestions? We’d love to hear from you.
          Reach out to us using the details below or send us a message.
        </p>

        {/* Divider */}
        <hr className="my-10 border-zinc-700" />

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl">
          {/* Left */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>

            <ul className="space-y-4 text-zinc-300 text-lg">
              <li>
                📧 Email:
                <span className="text-white ml-2">support@moviez.com</span>
              </li>
              <li>
                📍 Location:
                <span className="text-white ml-2">India</span>
              </li>
              <li>
                ⏰ Support Hours:
                <span className="text-white ml-2">Mon – Fri, 10 AM – 6 PM</span>
              </li>
            </ul>
          </div>

          {/* Right - Static Form */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Send a Message</h2>

            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-3 rounded-md bg-zinc-800 text-white outline-none focus:ring-2 focus:ring-amber-500"
              />

              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-3 rounded-md bg-zinc-800 text-white outline-none focus:ring-2 focus:ring-amber-500"
              />

              <textarea
                rows="5"
                placeholder="Your Message"
                className="w-full p-3 rounded-md bg-zinc-800 text-white outline-none focus:ring-2 focus:ring-amber-500"
              />

              <button
                type="button"
                className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-md font-semibold transition"
              >
                Send Message
              </button>
            </form>

            <p className="text-sm text-zinc-500 mt-4">
              * This form is currently for display purposes only.
            </p>
          </div>
        </div>

        {/* Footer Note */}
        <p className="mt-12 text-sm text-zinc-500">
          © {new Date().getFullYear()} MovieZ. All rights reserved.
        </p>
      </div>
    </>
  );
};

export default Contact;
