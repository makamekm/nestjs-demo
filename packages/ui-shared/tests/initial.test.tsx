import React from "react";
import { render } from "@testing-library/react";

test("should render", () => {
  const { getByText } = render(<div>Click</div>);
  const linkElement = getByText(/Click/i);
  expect(linkElement).toBeDefined();
});
