import Link from "next/link";
import React from "react";

type Props = {
  data: any;
};

const MenuLink = ({ data }: Props) => {
  return (
    <li className="relative nav-item">
      {data?.linkType !== "self-created" ? (
        <Link
          className="p-[10px] text-[16px] text-white font-bold hover:text-[#e7a007] duration-150"
          href={data.slug || "/"}
        >
          {data.name}
        </Link>
      ) : (
        <a
          className="p-[10px] text-[16px] text-white font-bold hover:text-[#e7a007] duration-150"
          href={String(data.linkValue)}
        >
          {data.name}
        </a>
      )}

      {data?.children ? (
        <ul className="sub-menu hidden flex-col gap-2 absolute z-50 bg-[#28292e] rounded-md py-[20px] px-[10px] top-[30px] min-w-[150px]">
          {data?.children?.map((item: any) => {
            return <MenuLink key={item.id} data={item} />;
          })}
        </ul>
      ) : (
        <></>
      )}
    </li>
  );
};

export default MenuLink;
