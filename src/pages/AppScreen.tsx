import { observer } from 'mobx-react-lite';
import React, { FC } from 'react'
import { ThemeProvider } from 'styled-components';
import { WelcomeScreen } from '../components/WelcomeScreen/WelcomeScreen';
import { useStore } from '../store';



export const AppScreen: FC = observer(() => {
  const store = useStore();
  
  return (
    <ThemeProvider theme={{
        primary: "#111111",
        accent: "#E8E8E8",
        brand: "#3B0078",
        error: "#D8000C",
        light: "#C0C0C0"
    }}>
      {
        store.game.gameScreen ?
        <div>Game Screen</div>
      : 
      <WelcomeScreen/>
    }
      
    
    </ThemeProvider>
  )
})
