"use client";

import {
  useFetchAreasQuery,
  usePostAddressMutation,
} from "@/store/services/address";
import { RootState } from "@/store";
import SelectMenu from "../SelectMenu";

import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import { LuLoader2 } from "react-icons/lu";
import { useEffect, useState } from "react";
import Map from "../Map";
import { cn, removeSpaces } from "@/utils/helpers";
import { Sheet, SheetContent, SheetHeader } from "../ui/sheet";

const types = [
  {
    id: 1,
    name: "Home",
  },
  {
    id: 2,
    name: "Work",
  },
];
const emirates = [
  {
    id: 1,
    name: "Dubai",
  },
  {
    id: 2,
    name: "Abu Dhabi",
  },
  {
    id: 3,
    name: "Sharjah",
  },
  {
    id: 4,
    name: "Ajman",
  },
  {
    id: 5,
    name: "Umm Al Quwain",
  },
  {
    id: 6,
    name: "Ras Al Khaimah",
  },
  {
    id: 7,
    name: "Fujairah",
  },
  {
    id: 8,
    name: "Al Ain",
  },
];

const AddAddressDrawer = ({ open, onClose }: DIALOG_PROPS) => {
  const [area, setArea] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [showMap, setShowMap] = useState(true);
  const [street, setStreet] = useState<string>("");
  const [emirate, setEmirate] = useState<string>("");
  const [errors, setErrors] = useState<string[]>([]);
  const [building, setBuilding] = useState<string>("");
  const [apartment, setApartment] = useState<string>("");
  // const [isDefault, setIsDefault] = useState<boolean>(false);
  const [postAddress, { isLoading }] = usePostAddressMutation();
  const { user } = useSelector((state: RootState) => state.global);
  const [extraDirections, setExtraDirections] = useState<string>("");
  const [areaList, setAreaList] = useState<SELECT_MENU_ITEM_PROPS[]>();
  const [coords, setCoords] = useState<string>("25.0989095, 55.1747754");

  const { data: areaData } = useFetchAreasQuery(
    emirates.filter((e) => e.name === emirate)[0]?.id,
    {
      skip: !emirate,
    }
  );

  const clearForm = () => {
    setArea("");
    setType("");
    setStreet("");
    setErrors([]);
    setEmirate("");
    setBuilding("");
    setApartment("");
    setShowMap(true);
    // setIsDefault(false);
    setExtraDirections("");
  }

  const handleErrors = () => {
    const errorList = [];
    if (!area) errorList.push("area");
    if (!type) errorList.push("type");
    if (!street) errorList.push("street");
    if (!emirate) errorList.push("emirate");
    if (!building) errorList.push("building");
    if (!apartment) errorList.push("apartment");

    setErrors(errorList);
    return errorList.length === 0;
  }

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const handleSubmit = async () => {
    const noErrors = handleErrors();

    if (!noErrors) {
      return;
    }

    const formData = new URLSearchParams();
    formData.append("customer_id", user?.customer_id!);
    formData.append("address_type", type);
    formData.append("area_id", area);
    formData.append("building_no", building);
    formData.append("apartment", apartment);
    formData.append("street", street);
    formData.append("map_link", "FFF");
    formData.append("lat", `${removeSpaces(coords).split(",")[0]}`);
    formData.append("lng", `${removeSpaces(coords).split(",")[1]}`);
    formData.append("extra_direction", extraDirections);
    formData.append("is_default", "0");

    try {
      const data = await postAddress(formData);
      if (data.error) {
        // @ts-ignore
        toast.error(data?.error?.data?.error);
      } else {
        toast.success("Address Added Successfully!");
        clearForm();
        onClose();
      }
    } catch (err) {
      toast.error("Please Try Again!");
    }
  };

  useEffect(() => {
    if (areaData) {
      const list = areaData.map((area) => {
        return {
          id: parseInt(area.area_id),
          name: area.area,
        };
      });

      setAreaList(list!);
    }
  }, [emirate, areaData]);

  return (
    <Sheet open={open} onOpenChange={(state) => {
      if (!state) onClose();
    }}>
      <SheetContent className="z-50 bg-white">
        <SheetHeader>
          <div className={cn(
            "w-full font-medium flex items-center justify-center  border-b py-5 px-5",
            !showMap && 'mb-5'
            )}>
            <p className="w-full text-left text-[20px] font-bold">
              Add Address
            </p>
            <button
              onClick={() => {
                handleClose();
                clearForm();
              }}
            >
              <IoClose className="w-7 h-7" />
            </button>
          </div>
        </SheetHeader>
        <div
          className={`w-full flex flex-col items-center justify-center gap-5 divide-y ${!showMap && "p-5"
            }`}
        >
          {showMap ? (
            <div className="relative w-full">
              <Map coords={coords} setCoords={setCoords} />
              <div className="absolute bottom-0 right-0 w-full flex items-center justify-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowMap(false)}
                  className="w-2/3 place-self-end py-2 rounded-lg bg-primary text-white mb-5"
                >
                  Confirm
                </button>
              </div>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className="w-full grid grid-cols-2 gap-4"
            >
              <div className="col-span-1 w-full flex flex-col items-center justify-center z-30">
                <label
                  htmlFor="type"
                  className="w-full text-left text-gray-400 text-xs px-3 pb-1.5"
                >
                  Address Type<span className="text-red-500">*</span>
                </label>
                <SelectMenu
                  value={type}
                  options={types}
                  setValue={setType}
                  cn={`px-3 pb-3 w-full border-b flex items-center justify-center ${errors.includes("type") && "border border-red-500"
                    }`}
                />
              </div>
              <div className="col-span-1 w-full flex flex-col items-center justify-center z-30">
                <label
                  htmlFor="firstName"
                  className="w-full text-left text-gray-400 text-xs px-3 pb-1.5"
                >
                  Emirate<span className="text-red-500">*</span>
                </label>
                <SelectMenu
                  value={emirate}
                  options={emirates}
                  setValue={setEmirate}
                  cn={`px-3 pb-3 w-full border-b flex items-center justify-center ${errors.includes("emirate") && "border border-red-500"
                    }`}
                />
              </div>
              {areaList && (
                <div className="col-span-1 w-full flex flex-col items-center justify-center z-20">
                  <label
                    htmlFor="firstName"
                    className="w-full text-left text-gray-400 text-xs px-3 pb-1.5"
                  >
                    Area<span className="text-red-500">*</span>
                  </label>
                  <SelectMenu
                    value={area}
                    options={areaList!}
                    setValue={setArea}
                    cn={`px-3 pb-3 w-full border-b flex items-center justify-center ${errors.includes("area") && "border border-red-500"
                      }`}
                  />
                </div>
              )}
              <div className="col-span-1 w-full flex flex-col items-center justify-center z-10">
                <label
                  htmlFor="apartment"
                  className="w-full text-left text-gray-400 text-xs px-3 pb-1.5"
                >
                  Apartment<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={apartment}
                  onChange={(e) => setApartment(e.target.value)}
                  className={`px-3 pb-3 text-sm w-full border-b ${errors.includes("apartment") && "border border-red-500"
                    }`}
                />
              </div>
              <div className="col-span-1 w-full flex flex-col items-center justify-center z-10">
                <label
                  htmlFor="building"
                  className="w-full text-left text-gray-400 text-xs px-3 pb-1.5"
                >
                  Building<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={building}
                  onChange={(e) => setBuilding(e.target.value)}
                  className={`px-3 pb-3 text-sm w-full border-b ${errors.includes("building") && "border border-red-500"
                    }`}
                />
              </div>
              <div className="col-span-2 w-full flex flex-col items-center justify-center z-10">
                <label
                  htmlFor="street"
                  className="w-full text-left text-gray-400 text-xs px-3 pb-1.5"
                >
                  Street<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  className={`px-3 pb-3 text-sm w-full border-b ${errors.includes("street") && "border border-red-500"
                    }`}
                />
              </div>
              <div className="col-span-2 w-full flex flex-col items-center justify-center z-10">
                <label
                  htmlFor="extra"
                  className="w-full text-left text-gray-400 text-xs px-3 pb-1.5"
                >
                  Extra Directions
                </label>
                <textarea
                  rows={3}
                  value={extraDirections}
                  onChange={(e) => setExtraDirections(e.target.value)}
                  className="px-3 pb-3 text-sm w-full border-b"
                />
              </div>
              {/* <div
                onClick={() => setIsDefault((prev) => (prev = !prev))}
                className="col-span-2 w-full flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <div className="w-6 h-6 rounded-full border border-primary p-1">
                  <div
                    className={`w-full h-full ${
                      isDefault ? "bg-transparent" : "bg-primary"
                    } rounded-full`}
                  />
                </div>
                <span className="w-full text-left">Set as Default</span>
              </div> */}
              <div className="col-span-2 w-full grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setShowMap(true)}
                  className="col-span-1 w-full py-2 rounded-lg bg-primary text-white"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="col-span-1 w-full py-2 rounded-lg bg-primary text-white"
                >
                  {isLoading ? (
                    <div className="w-full flex items-center justify-center space-x-3">
                      <LuLoader2 className="w-5 h-5 animate-spin" />
                      <span>Please Wait...</span>
                    </div>
                  ) : (
                    "Confirm"
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AddAddressDrawer;
