import React, { useState } from "react";
import "./styles.css";
var gameDict = {
  "Input the angles": [],
  "Guess the Angle": [],
  "Pythagorean Theorem": [],
  "Area of Triangle": []
};
var gameArr = Object.keys(gameDict);

export default function App() {
  var [gameName, setGameName] = useState("");
  var [angleState, setAngleState] = useState({
    firstAngle: "",
    secondAngle: "",
    thirdAngle: ""
  });
  var [legState, setLegState] = useState({
    firstLeg: "",
    secondLeg: "",
    hypotenuse: ""
  });
  var [areaState, setAreaState] = useState({
    firstSide: "",
    secondSide: "",
    thirdSide: "",
    areaValue: ""
  });

  var [threeAnglesState, setthreeAnglesState] = useState({
    firstAngle: 100,
    secondAngle: 50,
    thirdAngle: 30,
    heading: "",
    guessedAnswer: 0
  });
  function onClickHandler(game) {
    var newgameName = game;
    setGameName(newgameName);
    return;
  }
  function angleStateHandler(event) {
    const value = event.target.value;
    setAngleState({
      ...angleState,
      [event.target.name]: value
    });
  }
  function legStateHandler(event) {
    const value = event.target.value;
    setLegState({
      ...legState,
      [event.target.name]: value
    });
  }
  function threeanglesStateHandler(event) {
    const value = event.target.value;
    setthreeAnglesState({
      ...threeAnglesState,
      guessedAnswer: value
    });
  }
  function thirdangleCalculator() {
    const value = threeAnglesState.guessedAnswer;
    if (Number(threeAnglesState.thirdAngle) === Number(value)) {
      setthreeAnglesState({
        ...threeAnglesState,
        heading: "You guessed it correct!"
      });
    } else {
      setthreeAnglesState({
        ...threeAnglesState,
        heading: "Sorry! Your guess is incorrect!"
      });
    }
  }
  function HypoCalculator() {
    var hypoval;
    var firstSide = Number(legState.firstLeg);
    var secondSide = Number(legState.secondLeg);
    if (firstSide <= 0 || secondSide <= 0) {
      hypoval = "Enter the correct side values please.";
    } else {
      var ar = Math.sqrt(firstSide ** 2 + secondSide ** 2);
      hypoval = "The hypotenuse is " + Number(ar.toFixed(3));
    }

    setLegState({
      ...legState,
      hypotenuse: hypoval
    });
  }
  function areaStateHandler(event) {
    const value = event.target.value;
    setAreaState({
      ...areaState,
      [event.target.name]: value
    });
  }
  function AreaCalculator() {
    var areaval;
    var firstSide = Number(areaState.firstSide);
    var secondSide = Number(areaState.secondSide);
    var thirdSide = Number(areaState.thirdSide);
    if (firstSide <= 0 || secondSide <= 0 || thirdSide <= 0) {
      areaval = "Enter the correct side values please.";
    } else if (firstSide + secondSide <= thirdSide) {
      areaval =
        "Sum of two sides can't be smaller than or equal to the third side.";
    } else if (firstSide + thirdSide <= secondSide) {
      areaval =
        "Sum of two sides can't be smaller than or equal to the third side.";
    } else if (secondSide + thirdSide <= firstSide) {
      areaval =
        "Sum of two sides can't be smaller than or equal to the third side.";
    } else {
      var semiper = (firstSide + secondSide + thirdSide) / 2;
      var ar = Math.sqrt(
        semiper *
          (semiper - firstSide) *
          (semiper - secondSide) *
          (semiper - thirdSide)
      );
      areaval = "The area is " + Number(ar.toFixed(3));
    }

    setAreaState({
      ...areaState,
      areaValue: areaval
    });
  }

  return (
    <div className="App">
      <h1>Triangle Quiz</h1>
      {gameArr.map(function (game) {
        return (
          <span key={game} onClick={() => onClickHandler(game)}>
            <button>{game}</button>
          </span>
        );
      })}

      {gameName !== "" && (
        <h2>Welcome! Currently you are playing {gameName}</h2>
      )}
      {gameName === "" && (
        <h2>Welcome! Click the button of them game you want to play!!</h2>
      )}

      {/* Input the angles */}
      {gameName === "Input the angles" && (
        <div>
          <div>
            <input
              name="firstAngle"
              value={angleState.firstAngle}
              onChange={angleStateHandler}
            />
            <input
              name="secondAngle"
              value={angleState.secondAngle}
              onChange={angleStateHandler}
            />
            <input
              name="thirdAngle"
              value={angleState.thirdAngle}
              onChange={angleStateHandler}
            />
          </div>
          {((angleState.firstAngle <= 0 ||
            angleState.secondAngle <= 0 ||
            angleState.thirdAngle <= 0 ||
            angleState.firstAngle >= 180 ||
            angleState.secondAngle >= 180 ||
            angleState.thirdAngle >= 180) && (
            <h2>Please enter valid angles.</h2>
          )) ||
            (Number(angleState.firstAngle) +
              Number(angleState.secondAngle) +
              Number(angleState.thirdAngle) ===
            180 ? (
              <h2>Congratulations! These are valid angles for a triangle.</h2>
            ) : (
              <h2>Sorry! The sum of these angles is not 180.</h2>
            ))}
        </div>
      )}

      {gameName === "Pythagorean Theorem" && (
        <div>
          <h1>Enter the two legs and we will tell you the hypotenuse.</h1>
          <div>
            <input
              name="firstLeg"
              value={legState.firstLeg}
              onChange={legStateHandler}
            />
            <input
              name="secondLeg"
              value={legState.secondLeg}
              onChange={legStateHandler}
            />
          </div>
          <button onClick={HypoCalculator}>Click to find the hypotenuse</button>
          <h1>{legState.hypotenuse}</h1>
        </div>
      )}

      {gameName === "Area of Triangle" && (
        <div>
          <h1>
            Enter the sides of the triangle and we will tell you the area.
          </h1>
          <div>
            <input
              name="firstSide"
              value={areaState.firstSide}
              onChange={areaStateHandler}
            />
            <input
              name="secondSide"
              value={areaState.secondSide}
              onChange={areaStateHandler}
            />
            <input
              name="thirdSide"
              value={areaState.thirdSide}
              onChange={areaStateHandler}
            />
          </div>
          <button onClick={AreaCalculator}>Click to find the area</button>
          <h1>{areaState.areaValue}</h1>
        </div>
      )}

      {gameName === "Guess the Angle" && (
        <div>
          <h2>
            If two angles of a triangle are: {threeAnglesState.firstAngle} and{" "}
            {threeAnglesState.secondAngle}, guess the third angle
          </h2>
          <input onChange={threeanglesStateHandler} />
          <button onClick={thirdangleCalculator}>
            Click here to check your answer
          </button>
          <h1>{threeAnglesState.heading}</h1>
        </div>
      )}
    </div>
  );
}
