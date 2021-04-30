import { makeAutoObservable } from "mobx";
import { createContext, FC, useContext } from "react";

interface IGame {
  time: number;
  lettersAdjusted: Array<any>;
  timerStarted: any;
  playerName: string;
  gameScreen: boolean;
}

class GameStore {
  game: IGame = {
    gameScreen: false,
    playerName:'',
    timerStarted: false,
    time: 0,
    lettersAdjusted: [
      {adjusted: false, src:'', order:[]},
      {adjusted: false, src:'', order:[]},
      {adjusted: false, src:'', order:[]},
      {adjusted: false, src:'', order:[]},
      {adjusted: false, src:'', order:[]} 
    ]
  };

  constructor() {
    makeAutoObservable(this);
  }

  changeAdjusted(index:number) {
    this.game.lettersAdjusted[index].adjusted = true;
    if(this.game.lettersAdjusted.filter(el => el.adjusted===false).length===0){
      clearInterval(this.game.timerStarted);
    }
  }
  wrongAdjusted(index:number) {
    this.game.lettersAdjusted[index].order.filter((item:number) => item===index).length ?
      this.game.lettersAdjusted[index].adjusted = true:
    this.game.lettersAdjusted[index].adjusted = false;
  }

  startGame(){
    this.game.gameScreen = true;
  }

  setName(name:string){
    this.game.playerName = name;
  }

  startTimer() {
    this.game.timerStarted = setInterval(() => (this.game.time += 1), 1000);
  }

  stopTimer() {
    if(this.game.lettersAdjusted.filter(el => el.adjusted===false).length===0){
      clearInterval(this.game.timerStarted);
    }
  }

  restartGame() {
    this.game = {
      ...this.game,
      // gameScreen: false,
      // playerName:'',
      timerStarted: false,
      time: 0,
      lettersAdjusted: [
        {adjusted: false, src:'', order:[]},
        {adjusted: false, src:'', order:[]},
        {adjusted: false, src:'', order:[]},
        {adjusted: false, src:'', order:[]},
        {adjusted: false, src:'', order:[]} 
      ]
    };
  }


  wrongSlot() {
    this.game.time+=10;
  }
}

const StoreContext = createContext<GameStore>(new GameStore());

const StoreProvider: FC<{ store: GameStore }> = ({ store, children }) => {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

const useStore = () => useContext(StoreContext);

export { GameStore, StoreProvider, useStore };
