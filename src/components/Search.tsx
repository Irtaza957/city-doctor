"use client";

import {
  useFetchCategoriesQuery,
  useFetchSubCategoriesMutation,
} from "@/store/services/category";
import AutoComplete from "./Autocomplete";
import { getCategoryLink, getSlug, imageBase, truncateString } from "@/utils/helpers";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";

import Link from "next/link";
import Image from "next/image";
import { LuLoader2 } from "react-icons/lu";
import { useEffect, useRef, useState } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa6";
import { useRouter } from "next/router";

type ITEM = {
  id: string;
  name: string;
  image: string;
};

const Search = () => {
  const menuRef = useRef(null);
  const { data } = useFetchCategoriesQuery({});
  const [category, setCategory] = useState<number>(1);
  useOnClickOutside(menuRef, () => setShowMenu(false));
  const [list, setList] = useState<ITEM[] | null>(null);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [selectedSub, setSelectedSub] = useState<string>("7");
  const [getSubCategories, { isLoading }] = useFetchSubCategoriesMutation();
  const [subCategories, setSubCategories] = useState<SERVICE_LIST[] | null>(
    null
  );
  const router = useRouter();

  const getSubs = async () => {
    const response = await getSubCategories(category);
    const data = response.data ?? [];

    setSubCategories(data);
  };

  const handleCategoryClick = (id: string) => {
    setShowMenu(false)
    router.push(getCategoryLink(id, list?.find(item=>item.id===String(category))?.name!))
  }

  const getNavLink = (service_name: string) => {
    if (service_name) {
      return `/${getSlug(list?.find(item=>item.id===String(category))?.name!) || ''}/${getSlug(subCategories?.find(item=> item?.id===selectedSub)?.name || '')}/${getSlug(service_name)}`
    }
  }
  useEffect(() => {
    if (data) {
      const finalList: ITEM[] = data?.map((item) => {
        return {
          image: item.icon,
          id: item.category_id,
          name: item.category_name,
        };
      });

      setList(finalList);
    }
  }, [data]);

  useEffect(() => {
    setSelectedSub("0");
    if(showMenu){
      getSubs();
    }
  }, [category, showMenu]);

  useEffect(() => {
    if (subCategories) {
      if (subCategories.length > 0) {
        setSelectedSub(subCategories[0].id);
      }
    }
  }, [subCategories])
  
  return (
    <>
      <div className="w-full hidden sm:flex gap-3 py-2 px-4 rounded-lg bg-[#F5F5F5] divide-x-[1.5px] divide-gray-300">
        <div
          ref={menuRef}
          className="relative w-40 md:w-36 col-span-4 lg:col-span-3 xl:col-span-2 flex items-start justify-start"
        >
          <button
            type="button"
            onClick={() => setShowMenu(!showMenu)}
            className="w-full h-full text-left text-xs flex items-center justify-center gap-2"
          >
            <span className="w-full text-left font-semibold text-xs xl:text-sm whitespace-nowrap">
              All Categories
            </span>
            <FaChevronDown className="size-4 text-primary" />
          </button>
          <div
            className={`absolute z-50 h-[400px] xl:h-[500px] 3xl:h-[600px] mt-12 md:mt-10 lg:mt-12 border min-w-52 -left-[185px] md:-left-[165px] lg:-left-[15px] xl:-left-[15px] rounded-lg shadow-lg overflow-hidden bg-white ${
              showMenu ? "flex" : "hidden"
            } ${
              selectedSub &&
              subCategories?.some(
                (item) => item.id === selectedSub && item.services.length !== 0
              )
                ? "w-[730px] md:w-[922.5px] lg:w-[1090px] xl:w-[1225px]"
                : "w-[410px] md:w-[461.25px] lg:w-[545px] xl:w-[612.5px]"
            }`}
          >
            <div className="w-[410px] md:w-[461.25px] lg:w-[545px] xl:w-[612.5px] grid grid-cols-2 divide-x border-r">
              <div className="col-span-1 w-full max-h-full overflow-auto custom-scrollbar flex flex-col items-start justify-start">
                {list?.map((option: ITEM, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleCategoryClick(option.id)}
                    onMouseEnter={() => setCategory(parseInt(option.id))}
                    className={`w-full grid grid-cols-12 items-center justify-center p-3 hover:bg-gray-100 hover:text-primary cursor-pointer ${
                      category === parseInt(option.id) && "bg-gray-100"
                    }`}
                  >
                    <Image
                      src={`${imageBase(option.image)}`}
                      alt="icon"
                      width={40}
                      height={40}
                      className="size-6 col-span-1"
                    />
                    <div className="flex pl-3 items-center justify-start col-span-10 w-full">
                      <span className="w-full text-left font-semibold text-xs xl:text-sm">
                        {option.name}
                      </span>
                    </div>
                    <div className="col-span-1 flex items-center justify-end">
                      <FaChevronRight className="size-3" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="col-span-1 w-full max-h-full overflow-auto custom-scrollbar flex flex-col items-start justify-start">
                {isLoading ? (
                  <div className="w-full h-full flex items-center justify-center">
                    <LuLoader2 className="size-10 animate-spin text-secondary" />
                  </div>
                ) : subCategories?.length === 0 ? (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="w-full text-center text-xs">
                      No Results
                    </span>
                  </div>
                ) : (
                  subCategories?.map((option: SERVICE_LIST, idx) => (
                    <div
                      key={idx}
                      onMouseEnter={() => setSelectedSub(option.id)}
                      className={`w-full flex items-center justify-center p-3 hover:bg-gray-100 hover:text-primary cursor-pointer ${
                        selectedSub === option.id && "bg-gray-100"
                      }`}
                    >
                      <div className="flex pl-3 py-1 xl:py-0.5 items-center justify-start col-span-10 w-full">
                        <span className="w-full text-left font-semibold text-xs xl:text-sm">
                          {option.name}
                        </span>
                      </div>
                      <FaChevronRight className="size-3" />
                    </div>
                  ))
                )}
              </div>
            </div>
            {selectedSub &&
              subCategories?.some(
                (item) => item.id === selectedSub && item.services.length !== 0
              ) && (
                <div className="relative flex flex-col items-start justify-between">
                  <div className="w-[320px] md:w-[461.25px] lg:w-[545px] xl:w-[612.5px] h-fit max-h-full overflow-auto custom-scrollbar grid grid-cols-1 md:grid-cols-2 items-start justify-start xl:p-2.5">
                    {subCategories
                      ?.filter(
                        (sub) => parseInt(sub.id) === parseInt(selectedSub)
                      )[0]
                      ?.services?.map((service) => (
                        <Link
                          key={service.service_id}
                          onClick={() => setShowMenu(false)}
                          href={getNavLink(service.name || '') || `/drips/${service.service_id}`}
                          className="flex items-center justify-center space-x-2.5 p-3.5 hover:bg-primary/10 xl:rounded-lg"
                        >
                          <Image
                            alt="icon"
                            width={50}
                            height={50}
                            src={`${imageBase(service.thumbnail)}`}
                            className="size-11 rounded-lg object-cover"
                          />
                          <div className="w-full flex flex-col">
                            <span className="w-full text-left font-semibold text-xs xl:text-sm overflow-hidden truncate">
                              {truncateString(service.name!, 20)}
                            </span>
                            <span className="w-full text-left text-[10px] text-[#555555] text-wrap line-clamp-1">
                              {service.description}
                            </span>
                            <span className="w-full text-left font-semibold text-xs xl:text-sm overflow-hidden truncate">
                              AED&nbsp;{service.price_without_vat}
                            </span>
                          </div>
                        </Link>
                      ))}
                  </div>
                  <div className="sticky bottom-0 left-0 w-full flex items-center justify-end pr-3 pb-3">
                    <Link
                      onClick={() => setShowMenu(false)}
                      href={getCategoryLink(category.toString(), list?.find(item=>item.id===String(category))?.name!)}
                      className="px-6 py-2 rounded-md bg-primary text-white text-xs text-center whitespace-nowrap"
                    >
                      View All
                    </Link>
                  </div>
                </div>
              )}
          </div>
        </div>
        <div className="relative pl-3 md:pl-0 col-span-8 lg:col-span-9 xl:col-span-10 w-full flex items-center justify-center">
          <AutoComplete />
        </div>
      </div>
    </>
  );
};

export default Search;
