import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Metadata } from "next";

export const metadata: Metadata = {
  robots: "noindex, nofollow",
};

export default function Privacy() {
  return (
    <Layout>
      <div className="container mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Privacy Policy</CardTitle>
            <span>Last updated: 2024.06.25</span>
          </CardHeader>
          <CardContent>
            <h2 className="text-2xl font-bold mb-4">Introduction</h2>
            <p className="mb-4">
              BetterSayYes ("we", "our", "us") is committed to protecting your
              privacy. This Privacy Policy explains how we collect, use,
              disclose, and safeguard your information when you visit our
              website,{" "}
              <a
                href="https://bettersayyes.com"
                className="text-blue-500 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://bettersayyes.com
              </a>
              , or use our services. Please read this privacy policy carefully.
              If you do not agree with the terms of this privacy policy, please
              do not access the site.
            </p>

            <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
            <ol className="list-decimal ml-5 mb-4">
              <li className="mb-2">
                <strong>Personal Information:</strong>
                <ul className="list-disc ml-5">
                  <li>
                    <strong>Username:</strong> We collect your username when you
                    create an account.
                  </li>
                  <li>
                    <strong>Email Address:</strong> If you choose to subscribe
                    to our email notifications, we will collect your email
                    address.
                  </li>
                </ul>
              </li>
              <li className="mb-2">
                <strong>Login Information:</strong>
                <p>
                  We support Google login and passwordless login methods, which
                  may involve the collection of additional information as
                  provided by these services.
                </p>
              </li>
              <li className="mb-2">
                <strong>Payment Information:</strong>
                <p>
                  We use Stripe to process one-time payments. We store your
                  payment details to facilitate transactions. Please refer to
                  Stripe's privacy policy for more information on how they
                  handle your data.
                </p>
              </li>
              <li className="mb-2">
                <strong>Analytics Information:</strong>
                <p>
                  We use Google Analytics to collect information about your use
                  of the site to help us improve our services, but only if you
                  allow non-essential cookies. If you decline non-essential
                  cookies, Google Analytics will not be used.
                </p>
              </li>
              <li className="mb-2">
                <strong>Database and Storage:</strong>
                <p>
                  We use Supabase for database and storage services. Your data
                  is securely stored and managed by Supabase.
                </p>
              </li>
              <li className="mb-2">
                <strong>Cookies:</strong>
                <p>
                  We use cookies to enhance your experience on our site. Cookies
                  are small text files placed on your device to store data that
                  can be recalled by a web server in the domain that placed the
                  cookie. You can control and manage cookies through your
                  browser settings.
                </p>
              </li>
            </ol>

            <h2 className="text-2xl font-bold mb-4">
              How We Use Your Information
            </h2>
            <p className="mb-2">
              We use the information we collect in the following ways:
            </p>
            <ul className="list-disc ml-5 mb-4">
              <li>To facilitate account creation and login.</li>
              <li>
                To process transactions and store payment details for future
                transactions.
              </li>
              <li>
                To send you related information, including purchase
                confirmations and invoices.
              </li>

              <li>
                To send administrative information such as changes to our terms,
                conditions, and policies.
              </li>
              <li>
                To send you marketing and promotional communications, if you
                have opted-in to receive such communications.
              </li>
              <li>
                To improve our website and services through data analysis and
                research, if you have allowed the use of non-essential cookies.
              </li>
              <li>
                To personalize your experience and deliver content and product
                offerings relevant to your interests.
              </li>
            </ul>

            <h2 className="text-2xl font-bold mb-4">
              Disclosure of Your Information
            </h2>
            <p className="mb-2">We may share your information with:</p>
            <ul className="list-disc ml-5 mb-4">
              <li>
                <strong>Third-Party Service Providers:</strong> Including but
                not limited to Google Analytics and Stripe, to provide services
                on our behalf.
              </li>
              <li>
                <strong>Business Transfers:</strong> If we undergo a merger,
                acquisition, or sale of all or a portion of our assets, your
                information may be transferred as part of that transaction.
              </li>
            </ul>

            <h2 className="text-2xl font-bold mb-4">
              Security of Your Information
            </h2>
            <p className="mb-4">
              We use administrative, technical, and physical security measures
              to protect your personal information. While we have taken
              reasonable steps to secure the personal information you provide to
              us, please be aware that despite our efforts, no security measures
              are perfect or impenetrable.
            </p>

            <h2 className="text-2xl font-bold mb-4">Your Rights and Choices</h2>
            <p className="mb-2">You have the right to:</p>
            <ul className="list-disc ml-5 mb-4">
              <li>Access the personal data we hold about you.</li>
              <li>Request the correction of inaccurate data.</li>
              <li>Request the deletion of your data.</li>
              <li>Opt-out of marketing communications at any time.</li>
            </ul>
            <p className="mb-4">
              To exercise these rights, please visit our{" "}
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

            <h2 className="text-2xl font-bold mb-4">
              Changes to This Privacy Policy
            </h2>
            <p className="mb-4">
              We may update this privacy policy from time to time. We will
              notify you of any changes by posting the new privacy policy on
              this page and updating the "Last updated" date at the top of this
              policy.
            </p>

            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p className="mb-4">
              If you have any questions about this Privacy Policy, please visit
              our{" "}
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
