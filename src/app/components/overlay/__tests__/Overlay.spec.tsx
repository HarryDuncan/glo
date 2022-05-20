import React from "react";
import { screen } from "@testing-library/react";
import { Overlay } from "../Overlay";
import { WithTheme } from "test-utils/WithTheme";
import { renderWithTheme } from "test-utils/renderWithTheme";
import { mockImplementation } from "test-utils/mockImplementation";
import { OverlayContainer, OverlayPane } from "../Overlay.styles";

jest.mock("../Overlay.styles", () => ({
  OverlayContainer: jest.fn(),
  OverlayPane: jest.fn(),
}));

describe("<Overlay>", () => {
  beforeEach(() => {
    mockImplementation(OverlayContainer, ({ children }) => <>{children}</>);
    mockImplementation(OverlayPane, () => <>OverlayPane</>);
  });
  test("Renders with Overlay", () => {
    renderWithTheme(
      <OverlayWithTheme>
        <span>1234</span>
      </OverlayWithTheme>
    );
    expect(screen.getByText("1234")).toBeTruthy();
  });
  test("Renders with overlay sub components", () => {
    renderWithTheme(
      <OverlayWithTheme>
        <span>1234</span>
      </OverlayWithTheme>
    );
    expect(OverlayContainer).toBeCalled();
    expect(OverlayPane).toBeCalled();
  });
});

const OverlayWithTheme = ({ children }: { children: React.ReactNode }) => {
  return (
    <WithTheme>
      <Overlay>{children}</Overlay>
    </WithTheme>
  );
};