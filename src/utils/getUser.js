const backendURL = import.meta.env.VITE_BACKEND_DOMAIN;

export default async function getUser() {
    const res = await fetch(`${backendURL}/get-token`,{
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    const response = await res.json()
    
    
    return response.token
}