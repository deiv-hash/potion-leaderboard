import { TimeFrame } from "@/app/types/trader";

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
    <div className="flex my-2 md:my-0 md:justify-center items-center gap-6">
      {timeFrames.map((timeFrame) => (
        <button
          key={timeFrame}
          onClick={() => onTimeFrameChange(timeFrame)}
          className={`${
            selectedTimeFrame === timeFrame
              ? "btn-tab"
              : "text-gray-400 hover:text-white"
          } capitalize`}
        >
          {timeFrame}
        </button>
      ))}
    </div>
  );
}
