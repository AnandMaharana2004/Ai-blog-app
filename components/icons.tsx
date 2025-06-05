import {
  Moon,
  Sun,
  Laptop,
  Menu as MenuIcon,
} from "lucide-react";

export const Icons = {
  sun: Sun,
  moon: Moon,
  laptop: Laptop,
  menu: MenuIcon,
  logo: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v12" />
      <path d="M8 12h8" />
    </svg>
  ),
};