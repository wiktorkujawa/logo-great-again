import React from "react";
import {
  render,
  cleanup,
  fireEvent,
  screen,
  getByText,
  act,
  wait,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { createContext, FC, useContext } from "react";
import { observable, action, makeAutoObservable } from "mobx";
import { GameStore, StoreProvider } from "../store";
import { AppScreen } from "./AppScreen";
import { configure } from "mobx";

configure({
  enforceActions: "never",
});

afterEach(cleanup);

const renderWithStore = (store: any) =>
  render(
    <StoreProvider store={store}>
      <AppScreen />
    </StoreProvider>
  );


  it("get name after submit directly with store", async () => {
    const gameStore = new GameStore();
  
    const { getByTestId } = renderWithStore(gameStore);
  
    gameStore.setName("Wiktor");
    gameStore.startGame();
  
    await waitFor(() => {
      expect(getByTestId("submitName")).toHaveTextContent("Good Luck, Wiktor!");
    });
  });


it("get name after submit from events", async () => {
  const gameStore = new GameStore();

  const { getByTestId } = renderWithStore(gameStore);

  const input: any = getByTestId("input");
  await waitFor(() => {
    fireEvent.change(input, { target: { value: "Wiktor" } });
  });

  expect(input.value).toBe("Wiktor");

  const submit = getByTestId("submit");
  fireEvent.submit(submit);

  // gameStore.setName("Wiktor");
  // gameStore.startGame();

  await waitFor(() => {
    expect(getByTestId("submitName")).toHaveTextContent("Good Luck, Wiktor!");
  });
});