import axios from "axios";

const gatewayApi = axios.create({
    baseURL: "http://localhost:8080",
});

export const getGatewayHealth = async () => {
    const response = await gatewayApi.get("/actuator/health");
    return response.data;
};