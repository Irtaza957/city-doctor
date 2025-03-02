import Map from "../Map";
import Modal from "../Modal";
import {
  useFetchAreasQuery,
  usePostAddressMutation,
} from "@/store/services/address";
import { RootState } from "@/store";
import SelectMenu from "../SelectMenu";
import { removeSpaces } from "@/utils/helpers";

import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import { LuLoader2 } from "react-icons/lu";
import { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa6";

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

const LocationModal = ({
  open,
  setOpen,
  setParentOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setParentOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [area, setArea] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [emirate, setEmirate] = useState<string>("");
  const [errors, setErrors] = useState<string[]>([]);
  const [building, setBuilding] = useState<string>("");
  const [apartment, setApartment] = useState<string>("");
  const [showForm, setShowForm] = useState<boolean>(false);
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

  const handleErrors = () => {
    let errorArray = [];
    if (!area) errorArray.push("area");
    if (!type) errorArray.push("type");
    if (!street) errorArray.push("street");
    if (!emirate) errorArray.push("emirate");
    if (!building) errorArray.push("building");
    if (!apartment) errorArray.push("apartment");

    setErrors(errorArray);
    return errorArray.length === 0;
  };

  const clearForm = () => {
    setType("");
    setArea("");
    setCoords("");
    setStreet("");
    setErrors([]);
    setEmirate("");
    setBuilding("");
    setApartment("");
    setShowForm(false);
    setExtraDirections("");
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

  useEffect(() => {
    setTimeout(() => {
      setShowForm(false);
    }, 500);
  }, [open]);

  const handleSubmit = async () => {
    const noErrors = handleErrors();

    if (!noErrors) {
      return;
    }

    const formData = new URLSearchParams();
    formData.append("area_id", area);
    formData.append("street", street);
    formData.append("is_default", "0");
    formData.append("map_link", "FFF");
    formData.append("address_type", type);
    formData.append("apartment", apartment);
    formData.append("building_no", building);
    formData.append("customer_id", user?.customer_id!);
    formData.append("extra_direction", extraDirections);
    formData.append("lat", `${removeSpaces(coords).split(",")[0]}`);
    formData.append("lng", `${removeSpaces(coords).split(",")[1]}`);

    try {
      const data = await postAddress(formData);
      if (data.error) {
        // @ts-ignore
        toast.error(data?.error?.data?.error);
      } else {
        toast.success("Address Added Successfully!");
        setOpen(false);
        if (setParentOpen) {
          setParentOpen(true);
        }
        clearForm();
      }
    } catch (err) {
      toast.error("Please Try Again!");
    }
  };

  return (
    <Modal
      cn="flex items-center justify-center"
      toggle={open}
      setToggle={setOpen}
      width={`w-[50%] ${
        !showForm
          ? "w-[85%] md:w-[65%] lg:w-[45%] 3xl:w-[25%]"
          : "w-[55%] md:w-[45%] lg:w-[30%] xl:w-[25%] 3xl:w-[17.5%]"
      }`}
    >
      <div className="w-full h-full bg-white rounded-xl overflow-hidden flex flex-col items-center justify-center">
        <div className="w-full flex items-center justify-between px-5 py-2.5 border-b">
          <h1 className="text-left text-lg font-bold">Add Address</h1>
          <IoClose
            onClick={() => {
              setOpen(false);
              clearForm();
            }}
            className="size-5 text-black cursor-pointer"
          />
        </div>
        {!showForm ? (
          <div className="relative w-full">
            <Map coords={coords} setCoords={setCoords} />
            <div className="absolute bottom-0 right-0 w-full flex items-center justify-center p-5 gap-2.5">
              <button
                type="button"
                onClick={() => setShowForm(true)}
                className="col-span-2 w-2/4 place-self-end py-2 rounded-lg bg-primary text-white text-xs font-semibold"
              >
                Confirm
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full grid grid-cols-2 gap-4 px-5 p-5">
            <div className="col-span-2 w-full flex flex-col items-center justify-center z-30">
              <label
                htmlFor="type"
                className="w-full text-left text-gray-400 text-xs px-3 pb-2"
              >
                Address Type<span className="text-red-500">*</span>
              </label>
              <div
                className={`w-full ${
                  errors.includes("type") ? "border border-red-500" : ""
                }`}
              >
                <SelectMenu value={type} options={types} setValue={setType} />
              </div>
            </div>
            <div className="col-span-1 w-full flex flex-col items-center justify-center z-20">
              <label
                htmlFor="firstName"
                className="w-full text-left text-gray-400 text-xs px-3 pb-2"
              >
                Emirate<span className="text-red-500">*</span>
              </label>
              <div
                className={`w-full ${
                  errors.includes("emirate") ? "border border-red-500" : ""
                }`}
              >
                <SelectMenu
                  value={emirate}
                  options={emirates}
                  setValue={setEmirate}
                />
              </div>
            </div>
            {areaList ? (
              <div className="col-span-1 w-full flex flex-col items-center justify-center z-20">
                <label
                  htmlFor="firstName"
                  className="w-full text-left text-gray-400 text-xs px-3 pb-2"
                >
                  Area<span className="text-red-500">*</span>
                </label>
                <div
                  className={`w-full ${
                    errors.includes("area") ? "border border-red-500" : ""
                  }`}
                >
                  <SelectMenu
                    value={area}
                    setValue={setArea}
                    options={areaList!}
                  />
                </div>
              </div>
            ) : (
              <div className="col-span-1 w-full flex flex-col items-center justify-center z-20">
                <label
                  htmlFor="firstName"
                  className="w-full text-left text-gray-400 text-xs px-3 pb-2"
                >
                  Area<span className="text-red-500">*</span>
                </label>
                <div className="w-full flex items-center justify-end p-0.5 pr-3 border-b">
                  <FaChevronDown className="w-4 h-4 text-primary mb-2" />
                </div>
              </div>
            )}
            <div className="col-span-1 w-full flex flex-col items-center justify-center z-10">
              <label
                htmlFor="apartment"
                className="w-full text-left text-gray-400 text-xs px-3 pb-2"
              >
                Apartment<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={apartment}
                onChange={(e) => setApartment(e.target.value)}
                className={`px-3 pb-3 text-sm w-full border-b ${
                  errors.includes("apartment") ? "border border-red-500" : ""
                }`}
              />
            </div>
            <div className="col-span-1 w-full flex flex-col items-center justify-center z-10">
              <label
                htmlFor="building"
                className="w-full text-left text-gray-400 text-xs px-3 pb-2"
              >
                Building<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={building}
                onChange={(e) => setBuilding(e.target.value)}
                className={`px-3 pb-3 text-sm w-full border-b ${
                  errors.includes("building") ? "border border-red-500" : ""
                }`}
              />
            </div>
            <div className="col-span-2 w-full flex flex-col items-center justify-center z-10">
              <label
                htmlFor="street"
                className="w-full text-left text-gray-400 text-xs px-3 pb-2"
              >
                Street<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                className={`px-3 pb-3 text-sm w-full border-b ${
                  errors.includes("street") ? "border border-red-500" : ""
                }`}
              />
            </div>
            <div className="col-span-2 w-full flex flex-col items-center justify-center z-10">
              <label
                htmlFor="extra"
                className="w-full text-left text-gray-400 text-xs px-3 pb-2"
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
              className="col-span-2 w-full flex items-center justify-center space-x-2 cursor-pointer"
            >
              <div className="size-5 rounded-full border border-primary p-[3px]">
                <div
                  className={`w-full h-full ${
                    isDefault ? "bg-transparent" : "bg-primary"
                  } rounded-full`}
                />
              </div>
              <span className="w-full text-left">Set as Default</span>
            </div> */}
            <div className="w-full col-span-2 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="col-span-2 w-1/3 place-self-end py-2 rounded-lg bg-gray-100 text-black text-xs font-semibold"
              >
                Back
              </button>
              <button
                type="button"
                disabled={isLoading}
                onClick={handleSubmit}
                className="col-span-2 w-1/3 place-self-end py-2 rounded-lg bg-primary text-white text-xs font-semibold"
              >
                {isLoading ? (
                  <div className="w-full flex items-center justify-center gap-2">
                    <LuLoader2 className="animate-spin size-4" />
                    <span>Please Wait...</span>
                  </div>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default LocationModal;
