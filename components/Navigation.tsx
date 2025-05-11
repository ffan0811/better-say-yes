import Link from "next/link";
import Logo from "./Logo";
import AuthButton from "./AuthButton";

type NavigationProps = {
  className?: string;
};

export default function Navigation({ className = "" }: NavigationProps) {
  return (
    <nav className={`container py-8 px-4 ${className}`}>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4 md:space-x-16">
          <Link href="/">
            <Logo className={`h-auto w-16 md:w-28`} />
          </Link>
          <ul className="flex items-center text-sm space-x-3 md:text-base md:space-x-8">
            <li>
              <Link href="/showcase">Showcase</Link>
            </li>
            <li>
              <Link target="_blank" href="https://www.etsy.com/shop/BetterSayYes">Shop</Link>
            </li>
            {/* <li>
              <Link href="/pricing">Pricing</Link>
            </li> */}
          </ul>
        </div>
        <AuthButton />
      </div>
    </nav>
  );
}
