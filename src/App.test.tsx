import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  test("should render the app", () => {
    render(<App />);

    const text = screen.getByText(/pomodoro clock/i);
    expect(text).toBeInTheDocument();
  });

  test("should render the dark mode switch", () => {
    render(<App />);

    const darkModeSwitch = screen.queryByRole("switch");

    expect(darkModeSwitch as HTMLElement).toBeInTheDocument();
  });

  
  test("should have a longer break after 4 pomodoro sessions", () => {
    //TO DO: How?
  });
});
