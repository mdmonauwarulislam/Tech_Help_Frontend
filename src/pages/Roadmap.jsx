import React, { useEffect, useCallback, useState } from "react";
// import ReactFlow, { MiniMap, Controls, Background, applyNodeChanges, applyEdgeChanges, addEdge } from "reactflow";
// import "reactflow/dist/style.css";
import { ReactFlow,  MiniMap, Controls, Background, applyNodeChanges, applyEdgeChanges, addEdge  } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { useRoadmapStore } from "../components/Roadmap/roadmapStore";
import CustomNode from "../components/Roadmap/CustomNode";

const nodeTypes = { custom: CustomNode };

const Roadmap = () => {
  const { roadmaps, selectedRoadmapId, loadRoadmaps, loadRoadmap, createRoadmap, updateRoadmap, deleteRoadmap, nodes, setNodes, edges, setEdges } = useRoadmapStore();
  const [roadmapName, setRoadmapName] = useState("");

  useEffect(() => {
    loadRoadmaps();
  }, []);

  const onNodesChange = useCallback((changes) => setNodes((nds) => applyNodeChanges(changes, nds)), [setNodes]);
  const onEdgesChange = useCallback((changes) => setEdges((eds) => applyEdgeChanges(changes, eds)), [setEdges]);
  const onConnect = useCallback((connection) => setEdges((eds) => addEdge(connection, eds)), [setEdges]);

  return (
    <div className="flex h-screen">
      <div className="w-1/4 bg-gray-200 p-4">
        <h2 className="text-lg font-semibold">Roadmaps</h2>
        <ul>
          {roadmaps.map((roadmap) => (
            <li key={roadmap._id} className={`p-2 cursor-pointer ${selectedRoadmapId === roadmap._id ? "bg-blue-500 text-white" : "bg-white"}`} onClick={() => loadRoadmap(roadmap._id)}>
              {roadmap.name}
            </li>
          ))}
        </ul>
        <input type="text" placeholder="New Roadmap Name" value={roadmapName} onChange={(e) => setRoadmapName(e.target.value)} className="w-full p-2 border border-gray-300 rounded" />
        <button onClick={() => createRoadmap(roadmapName)} className="w-full bg-green-500 text-white p-2">Create Roadmap</button>
      </div>
      <div className="w-3/4 h-full bg-gray-100 relative">
        <ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} onConnect={onConnect} nodeTypes={nodeTypes} fitView>
          <Controls />
          <MiniMap />
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
        {selectedRoadmapId && <button onClick={updateRoadmap} className="absolute bottom-4 right-4 bg-blue-500 text-white p-3 rounded">Save Changes</button>}
      </div>
    </div>
  );
};

export default Roadmap;
