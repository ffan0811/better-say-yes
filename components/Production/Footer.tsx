import Link from "next/link";
import Logo from "../Logo";

export default function Footer({
  themeColor = "#fff",
}: {
  themeColor?: string;
}) {
  return (
    <footer className="h-16 -mt-16 flex justify-center items-center relative z-10">
      <Link
        className="flex items-center leading-tight text-sm"
        target="_blank"
        href={process.env.NEXT_PUBLIC_SITE_URL}
        style={{ color: themeColor }}
      >
        Powered by &nbsp;
        <Logo className="w-10 h-10" colorHexCode={themeColor} />
      </Link>
    </footer>
  );
}
