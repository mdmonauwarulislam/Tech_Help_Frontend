import { create } from "zustand";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const useRoadmapStore = create((set) => ({
  roadmaps: [],
  nodes: [],
  edges: [],
  selectedRoadmapId: null,

  loadRoadmaps: async () => {
    try {
      const { data } = await axios.get(`${API_URL}/roadmap/getroadmaps`);
      set({ roadmaps: data });
    } catch (error) {
      console.error("Error fetching roadmaps:", error);
    }
  },

  loadRoadmap: async (id) => {
    try {
      const { data } = await axios.get(`${API_URL}/roadmap/getroadmap/${id}`);
      console.log("Fetched Roadmap Data:", data.nodes); // Debugging
      set({
        selectedRoadmapId: id,
        nodes: data.nodes.length ? data.nodes : [{ id: "1", position: { x: 100, y: 100 }, data: { label: "Start" } }],
        edges: data.edges || [],
      });
    } catch (error) {
      console.error("Error loading roadmap:", error);
    }
  },

  createRoadmap: async (name) => {
    try {
      const { data } = await axios.post(`${API_URL}/roadmap/createroadmap`, { name, nodes: [], edges: [] });
      set((state) => ({ roadmaps: [...state.roadmaps, data] }));
    } catch (error) {
      console.error("Error creating roadmap:", error);
    }
  },

  updateRoadmap: async () => {
    const { selectedRoadmapId, nodes, edges } = useRoadmapStore.getState();
    if (!selectedRoadmapId) return;
    try {
      await axios.put(`${API_URL}/roadmap/updateroadmap/${selectedRoadmapId}`, { nodes, edges });
    } catch (error) {
      console.error("Error updating roadmap:", error);
    }
  },

  deleteRoadmap: async (id) => {
    try {
      await axios.delete(`${API_URL}/roadmap/deleteroadmap/${id}`);
      set((state) => ({
        roadmaps: state.roadmaps.filter((roadmap) => roadmap._id !== id),
      }));
    } catch (error) {
      console.error("Error deleting roadmap:", error);
    }
  },

  setNodes: (update) => set((state) => {
    const newNodes = update(state.nodes);
    console.log("Updated Nodes:", newNodes);
    return { nodes: newNodes };
  }),

  setEdges: (update) => set((state) => ({ edges: update(state.edges) })),
}));
