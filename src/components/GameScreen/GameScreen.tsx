import { observer } from "mobx-react-lite";
import React, { FC, useState } from "react";
import { useStore } from "../../store";
import P from "../styled/P";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import { IconText, Text } from "../styled/Text";
import ImageSlot from "../styled/ImageSlot";
import { shuffle } from "./utils/shuffleImages";
import { StartButton } from "../styled/StartButton";
import { Paper } from "@material-ui/core";
import { animated, config, useSpring } from "react-spring";

export const GameScreen = () => {
  return <GamePlane />;
};

let images: any = [
  { order: [0], src: "/assets/zoovu-z.svg" },
  { order: [1, 2], src: "/assets/zoovu-o.svg" },
  { order: [1, 2], src: "/assets/zoovu-o.svg" },
  { order: [3], src: "/assets/zoovu-v.svg" },
  { order: [4], src: "/assets/zoovu-u.svg" },
];

shuffle(images);

const GamePlane: FC = observer(() => {
  const store = useStore();
  const props = useSpring({
    to: { scale: 1 },
    from: { scale: 3 },
    delay: 200,
    config: config.molasses,
  });

  const [movedImage, setMovedImage] = useState({
    src: "",
    order: [],
    index: 0,
  });

  const [initialSlot, setInitialSlot] = useState(false);

  const StartSlots = () => {
   
    return (
      <animated.div style={props} className="d-flex justify-content-between flex-wrap">
        {images.map((item: any, index: number) => {
          return (
   
            <ImageSlot key={index} className="mt-3 " input>
              {item.src ? (
                <img
                  width="84"
                  height="84"
                  src={item.src}
                  alt=""
                  data-testid={index}
                  onDragStart={() => {
                    setInitialSlot(true);
                    if (!store.game.timerStarted) {
                      store.startTimer();
                    }
                    setMovedImage({ ...item, index: index });
                  }}
                  onDragOver={(e) => {
                    e.preventDefault();
                  }}
                />
              ) : null}
            </ImageSlot>
         
          );
        })}
      </animated.div>
    );
  };


  const EndSlots = () => {
    return (
      <div className="d-flex justify-content-between flex-wrap">
            {store.game.lettersAdjusted.map((item: any, index: number) => {
              return (
                <ImageSlot
                  key={index}
                  className="my-3"
                  onDrop={() => DropFunction(item, index)}
                  onDragStart={() => {
                    setInitialSlot(false);
                    setMovedImage({
                      src: item.src,
                      order: item.order,
                      index: index,
                    });
                  }}
                  onDragOver={(e) => {
                    e.preventDefault();
                  }}
                >
                  {item.src ? (
                    <img src={item.src} width="84" height="84" alt="" />
                  ) : null}
                </ImageSlot>
              );
            })}
          </div>
    )
  }

  const DropFunction = (item: any, index: number) => {
    if (movedImage.src) {
      if (initialSlot) {
        if (!item.src) {
          item.src = movedImage.src;
          item.order = movedImage.order;

          images[movedImage.index].src = "";
          if (
            movedImage.order.filter((image) => image === index).length &&
            !item.adjusted
          ) {
            store.changeAdjusted(index);
          } else {
            item.adjusted = false;
            store.wrongSlot();
          }
        }
      } else {
        const buffer = {
          src: item.src,
          order: item.order,
        };

        item.src = movedImage.src;
        item.order = movedImage.order;
        store.game.lettersAdjusted[movedImage.index] = buffer;

        store.wrongAdjusted(index);
        store.wrongAdjusted(movedImage.index);
        store.stopTimer();
      }
      setMovedImage({ ...movedImage, src: "" });
    }
  };

  return (
    <div className="p-5 vh-100">
      {store.game.lettersAdjusted.filter((el) => el.adjusted === false).length !==
      0 ? (
        <>
          <div className="d-flex justify-content-between">
            <P className="fw-bold" data-testid="submitName">Good Luck, {store.game.playerName}!</P>
            <IconText>
              <div className="text-with-icon">
                <AccessTimeIcon className="mx-2" htmlColor="#00D2B4" />
                <Text data-testid="time"> Your score: {store.game.time} seconds</Text>
              </div>
            </IconText>
          </div>
          <div className="d-flex justify-content-between">
            <P color="light" size="small" className="fw-bold">
              Pick up right cards
            </P>
            <P color="light" size="small">
              The faster the better!
            </P>
          </div>

          {StartSlots()}
          <P size="small" color="light">
            ...and drop them here to make the logo great
            <span style={{ color: "#E8E8E8" }}> again!</span>
          </P>

          {
            EndSlots()
          }
        </>
      ) : (
        <WinMessage />
      )}
    </div>
  );
});

const WinMessage: FC = observer(() => {
  const store = useStore();
  const props = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    // reset: true,
    delay: 200,
    config: config.molasses,
  });
  return (
    <animated.div style={props}>
    <Paper elevation={3} className="centered p-5">
      <Text data-testid="win">
        Congratulations {store.game.playerName}, you made our logo great again!
      </Text>
      <IconText>
        <div className="text-with-icon">
          <AccessTimeIcon className="mx-2" htmlColor="#00D2B4" />
          <Text> Your score: {store.game.time} seconds</Text>
        </div>
      </IconText>
      <img src="/assets/logo.svg" alt="" />
      <StartButton
        className="mt-5"
        onClick={() => {
          images = [
            { order: [0], src: "/assets/zoovu-z.svg" },
            { order: [1, 2], src: "/assets/zoovu-o.svg" },
            { order: [1, 2], src: "/assets/zoovu-o.svg" },
            { order: [3], src: "/assets/zoovu-v.svg" },
            { order: [4], src: "/assets/zoovu-u.svg" },
          ];
          shuffle(images);
          store.restartGame();
        }}
      >
        Click to start again!
      </StartButton>
    </Paper>
    </animated.div>
  );
});
