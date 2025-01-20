import api from './api'

const apiService = {

    getMovies: async (e) => {
        e.preventDefault()
        try {
            const response = await api.get("/query/trending");
            return response.data;
        } catch (error) {
            return error;
        }
    },

    getMoviesName: async (query) => {
        try {
            const response = await api.get(`/query/name/${query}`);
            return response.data;
        } catch (error) {
            return error;
        }
    },

    getMovieId: async (id) => {
        try {
            const response = await api.get(`/query/id/${id}`)
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getFavoriteMovies: async () => {
        try {
            const response = await api.get(`/favorite`)
            return response.data;
        } catch (error) {
            return error;
        }
    },

    register: async (login, password, role) => {
        try {
            await api.post("/auth/register", { login, password, role });
        } catch (error) {
            return error;
        }
    }

}

export default apiService;