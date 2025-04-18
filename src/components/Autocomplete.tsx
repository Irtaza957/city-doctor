import Link from "next/link";
import Image from "next/image";
import debounce from "lodash.debounce";
import { LuLoader } from "react-icons/lu";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { useCallback, useEffect, useRef, useState } from "react";

import { getSlug, imageBase } from "@/utils/helpers";
import MagnifyerIcon from "@/assets/icons/MagnifyerIcon";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { useFetchServicesListMutation } from "@/store/services/service";

const AutoComplete = ({ handleClose }: { handleClose?: () => void }) => {
  const dropRef = useRef(null);
  const [query, setQuery] = useState("");
  useOnClickOutside(dropRef, () => setQuery(""));
  const [results, setResults] = useState<DRIP_CARD[] | undefined>([]);
  const [searchServices, { isLoading }] = useFetchServicesListMutation();

  const debouncedFetchData = useCallback(
    debounce(async (value) => {
      if (value) {
        try {
          const data = await searchServices({});
          setResults(data?.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    }, 1000),
    [query]
  );

  useEffect(() => {
    debouncedFetchData(query);
    return () => {
      debouncedFetchData.cancel();
    };
  }, [query, debouncedFetchData]);

  return (
    <div className="w-full relative flex flex-col items-center justify-center">
      <div className="w-full sm:flex hidden items-center justify-center">
        <input
          type="text"
          value={query}
          placeholder="Search"
          onChange={(e) => setQuery(e.target.value)}
          className="pl-3 py-2 w-full bg-transparent placeholder:text-sm placeholder:italic font-medium text-xs"
        />
        <MagnifyerIcon
          fillColor="#AFAFAF"
          className="w-6 h-6 mr-3 text-transparent"
        />
      </div>
      <div className="w-full bg-[#F5F6FA] flex sm:hidden items-center justify-between p-3 text-xs rounded-lg">
        <input
          type="text"
          value={query}
          placeholder="What are you looking for ?"
          onChange={(e) => setQuery(e.target.value)}
          className="placeholder:text-[#B9BED1] text-gray-400 bg-transparent w-full font-medium text-sm"
        />
        <HiMagnifyingGlass className="size-6 text-[#B9BED1]" />
      </div>
      <div
        ref={dropRef}
        className={`md:absolute md:-bottom-[310px] h-[70vh] pb-32 mt-1 md:mt-0 md:h-[300px] z-10 left-0 w-full flex-col divide-y overflow-auto custom-scrollbar rounded-lg bg-white ${
          query === "" ? "hidden" : "flex"
        } ${
          results?.length === 0 || isLoading
            ? "items-center justify-center"
            : "items-start justify-start"
        }`}
      >
        {results?.length === 0 || isLoading ? (
          <LuLoader className="w-10 h-10 animate-spin text-secondary" />
        ) : results?.filter((result) =>
            result.name?.toLowerCase().includes(query.toLowerCase())
          ).length === 0 ? (
          <div className="w-full h-full flex items-center justify-center text-sm font-semibold">
            No Results
          </div>
        ) : (
          results
            ?.filter((result) =>
              result.name?.toLowerCase().includes(query.toLowerCase())
            )
            .map((result, idx) => (
              <Link
                key={idx}
                onClick={() => {
                  handleClose && handleClose();
                  setQuery("");
                }}
                href={`/home/${getSlug(result.category_name)}/${getSlug(result.name || '')}`}
                className="w-full flex items-center justify-start gap-2 p-1.5 cursor-pointer hover:bg-gray-100"
              >
                <Image
                  src={`${imageBase(`${result.thumbnail}`)}`}
                  alt="image-drip"
                  className="size-10 rounded-md object-cover"
                  width={40}
                  height={40}
                />
                <div className="flex flex-col gap-1">
                  <span className="w-full text-left font-semibold text-xs xl:text-sm overflow-hidden truncate">
                    {result.name}
                  </span>
                  <span className="text-xs text-gray-500">AED {result.price_without_vat}</span>
                </div>
              </Link>
            ))
        )}
      </div>
    </div>
  );
};

export default AutoComplete;