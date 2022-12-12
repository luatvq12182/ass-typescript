import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Term } from "../../interfaces";
import useTerms from "../../hooks/queries/useTerms";
import { useRouter } from "next/router";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const { data: terms } = useTerms();
  const router = useRouter();

  useEffect(() => {
    if (!router.pathname.includes("admin")) {
      document.body.classList.add("bg-[#222327]");
    }
  }, [router.pathname]);

  if (router.pathname.includes("admin")) {
    return <div>{children}</div>;
  }

  const categories: Term[] = terms?.data?.filter((term: Term) => {
    return term.taxonomy === "category";
  });

  return (
    <div>
      <header className="container max-w-[1200px] mx-auto h-[160px] flex items-center justify-between">
        <Link href={"/"}>
          <Image src="/nurui.svg" width={124} height={50} alt="Logo" />
        </Link>

        <ul className="flex">
          {categories?.map((item: Term) => {
            return (
              <li key={item.id}>
                <Link
                  className="p-[10px] text-[16px] text-white font-bold hover:text-[#e7a007] duration-150"
                  href={`/category/${item.slug}`}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}

          <li className="flex items-center ml-2 cursor-pointer">
            <Image
              src={"/search.svg"}
              height={17}
              width={17}
              alt="search icon"
            />
          </li>
        </ul>
      </header>

      <main className="min-h-[60vh]">{children}</main>

      <footer>
        <div className="container max-w-[1024px] mx-auto mt-[100px] mb-[30px] flex items-center justify-between">
          <Link href={"/"}>
            <Image src="/nurui.svg" width={86} height={35} alt="Logo" />
          </Link>

          <ul className="flex">
            {categories?.map((item: Term) => {
              return (
                <li key={item.id}>
                  <Link
                    className="p-[10px] text-[16px] text-white font-bold"
                    href={`/category/${item.slug}`}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="text-center mb-[20px]">
          <p className="text-white text-[12px]">
            © 2022 Nurui. All Right Reserved. Published with Ghost & Nurui.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
