import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { rest } from "msw";
import { setupServer } from "msw/node";
import geoIpifyMock from "../../../mocks/geoIpify.json";
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

const server = setupServer(
  rest.get(
    "https://geo.ipify.org/api/v2/country?apiKey=at_OL5AP2QeUTdWsdO9rqHUKW91v8NLc&ipAddress=8.8.8.8",
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(geoIpifyMock));
    }
  )
);

// describe("test Ipify Api", () => {
// beforeAll((done) => {
//   server.listen();
//   done();
// });

// afterAll(() => {
//   server.close();
// });

// afterEach(() => {
//   server.resetHandlers();
// });

// test("test", async () => {
//   render(<IpSection />);
//   const elem = await screen.findByTestId("ip");
//   expect(elem.innerText).toBe("8.8.8.8");
// });
// });
