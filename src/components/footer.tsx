import { Github, Globe } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full flex items-center justify-between px-2 sm:px-3 md:px-4 lg:px-32 py-4 border-t">
      <div className="w-full flex flex-col items-center justify-between gap-3">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Edgar Benavides. Todos los derechos
          reservados.
        </p>
        <div className="flex gap-5">
          <a
            href="https://github.com/Edd27"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1"
          >
            <Github />
            GitHub
          </a>
          <a
            href="https://www.edgarbenavides.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1"
          >
            <Globe />
            Website
          </a>
        </div>
      </div>
    </footer>
  );
}
