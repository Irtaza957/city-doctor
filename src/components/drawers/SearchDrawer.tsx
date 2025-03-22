import { Drawer } from "vaul";
import { IoClose } from "react-icons/io5";
import AutoComplete from "../Autocomplete";

const SearchDrawer = ({ open, onClose }: DIALOG_PROPS) => {
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <Drawer.Root open={open} onClose={onClose}>
      <Drawer.Portal>
        <Drawer.Overlay
          onClick={() => handleClose()}
          className="fixed inset-0 bg-black/40 z-50"
        />
        <Drawer.Content className="bg-white h-[90vh] flex flex-col rounded-t-xl fixed bottom-0 left-0 right-0 z-50 focus-visible:outline-none">
          <Drawer.Title className="font-medium flex items-center justify-center p-3 border-b">
            <p className="w-full text-left text-xl font-bold">
              Search
            </p>
            <button onClick={() => handleClose()}>
              <IoClose className="w-7 h-7" />
            </button>
          </Drawer.Title>
          <div className="w-full p-3">
            <AutoComplete handleClose={handleClose} />
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default SearchDrawer;
