import { SlotProps } from "input-otp";

function FakeCaret() {
  return (
    <div className="absolute pointer-events-none inset-0 flex items-center justify-center animate-caret-blink">
      <div className="w-px h-8 bg-black" />
    </div>
  );
}

const Slot = (props: SlotProps) => {
  return (
    <div
      className={`${
        props.isActive && "outline-1 outline-accent-foreground"
      } relative w-full h-14 text-[2rem] flex items-center justify-center transition-all duration-150 mr-2 xl:mr-3 last:mr-0 rounded-xl group-hover:border-accent-foreground/20 border border-[#DEDEDE] group-focus-within:border-accent-foreground/20 outline outline-0 outline-accent-foreground/20 bg-[#F5F6FA]`}
    >
      {props.char !== null && <div>{props.char}</div>}
      {props.hasFakeCaret && <FakeCaret />}
    </div>
  );
};

export default Slot;
