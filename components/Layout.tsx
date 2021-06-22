import { ReactNode } from "react";

interface ILayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: ILayoutProps) {
  return <main className="px-4 py-12 mx-auto max-w-screen-sm">{children}</main>;
}
