import Modal from "../Modal";
import { RootState } from "@/store";
import { useAddReviewMutation } from "@/store/services/booking";

import { useState } from "react";
import toast from "react-hot-toast";
import { FaStar } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import { LuLoader2 } from "react-icons/lu";

interface ReviewModalProps {
  id: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ReviewModal = ({ id, open, setOpen }: ReviewModalProps) => {
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(0);
  const [suggest, setSuggest] = useState("");
  const [addReview, { isLoading }] = useAddReviewMutation();
  const { user } = useSelector((state: RootState) => state.global);

  const clearForm = () => {
    setTitle("");
    setRating(0);
    setSuggest("");
  };

  const handleReview = async () => {
    if (!title && !rating && !suggest) {
      toast.error("Please Fill All Fields!");
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
        setOpen(false);
        clearForm();
      } else {
        toast.error("Something Went Wrong! Please Try Again.");
      }
    } catch (error) {
      toast.error("Something Went Wrong! Please Try Again.");
    }
  };

  return (
    <Modal
      cn="flex items-center justify-center"
      toggle={open}
      setToggle={setOpen}
      width="w-[55%] md:w-[45%] lg:w-[35%] xl:w-[25%] 3xl:w-[20%]"
    >
      <div className="w-full h-full bg-white rounded-xl flex flex-col items-center justify-center space-y-3">
        <div className="relative w-full flex items-center justify-between border-b p-3">
          <h1 className="text-left text-lg font-semibold">Add Review</h1>
          <IoClose
            onClick={() => {
              setOpen(false);
              clearForm();
            }}
            className="size-5 absolute top-2 right-2 text-black cursor-pointer"
          />
        </div>
        <div className="w-full p-3 flex flex-col items-center justify-center">
          <p className="w-full text-center">
            Overall Rating<span className="text-red-500">*</span>
          </p>
          <div className="w-full flex items-center justify-center space-x-2 pb-3">
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
          <div className="w-full p-5 flex flex-col items-center justify-center gap-7">
            <div className="w-full flex flex-col items-center justify-center space-y-1">
              <label htmlFor="title" className="w-full text-left text-xs">
                Set the title for your Review
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 bg-gray-100 rounded-lg border border-gray-200 text-xs"
              />
            </div>
            <div className="w-full flex flex-col items-center justify-center space-y-1">
              <label htmlFor="like" className="w-full text-left text-xs">
                What did you Like or Dislike ?
                <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={5}
                value={suggest}
                placeholder="Type Here"
                onChange={(e) => setSuggest(e.target.value)}
                className="w-full p-3 bg-gray-100 rounded-lg border border-gray-200 text-xs"
              />
            </div>
          </div>
          <button
            onClick={handleReview}
            disabled={isLoading}
            type="button"
            className="w-2/3 py-2 rounded-xl bg-primary text-white text-sm font-semibold my-4"
          >
            {isLoading ? (
              <div className="w-full flex items-center justify-center space-x-3">
                <LuLoader2 className="w-5 h-5 animate-spin" />
                <span>Please Wait...</span>
              </div>
            ) : (
              "Add Review"
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ReviewModal;
