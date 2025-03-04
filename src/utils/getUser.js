const backendURL = import.meta.env.VITE_BACKEND_DOMAIN;

export default async function getUser() {
    const fullURL = new URL(`get-token`, backendURL).href;

    const res = await fetch(fullURL,{
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    const response = await res.json()
    
    
    return response.token
}