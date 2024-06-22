import Link from "next/link";
import { ReactNode } from "react";

export const ITEM_COMMON_CLASSES =
  "border w-full text-lg rounded-md flex items-center justify-center whitespace-pre-line-line p-4";
export const ITEM_HOVER_CLASSES =
  "cursor-pointer hover:opacity-80 transition-opacity";
export const ITEM_SIZE = "aspect-video";

type ContentItemProps = {
  backgroundColor: string;
  themeColor: string;
  contentId?: string;
  type: "link" | "button";
  title: string;
  href?: string;
  target?: "_blank";
  className?: string;
  children?: ReactNode;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onClickLink?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
};

export default function ContentItem({
  backgroundColor,
  themeColor,
  contentId,
  type,
  title,
  href,
  target,
  className = "",
  children,
  onClick,
  onClickLink,
}: ContentItemProps) {
  const COMMON_WRAPPER_CLASSES = `relative flex flex-col group ${ITEM_COMMON_CLASSES} ${ITEM_HOVER_CLASSES} ${ITEM_SIZE}`;

  const COMMON_BUTTON_CLASSES =
    "hidden group-hover:flex absolute right-3 top-3 space-x-2";
  if (type === "link") {
    return (
      <Link legacyBehavior passHref href={href || `/create?id=${contentId}`}>
        <a
          data-disable-nprogress={true}
          className={`${COMMON_WRAPPER_CLASSES} aspect-video ${className}`}
          style={{
            background: backgroundColor,
            color: themeColor,
            borderColor: themeColor,
          }}
          onClick={onClickLink}
          target={target}
        >
          <span className="block"> {title || `Draft`}</span>
          <div className={COMMON_BUTTON_CLASSES}>{children}</div>
        </a>
      </Link>
    );
  }
  return (
    <div
      onClick={onClick}
      className={`${COMMON_WRAPPER_CLASSES} aspect-video ${className}`}
      style={{
        background: backgroundColor,
        color: themeColor,
        borderColor: themeColor,
      }}
    >
      <span className="block"> {title || "Draft"}</span>
      <div className={COMMON_BUTTON_CLASSES}>{children}</div>
    </div>
  );
}
