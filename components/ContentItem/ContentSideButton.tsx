import Link from "next/link";
import { ReactNode } from "react";

type ContentSideButtonProps = {
  type: "button" | "link";
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onClickLink?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  children: ReactNode;
};

export default function ContentSideButton({
  type,
  href,
  onClick,
  onClickLink,
  children,
}: ContentSideButtonProps) {
  if (type === "link") {
    return (
      <Link
        href={href}
        target="_blank"
        onClick={onClickLink}
        className="opacity-70 hover:opacity-100 w-6 h-6"
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      data-prevent-nprogress={true}
      type="button"
      onClick={onClick}
      className="opacity-70 hover:opacity-100 w-6 h-6"
    >
      {children}
    </button>
  );
}
