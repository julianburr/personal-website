"use client";

import { useEffect, useState } from "react";

import { NavigationItem } from "@/components/navigation/NavigationItem";
import { SocialNavigationItem } from "@/components/navigation/SocialNavigationItem";
import { items, socials } from "@/components/navigation/items";
import { Spacer } from "@/components/spacer";

export function Navigation() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (active) {
        window.document.body.style.overflow = "hidden";
      } else {
        window.document.body.style.overflow = "auto";
      }
    }
  }, [active]);

  return (
    <>
      <button
        className="sm:hidden fixed z-30 top-[2rem] left-[2rem] h-[2rem] w-[2rem]"
        aria-label="Toggle navigation"
        onClick={() => setActive((state) => !state)}
      >
        <input
          type="checkbox"
          className="peer hidden"
          checked={active}
          readOnly
        />
        <span className="absolute left-0 h-[.2rem] w-[2rem] bg-black origin-left transition-all top-[.4rem] peer-checked:rotate-45 peer-checked:top-[.2rem] peer-checked:left-[.3rem]" />
        <span className="absolute left-0 h-[.2rem] w-[2rem] bg-black origin-left transition-all top-[.9rem] peer-checked:opacity-0" />
        <span className="absolute left-0 h-[.2rem] w-[2rem] bg-black origin-left transition-all bottom-[.4rem] peer-checked:rotate-[-45deg] peer-checked:bottom-[.2rem] peer-checked:left-[.3rem]" />
      </button>

      <input
        type="checkbox"
        className="peer hidden"
        checked={active}
        readOnly
      />
      <nav className="transition-all opacity-0 pointer-events-none flex flex-col flex-shrink-0 justify-center items-center font-heading text-3xl fixed z-20 inset-0 bg-white p-8 peer-checked:opacity-100 peer-checked:pointer-events-auto sm:flex sm:sticky sm:top-[3rem] sm:p-[2rem] sm:pr-0 sm:w-[13rem] sm:opacity-100 sm:pointer-events-auto sm:text-xl sm:justify-start sm:items-start sm:bg-transparent">
        <ul className="flex flex-col items-center sm:items-start">
          {items.map((item) => (
            <NavigationItem
              key={item.id}
              href={item.href}
              onClick={() => setActive(false)}
            >
              {item.label}
            </NavigationItem>
          ))}
        </ul>

        <Spacer h="3rem" />
        <ul className="flex flex-row m-[-.3rem]">
          {socials.map((item) => (
            <SocialNavigationItem
              key={item.id}
              id={item.id}
              href={item.href}
              title={item.title}
              Icon={item.Icon}
            />
          ))}
        </ul>
      </nav>
    </>
  );
}
