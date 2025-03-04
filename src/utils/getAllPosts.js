const backendURL = import.meta.env.VITE_BACKEND_DOMAIN;

export async function getAllPosts() {
    const res = await fetch(`${backendURL}/get-all-posts`, {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json'
        }
    })
    const response = await res.json()
    return response;
}