import { HTMLAttributes } from "react";

export default function Empty({
  children,
  className,
  ...rest
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...rest}
      className={[
        "flex items-center justify-center p-10 text-center border border-gray-300 dark:border-gray-600 border-dashed rounded-md",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {typeof children === "string" ? (
        <p className="text-gray-400 dark:text-gray-500">{children}</p>
      ) : (
        children
      )}
    </div>
  );
}
