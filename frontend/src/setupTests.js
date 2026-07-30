import { vi } from "vitest";
import "@testing-library/jest-dom";

window.confirm = vi.fn(() => true);
window.prompt = vi.fn(() => "1");