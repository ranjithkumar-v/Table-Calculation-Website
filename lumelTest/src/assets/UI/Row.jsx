import { useState } from "react";

export default function Row({ node, level, onUpdate }) {
  const [input, setInput] = useState("");

  // Variance calculation
  const variance =
    ((node.value - node.originalValue) / node.originalValue) * 100;

  const handlePercent = () => {
    const percent = parseFloat(input);
    if (isNaN(percent)) return;
    const newValue = node.value + (node.value * percent) / 100;
    onUpdate(node.id, newValue, "percent");
    setInput("");
  };

  const handleValue = () => {
    const val = parseFloat(input);
    if (isNaN(val)) return;
    onUpdate(node.id, val, "value");
    setInput("");
  };

  return (
    <>
      <tr>
        <td style={{ paddingLeft: `${level * 20}px` }}>
          {node.label}
        </td>
        <td>{node.value.toFixed(2)}</td>
        <td>
          <input
            type="number"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{ width: "60px" }}
          />
          <button style={{marginLeft:"20px"}} onClick={handlePercent}>Allocation %</button>
          <button onClick={handleValue} style={{marginRight:"10px", marginLeft:"20px"}}>Allocation Val</button>
        </td>
        <td style={{ color: variance !== 0 ? "white" : "red" }}>
          {variance.toFixed(2)}%
        </td>
      </tr>

      {node.children &&
        node.children.map((child) => (
          <Row
            key={child.id}
            node={child}
            level={level + 1}
            onUpdate={onUpdate}
          />
        ))}
    </>
  );
}
