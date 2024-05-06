import { useCallback, useState } from "react";
import "./App.css";

import NumberBlock from "./components/NumberBlock";

function App() {
  let [num, setNum] = useState<number>(1);
  const numberBlock = useCallback(() => {
    return <NumberBlock num={num}></NumberBlock>;
  }, [num]);
  return (
    <div className="App">
      <header className="App-header">
        <p>{num}</p>
        <div>{numberBlock()}</div>
        <button
          onClick={() => {
            setNum((prev) => prev + 1);
          }}>
          increase num
        </button>
        {/* <Stage
          width={window.innerWidth}
          height={window.innerHeight}>
          <Layer>
            <Rect
              width={50}
              height={50}
              fill="red"
            />
            <Circle
              x={200}
              y={200}
              stroke="blue"
              radius={50}
            />
          </Layer>
        </Stage> */}
      </header>
    </div>
  );
}

export default App;
