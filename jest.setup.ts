import "@testing-library/jest-dom";
import { jest } from "@jest/globals";
import React from "react";
import type { ImageProps } from "next/image";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
    };
  },
  usePathname() {
    return "";
  },
  useSearchParams() {
    return new URLSearchParams();
  },
}));

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: function MockImage(props: ImageProps) {
    return React.createElement("img", {
      ...props,
      src: typeof props.src === "string" ? props.src : "test-image-url",
      alt: props.alt ?? "",

      priority: undefined,
      loading: undefined,
      quality: undefined,
      onLoadingComplete: undefined,
    });
  },
}));
