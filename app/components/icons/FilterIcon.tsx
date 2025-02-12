export const FilterIcon = ({ className = "", ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <line x1="4" y1="21" x2="4" y2="3" />
    <line x1="12" y1="21" x2="12" y2="3" />
    <line x1="20" y1="21" x2="20" y2="3" />
    <circle cx="4" cy="12" r="2" />
    <circle cx="12" cy="8" r="2" />
    <circle cx="20" cy="16" r="2" />
  </svg>
);
