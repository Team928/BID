interface IToggleProps {
  isOn: boolean;
  handleToggle: () => void;
}

const Toggle = ({ isOn, handleToggle }: IToggleProps) => {
  return (
    <div
      className={`w-[52px] h-[28px] flex items-center rounded-full p-1 cursor-pointer transition-all ${isOn ? 'bg-BID_MAIN' : 'bg-BID_SUB_GRAY'}`}
      onClick={handleToggle}
    >
      <div
        className={`w-[22px] h-[22px] bg-white rounded-full shadow-md transition-transform ${isOn ? 'translate-x-[22px]' : 'translate-x-0'}`}
      ></div>
    </div>
  );
};

export default Toggle;
