import { CircleDollarSign } from "lucide-react";
import { ModeToggle } from "./mode-toggle";

export function Header() {
  return (
    <header className="w-full flex items-center justify-between px-2 sm:px-3 md:px-4 lg:px-32 py-4 border-b shadow">
      <h2 className="text-2xl font-bold uppercase flex items-center gap-2">
        <CircleDollarSign /> Mi aguinaldo
      </h2>
      <ModeToggle />
    </header>
  );
}
