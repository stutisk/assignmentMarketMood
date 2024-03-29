import { useState, useEffect } from "react";
import { MarketMoodInput } from "./MarketMoodInput";
import "../MarketMoodIndicator/MarketMoodIndicator.css";
import { ExtremeModal } from "../Modal/ExtremeModal";

export const MarketMoodIndicator = () => {
  var market_moods = {
    EXTREME_FEAR: {
      name: "Extreme Fear",
      zoneColor: "rgb(207, 107, 95)",
    },
    FEAR: {
      name: "Fear",
      zoneColor: "rgb(213, 131, 76)",
    },
    NEUTRAL: {
      name: "Neutral",
      zoneColor: "rgb(241, 184, 90)",
    },
    GREED: {
      name: "Greed",
      zoneColor: "rgb(105, 188, 134)",
    },
    EXTREME_GREED: {
      name: "Extreme Greed",
      zoneColor: "rgb(130, 230, 147",
    },
  };

  const [score, setScore] = useState("50");
  const [rotation, setRotation] = useState(0);
  const [scoreColor, setScoreColor] = useState("");
  const [title, setTitle] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    console.log(score);
    const adjustedScore = score > 100 ? 100 : score < 1 ? 1 : score;

    console.log(adjustedScore);
    const getMood = (score) => {
      if (score <= 20) return market_moods.EXTREME_FEAR;
      if (score <= 40) return market_moods.FEAR;
      if (score <= 60) return market_moods.NEUTRAL;
      if (score <= 80) return market_moods.GREED;
      return market_moods.EXTREME_GREED;
    };

    const mood = getMood(adjustedScore);
    setScoreColor(mood.zoneColor);
    setTitle(mood.name);

    const newRotation = (adjustedScore / 100) * 180;

    console.log(newRotation);
    setRotation(newRotation);
  }, [score]);

  const adjustedScore = score > 100 ? 100 : score < 1 ? 1 : score;
  console.log(adjustedScore);
  const handleMouseEnterGreed = () => setIsModalVisible("greed");
  const handleMouseLeaveGreed = () => setIsModalVisible(false);
  const handleMouseEnterFear = () => setIsModalVisible("fear");
  const handleMouseLeaveFear = () => setIsModalVisible(false);
  return (
    <section className="flex flex-column gap centre padding-top align-centre">
      <div>
        <div className="MarketMoodIndicator ">
          <div
            className="content font-weight font_size1"
            onMouseEnter={handleMouseEnterFear}
            onMouseLeave={handleMouseLeaveFear}
          ></div>
          <div class="content font-weight font_size1"></div>
          <div class="content font-weight font_size1"></div>
          <div class="content font-weight font_size1"></div>
          <div
            class="content font-weight font_size1"
            onMouseEnter={handleMouseEnterGreed}
            onMouseLeave={handleMouseLeaveGreed}
          ></div>

          <div
            className="needle"
            style={{
              transform: `rotate(${rotation}deg)`,
              // background: scoreColor,
            }}
          ></div>

          <div className="market_mood_Status ">
            <div>Current State </div>
            <div
              style={{ color: scoreColor }}
              className="font_size2 font-weight2"
            >
              {title}
            </div>
          </div>

          <ExtremeModal
            isVisible={isModalVisible === "fear"}
            content="Extreme fear market sentiment offers a good opportunity to initiate fresh longs/buy positions as the market is deeply oversold. <br /> 'Be greedy when everyone is fearful'"
            style={{ top: "100px", left: "-251px", position: "absolute" }}
          />
          <ExtremeModal
            isVisible={isModalVisible === "greed"}
            content="Extreme greed market sentiment suggests investors to be cautious as markets are overbought. Be fearful when everyone is greedy"
            style={{ top: "100px", right: "-251px", position: "absolute" }}
          />
        </div>
      </div>
      <MarketMoodInput score={score.toString()} setScore={setScore} />
    </section>
  );
};
