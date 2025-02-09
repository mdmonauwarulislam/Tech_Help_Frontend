import React, { useState } from "react";
import { Handle, Position } from "reactflow";

const CustomNode = ({ data }) => {
  const [label, setLabel] = useState(data.label);

  return (
    <div className="bg-white shadow-md p-2 rounded border border-gray-300">
      <input
        className="border-none bg-transparent text-center outline-none w-full"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
      />
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default CustomNode;
