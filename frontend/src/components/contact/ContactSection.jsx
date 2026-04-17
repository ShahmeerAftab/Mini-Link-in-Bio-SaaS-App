"use client";

import { useState } from "react";
import { contactUs } from "@/lib/api/contact";
import { useMutation } from "@tanstack/react-query";

// ─── CONTACT INFO DATA ────────────────────────────────────────────────────────

const contactDetails = [
  {
    label: "Email",
    value: "hello@lynkify.com",
    icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  },
  {
    label: "Location",
    value: "Collingwood VIC 3066, Australia",
    icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z",
  },
  {
    label: "Support Hours",
    value: "Mon – Fri, 9am to 5pm AEST",
    icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  },
];

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

const ContactSection = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
    const [errorMsg, setErrorMsg] = useState("");


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
        setErrorMsg("");

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: connect to backend
    setForm({ name: "", email: "", subject: "", message: "" });
    contact(form);
  };

   const { mutate: contact, isPending } = useMutation({
    mutationFn: contactUs,
    onSuccess: (data) => {
      console.log(data)
    },
    onError: (err) => {
      setErrorMsg(err?.response?.data?.message || "Something went wrong. Please try again.");
    },
  });
  return (
    <>
      {/* ── Top Banner ── */}
      <section className="w-full bg-[#d2e823] py-16 px-6 text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#1a1a1a]">
          Get in Touch
        </span>
        <h1
          className="text-5xl md:text-6xl font-black text-[#000000] mt-3 leading-tight"
          style={{ WebkitTextStroke: "1px #000000" }}
        >
          We would love to hear <br /> from you
        </h1>
        <p className="text-[#1a1a1a] font-medium text-base mt-4 max-w-md mx-auto">
          Have a question, feedback, or just want to say hi? Fill in the form and we will get back to you.
        </p>
      </section>

      {/* ── Contact Body ── */}
      <section className="w-full bg-[#f3f3f1] py-20 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16 items-start">

          {/* ── Left — Contact Info ── */}
          <div className="flex-1 flex flex-col gap-8">

            <div className="flex flex-col gap-2">
              <h2 className="text-3xl font-extrabold text-[#1a1a1a]">Contact Information</h2>
              <p className="text-[#6b6b6b] text-sm leading-relaxed">
                Reach out through any of the channels below or send us a message using the form.
              </p>
            </div>

            {/* Info Cards */}
            <div className="flex flex-col gap-5">
              {contactDetails.map((detail) => (
                <div key={detail.label} className="flex items-start gap-4">

                  {/* Icon circle */}
                  <div className="w-11 h-11 rounded-full bg-[#14532d] flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d={detail.icon} />
                    </svg>
                  </div>

                  {/* Text */}
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-[#6b6b6b]">{detail.label}</p>
                    <p className="text-sm font-medium text-[#1a1a1a] mt-0.5">{detail.value}</p>
                  </div>

                </div>
              ))}
            </div>

          </div>

          {/* ── Right — Contact Form ── */}
          <div className="flex-1 bg-white rounded-3xl shadow-sm border border-[#e8e8e6] p-10">

            <h2 className="text-2xl font-extrabold text-[#1a1a1a] mb-6">Send a Message</h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">

              {/* Name + Email row */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#6b6b6b] uppercase tracking-wider">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="px-4 py-3 rounded-xl border border-[#e8e8e6] text-sm text-[#1a1a1a] outline-none focus:border-[#14532d] transition-colors bg-[#f9f9f9]"
                  />
                </div>
                <div className="flex-1 flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#6b6b6b] uppercase tracking-wider">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                    className="px-4 py-3 rounded-xl border border-[#e8e8e6] text-sm text-[#1a1a1a] outline-none focus:border-[#14532d] transition-colors bg-[#f9f9f9]"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#6b6b6b] uppercase tracking-wider">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="What is this about?"
                  required
                  className="px-4 py-3 rounded-xl border border-[#e8e8e6] text-sm text-[#1a1a1a] outline-none focus:border-[#14532d] transition-colors bg-[#f9f9f9]"
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#6b6b6b] uppercase tracking-wider">Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  required
                  rows={5}
                  className="px-4 py-3 rounded-xl border border-[#e8e8e6] text-sm text-[#1a1a1a] outline-none focus:border-[#14532d] transition-colors bg-[#f9f9f9] resize-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isPending}
                className="bg-[#14532d] text-white px-8 py-4 rounded-full font-bold text-sm hover:bg-[#166534] transition-colors duration-200 w-fit"
              >
                {isPending ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Sending…
                </>
              ) : (
                "Send Message"
              )}
              </button>

            </form>
          </div>

        </div>
      </section>
    </>
  );
};

export default ContactSection;
