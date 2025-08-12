"use client";
import React from 'react'
import Header from '../Header/Header'
import { IoIosArrowBack } from 'react-icons/io'
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import Footer from './Footer';

const TermOfService = () => {
    const router = useRouter();
  return (
    <>
      <div className="hidden md:block">
        <Header />
      </div>
      <div className="w-full h-screen md:h-[calc(100vh-80px)] overflow-auto scrollbar-hidden bg-[#F4C9EC] text-black">
        {/* Back Arrow in Top-Right */}
        <IoIosArrowBack
          size={32}
          className="relative
        top-3 left-4 cursor-pointer text-black md:hidden"
          onClick={() => router.push("/")}
        />
        <Head>
          <title>Terms & Conditions - Wordum</title>
          <meta
            name="description"
            content="Terms and Conditions for Wordum mobile application by Appykan Technologies Private Limited."
          />
        </Head>

    <div className="max-w-4xl mx-auto px-6 py-12 text-gray-800">
      <h1 className="text-3xl font-bold mb-4">Terms and Conditions</h1>
      <p className="text-sm text-gray-500 mb-8">Last Updated: 12 August 2025</p>

      <p className="mb-6">
        Welcome to <strong>Appykan</strong> (“we,” “our,” “us”). These Terms and
        Conditions (“Terms”) govern your use of our website{" "}
        <a
          href="https://appykan.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          https://appykan.com
        </a>{" "}
        and any services, products, or applications offered through it
        (collectively, the “Services”).
      </p>

      <p className="mb-6">
        By accessing or using our Services, you agree to comply with and be
        bound by these Terms. If you do not agree, please do not use our
        Services.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-4">1. Use of Services</h2>
      <ul className="list-disc ml-6 mb-6">
        <li>
          You must be at least 18 years old or have legal guardian consent to
          use our Services.
        </li>
        <li>
          You agree to use our Services only for lawful purposes and in
          compliance with all applicable laws and regulations.
        </li>
        <li>
          We reserve the right to refuse service, suspend accounts, or restrict
          access if we believe a violation of these Terms has occurred.
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-4">
        2. Intellectual Property
      </h2>
      <p className="mb-6">
        All content, designs, logos, graphics, and software provided through our
        Services are owned by or licensed to <strong>Appykan</strong> and are
        protected under copyright, trademark, and other intellectual property
        laws.
      </p>
      <p className="mb-6">
        You may not reproduce, modify, distribute, or create derivative works
        without prior written permission.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-4">3. User Accounts</h2>
      <ul className="list-disc ml-6 mb-6">
        <li>To access certain features, you may need to register an account.</li>
        <li>
          You are responsible for maintaining the confidentiality of your
          account information and for all activities under your account.
        </li>
        <li>
          Notify us immediately of any unauthorized use of your account.
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-4">
        4. Purchases and Payments
      </h2>
      <ul className="list-disc ml-6 mb-6">
        <li>
          All purchases made through our Services are subject to our pricing and
          payment terms at the time of purchase.
        </li>
        <li>We reserve the right to change prices at any time.</li>
        <li>
          All payments must be made in full before delivery of products or
          services.
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-4">
        5. Limitation of Liability
      </h2>
      <p className="mb-6">
        We strive to ensure the accuracy and reliability of our Services but do
        not guarantee they will be error-free or uninterrupted.{" "}
        <strong>Appykan</strong> will not be liable for any indirect, incidental,
        special, or consequential damages arising from your use of our Services.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-4">6. Third-Party Links</h2>
      <p className="mb-6">
        Our Services may contain links to third-party websites. We are not
        responsible for the content, privacy policies, or practices of such
        websites.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-4">7. Termination</h2>
      <p className="mb-6">
        We may suspend or terminate your access to our Services without prior
        notice if you violate these Terms.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-4">8. Governing Law</h2>
      <p className="mb-6">
        These Terms shall be governed by and construed in accordance with the
        laws of <strong>India</strong>. Any disputes shall be subject to the
        exclusive jurisdiction of the courts in <strong>Jaipur, India</strong>.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-4">9. Changes to Terms</h2>
      <p className="mb-6">
        We reserve the right to update or modify these Terms at any time without
        prior notice. Any changes will be posted on this page with the updated
        date.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-4">10. Contact Us</h2>
      <p>
        If you have any questions or concerns about these Terms, you can contact
        us at:
      </p>
      <ul className="list-none mt-2">
        <li>
          📧 Email:{" "}
          <a
            href="mailto:support@appykan.com"
            className="text-blue-600 underline"
          >
            support@appykan.com
          </a>
        </li>
        <li>
          🌐 Contact Form:{" "}
          <a
            href="https://appykan.com/contact-us"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            https://appykan.com/contact-us
          </a>
        </li>
        <li>📍 Location: Jaipur, India</li>
      </ul>
    </div>
        <div className="hidden md:block">
          <Footer />
        </div>
    </div>
    </>
  )
}

export default TermOfService