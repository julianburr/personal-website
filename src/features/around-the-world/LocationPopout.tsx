import Link from "next/link";

type Props = {
  place: string;
  region?: string;
  country: string;
  type?: string;
  thumb?: string;
  href?: string;
};

function LocationPopout({ place, region, country, thumb, href }: Props) {
  return (
    <div className="w-[12rem]">
      {thumb && <img className="w-full h-[7rem] object-fill" src={thumb} />}
      <div className="p-[.6rem]">
        {href ? (
          <Link href={href}>
            <h1 className="text-base m-0 p-0 leading-[1.1]">{place}</h1>
          </Link>
        ) : (
          <h1 className="text-base m-0 p-0 leading-[1.1]">{place}</h1>
        )}
        <span>
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
