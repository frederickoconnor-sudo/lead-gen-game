import { Syne } from "next/font/google";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "600", "700", "800"],
});

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return <div className={syne.variable}>{children}</div>;
}
