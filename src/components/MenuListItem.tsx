import Link from "next/link";
import { ReactNode } from "react";
import { useDispatch } from "react-redux";
import { FaChevronRight } from "react-icons/fa6";
import { logout, setAccountTab } from "@/store/global";

const MenuListItem = ({
  data,
  close,
}: {
  data: {
    id: number;
    name: string;
    link: string;
    icon: ReactNode;
  };
  close: () => void;
}) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    close();
  };

  const handleTab = () => {
    dispatch(setAccountTab(data.name.toLowerCase()));
    close();
  };

  return data.name === "Logout" ? (
    <div
      onClick={handleLogout}
      className="w-full flex items-center justify-center gap-3 py-3 cursor-pointer border-b"
    >
      {data.icon}
      <span className="font-semibold text-xs xl:text-sm w-full text-left">
        {data.name}
      </span>
      <FaChevronRight className="text-primary w-3 h-3" />
    </div>
  ) : (
    <Link
      href={data.link}
      onClick={() => handleTab()}
      className="w-full flex items-center justify-center gap-3 py-3 cursor-pointer border-b"
    >
      {data.icon}
      <span className="w-full text-left font-semibold text-xs xl:text-sm">
        {data.name}
      </span>
      <FaChevronRight className="text-primary w-3 h-3" />
    </Link>
  );
};

export default MenuListItem;
