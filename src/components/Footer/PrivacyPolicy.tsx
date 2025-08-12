"use client";
import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Head from "next/head";

function PrivacyPolicy() {
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
          <title>Privacy Policy - Wordum</title>
          <meta
            name="description"
            content="Privacy Policy for Wordum mobile application by Appykan Technologies Private Limited."
          />
        </Head>

      <main className="max-w-4xl mx-auto px-6 py-12 text-gray-800">
        <h1 className="text-3xl font-bold mb-4">Privacy Policy – Wordum</h1>
        <p className="mb-6 text-sm text-gray-500">Last updated: August 12, 2025</p>

        <p className="mb-6">
          This Privacy Policy explains how Appykan Technologies Private Limited
          (“Company”, “We”, “Us”, “Our”) collects, uses, and shares your
          information when you use the Wordum mobile application (“Application”
          or “Service”).
        </p>

        <p className="mb-6">
          By using the Service, you agree to the terms of this Privacy Policy.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">1. Information We Collect</h2>
        <p className="mb-4">
          We collect the following categories of data when you use our Service:
        </p>

        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>
            <strong>A. Identifiers:</strong> Device ID / Unique Device Identifiers – used for user identification, maintaining game progress, preventing fraud, and ensuring secure access.
          </li>
          <li>
            <strong>B. Usage Data:</strong> IP address, browser type, operating system, pages/screens viewed, time spent in the app, crash reports, performance data, and diagnostics.
          </li>
          <li>
            <strong>C. Contact Information:</strong> Email address (if you provide it, e.g., for support requests or newsletters).
          </li>
          <li>
            <strong>D. Consent Preferences:</strong> Your personalised ads preference (on/off) stored in your settings.
          </li>
        </ul>

        <p className="mb-6">
          We do not collect sensitive personal data (such as financial information, biometric identifiers, or precise location) unless explicitly provided by you for a specific purpose.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">2. How We Use Your Data</h2>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>App Functionality – to operate, maintain, and improve the Service.</li>
          <li>Account & Progress Management – to save game progress and link it to your device ID.</li>
          <li>Analytics – to understand user behavior and improve game performance.</li>
          <li>Advertising – to show personalised ads (with your consent) or non-personalised ads.</li>
          <li>Fraud Prevention & Security – to protect against unauthorized activity.</li>
          <li>
            API Calls – certain game features make secure API requests to our servers or trusted partners, transmitting device identifiers, gameplay data, and consent preferences.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-3">3. Advertising and Personalised Ads</h2>
        <p className="mb-4">
          You can enable or disable personalised ads in the app’s settings at any time.
        </p>
        <p className="mb-4">
          When personalised ads are ON, we may share limited device and usage data with advertising partners (e.g., Google AdMob) for tailored ad delivery.
        </p>
        <p className="mb-4">
          When personalised ads are OFF, you will see only non-personalised ads, which are not based on your personal information.
        </p>
        <p className="mb-6">
          Non-Personalised Ads: Advertising providers may still use cookies or similar technologies for frequency capping, aggregated reporting, and fraud prevention. See Google’s Privacy Policy for details.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">4. Data Sharing</h2>
        <p className="mb-4">We may share your data with:</p>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>Service Providers – to host servers, provide analytics, and deliver ads.</li>
          <li>Advertising Partners – to deliver ads according to your consent preferences.</li>
          <li>Business Transfers – if we merge, sell, or transfer assets.</li>
          <li>Legal Compliance – if required by law or to protect our rights.</li>
        </ul>
        <p className="mb-6">We do not sell your personal data.</p>

        <h2 className="text-xl font-semibold mt-8 mb-3">5. Data Retention</h2>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>Device ID – retained while you actively use the app</li>
          <li>Usage data – kept for analytics and security, then anonymized</li>
          <li>Contact information – kept until you request deletion</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-3">6. Your Rights</h2>
        <p className="mb-4">
          Depending on your location, you may have rights to:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>Access and request a copy of your data</li>
          <li>Request correction or deletion</li>
          <li>Withdraw consent for personalised ads (via app settings)</li>
          <li>Opt out of marketing communications</li>
        </ul>
        <p className="mb-6">
          To exercise these rights, contact us at{" "}
          <a href="mailto:support@appykan.com" className="text-blue-600 underline">
            support@appykan.com
          </a>
          .
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">7. Security</h2>
        <p className="mb-6">
          We implement reasonable technical and organizational measures to protect your data. However, no method of transmission or storage is completely secure.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">8. Children’s Privacy</h2>
        <p className="mb-6">
          The Service is not directed to children under 13. We do not knowingly collect personal data from children. If we learn that we have inadvertently collected such data, we will delete it.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">9. Changes to This Policy</h2>
        <p className="mb-6">
          We may update this Privacy Policy from time to time. Updates will be posted in-app and on our website with the new “Last Updated” date.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">10. Contact Us</h2>
        <p>Email: <a href="mailto:support@appykan.com" className="text-blue-600 underline">support@appykan.com</a></p>
        <p>Website: <a href="https://www.appykan.com/contact-us" target="_blank" className="text-blue-600 underline">https://www.appykan.com/contact-us</a></p>
      </main>
      <div className="hidden md:block">
          <Footer />
        </div>
      </div>
    </>
  );
}

export default PrivacyPolicy;
