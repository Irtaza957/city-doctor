"use client";

import Modal from "../Modal";
import { RootState } from "@/store";
import { useAddReviewMutation } from "@/store/services/booking";

import { Drawer } from "vaul";
import { useState } from "react";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import { LuLoader2 } from "react-icons/lu";
import { FaCircleCheck, FaStar } from "react-icons/fa6";

const ReviewDrawer = ({ id, open, onClose }: DIALOG_PROPS) => {
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(0);
  const [done, setDone] = useState(false);
  const [suggest, setSuggest] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [addReview, { isLoading }] = useAddReviewMutation();
  const { user } = useSelector((state: RootState) => state.global);

  const clearForm = () => {
    setTitle("");
    setRating(0);
    setSuggest("");
    setErrors([]);
  };

  const handleErrors = () => {
    const errorList = [];
    if (!title) errorList.push("title");
    if (!rating) errorList.push("rating");
    if (!suggest) errorList.push("suggest");

    setErrors(errorList);
    return errorList.length === 0;
  };

  const handleReview = async () => {
    const noErrors = handleErrors();

    if (!noErrors) {
      return;
    }

    const urlencoded = new URLSearchParams();
    urlencoded.append("title", title);
    urlencoded.append("booking_id", `${id}`);
    urlencoded.append("review", `${rating}`);
    urlencoded.append("suggestions", suggest);
    urlencoded.append("customer_id", user?.customer_id!);

    try {
      const data = await addReview({
        data: urlencoded,
        token: user?.token,
      });

      if (!data.error) {
        toast.success("Successfully Added Review!");
        clearForm();
        onClose();
        setDone(true);
      } else {
        toast.error("Something Went Wrong! Please Try Again.");
      }
    } catch (error) {
      toast.error("Something Went Wrong! Please Try Again.");
    }
  };

  return (
    <>
      <Modal toggle={done} setToggle={setDone}>
        <div className="w-full flex flex-col items-center justify-center space-y-3 rounded-3xl bg-white p-5">
          <div className="w-full flex items-center justify-center space-x-3">
            <FaCircleCheck className="w-8 h-8 text-secondary" />
            <h1 className="text-center text-xl font-semibold text-black">
              Thank You!
            </h1>
          </div>
          <p className="w-full text-center text-xs text-gray-400">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Harum nemo
            deleniti minus nostrum ullam.
          </p>
        </div>
      </Modal>
      <Drawer.Root
        open={open}
        onClose={() => {
          onClose();
          clearForm();
        }}
      >
        <Drawer.Portal>
          <Drawer.Overlay
            onClick={() => {
              onClose();
              clearForm();
            }}
            className="fixed inset-0 bg-black/40 z-50"
          />
          <Drawer.Content className="bg-white flex flex-col rounded-t-xl fixed bottom-0 left-0 right-0 z-50 focus-visible:outline-none">
            <Drawer.Title className="font-medium flex items-center justify-center py-3 px-5 border-b">
              <p className="w-full text-left text-[20px] font-bold">
                Add Review
              </p>
              <button
                onClick={() => {
                  onClose();
                  clearForm();
                }}
              >
                <IoClose className="w-7 h-7" />
              </button>
            </Drawer.Title>
            <div className="w-full p-5 flex flex-col items-center justify-center gap-5">
              <div className="w-full flex flex-col items-center justify-center gap-2.5">
                <p className="w-full text-center text-xs">
                  Overall Rating<span className="text-red-500">*</span>
                </p>
                <div
                  className={`w-full flex items-center justify-center space-x-2 pb-5 border-b ${
                    errors.includes("rating") && "border-red-500"
                  }`}
                >
                  {[...Array(5)].map((_, idx) => (
                    <FaStar
                      key={idx}
                      onClick={() => setRating(idx + 1)}
                      className={`w-7 h-7 ${
                        rating >= idx + 1 ? "text-accent" : "text-gray-400"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="w-full pt-5 flex flex-col items-center justify-center gap-5">
                <div className="w-full flex flex-col items-center justify-center gap-2">
                  <label htmlFor="title" className="w-full text-left text-xs">
                    Set the title for your Review
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={title}
                    placeholder="Title"
                    onChange={(e) => setTitle(e.target.value)}
                    className={`w-full p-3 bg-gray-100 rounded-lg border border-gray-200 text-xs ${
                      errors.includes("title") && "border-red-500"
                    }`}
                  />
                </div>
                <div className="w-full flex flex-col items-center justify-center gap-2">
                  <label htmlFor="like" className="w-full text-left text-xs">
                    What did you Like or Dislike ?
                    <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={suggest}
                    placeholder="Type Here"
                    onChange={(e) => setSuggest(e.target.value)}
                    className={`w-full p-3 bg-gray-100 rounded-lg border border-gray-200 text-xs ${
                      errors.includes("suggest") && "border-red-500"
                    }`}
                  />
                </div>
              </div>
              <button
                type="button"
                disabled={isLoading}
                onClick={handleReview}
                className="w-full py-3 rounded-lg bg-primary text-white text-[18px] font-semibold mt-10"
              >
                {isLoading ? (
                  <div className="w-full flex items-center justify-center space-x-3">
                    <LuLoader2 className="w-5 h-5 animate-spin" />
                  </div>
                ) : (
                  "Add Review"
                )}
              </button>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </>
  );
};

export default ReviewDrawer;
