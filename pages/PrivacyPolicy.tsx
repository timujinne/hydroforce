import React from 'react';
import { Hero } from '../components/Hero';
import { HashLink } from 'react-router-hash-link';

export const PrivacyPolicy: React.FC = () => {
  return (
    <>
      <Hero
        title="Privacy Policy"
        subtitle="Last updated March 10, 2025"
        bgImage="https://www.hydroforce.ee/wp-content/uploads/2025/09/HF-mainIMG.webp"
        overlayType="dark"
      />

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="prose prose-lg max-w-none text-gray-600">
            <p className="mb-6">
              This Privacy Notice for Hydroforce Engineering OÜ (doing business
              as Hydroforce Engineering) ("we," "us," or "our"), describes how
              and why we might access, collect, store, use, and/or share
              ("process") your personal information when you use our services
              ("Services"), including when you:
            </p>
            <ul className="list-disc list-inside mb-6 space-y-2">
              <li>
                Visit our website at https://hydroforce.ee, or any website of
                ours that links to this Privacy Notice
              </li>
              <li>
                Engage with us in other related ways, including any sales,
                marketing, or events
              </li>
            </ul>
            <p className="mb-6">
              <strong>Questions or concerns?</strong> Reading this Privacy
              Notice will help you understand your privacy rights and choices.
              We are responsible for making decisions about how your personal
              information is processed. If you do not agree with our policies
              and practices, please do not use our Services. If you still have
              any questions or concerns, please contact us at
              legal@hydroforce.ee.
            </p>

            <h2 className="text-2xl font-bold text-primary mb-4 mt-8 border-b pb-2">
              SUMMARY OF KEY POINTS
            </h2>
            <p className="mb-4 italic">
              This summary provides key points from our Privacy Notice, but you
              can find out more details about any of these topics by clicking
              the link following each key point or by using our table of
              contents below to find the section you are looking for.
            </p>
            <ul className="space-y-4 mb-8">
              <li>
                <strong>What personal information do we process?</strong> When
                you visit, use, or navigate our Services, we may process
                personal information depending on how you interact with us and
                the Services, the choices you make, and the products and
                features you use. Learn more about personal information you
                disclose to us.
              </li>
              <li>
                <strong>
                  Do we process any sensitive personal information?
                </strong>{' '}
                Some of the information may be considered "special" or
                "sensitive" in certain jurisdictions, for example your racial or
                ethnic origins, sexual orientation, and religious beliefs. We do
                not process sensitive personal information.
              </li>
              <li>
                <strong>
                  Do we collect any information from third parties?
                </strong>{' '}
                We do not collect any information from third parties.
              </li>
              <li>
                <strong>How do we process your information?</strong> We process
                your information to provide, improve, and administer our
                Services, communicate with you, for security and fraud
                prevention, and to comply with law. We may also process your
                information for other purposes with your consent. We process
                your information only when we have a valid legal reason to do
                so. Learn more about how we process your information.
              </li>
              <li>
                <strong>
                  In what situations and with which types of parties do we share
                  personal information?
                </strong>{' '}
                We may share information in specific situations and with
                specific categories of third parties. Learn more about when and
                with whom we share your personal information.
              </li>
              <li>
                <strong>How do we keep your information safe?</strong> We have
                adequate organizational and technical processes and procedures
                in place to protect your personal information. However, no
                electronic transmission over the internet or information storage
                technology can be guaranteed to be 100% secure, so we cannot
                promise or guarantee that hackers, cybercriminals, or other
                unauthorized third parties will not be able to defeat our
                security and improperly collect, access, steal, or modify your
                information. Learn more about how we keep your information safe.
              </li>
              <li>
                <strong>What are your rights?</strong> Depending on where you
                are located geographically, the applicable privacy law may mean
                you have certain rights regarding your personal information.
                Learn more about your privacy rights.
              </li>
              <li>
                <strong>How do you exercise your rights?</strong> The easiest
                way to exercise your rights is by submitting a data subject
                access request, or by contacting us. We will consider and act
                upon any request in accordance with applicable data protection
                laws.
              </li>
              <li>
                <strong>
                  Want to learn more about what we do with any information we
                  collect?
                </strong>{' '}
                Review the Privacy Notice in full.
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-primary mb-4 mt-8 border-b pb-2">
              TABLE OF CONTENTS
            </h2>
            <ol className="list-decimal list-inside space-y-1 mb-8 font-medium text-primary">
              <li>
                <HashLink smooth to="#section-1" className="hover:underline">
                  WHAT INFORMATION DO WE COLLECT?
                </HashLink>
              </li>
              <li>
                <HashLink smooth to="#section-2" className="hover:underline">
                  HOW DO WE PROCESS YOUR INFORMATION?
                </HashLink>
              </li>
              <li>
                <HashLink smooth to="#section-3" className="hover:underline">
                  WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?
                </HashLink>
              </li>
              <li>
                <HashLink smooth to="#section-4" className="hover:underline">
                  WHAT IS OUR STANCE ON THIRD-PARTY WEBSITES?
                </HashLink>
              </li>
              <li>
                <HashLink smooth to="#section-5" className="hover:underline">
                  DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?
                </HashLink>
              </li>
              <li>
                <HashLink smooth to="#section-6" className="hover:underline">
                  HOW DO WE HANDLE YOUR SOCIAL LOGINS?
                </HashLink>
              </li>
              <li>
                <HashLink smooth to="#section-7" className="hover:underline">
                  HOW LONG DO WE KEEP YOUR INFORMATION?
                </HashLink>
              </li>
              <li>
                <HashLink smooth to="#section-8" className="hover:underline">
                  HOW DO WE KEEP YOUR INFORMATION SAFE?
                </HashLink>
              </li>
              <li>
                <HashLink smooth to="#section-9" className="hover:underline">
                  DO WE COLLECT INFORMATION FROM MINORS?
                </HashLink>
              </li>
              <li>
                <HashLink smooth to="#section-10" className="hover:underline">
                  WHAT ARE YOUR PRIVACY RIGHTS?
                </HashLink>
              </li>
              <li>
                <HashLink smooth to="#section-11" className="hover:underline">
                  CONTROLS FOR DO-NOT-TRACK FEATURES
                </HashLink>
              </li>
              <li>
                <HashLink smooth to="#section-12" className="hover:underline">
                  DO OTHER REGIONS HAVE SPECIFIC PRIVACY RIGHTS?
                </HashLink>
              </li>
              <li>
                <HashLink smooth to="#section-13" className="hover:underline">
                  DO WE MAKE UPDATES TO THIS NOTICE?
                </HashLink>
              </li>
              <li>
                <HashLink smooth to="#section-14" className="hover:underline">
                  HOW CAN YOU CONTACT US ABOUT THIS NOTICE?
                </HashLink>
              </li>
              <li>
                <HashLink smooth to="#section-15" className="hover:underline">
                  HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM
                  YOU?
                </HashLink>
              </li>
            </ol>

            <h3
              className="text-xl font-bold text-primary mb-4 mt-10"
              id="section-1"
            >
              1. WHAT INFORMATION DO WE COLLECT?
            </h3>

            <h4 className="font-bold text-gray-800 mt-4 mb-2">
              Personal information you disclose to us
            </h4>
            <p className="mb-4">
              <strong>In Short:</strong> We collect personal information that
              you provide to us.
            </p>
            <p className="mb-4">
              We collect personal information that you voluntarily provide to us
              when you express an interest in obtaining information about us or
              our products and Services, when you participate in activities on
              the Services, or otherwise when you contact us.
            </p>
            <p className="mb-4">
              <strong>Personal Information Provided by You.</strong> The
              personal information that we collect depends on the context of
              your interactions with us and the Services, the choices you make,
              and the products and features you use. The personal information we
              collect may include the following:
            </p>
            <ul className="list-disc list-inside mb-4 ml-4">
              <li>names</li>
              <li>email addresses</li>
              <li>phone numbers</li>
              <li>company</li>
            </ul>
            <p className="mb-4">
              <strong>Sensitive Information.</strong> We do not process
              sensitive information.
            </p>
            <p className="mb-4">
              All personal information that you provide to us must be true,
              complete, and accurate, and you must notify us of any changes to
              such personal information.
            </p>

            <h4 className="font-bold text-gray-800 mt-4 mb-2">
              Information automatically collected
            </h4>
            <p className="mb-4">
              <strong>In Short:</strong> Some information — such as your
              Internet Protocol (IP) address and/or browser and device
              characteristics — is collected automatically when you visit our
              Services.
            </p>
            <p className="mb-4">
              We automatically collect certain information when you visit, use,
              or navigate the Services. This information does not reveal your
              specific identity (like your name or contact information) but may
              include device and usage information, such as your IP address,
              browser and device characteristics, operating system, language
              preferences, referring URLs, device name, country, location,
              information about how and when you use our Services, and other
              technical information. This information is primarily needed to
              maintain the security and operation of our Services, and for our
              internal analytics and reporting purposes.
            </p>
            <p className="mb-4">
              Like many businesses, we also collect information through cookies
              and similar technologies. You can find out more about this in our
              Cookie Notice: https://www.hydroforce.ee/privacy-policy/.
            </p>
            <p className="mb-4">The information we collect includes:</p>
            <ul className="list-disc list-inside mb-4 ml-4 space-y-2">
              <li>
                <strong>Log and Usage Data.</strong> Log and usage data is
                service-related, diagnostic, usage, and performance information
                our servers automatically collect when you access or use our
                Services and which we record in log files. Depending on how you
                interact with us, this log data may include your IP address,
                device information, browser type, and settings and information
                about your activity in the Services (such as the date/time
                stamps associated with your usage, pages and files viewed,
                searches, and other actions you take such as which features you
                use), device event information (such as system activity, error
                reports (sometimes called "crash dumps"), and hardware
                settings).
              </li>
              <li>
                <strong>Device Data.</strong> We collect device data such as
                information about your computer, phone, tablet, or other device
                you use to access the Services. Depending on the device used,
                this device data may include information such as your IP address
                (or proxy server), device and application identification
                numbers, location, browser type, hardware model, Internet
                service provider and/or mobile carrier, operating system, and
                system configuration information.
              </li>
              <li>
                <strong>Location Data.</strong> We collect location data such as
                information about your device's location, which can be either
                precise or imprecise. How much information we collect depends on
                the type and settings of the device you use to access the
                Services. For example, we may use GPS and other technologies to
                collect geolocation data that tells us your current location
                (based on your IP address). You can opt out of allowing us to
                collect this information either by refusing access to the
                information or by disabling your Location setting on your
                device. However, if you choose to opt out, you may not be able
                to use certain aspects of the Services.
              </li>
            </ul>

            <h3
              className="text-xl font-bold text-primary mb-4 mt-10"
              id="section-2"
            >
              2. HOW DO WE PROCESS YOUR INFORMATION?
            </h3>
            <p className="mb-4">
              <strong>In Short:</strong> We process your information to provide,
              improve, and administer our Services, communicate with you, for
              security and fraud prevention, and to comply with law. We may also
              process your information for other purposes with your consent.
            </p>
            <p className="mb-4">
              We process your personal information for a variety of reasons,
              depending on how you interact with our Services, including:
            </p>
            <ul className="list-disc list-inside mb-4 ml-4">
              <li>
                <strong>
                  To respond to user inquiries/offer support to users.
                </strong>{' '}
                We may process your information to respond to your inquiries and
                solve any potential issues you might have with the requested
                service.
              </li>
            </ul>

            <h3
              className="text-xl font-bold text-primary mb-4 mt-10"
              id="section-3"
            >
              3. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?
            </h3>
            <p className="mb-4">
              <strong>In Short:</strong> We may share information in specific
              situations described in this section and/or with the following
              categories of third parties.
            </p>
            <p className="mb-4">
              <strong>
                Vendors, Consultants, and Other Third-Party Service Providers.
              </strong>{' '}
              We may share your data with third-party vendors, service
              providers, contractors, or agents ("third parties") who perform
              services for us or on our behalf and require access to such
              information to do that work. We have contracts in place with our
              third parties, which are designed to help safeguard your personal
              information. This means that they cannot do anything with your
              personal information unless we have instructed them to do it. They
              will also not share your personal information with any
              organization apart from us. They also commit to protect the data
              they hold on our behalf and to retain it for the period we
              instruct.
            </p>
            <p className="mb-4">
              The categories of third parties we may share personal information
              with are as follows:
            </p>
            <ul className="list-disc list-inside mb-4 ml-4">
              <li>Data Analytics Services</li>
            </ul>
            <p className="mb-4">
              We also may need to share your personal information in the
              following situations:
            </p>
            <ul className="list-disc list-inside mb-4 ml-4">
              <li>
                <strong>Business Transfers.</strong> We may share or transfer
                your information in connection with, or during negotiations of,
                any merger, sale of company assets, financing, or acquisition of
                all or a portion of our business to another company.
              </li>
            </ul>

            <h3
              className="text-xl font-bold text-primary mb-4 mt-10"
              id="section-4"
            >
              4. WHAT IS OUR STANCE ON THIRD-PARTY WEBSITES?
            </h3>
            <p className="mb-4">
              <strong>In Short:</strong> We are not responsible for the safety
              of any information that you share with third parties that we may
              link to or who advertise on our Services, but are not affiliated
              with, our Services.
            </p>
            <p className="mb-4">
              The Services may link to third-party websites, online services, or
              mobile applications and/or contain advertisements from third
              parties that are not affiliated with us and which may link to
              other websites, services, or applications. Accordingly, we do not
              make any guarantee regarding any such third parties, and we will
              not be liable for any loss or damage caused by the use of such
              third-party websites, services, or applications. The inclusion of
              a link towards a third-party website, service, or application does
              not imply an endorsement by us. We cannot guarantee the safety and
              privacy of data you provide to any third-party websites. Any data
              collected by third parties is not covered by this Privacy Notice.
              We are not responsible for the content or privacy and security
              practices and policies of any third parties, including other
              websites, services, or applications that may be linked to or from
              the Services. You should review the policies of such third parties
              and contact them directly to respond to your questions.
            </p>

            <h3
              className="text-xl font-bold text-primary mb-4 mt-10"
              id="section-5"
            >
              5. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?
            </h3>
            <p className="mb-4">
              <strong>In Short:</strong> We may use cookies and other tracking
              technologies to collect and store your information.
            </p>
            <p className="mb-4">
              We may use cookies and similar tracking technologies (like web
              beacons and pixels) to gather information when you interact with
              our Services. Some online tracking technologies help us maintain
              the security of our Services, prevent crashes, fix bugs, save your
              preferences, and assist with basic site functions.
            </p>
            <p className="mb-4">
              We also permit third parties and service providers to use online
              tracking technologies on our Services for analytics and
              advertising, including to help manage and display advertisements,
              to tailor advertisements to your interests, or to send abandoned
              shopping cart reminders (depending on your communication
              preferences). The third parties and service providers use their
              technology to provide advertising about products and services
              tailored to your interests which may appear either on our Services
              or on other websites.
            </p>
            <p className="mb-4">
              Specific information about how we use such technologies and how
              you can refuse certain cookies is set out in our Cookie Notice:
              https://www.hydroforce.ee/privacy-policy/.
            </p>
            <p className="mb-4">
              <strong>Google Analytics</strong>
            </p>
            <p className="mb-4">
              We may share your information with Google Analytics to track and
              analyze the use of the Services. The Google Analytics Advertising
              Features that we may use include: Google Analytics Demographics
              and Interests Reporting. To opt out of being tracked by Google
              Analytics across the Services, visit
              https://tools.google.com/dlpage/gaoptout. You can opt out of
              Google Analytics Advertising Features through Ads Settings and Ad
              Settings for mobile apps. Other opt out means include
              http://optout.networkadvertising.org/ and
              http://www.networkadvertising.org/mobile-choice. For more
              information on the privacy practices of Google, please visit the
              Google Privacy & Terms page.
            </p>

            <h3
              className="text-xl font-bold text-primary mb-4 mt-10"
              id="section-6"
            >
              6. HOW DO WE HANDLE YOUR SOCIAL LOGINS?
            </h3>
            <p className="mb-4">
              <strong>In Short:</strong> If you choose to register or log in to
              our Services using a social media account, we may have access to
              certain information about you.
            </p>
            <p className="mb-4">
              Our Services offer you the ability to register and log in using
              your third-party social media account details (like your Facebook
              or X logins). Where you choose to do this, we will receive certain
              profile information about you from your social media provider. The
              profile information we receive may vary depending on the social
              media provider concerned, but will often include your name, email
              address, friends list, and profile picture, as well as other
              information you choose to make public on such a social media
              platform.
            </p>
            <p className="mb-4">
              We will use the information we receive only for the purposes that
              are described in this Privacy Notice or that are otherwise made
              clear to you on the relevant Services. Please note that we do not
              control, and are not responsible for, other uses of your personal
              information by your third-party social media provider. We
              recommend that you review their privacy notice to understand how
              they collect, use, and share your personal information, and how
              you can set your privacy preferences on their sites and apps.
            </p>

            <h3
              className="text-xl font-bold text-primary mb-4 mt-10"
              id="section-7"
            >
              7. HOW LONG DO WE KEEP YOUR INFORMATION?
            </h3>
            <p className="mb-4">
              <strong>In Short:</strong> We keep your information for as long as
              necessary to fulfill the purposes outlined in this Privacy Notice
              unless otherwise required by law.
            </p>
            <p className="mb-4">
              We will only keep your personal information for as long as it is
              necessary for the purposes set out in this Privacy Notice, unless
              a longer retention period is required or permitted by law (such as
              tax, accounting, or other legal requirements).
            </p>
            <p className="mb-4">
              When we have no ongoing legitimate business need to process your
              personal information, we will either delete or anonymize such
              information, or, if this is not possible (for example, because
              your personal information has been stored in backup archives),
              then we will securely store your personal information and isolate
              it from any further processing until deletion is possible.
            </p>

            <h3
              className="text-xl font-bold text-primary mb-4 mt-10"
              id="section-8"
            >
              8. HOW DO WE KEEP YOUR INFORMATION SAFE?
            </h3>
            <p className="mb-4">
              <strong>In Short:</strong> We aim to protect your personal
              information through a system of organizational and technical
              security measures.
            </p>
            <p className="mb-4">
              We have implemented appropriate and reasonable technical and
              organizational security measures designed to protect the security
              of any personal information we process. However, despite our
              safeguards and efforts to secure your information, no electronic
              transmission over the Internet or information storage technology
              can be guaranteed to be 100% secure, so we cannot promise or
              guarantee that hackers, cybercriminals, or other unauthorized
              third parties will not be able to defeat our security and
              improperly collect, access, steal, or modify your information.
              Although we will do our best to protect your personal information,
              transmission of personal information to and from our Services is
              at your own risk. You should only access the Services within a
              secure environment.
            </p>

            <h3
              className="text-xl font-bold text-primary mb-4 mt-10"
              id="section-9"
            >
              9. DO WE COLLECT INFORMATION FROM MINORS?
            </h3>
            <p className="mb-4">
              <strong>In Short:</strong> We do not knowingly collect data from
              or market to children under 18 years of age.
            </p>
            <p className="mb-4">
              We do not knowingly collect, solicit data from, or market to
              children under 18 years of age, nor do we knowingly sell such
              personal information. By using the Services, you represent that
              you are at least 18 or that you are the parent or guardian of such
              a minor and consent to such minor dependent’s use of the Services.
              If we learn that personal information from users less than 18
              years of age has been collected, we will deactivate the account
              and take reasonable measures to promptly delete such data from our
              records. If you become aware of any data we may have collected
              from children under age 18, please contact us at
              legal@hydroforce.ee.
            </p>

            <h3
              className="text-xl font-bold text-primary mb-4 mt-10"
              id="section-10"
            >
              10. WHAT ARE YOUR PRIVACY RIGHTS?
            </h3>
            <p className="mb-4">
              <strong>In Short:</strong> You may review, change, or terminate
              your account at any time, depending on your country, province, or
              state of residence.
            </p>
            <p className="mb-4">
              <strong>Withdrawing your consent:</strong> If we are relying on
              your consent to process your personal information, which may be
              express and/or implied consent depending on the applicable law,
              you have the right to withdraw your consent at any time. You can
              withdraw your consent at any time by contacting us by using the
              contact details provided in the section "HOW CAN YOU CONTACT US
              ABOUT THIS NOTICE?" below.
            </p>
            <p className="mb-4">
              However, please note that this will not affect the lawfulness of
              the processing before its withdrawal nor, when applicable law
              allows, will it affect the processing of your personal information
              conducted in reliance on lawful processing grounds other than
              consent.
            </p>
            <p className="mb-4">
              <strong>
                Opting out of marketing and promotional communications:
              </strong>{' '}
              You can unsubscribe from our marketing and promotional
              communications at any time by clicking on the unsubscribe link in
              the emails that we send, or by contacting us using the details
              provided in the section "HOW CAN YOU CONTACT US ABOUT THIS
              NOTICE?" below. You will then be removed from the marketing lists.
              However, we may still communicate with you — for example, to send
              you service-related messages that are necessary for the
              administration and use of your account, to respond to service
              requests, or for other non-marketing purposes.
            </p>
            <p className="mb-4">
              <strong>Cookies and similar technologies:</strong> Most Web
              browsers are set to accept cookies by default. If you prefer, you
              can usually choose to set your browser to remove cookies and to
              reject cookies. If you choose to remove cookies or reject cookies,
              this could affect certain features or services of our Services.
              You may also opt out of interest-based advertising by advertisers
              on our Services. For further information, please see our Cookie
              Notice: https://www.hydroforce.ee/privacy-policy/.
            </p>
            <p className="mb-4">
              If you have questions or comments about your privacy rights, you
              may email us at legal@hydroforce.ee.
            </p>

            <h3
              className="text-xl font-bold text-primary mb-4 mt-10"
              id="section-11"
            >
              11. CONTROLS FOR DO-NOT-TRACK FEATURES
            </h3>
            <p className="mb-4">
              Most web browsers and some mobile operating systems and mobile
              applications include a Do-Not-Track ("DNT") feature or setting you
              can activate to signal your privacy preference not to have data
              about your online browsing activities monitored and collected. At
              this stage, no uniform technology standard for recognizing and
              implementing DNT signals has been finalized. As such, we do not
              currently respond to DNT browser signals or any other mechanism
              that automatically communicates your choice not to be tracked
              online. If a standard for online tracking is adopted that we must
              follow in the future, we will inform you about that practice in a
              revised version of this Privacy Notice.
            </p>

            <h3
              className="text-xl font-bold text-primary mb-4 mt-10"
              id="section-12"
            >
              12. DO OTHER REGIONS HAVE SPECIFIC PRIVACY RIGHTS?
            </h3>
            <p className="mb-4">
              <strong>In Short:</strong> You may have additional rights based on
              the country you reside in.
            </p>

            <h4 className="font-bold text-gray-800 mt-4 mb-2">
              Australia and New Zealand
            </h4>
            <p className="mb-4">
              We collect and process your personal information under the
              obligations and conditions set by Australia's Privacy Act 1988 and
              New Zealand's Privacy Act 2020 (Privacy Act).
            </p>
            <p className="mb-4">
              This Privacy Notice satisfies the notice requirements defined in
              both Privacy Acts, in particular: what personal information we
              collect from you, from which sources, for which purposes, and
              other recipients of your personal information.
            </p>
            <p className="mb-4">
              If you do not wish to provide the personal information necessary
              to fulfill their applicable purpose, it may affect our ability to
              provide our services, in particular:
            </p>
            <ul className="list-disc list-inside mb-4 ml-4">
              <li>offer you the products or services that you want</li>
              <li>respond to or help with your requests</li>
            </ul>
            <p className="mb-4">
              At any time, you have the right to request access to or correction
              of your personal information. You can make such a request by
              contacting us by using the contact details provided in the section
              "HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM
              YOU?"
            </p>
            <p className="mb-4">
              If you believe we are unlawfully processing your personal
              information, you have the right to submit a complaint about a
              breach of the Australian Privacy Principles to the Office of the
              Australian Information Commissioner and a breach of New Zealand's
              Privacy Principles to the Office of New Zealand Privacy
              Commissioner.
            </p>

            <h4 className="font-bold text-gray-800 mt-4 mb-2">
              Republic of South Africa
            </h4>
            <p className="mb-4">
              At any time, you have the right to request access to or correction
              of your personal information. You can make such a request by
              contacting us by using the contact details provided in the section
              "HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM
              YOU?"
            </p>
            <p className="mb-4">
              If you are unsatisfied with the manner in which we address any
              complaint with regard to our processing of personal information,
              you can contact the office of the regulator, the details of which
              are:
            </p>
            <div className="mb-4 bg-gray-50 p-4 rounded border">
              <p>
                <strong>The Information Regulator (South Africa)</strong>
              </p>
              <p>General enquiries: enquiries@inforegulator.org.za</p>
              <p>
                Complaints (complete POPIA/PAIA form 5):
                PAIAComplaints@inforegulator.org.za &
                POPIAComplaints@inforegulator.org.za
              </p>
            </div>

            <h3
              className="text-xl font-bold text-primary mb-4 mt-10"
              id="section-13"
            >
              13. DO WE MAKE UPDATES TO THIS NOTICE?
            </h3>
            <p className="mb-4">
              <strong>In Short:</strong> Yes, we will update this notice as
              necessary to stay compliant with relevant laws.
            </p>
            <p className="mb-4">
              We may update this Privacy Notice from time to time. The updated
              version will be indicated by an updated "Revised" date at the top
              of this Privacy Notice. If we make material changes to this
              Privacy Notice, we may notify you either by prominently posting a
              notice of such changes or by directly sending you a notification.
              We encourage you to review this Privacy Notice frequently to be
              informed of how we are protecting your information.
            </p>

            <h3
              className="text-xl font-bold text-primary mb-4 mt-10"
              id="section-14"
            >
              14. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?
            </h3>
            <p className="mb-4">
              If you have questions or comments about this notice, you may
              contact our Data Protection Officer (DPO) by email at
              legal@hydroforce.ee, or contact us by post at:
            </p>
            <div className="mb-4 bg-gray-50 p-4 rounded border">
              <p>Hydroforce Engineering OÜ</p>
              <p>Data Protection Officer</p>
              <p>Valge</p>
              <p>13</p>
              <p>Tallinn, Harjumaa 11415</p>
              <p>Estonia</p>
            </div>

            <h3
              className="text-xl font-bold text-primary mb-4 mt-10"
              id="section-15"
            >
              15. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM
              YOU?
            </h3>
            <p className="mb-4">
              Based on the applicable laws of your country, you may have the
              right to request access to the personal information we collect
              from you, details about how we have processed it, correct
              inaccuracies, or delete your personal information. You may also
              have the right to withdraw your consent to our processing of your
              personal information. These rights may be limited in some
              circumstances by applicable law. To request to review, update, or
              delete your personal information, please fill out and submit a
              data subject access request.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};
