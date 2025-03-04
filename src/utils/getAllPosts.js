const backendURL = import.meta.env.VITE_BACKEND_DOMAIN;

export async function getAllPosts() {
    const fullURL = new URL(`get-all-posts`, backendURL).href;

    const res = await fetch(fullURL, {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json'
        }
    })
    const response = await res.json()
    return response;
}