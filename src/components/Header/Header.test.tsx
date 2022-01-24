import { render, screen } from "@testing-library/react";
import Header from "./Header";

test("should render the header", () => {
  render(<Header />);
  
  const text = screen.getByText(/pomodoro clock/i);
  expect(text).toBeInTheDocument();
});
