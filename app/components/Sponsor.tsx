import Image from "next/image";
import Link from "next/link";

interface SponsorProps {
  name: string;
  logo: string;
  description: string;
  link: string;
}

export const Sponsor = ({ name, logo, description, link }: SponsorProps) => {
  return (
    <div className="bg-[#25223D] px-4 py-2 flex items-center justify-center">
      <div className="flex items-center justify-center">
        <div className="flex items-center space-x-2 w-full max-w-[1440px]">
          <span className="text-gray-400 text-sm">Weekly Sponsor:</span>
          <Link
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center hover:opacity-80 transition-opacity"
          >
            <div className="flex items-center px-2">
              <Image
                src={logo}
                alt={`${name} logo`}
                width={24}
                height={24}
                className="rounded-full"
              />
              <span className="text-white font-medium">{name}</span>
            </div>
            <span className="text-gray-400 text-sm hidden sm:inline">
              {description}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};
