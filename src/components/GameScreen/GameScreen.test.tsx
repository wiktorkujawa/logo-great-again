import React from "react";
import { render, cleanup, fireEvent, screen, getByText } from '@testing-library/react'
import "@testing-library/jest-dom/extend-expect";
import { createContext, FC, useContext } from "react";
import { observable, action, makeAutoObservable  } from "mobx";
import { GameStore, StoreProvider } from "../../store";
import { GameScreen } from "./GameScreen";
import { configure } from "mobx"

configure({
    enforceActions: "never",
})

afterEach(cleanup);


const renderWithStore = (store:any) =>
  render(
    <StoreProvider store={store}>
      <GameScreen />
    </StoreProvider>
  );

it("renders initial time", () => {
  const gameStore = new GameStore();

  const { getByTestId } = renderWithStore(gameStore);

  expect(getByTestId("time")).toHaveTextContent("Your score: 0 seconds");
});

it("renders 3 seconds after start", () => {
  jest.useFakeTimers();
  const gameStore = new GameStore();
  gameStore.startTimer();

  const { getByTestId } = renderWithStore(gameStore);
 
  jest.advanceTimersByTime(3000);
  expect(getByTestId("time")).toHaveTextContent("Your score: 3 seconds");
});


it("renders 5 seconds after start from drag event", () => {
  jest.useFakeTimers();
  const gameStore = new GameStore();


  const { getByTestId } = renderWithStore(gameStore);
  const drag = getByTestId('1');
  fireEvent.dragStart(drag);
 
  jest.advanceTimersByTime(5000);
  expect(getByTestId("time")).toHaveTextContent("Your score: 5 seconds");
});

it("renders after finishing the game", () => {
  const gameStore = new GameStore();

  for(let i=0;i<5;i++){
    gameStore.changeAdjusted(i);
  }


  const { getByTestId } = renderWithStore(gameStore);

  expect(getByTestId("win")).toHaveTextContent("Congratulations");
});