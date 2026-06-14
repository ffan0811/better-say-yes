import Link from "next/link";
import { EXTERNAL_CONTACT } from "@/constants";
import LanguageSwitcher from "./LanguageSwitcher";

const links = [
  {
    title: "Contact Us",
    href: EXTERNAL_CONTACT,
  },
  {
    title: "Privacy Policy",
    href: "/privacy",
  },
  {
    title: "Terms of Use",
    href: "/terms",
  },
];

type FooterProps = {
  isReversed?: boolean;
};

export default function Footer({ isReversed }: FooterProps) {
  return (
    <footer
      className={`container text-xs ${
        isReversed ? "bg-primary text-white" : ""
      }`}
    >
      <div className="py-10">
        <div className="flex flex-col items-center justify-between text-sm md:flex-row">
          {links?.length ? (
            <ul className="flex flex-col items-center gap-2 md:gap-8 md:flex-row">
              {links.map((ele) => (
                <li key={ele.title}>
                  <Link
                    className="mx-3 my-1.5 text-sm md:my-0 lg:mx-0 hover:opacity-80 focus:opacity-80 transition-opacity"
                    key={ele.title}
                    href={ele.href}
                    target="_blank"
                  >
                    {ele.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
          <div className="flex mt-6 md:mt-0 space-x-4 items-center justify-center">
            <LanguageSwitcher />
            <p>© {new Date().getFullYear()} BetterSayYes</p>
            {/* <ThemeToggle /> */}
          </div>
        </div>
      </div>
    </footer>
  );
}
