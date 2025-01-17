import api from './api'

const token = localStorage.getItem('token');

const apiService = {

    getMovies: async () => {
        try {
            const response = await api.get("/query/trending", {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error) {
            return error;
        }
    },

    getMoviesName: async (query) => {
        try {
            const response = await api.get(`/query/name/${query}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error) {
            return error;
        }
    },

    getMovieId: async (id) => {
        try {
            const response = await api.get(`/query/id/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getFavoriteMovies : async () => {
        try {
            const response = await api.get(`/favorite`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })    
           return response.data;
        } catch (error) {
           return error;
        }
    }
}

export default apiService;