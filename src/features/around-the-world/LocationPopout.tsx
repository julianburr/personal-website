import Link from "next/link";

type Props = {
  pathname?: string;
  place: string;
  region?: string;
  country: string;
  type?: string;
  thumb?: string;
  images?: string[];
};

function LocationPopout({
  pathname,
  place,
  region,
  country,
  thumb,
  images,
}: Props) {
  return (
    <div className="w-[12rem]">
      {thumb && <img className="w-full h-[7rem] object-fill" src={thumb} />}
      <div className="p-[.6rem] flex flex-col">
        {!!images?.length && !!pathname ? (
          <Link href={pathname} className="text-inherit" target="_blank">
            <h1 className="text-base m-0 p-0 leading-[1.1]">{place}</h1>
          </Link>
        ) : (
          <h1 className="text-base m-0 p-0 leading-[1.1]">{place}</h1>
        )}
        <span className="text-xs opacity-[.64] leading-[1.1]">
          {region ? (
            <>
              {region}, {country}
            </>
          ) : (
            <>{country}</>
          )}
        </span>
      </div>
    </div>
  );
}

export { LocationPopout };
