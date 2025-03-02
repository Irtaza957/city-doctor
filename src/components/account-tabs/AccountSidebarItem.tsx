import { RootState } from "@/store";
import { setAccountTab } from "@/store/global";

import { ReactNode } from "react";
import { FaChevronRight } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";

const AccountSidebarItem = ({
  data,
}: {
  data: {
    id: number;
    name: string;
    link: string;
    icon: ReactNode;
  };
}) => {
  const dispatch = useDispatch();
  const { accountTab } = useSelector((state: RootState) => state.global);

  const handleTab = (tab: string) => {
    dispatch(setAccountTab(tab));
  };

  return (
    <div
      onClick={() => handleTab(data.link)}
      className={`w-full ${
        data.name === "Logout" && "hidden"
      } flex items-center justify-center space-x-3 pb-3 cursor-pointer border-b ${
        accountTab === data.link && "text-primary"
      }`}
    >
      {data.icon}
      <span className="w-full text-left text-sm font-semibold">
        {data.name}
      </span>
      <FaChevronRight className="text-primary w-3 h-3" />
    </div>
  );
};

export default AccountSidebarItem;
