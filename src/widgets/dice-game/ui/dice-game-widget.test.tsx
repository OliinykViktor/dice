import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import * as gameLogic from "@/src/entities/game/model/game-logic";
import { DiceGameWidget } from "./dice-game-widget";

describe("DiceGameWidget", () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.spyOn(gameLogic, "getRandomResult").mockReturnValue(95);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("plays a round and shows toast plus history row", async () => {
    const user = userEvent.setup();
    render(<DiceGameWidget />);

    await waitFor(() => {
      expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
    });

    await user.click(screen.getByRole("button", { name: "PLAY" }));

    expect(await screen.findByText("You won")).toBeInTheDocument();
    expect(screen.getByText("Over 0")).toBeInTheDocument();
    expect(screen.getAllByText("95").length).toBeGreaterThan(0);
  });
});
