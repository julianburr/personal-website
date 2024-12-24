"use client";

import { ArrowLeft, ArrowRight, X } from "@phosphor-icons/react";
import dayjs from "dayjs";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Tooltip } from "@/components/tooltip";

type Props = {
  city: string;
  region?: string;
  country: string;
  title?: string;
  images?: string[];
  date: string;
};

export function Galery({
  city,
  region,
  country,
  title,
  date,
  images = [],
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const searchParamImage = searchParams.get("image");
  const initialImageIndex = searchParamImage ? parseInt(searchParamImage) : 0;

  const [imageIndex, setImageIndex] = useState<number>(initialImageIndex);
  useEffect(() => {
    router.push(imageIndex ? `${pathname}?image=${imageIndex}` : pathname);
  }, [imageIndex, router, pathname]);

  return (
    <>
      {!imageIndex ? (
        <div className="p-[1.2rem] sm:p-[4.2rem] pt-[6.2rem] sm:pt-[6.8rem] overflow-auto flex flex-row flex-wrap gap-[.8rem] justify-center">
          {images.map((image, index) => (
            <button
              key={image}
              aria-label={`Go to image ${index + 1}`}
              onClick={() => setImageIndex(index + 1)}
              className="p-0 m-0 flex transition-all grayscale hover:grayscale-0 focus:grayscale-0"
            >
              <img src={image} className="flex h-[10rem] w-auto" />
            </button>
          ))}
        </div>
      ) : (
        <div className="absolute inset-0 bg-white">
          <a href={images?.[imageIndex - 1]} target="_blank">
            <img
              key={imageIndex}
              src={images?.[imageIndex - 1]}
              alt=""
              className="w-full h-full object-contain"
            />
          </a>
        </div>
      )}

      <div className="absolute top-0 left-0 right-0 font-heading flex flex-row">
        <Tooltip content="Back to map" placement="right">
          <Link
            href="/around-the-world"
            className="text-inherit h-[3.2rem] w-[3.2rem] sm:h-[4.2rem] sm:w-[4.2rem] flex flex-shrink-0 justify-center items-center shadow-lg bg-white hover:bg-grey-light focus:bg-grey-light"
            aria-label="Go back to map"
          >
            <X className="text-[1.4em]" />
          </Link>
        </Tooltip>
        <div className="flex flex-1 min-w-[.4rem] w-full" />
        <div className="flex flex-row bg-white shadow-lg items-center justify-between overflow-hidden">
          <Link
            href="?image=0"
            className="flex flex-col text-inherit font-normal overflow-hidden h-[3.2rem] sm:h-[4.2rem] px-[.8rem] sm:px-[1.2rem] justify-center bg-white hover:bg-grey-light focus:bg-grey-light group hover:no-underline focus:no-underline"
            aria-label="Go to overview"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setImageIndex(0);
            }}
          >
            <h3 className="whitespace-nowrap break-all text-ellipsis overflow-hidden text-xl leading-[1.1] group-hover:underline group-focus:underline">
              {title || city}
            </h3>
            <span className="text-xs opacity-[.64] leading-[1.1] whitespace-nowrap break-all text-ellipsis mt-[-.2rem]">
              {dayjs(date).format("MMM YYYY")} —{" "}
              {region ? (
                <>
                  {region}, {country}
                </>
              ) : (
                <>{country}</>
              )}
            </span>
          </Link>
          <div className="h-[3.2rem] sm:h-[4.2rem] px-[.8rem] sm:px-[1.2rem] font-heading text-xl flex flex-row flex-shrink-0 items-center border-l-grey-medium/50 border-l-[1px]">
            {!!imageIndex && (
              <Link
                href={`?image=${imageIndex - 1}`}
                className="text-inherit px-1"
                aria-label="Go to previous image"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setImageIndex((state) => state - 1);
                }}
              >
                <ArrowLeft />
              </Link>
            )}
            <div className="px-1">
              {!imageIndex ? (
                <>Overview</>
              ) : (
                <span className="flex flex-row align-top tabular-nums">
                  {imageIndex} /{" "}
                  <span className="text-base pl-1 tabular-nums">
                    {images.length}
                  </span>
                </span>
              )}
            </div>
            {imageIndex < images.length && (
              <Link
                href={`?image=${imageIndex + 1}`}
                className="text-inherit px-1"
                aria-label="Go to next image"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setImageIndex((state) => state + 1);
                }}
              >
                <ArrowRight />
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
