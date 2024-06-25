import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsOfUse() {
  return (
    <Layout>
      <div className="container mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Terms and Conditions</CardTitle>
            <span>Last updated: 2024.06.25</span>
          </CardHeader>
          <CardContent>
            <h2 className="text-2xl font-bold mb-4">Introduction</h2>
            <p className="mb-4">
              Welcome to BetterSayYes ("we", "our", "us"). These Terms of Use
              ("Terms") govern your use of our website,{" "}
              <a
                href="https://bettersayyes.com"
                className="text-blue-500 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://bettersayyes.com
              </a>
              , and our services. By accessing or using our site, you agree to
              be bound by these Terms. If you do not agree to these Terms,
              please do not use our services.
            </p>

            <h2 className="text-2xl font-bold mb-4">Use of Our Services</h2>
            <ol className="list-decimal ml-5 mb-4">
              <li className="mb-2">
                <strong>Eligibility:</strong>
                <p>You must be at least 13 years old to use our services.</p>
              </li>
              <li className="mb-2">
                <strong>Account Registration:</strong>
                <p>
                  You must create an account to access certain features of our
                  site. You agree to provide accurate, current, and complete
                  information during the registration process and to update such
                  information as needed.
                </p>
              </li>
              <li className="mb-2">
                <strong>Login Methods:</strong>
                <p>
                  We offer Google login and passwordless login options. You are
                  responsible for maintaining the confidentiality of your login
                  credentials.
                </p>
              </li>
              <li className="mb-2">
                <strong>Payments:</strong>
                <p>
                  We use Stripe to process one-time payments. By making a
                  payment, you agree to Stripe's terms and conditions.
                </p>
              </li>
              <li className="mb-2">
                <strong>Cookies:</strong>
                <p>
                  We use cookies to enhance your experience on our site. By
                  using the site, you consent to the use of cookies in
                  accordance with our Privacy Policy.
                </p>
              </li>
            </ol>

            <h2 className="text-2xl font-bold mb-4">User-Generated Content</h2>
            <ol className="list-decimal ml-5 mb-4">
              <li className="mb-2">
                <strong>Customization:</strong>
                <p>
                  Users can customize and generate their own pages with
                  personalized questions, images, and descriptions.
                </p>
              </li>
              <li className="mb-2">
                <strong>Responsibility for Content:</strong>
                <p>
                  You are solely responsible for any content you create and
                  share on our platform. BetterSayYes is not responsible for any
                  consequences arising from the public availability of your
                  content.
                </p>
              </li>
              <li className="mb-2">
                <strong>Prohibited Content:</strong>
                <p>
                  You agree not to upload or share any content that is unlawful,
                  harmful, defamatory, obscene, or otherwise objectionable.
                </p>
              </li>
              <li className="mb-2">
                <strong>Submission for Display:</strong>
                <p>
                  Users may submit their customized pages for display on our
                  showcase page. By submitting, you grant BetterSayYes the right
                  to display, promote, and share your page. We reserve the right
                  to remove content if it is edited post-approval to include
                  inappropriate material.
                </p>
              </li>
            </ol>

            <h2 className="text-2xl font-bold mb-4">Prohibited Activities</h2>
            <p className="mb-4">You agree not to:</p>
            <ul className="list-disc ml-5 mb-4">
              <li>
                Use the site for any unlawful purpose or in violation of any
                applicable laws.
              </li>
              <li>
                Engage in any activity that interferes with or disrupts the
                functioning of the site.
              </li>
              <li>
                Attempt to gain unauthorized access to any portion of the site
                or any other accounts, computer systems, or networks connected
                to the site.
              </li>
            </ul>

            <h2 className="text-2xl font-bold mb-4">Intellectual Property</h2>
            <p className="mb-4">
              All content on the site, including text, graphics, logos, and
              software, is the property of BetterSayYes or its content suppliers
              and is protected by intellectual property laws. You agree not to
              reproduce, duplicate, copy, sell, resell, or exploit any portion
              of the site without express written permission from us.
            </p>

            <h2 className="text-2xl font-bold mb-4">
              Disclaimer of Warranties
            </h2>
            <p className="mb-4">
              The site and services are provided on an "as is" and "as
              available" basis. We make no warranties, express or implied,
              regarding the operation of the site or the information, content,
              materials, or products included on the site.
            </p>

            <h2 className="text-2xl font-bold mb-4">Limitation of Liability</h2>
            <p className="mb-4">
              To the fullest extent permitted by law, BetterSayYes shall not be
              liable for any damages of any kind arising from the use of the
              site or from any information, content, materials, or products
              included on or otherwise made available to you through the site.
            </p>

            <h2 className="text-2xl font-bold mb-4">Indemnification</h2>
            <p className="mb-4">
              You agree to indemnify, defend, and hold harmless BetterSayYes and
              its affiliates, officers, agents, and employees from and against
              any and all claims, liabilities, damages, losses, or expenses,
              including reasonable attorneys' fees and costs, arising out of or
              in any way connected with your use of the site or violation of
              these Terms.
            </p>

            <h2 className="text-2xl font-bold mb-4">Changes to These Terms</h2>
            <p className="mb-4">
              We may update these Terms from time to time. We will notify you of
              any changes by posting the new Terms on this page and updating the
              "Last updated" date at the top of these Terms.
            </p>

            <h2 className="text-2xl font-bold mb-4">Governing Law</h2>
            <p className="mb-4">
              These Terms and your use of the site shall be governed by and
              construed in accordance with the laws of the Republic of Korea,
              without regard to its conflict of law principles.
            </p>

            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p className="mb-4">
              If you have any questions about these Terms, please visit our{" "}
              <a
                href="https://www.notion.so/Contact-Us-2222b7b8475f437398c248a803908e6e?pvs=21"
                className="text-blue-500 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Contact Information
              </a>
              .
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
