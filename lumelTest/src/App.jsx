import { useState } from "react";
import { initialData } from "./assets/UI/Data";
import HierarchicalTable from "./assets/UI/HierarchicalTable";

// Helper: deep clone
const clone = (obj) => JSON.parse(JSON.stringify(obj));

//  update function
function updateNode(nodes, id, newValue, type) {
  return nodes.map((node) => {
    if (node.id === id) {
      if (node.children && type === "value") {
        const total = node.children.reduce((s, c) => s + c.value, 0);
        const updatedChildren = node.children.map((child) => ({
          ...child,
          value: (child.value / total) * newValue
        }));
        return {
          ...node,
          value: newValue,
          children: updatedChildren
        };
      }
      return { ...node, value: newValue };
    }

    if (node.children) {
      const updatedChildren = updateNode(node.children, id, newValue, type);
      const subtotal = updatedChildren.reduce((s, c) => s + c.value, 0);
      return { ...node, children: updatedChildren, value: subtotal };
    }

    return node;
  });
}

export default function App() {
  const [data, setData] = useState(clone(initialData));

  const handleUpdate = (id, newValue, type) => {
    const updated = updateNode(data, id, newValue, type);
    setData(updated);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2> Hierarchical Table</h2>
      <HierarchicalTable data={data} onUpdate={handleUpdate} />
    </div>
  );
}
