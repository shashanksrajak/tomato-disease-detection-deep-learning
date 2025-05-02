import React from "react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="mt-10 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
        <div className="flex flex-col items-center">
          <h3 className="font-semibold text-green-700 mb-2">Project</h3>
          <a
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-green-700 hover:underline hover:underline-offset-4"
            href="https://shashankrajak.in/projects/tomato-disease-detection"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/window.svg"
              alt="Window icon"
              width={16}
              height={16}
            />
            Project Description
          </a>
          <a
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-green-700 hover:underline hover:underline-offset-4 mt-1"
            href="https://shashankrajak.in/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/globe.svg"
              alt="Globe icon"
              width={16}
              height={16}
            />
            Main Website
          </a>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4 text-center">
        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()} Tomato Leaf Disease Detection Tool |
          Shashank Rajak
        </p>
      </div>
    </footer>
  );
}
