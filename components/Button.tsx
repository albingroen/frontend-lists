import { HTMLAttributes } from "react";

export default function Button({
  children,
  className,
  ...rest
}: HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...rest}
      className={[
        "px-4 py-2 text-white bg-indigo-600 shadow rounded-md transition hover:bg-indigo-500 focus:bg-indigo-500 active:bg-indigo-700 active:text-indigo-400",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </button>
  );
}
