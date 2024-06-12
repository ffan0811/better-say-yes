"use client";
import { useRouter } from "next/navigation";
import { useLastViewedPhoto } from "@/lib/utils/useLastViewedPhoto";
import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ImageProps } from "@/types/image";
import { DefaultButton, DefaultLink } from "./Button";
import { EDITABLE_INPUT_CLASSES } from "@/constants";
import { contentsAtom } from "@/atoms/content";
import { useAtom } from "jotai";
import DynamicHeightTextarea from "../DynamicHeightTextarea";

const TITLE_COMMON_CLASSES =
  "text-center text-base font-bold uppercase tracking-widest";

const DESCRIPTION_COMMON_CLASSES =
  "text-center break-words whitespace-pre-line text-white/75";

export default function ProductionAfterYes({
  afterYesTitle,
  afterYesDescription,
  afterYesButtonText,
  afterYesButtonLink,
  images,
  isPreview,
}: {
  afterYesTitle: string;
  afterYesDescription: string;
  afterYesButtonText?: string;
  afterYesButtonLink?: string;
  images: File[];
  isPreview?: boolean;
}) {
  const router = useRouter();
  // const { photoId } = router.query;
  const photoId = "";
  const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto();
  const [contents, setContents] = useAtom(contentsAtom);

  const lastViewedPhotoRef = useRef<HTMLAnchorElement>(null);

  const newImages: ImageProps[] = [];

  useEffect(() => {
    // This effect keeps track of the last viewed photo in the modal to keep the index page in sync when the user navigates back
    if (lastViewedPhoto && !photoId) {
      lastViewedPhotoRef.current.scrollIntoView({ block: "center" });
      setLastViewedPhoto(null);
    }
  }, [photoId, lastViewedPhoto, setLastViewedPhoto]);

  return (
    <div className="w-full h-full">
      {/* {photoId && (
        <Modal
          images={images}
          onClose={() => {
            setLastViewedPhoto(photoId);
          }}
        />
      )} */}
      <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
        <div className="relative mb-5 flex flex-col items-center justify-center gap-4 overflow-hidden rounded-lg bg-white/10 p-6 text-center text-white shadow-highlight">
          {isPreview ? (
            <input
              className={`${TITLE_COMMON_CLASSES} ${EDITABLE_INPUT_CLASSES}`}
              value={afterYesTitle}
              onChange={(e) => {
                setContents({ ...contents, afterYesTitle: e.target.value });
              }}
            />
          ) : (
            <h1 className={TITLE_COMMON_CLASSES}>{afterYesTitle}</h1>
          )}
          {isPreview ? (
            <DynamicHeightTextarea
              className={`w-full h-0 ${DESCRIPTION_COMMON_CLASSES} ${EDITABLE_INPUT_CLASSES}`}
              value={afterYesDescription}
              onChange={(e) => {
                setContents({
                  ...contents,
                  afterYesDescription: e.target.value,
                });
              }}
            />
          ) : (
            <p className={DESCRIPTION_COMMON_CLASSES}>{afterYesDescription}</p>
          )}

          {/* {isPreview ? null : } */}
          {afterYesButtonText ? (
            afterYesButtonLink ? (
              <DefaultLink href={afterYesButtonLink} target="_blank">
                {afterYesButtonText}
              </DefaultLink>
            ) : (
              <DefaultButton>{afterYesButtonText}</DefaultButton>
            )
          ) : null}
        </div>
        {isPreview
          ? (images || []).map((ele) => {
              const src = URL.createObjectURL(ele);
              return (
                <Link
                  key={ele.name}
                  href={`/?photoId=${ele.name}`}
                  as={`/p/${ele.name}`}
                  // ref={ele.name === Number(lastViewedPhoto) ? lastViewedPhotoRef : null}
                  shallow
                  className="after:content group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
                >
                  <Image
                    key={ele.name}
                    alt="Next.js Conf photo"
                    className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
                    style={{ transform: "translate3d(0, 0, 0)" }}
                    placeholder="blur"
                    blurDataURL={src}
                    src={src}
                    width={720}
                    height={480}
                    sizes="(max-width: 640px) 100vw,
              (max-width: 1280px) 50vw,
              (max-width: 1536px) 33vw,
              25vw"
                  />
                </Link>
              );
            })
          : newImages.map(({ id, public_id, format, blurDataUrl }) => (
              <Link
                key={id}
                href={`/?photoId=${id}`}
                as={`/p/${id}`}
                ref={id === Number(lastViewedPhoto) ? lastViewedPhotoRef : null}
                shallow
                className="after:content group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
              >
                <Image
                  alt="Next.js Conf photo"
                  className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
                  style={{ transform: "translate3d(0, 0, 0)" }}
                  placeholder="blur"
                  blurDataURL={blurDataUrl}
                  src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_720/${public_id}.${format}`}
                  width={720}
                  height={480}
                  sizes="(max-width: 640px) 100vw,
                  (max-width: 1280px) 50vw,
                  (max-width: 1536px) 33vw,
                  25vw"
                />
              </Link>
            ))}
      </div>
    </div>
  );
}
