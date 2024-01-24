const ParrarelModalButtons = ({
  leftText,
  rightText,
  handleLeft,
  handleRight,
}: {
  leftText: string;
  rightText: string;
  handleLeft: () => void;
  handleRight: () => void;
}) => {
  return (
    <div className="flex h-10 px-8 mb-4">
      <button
        type="button"
        className="w-1/2 h-full mx-1 rounded-3xl shadow-sm text-white text-lg bg-BID_SUB_GRAY"
        onClick={handleLeft}
      >
        {leftText}
      </button>

      <button
        type="button"
        className="w-1/2 h-full mx-1 rounded-3xl shadow-sm text-white text-lg bg-BID_MAIN hover:bg-BID_HOVER_MAIN "
        onClick={handleRight}
      >
        {rightText}
      </button>
    </div>
  );
};

export default ParrarelModalButtons;
