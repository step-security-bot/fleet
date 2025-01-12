import React from "react";
import { getByTestId, render, screen, within } from "@testing-library/react";
import { DEFAULT_EMPTY_CELL_VALUE } from "utilities/constants";

import PlatformCell from "./PlatformCell";

const PLATFORMS = ["windows", "darwin", "linux"];

describe("Platform cell", () => {
  it("renders platform icons in correct order", () => {
    render(<PlatformCell value={PLATFORMS} />);

    const icons = screen.queryAllByTestId("icon");
    const appleIcon = screen.queryByTestId("apple-icon");
    const linuxIcon = screen.queryByTestId("linux-icon");
    const windowsIcon = screen.queryByTestId("windows-icon");

    expect(icons).toHaveLength(3);
    expect(icons[0].firstChild).toBe(appleIcon);
    expect(icons[1].firstChild).toBe(linuxIcon);
    expect(icons[2].firstChild).toBe(windowsIcon);
  });
  it("renders empty state", () => {
    render(<PlatformCell value={[]} />);

    const icons = screen.queryAllByTestId("icon");
    const emptyText = screen.queryByText(DEFAULT_EMPTY_CELL_VALUE);

    expect(icons).toHaveLength(0);
    expect(emptyText).toBeInTheDocument();
  });
});
