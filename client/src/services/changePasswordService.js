import api from "./api";

export const changePassword = async (passwordData) => {
    const response = await api.put(
        "/users/change-password",
        passwordData
    );

    return response.data;
};