import { useState, useEffect, useRef } from "react";
import Goal from "./Goal";
import "./App.css";
import techIcons from "./assets/techIcons.png";

function App() {
  const boxRef = useRef(null);
  const dropdownRef = useRef(null);
  const iconOptions = useRef(null);
  const containerRef = useRef(null);

  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  function showBox(x, y) {
    if (boxRef.current) {
      const boxWidth = boxRef.current.offsetWidth;
      const boxHeight = boxRef.current.offsetHeight;
      boxRef.current.style.visibility = "visible";
      dropdownRef.current.style.visibility = "visible";
      boxRef.current.style.left = `${x - boxWidth / 2}px`;
      boxRef.current.style.top = `${y - boxHeight / 2}px`;
      dropdownRef.current.style.left = `${x - boxWidth / 2 + 120}px`;
      dropdownRef.current.style.top = `${y - boxHeight / 2}px`;
    }
  }

  function handleSubmitGuess(e) {
    e.preventDefault();
    const selectedOption = iconOptions.current.elements[0].value;
    console.log(`You selected: ${selectedOption}`);
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        if (boxRef.current) {
          boxRef.current.style.visibility = "hidden";
          dropdownRef.current.style.visibility = "hidden";
        }
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div
        ref={containerRef}
        onPointerMove={(e) => {
          setPosition({
            x: e.clientX,
            y: e.clientY,
          });
        }}
        onClick={() => showBox(position.x, position.y)}
      >
        <div>
          <div
            ref={boxRef}
            className="box"
            style={{
              border: "4px solid black",
              position: "absolute",
              visibility: "hidden",
              width: "100px",
              height: "100px",
            }}
          ></div>
          <div
            ref={dropdownRef}
            style={{
              position: "absolute",
              visibility: "hidden",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <form ref={iconOptions} method="get">
              <select>
                <option value="ArgoCD">ArgoCD</option>
                <option value="VSCode">VSCode</option>
                <option value="OpenFeign">OpenFeign</option>
                <option value="ReadyAPI">ReadyAPI</option>
              </select>
              <button style={{ color: "green" }} onClick={handleSubmitGuess}>
                ✔
              </button>
            </form>
          </div>
        </div>

        <h1>find the icons!</h1>
        <div style={{ display: "inline-block" }}>
          <img
            src={techIcons}
            alt=""
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      </div>
      <Goal />
    </>
  );
}

export default App;
