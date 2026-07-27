import api from "./api";

export const getInteractions = async () => {
    const response = await api.get("/interactions");
    return response.data;
};

export const createInteraction = async (interactionData) => {
    const response = await api.post("/interactions", interactionData);
    return response.data;
};

export const updateInteraction = async (id, interactionData) => {
    const response = await api.put(`/interactions/${id}`, interactionData);
    return response.data;
};

export const deleteInteraction = async (id) => {
    const response = await api.delete(`/interactions/${id}`);
    return response.data;
};