import Link from "next/link";
import Logo from "./Logo";
import AuthButton from "./AuthButton";

type NavigationProps = {};

export default function Navigation({}: NavigationProps) {
  return (
    <nav className={`container py-8`}>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-16">
          <Link href="/">
            <Logo className={`h-auto w-28`} />
          </Link>
          <ul className="flex items-center space-x-8">
            <li>
              <Link href="/templates">Templates</Link>
            </li>
            <li>
              <Link href="/pricing">Pricing</Link>
            </li>
          </ul>
        </div>
        <AuthButton />
      </div>
    </nav>
  );
}
