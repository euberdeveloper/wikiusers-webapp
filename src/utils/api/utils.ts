export async function handleError<T>(task: () => Promise<T>): Promise<T> {
    try {
        return await task();
    }
    catch (error) {
        if (error.response) {
            console.error('Api server error', { 
                data: error.response.data, 
                status: error.response.status, 
                headers: error.response.headers 
            });
            throw error.response.data;
        }
        else if (error.request) {
            console.error('Api unknown server error', error.request);
            throw { code: 'UNKNOWN_ERROR' };
        }
        else {
            console.error('Api frontend error', error.message);
            throw { code: 'FRONTEND_ERROR' };
        }
    }
}
