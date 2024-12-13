import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 429) {
      alert("You are sending requests too fast. Please try again later.");
      return new Promise((resolve) =>
        setTimeout(() => resolve(axios(error.config)), 1000)
      );
    }
    return Promise.reject(error);
  }
);

export default apiClient;
