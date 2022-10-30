import { faker } from '@faker-js/faker';
import { render, screen } from "@testing-library/react";

import Timer from "./Timer";

const moment = require("moment");
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const momentDurationFormatSetup = require("moment-duration-format");
const mock = jest.fn();

const renderComponent = (timer: number = 0) => {
  return render(
    <Timer
      timer={timer}
      sessionType="work session"
      handleStartStop={mock}
      handleReset={mock}
      isStarted={false}
    />
  );
};

describe("Timer", () => {
  test("should render the title ready", () => {
    renderComponent();

    const text = screen.getByText(/ready/i);
    expect(text).toBeInTheDocument();
  });

  test("should render the text work", () => {
    renderComponent();

    const text = screen.getByText(/work/i);
    expect(text).toBeInTheDocument();
  });

  test("should render the time left", () => {
    const timer = faker.datatype.number({ min: 1, max: 5400 });

    renderComponent(timer);

    const timerFormatted = moment.duration(timer, "s").format("mm:ss");

    const text = screen.getByText("Time left: " + timerFormatted);

    expect(text).toBeInTheDocument();
  });

  test("should call handleStartStop", () => {
    renderComponent();

    const button = screen.queryByRole("handle-start-stop");
    button?.click();

    expect(mock).toHaveBeenCalledTimes(1);
  });

  test("should call handleReset", () => {
    renderComponent();

    const button = screen.queryByRole("handle-reset");
    button?.click();

    expect(mock).toHaveBeenCalledTimes(1);
  });
});
