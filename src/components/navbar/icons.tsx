import type { SVGProps } from "react";

export function AccountIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      {...props}
    >
      <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M4 19.5C4 15.9 6.9 13 10.5 13H13.5C17.1 13 20 15.9 20 19.5C20 20.9 18.9 22 17.5 22H6.5C5.1 22 4 20.9 4 19.5Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    </svg>
  );
}
