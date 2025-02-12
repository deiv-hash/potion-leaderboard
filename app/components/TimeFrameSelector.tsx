import { TimeFrame } from "@/types/trader";

interface TimeFrameSelectorProps {
  selectedTimeFrame: TimeFrame;
  onTimeFrameChange: (timeFrame: TimeFrame) => void;
}

const timeFrames: TimeFrame[] = ["daily", "weekly", "monthly", "all-time"];

export function TimeFrameSelector({
  selectedTimeFrame,
  onTimeFrameChange,
}: TimeFrameSelectorProps) {
  return (
    <div className="flex justify-center items-center">
      {timeFrames.map((timeFrame) => (
        <button
          key={timeFrame}
          onClick={() => onTimeFrameChange(timeFrame)}
          className={`${
            selectedTimeFrame === timeFrame
              ? "btn-tab"
              : "text-gray-400 hover:text-white"
          }`}
        >
          {timeFrame}
        </button>
      ))}
    </div>
  );
}
