export const getUser = () => {
    const user = localStorage.getItem("user");

    if (!user) {
        return null;
    }

    return JSON.parse(user);
};

export const getRole = () => {
    const user = getUser();

    return user ? user.role : "";
};

export const isLoggedIn = () => {
    return !!localStorage.getItem("token");
};

// Add this function
export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
};