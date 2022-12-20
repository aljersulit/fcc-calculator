import { useState } from "react";

function App() {
  const [operand, setOperand] = useState({
    arr: ["0"],
  });

  function clear() {
    setOperand({
      arr: ["0"],
    });
  }

  function inputDigit(event) {
    const { innerText: value } = event.target;

    setOperand((prevOperand) => {
      let arr = [...prevOperand.arr];
      const lastIndex = arr.length - 1;

      if (prevOperand.overwrite) {
        return {
          arr: [value],
          overwrite: false,
        };
      }

      if (isNaN(parseFloat(arr[lastIndex]))) {
        const decimalOrValue = value === "." ? "0." : value;
        arr.push(decimalOrValue);
        return {
          arr,
        };
      }
      if (value === ".") {
        arr[lastIndex] = arr[lastIndex].includes(".")
          ? arr[lastIndex]
          : arr[lastIndex] + value;
        return {
          arr,
        };
      }
      arr[lastIndex] =
        arr[lastIndex] === "0" && value !== "."
          ? value
          : arr[lastIndex] + value;
      return {
        arr,
      };
    });
  }

  function inputOperator(event) {
    const { innerText: value } = event.target;
    setOperand((prevOperand) => {
      let arr = [...prevOperand.arr];
      const lastIndex = arr.length - 1;

      if (prevOperand.overwrite) {
        return {
          arr: [arr[lastIndex], value],
          overwrite: false,
        };
      }

      if (isNaN(parseFloat(arr[lastIndex])) && value === "−") {
        arr[lastIndex] = arr[lastIndex].includes("−")
          ? arr[lastIndex]
          : arr[lastIndex] + value;
        return { arr };
      }
      if (isNaN(parseFloat(arr[lastIndex]))) {
        arr[lastIndex] = value;
        return { arr };
      }
      arr.push(value);
      return { arr };
    });
  }

  function evaluate(event) {
    const { innerText: value } = event.target;

    setOperand((prevOperand) => {
      let arr = [...prevOperand.arr];
      if (prevOperand.arr.includes("=")) {
        return prevOperand;
      }
      const mapped = prevOperand.arr.map((each) => {
        let operation;
        switch (each) {
          case "÷":
            operation = "/";
            break;
          case "÷−":
            operation = "/-";
            break;
          case "×":
            operation = "*";
            break;
          case "×−":
            operation = "*-";
            break;
          case "−":
            operation = "-";
            break;
          case "−−":
            operation = "--";
            break;
          case "+":
            operation = "+";
            break;
          case "+−":
            operation = "+-";
            break;
          default:
            return each;
        }
        return operation;
      });
      if (isNaN(parseFloat(mapped[mapped.length - 1]))) {
        mapped[mapped.length - 1] = "";
      }

      arr.push(value);
      arr.push(eval(mapped.join("")));

      return {
        arr,
        overwrite: true,
      };
    });
  }

  function deleteDigit() {
    setOperand((prevOperand) => {
      if (prevOperand.overwrite) {
        return {
          arr: ["0"],
          overwrite: false
        };
      } else if (prevOperand.arr.length === 1) {
        return {
          arr: ["0"],
        };
      }
      return {
        ...prevOperand,
        arr: prevOperand.arr.slice(0, -1),
      };
    });
  }

  return (
    <div className="Calculator">
      <div className="display">
        <div id="calculation">
          {operand.arr.join("") === "0" ? "" : operand.arr.join("")}
        </div>
        <div className="current-operand" id="display">
          {operand.arr[operand.arr.length - 1]}
        </div>
      </div>
      <button className="span-two orange" id="clear" onClick={clear}>
        AC
      </button>
      <button className="orange" id="delete" onClick={deleteDigit}>
        DEL
      </button>
      <button className="orange" id="divide" onClick={inputOperator}>
        ÷
      </button>
      <button id="seven" onClick={inputDigit}>
        7
      </button>
      <button id="eight" onClick={inputDigit}>
        8
      </button>
      <button id="nine" onClick={inputDigit}>
        9
      </button>
      <button className="orange" id="multiply" onClick={inputOperator}>
        ×
      </button>
      <button id="four" onClick={inputDigit}>
        4
      </button>
      <button id="five" onClick={inputDigit}>
        5
      </button>
      <button id="six" onClick={inputDigit}>
        6
      </button>
      <button className="orange" id="subtract" onClick={inputOperator}>
        −
      </button>
      <button id="one" onClick={inputDigit}>
        1
      </button>
      <button id="two" onClick={inputDigit}>
        2
      </button>
      <button id="three" onClick={inputDigit}>
        3
      </button>
      <button className="orange" id="add" onClick={inputOperator}>
        +
      </button>
      <button id="decimal" onClick={inputDigit}>
        .
      </button>
      <button id="zero" onClick={inputDigit}>
        0
      </button>
      <button className="span-two orange" id="equals" onClick={evaluate}>
        =
      </button>
    </div>
  );
}

export default App;

