"use client";
import { useRouter } from "next/navigation";
import { Button, buttonVariants } from "../ui/button";
import { InputWithLabel } from "../ui/input";
import { useLastViewedPhoto } from "@/lib/utils/useLastViewedPhoto";
import { useEffect, useRef } from "react";
import Modal from "../Modal";
import Link from "next/link";
import Image from "next/image";
import { ImageProps } from "@/types/image";

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
    <div className="">
      {/* {photoId && (
        <Modal
          images={images}
          onClose={() => {
            setLastViewedPhoto(photoId);
          }}
        />
      )} */}
      <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
        <div className="relative mb-5 flex h-[300px] flex-col items-center justify-center gap-4 overflow-hidden rounded-lg bg-white/10 px-6 text-center text-white shadow-highlight">
          <h1 className="mb-4 text-base font-bold uppercase tracking-widest">
            {afterYesTitle}
          </h1>
          <p className="max-w-[40ch] text-white/75 sm:max-w-[32ch]">
            {afterYesDescription}
          </p>
          {afterYesButtonText ? (
            afterYesButtonLink ? (
              <Link
                className={buttonVariants({ variant: "default" })}
                href={afterYesButtonLink}
                target="_blank"
              >
                {afterYesButtonText}
              </Link>
            ) : (
              <Button className="">{afterYesButtonText}</Button>
            )
          ) : null}
        </div>
        {isPreview
          ? images.map((ele) => {
              const src = URL.createObjectURL(ele);
              return (
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
