import { faker } from '@faker-js/faker';
import { render, screen } from "@testing-library/react";
import moment from "moment";

import BreakSession from "./BreakSession";

const mock = jest.fn();

const renderComponent = (breakSessionInSeconds: number = 0) => {
  return render(
    <BreakSession
      breakSessionInSeconds={breakSessionInSeconds}
      handleIncrementBreakSessionByOneMinute={mock}
      handleDecrementBreakSessionByOneMinute={mock}
    />
  );
};

describe("Break session", () => {
  test("should render the title break session", () => {
    renderComponent();

    const text = screen.getByText(/break session/i);

    expect(text).toBeInTheDocument();
  });

  test("should render the minutes", () => {
    const breakSessionInSeconds = faker.datatype.number({ min: 1, max: 5400 });

    renderComponent(breakSessionInSeconds);

    const breakSessionInMinutes = moment
      .duration(breakSessionInSeconds, "s")
      .asMinutes()
      .toString();

    const text = screen.getByText(breakSessionInMinutes + " minutes");

    expect(text).toBeInTheDocument();
  });

  test("should call handleIncrementBreakSessionByOneMinute", () => {
    renderComponent();

    const button = screen.queryByRole("increment-break");
    button?.click();

    expect(mock).toHaveBeenCalledTimes(1);
  });

  test("should call handleDecrementBreakSessionByOneMinute", () => {
    renderComponent();

    const button = screen.queryByRole("decrement-break");
    button?.click();

    expect(mock).toHaveBeenCalledTimes(1);
  });
});
