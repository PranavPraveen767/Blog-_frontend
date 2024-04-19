import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { BASE_URL } from "../Services/baseURL";

// Create a new context for admin
export const AdminContext = createContext({});

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false); // New state for admin status

    useEffect(() => {
        getUser();
    }, []);

    const getUser = async () => {
        try {
            const res = await axios.get(BASE_URL + "/refetch", { withCredentials: true });
            console.log(res.data);
            setUser(res.data);
            // Assuming the response contains admin status information
            setIsAdmin(res.data.isAdmin); // Update isAdmin state
        } catch (err) {
            console.log(err);
        }
    };

    return (
        // Provide both user and isAdmin states in context
        <UserContext.Provider value={{ user, setUser }}>
            {/* Pass isAdmin state through AdminContext */}
            <AdminContext.Provider value={{ isAdmin }}>
                {children}
            </AdminContext.Provider>
        </UserContext.Provider>
    );
}
