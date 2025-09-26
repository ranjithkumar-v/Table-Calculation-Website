import Row from "./Row";

export default function HierarchicalTable({ data, onUpdate }) {
  const calculateGrandTotal = (nodes) =>
    nodes.reduce((sum, node) => sum + node.value, 0);

  const grandTotal = calculateGrandTotal(data);

  return (
    <table border="1" cellPadding="8" style={{ borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th>Label</th>
          <th>Value</th>
          <th>Input and  Actions</th>
          <th>Variance</th>
        </tr>
      </thead>
      <tbody>
        {data.map((node) => (
          <Row key={node.id} node={node} level={0} onUpdate={onUpdate} />
        ))}
        <tr style={{ fontWeight: "bold" }}>
          <td>Grand Total</td>
          <td>{grandTotal.toFixed(2)}</td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>
  );
}
