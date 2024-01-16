import React from "react";
import { motion } from "framer-motion";

const PrivacyStatement = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      className="container mx-auto p-10"
    >
      <h1 className="text-4xl font-bold mb-4">Privacy Statement</h1>

      <p className="mb-4">
        Welcome to Vinly . This Privacy
        Statement outlines how we collect, use, disclose, and safeguard your
        personal information when you use our services.
      </p>

      <h2 className="text-2xl font-bold mb-2">Information We Collect</h2>

      <p className="mb-4">
        We may collect personal information that you provide directly when
        using our application. This information may include but is not limited
        to:
      </p>

      <ul className="list-disc list-inside mb-4">
        <li>Personal details such as your name and email address.</li>
        <li>Information you provide when creating or updating your account.</li>
        <li>
          Content you upload or share, including posts, comments, and other
          user-generated content.
        </li>
        <li>
          Usage data, such as your interactions with the application,
          preferences, and settings.
        </li>
      </ul>

      <h2 className="text-2xl font-bold mb-2">How We Use Your Information</h2>

      <p className="mb-4">
        We may use the collected information for various purposes, including:
      </p>

      <ul className="list-disc list-inside mb-4">
        <li>Providing and improving our services.</li>
        <li>
          Personalizing your experience and delivering content tailored to your
          interests.
        </li>
        <li>
          Communicating with you, including responding to your inquiries and
          providing updates.
        </li>
        <li>Ensuring the security and integrity of our application.</li>
      </ul>

      <h2 className="text-2xl font-bold mb-2">
        Information Sharing and Disclosure
      </h2>

      <p className="mb-4">
        We may share your personal information in the following situations:
      </p>

      <ul className="list-disc list-inside mb-4">
        <li>
          With your consent or as necessary to fulfill the purpose for which
          you provided the information.
        </li>
        <li>
          With service providers and third parties who assist us in delivering
          and improving our services.
        </li>
        <li>
          As required by law or to protect our rights, privacy, safety, or
          property.
        </li>
      </ul>

      <h2 className="text-2xl font-bold mb-2">Security</h2>

      <p className="mb-4">
        We prioritize the security of your personal information and take
        appropriate measures to protect it. However, no method of transmission
        over the internet or electronic storage is entirely secure, and we
        cannot guarantee absolute security.
      </p>

      <h2 className="text-2xl font-bold mb-2">Your Choices</h2>

      <p className="mb-4">
        You have the right to access, update, or delete your personal
        information. You may also opt-out of certain communications or data
        collection. Please contact us for assistance with your privacy
        preferences.
      </p>

      <h2 className="text-2xl font-bold mb-2">Changes to This Privacy Statement</h2>

      <p className="mb-4">
        We may update this Privacy Statement to reflect changes in our
        practices or applicable laws. We encourage you to review this statement
        periodically for any updates.
      </p>

      <h2 className="text-2xl font-bold mb-2">Contact Us</h2>

      <p className="mb-4">
        If you have questions or concerns about our Privacy Statement or data
        practices, please contact us at [carloskirui154@gmail.com].
      </p>
    </motion.div>
  );
};

export default PrivacyStatement;
