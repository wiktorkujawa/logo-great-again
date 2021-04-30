import React from "react";
import { render, cleanup } from '@testing-library/react'
import "@testing-library/jest-dom/extend-expect";
import { GameStore, StoreProvider } from "../../store";
import { WelcomeScreen } from "./WelcomeScreen";
import { configure } from "mobx"

configure({
    enforceActions: "never",
})

afterEach(cleanup);


const renderWithStore = (store:any) =>
  render(
    <StoreProvider store={store}>
      <WelcomeScreen />
    </StoreProvider>
  );

it("renders initial time", () => {
  const gameStore = new GameStore();

  const { getByTestId } = renderWithStore(gameStore);

  expect(getByTestId("welcome")).toHaveTextContent("Hello friend, tell me your name...");
});