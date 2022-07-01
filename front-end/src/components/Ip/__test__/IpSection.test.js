import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import IpSection from "../IpSection";

describe("testing ip address section", () => {
  test("ensure the field initial value is  8.8.8.8", () => {
    render(<IpSection />);
    const ipInputElement = screen.getByPlaceholderText("Enter your IP");
    const arrowBtnEelement = screen.getByRole("button");
    expect(ipInputElement.value).toBe("8.8.8.8");
  });

  test("should be able to write an Ip address", () => {
    render(<IpSection />);
    const ipInputElement = screen.getByPlaceholderText("Enter your IP");
    const arrowBtnEelement = screen.getByRole("button");
    userEvent.clear(ipInputElement);
    userEvent.type(ipInputElement, "1.1.255.0");
    expect(ipInputElement.value).toBe("1.1.255.0");
  });

  test("should show error message if Ip is invalid", () => {
    render(<IpSection />);
    const ipInputElement = screen.getByPlaceholderText("Enter your IP");
    const arrowBtnEelement = screen.getByRole("button");
    userEvent.clear(ipInputElement);
    userEvent.type(ipInputElement, "10.0.1.256");
    userEvent.click(arrowBtnEelement);
    expect(screen.queryByText(/Enter a valid IP Address/i)).toBeInTheDocument();
  });
});
