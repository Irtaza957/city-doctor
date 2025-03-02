import Link from "next/link";
import { ReactNode } from "react";
import { useRouter } from "next/router";
import { GoChevronRight } from "react-icons/go";
import { RiHomeLine, RiErrorWarningLine } from "react-icons/ri";

interface BreadcrumbProps {
  cn?: string;
  name?: string;
  separatorIcon?: ReactNode;
  homeIcon?: ReactNode;
}

interface Breadcrumb {
  href: string;
  displayName: string;
  position: number;
}

const Breadcrumbs: React.FC<BreadcrumbProps> = ({
  cn,
  name,
  separatorIcon = <GoChevronRight className="w-4 h-4 text-gray-400" />,
  homeIcon = <RiHomeLine className="w-5 h-5 text-gray-400" />,
}) => {
  const { pathname } = useRouter();
  const pathParts = pathname.split("/").filter((part) => part);

  const breadcrumbs: Breadcrumb[] = pathParts.reduce((acc, part, idx) => {
    const isDynamic = part.includes("[");
    let segment: string;
    let href: string;

    segment = part;
    href = `/${pathParts.slice(0, idx + 1).join("/")}`;

    const displayName = isDynamic
      ? name || "Unknown"
      : segment.replace(/-/g, " ");

    return [...acc, { href, displayName, position: idx + 2 }];
  }, [] as Breadcrumb[]);

  return (
    <ol
      className={`${
        cn ? cn : ""
      } w-full flex items-center justify-start space-x-1`}
    >
      <li
        itemScope
        itemProp="itemListElement"
        itemType="https://schema.org/ListItem"
      >
        <Link itemProp="item" href="/">
          <span
            itemProp="name"
            className="capitalize text-xs xl:text-sm hover:underline hover:underline-offset-4"
          >
            {homeIcon}
          </span>
        </Link>
        <meta itemProp="position" content="1" />
      </li>

      {separatorIcon}
      {breadcrumbs.slice(0, breadcrumbs.length - 1).map((breadcrumb, idx) => (
        <li
          key={idx}
          itemScope
          itemProp="itemListElement"
          itemType="https://schema.org/ListItem"
          className="flex items-center justify-center"
        >
          <Link itemProp="item" href={breadcrumb.href}>
            <span
              itemProp="name"
              className="capitalize text-xs mr-1 xl:text-sm text-gray-400 hover:underline hover:underline-offset-4"
            >
              {breadcrumb.displayName}
            </span>
          </Link>
          {separatorIcon}
          <meta itemProp="position" content={`${breadcrumb.position}`} />
        </li>
      ))}

      {breadcrumbs.length > 0 && (
        <li
          itemScope
          itemProp="itemListElement"
          itemType="https://schema.org/ListItem"
        >
          <span
            itemProp="name"
            className="capitalize text-xs xl:text-sm text-gray-400"
          >
            {breadcrumbs[breadcrumbs.length - 1]?.displayName || (
              <RiErrorWarningLine />
            )}
          </span>
          <meta itemProp="position" content={`${breadcrumbs.length + 1}`} />
        </li>
      )}
    </ol>
  );
};

export default Breadcrumbs;
