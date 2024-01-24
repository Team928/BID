interface IToggleProps {
  isOn: boolean;
  handleToggle: () => void;
}

const Toggle = ({ isOn, handleToggle }: IToggleProps) => {
  return (
    <div
      className={`w-16 h-8 flex items-center rounded-full p-1 cursor-pointer transition-all ${isOn ? 'bg-BID_MAIN' : 'bg-BID_SUB_GRAY'}`}
      onClick={handleToggle}
    >
      <div
        className={`w-6 h-6 bg-white rounded-full shadow-md transition-transform ${isOn ? 'translate-x-8' : 'translate-x-0'}`}
      ></div>
    </div>
  );
};

export default Toggle;
