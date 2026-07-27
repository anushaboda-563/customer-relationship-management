import api from "./api";

export const getDeals = async () => {
    const response = await api.get("/deals");
    return response.data;
};

export const createDeal = async (dealData) => {
    const response = await api.post("/deals", dealData);
    return response.data;
};

export const updateDeal = async (id, dealData) => {
    const response = await api.put(`/deals/${id}`, dealData);
    return response.data;
};

export const deleteDeal = async (id) => {
    const response = await api.delete(`/deals/${id}`);
    return response.data;
};