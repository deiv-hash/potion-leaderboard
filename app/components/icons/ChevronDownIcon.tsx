interface ChevronDownIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  isSelected?: boolean;
}

export const ChevronDownIcon = ({
  className = "",
  isSelected = false,
  ...props
}: ChevronDownIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={isSelected ? "#CCAD59" : "#AA00FF"}
    className={className}
    {...props}
  >
    <path d="M4 8L12 16L20 8H4Z" />
  </svg>
);
