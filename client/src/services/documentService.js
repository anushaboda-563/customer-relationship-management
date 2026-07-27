import api from "./api";

// Get all documents
export const getDocuments = async () => {
    const response = await api.get("/documents");
    return response.data;
};

// Upload document
export const uploadDocument = async (formData) => {
    const response = await api.post("/documents", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return response.data;
};

// Delete document
export const deleteDocument = async (id) => {
    const response = await api.delete(`/documents/${id}`);
    return response.data;
};