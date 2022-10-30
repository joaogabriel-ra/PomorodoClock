import { faker } from "@faker-js/faker";
import { render, screen } from "@testing-library/react";
import moment from "moment";

import WorkSession from "./WorkSession";

const mock = jest.fn();

const renderComponent = (
  workSessionInSeconds: number = 0,
  isStarted: boolean = false
) => {
  return render(
    <WorkSession
      workSessionInSeconds={workSessionInSeconds}
      handleIncrementWorkSessionByOneMinute={mock}
      handleDecrementWorkSessionByOneMinute={mock}
      isStarted={isStarted}
    />
  );
};

describe("Work session", () => {
  test("should render the title work/study session", () => {
    renderComponent();

    const text = screen.getByText(/study session/i);

    expect(text).toBeInTheDocument();
  });

  test("should render the minutes", () => {
    const workSessionInSeconds = faker.datatype.number({ min: 1, max: 5400 });

    renderComponent(workSessionInSeconds);

    const workSessionInMinutes = moment
      .duration(workSessionInSeconds, "s")
      .asMinutes()
      .toString();

    const text = screen.getByText(workSessionInMinutes + " minutes");

    expect(text).toBeInTheDocument();
  });

  test("should call handleIncrementWorkSessionByOneMinute", () => {
    renderComponent();

    const button = screen.queryByRole("increment-work");
    button?.click();

    expect(mock).toHaveBeenCalledTimes(1);
  });

  test("should call handleDecrementWorkSessionByOneMinute", () => {
    renderComponent();

    const button = screen.queryByRole("decrement-work");
    button?.click();

    expect(mock).toHaveBeenCalledTimes(1);
  });
});
