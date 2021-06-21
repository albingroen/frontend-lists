import { HTMLAttributes, ReactNode } from "react";

export function Wrapper({
  children,
  className,
  ...rest
}: HTMLAttributes<HTMLUListElement>) {
  return (
    <ul
      {...rest}
      className={[
        "overflow-hidden shadow rounded-md divide-y dark:divide-gray-700",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </ul>
  );
}

export function Item({
  children,
  className,
  ...rest
}: HTMLAttributes<HTMLLIElement>) {
  return (
    <li
      {...rest}
      className={[
        "p-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-[#252f3d]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </li>
  );
}
