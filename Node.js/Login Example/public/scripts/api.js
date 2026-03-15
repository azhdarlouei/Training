const handleApiResponse = async (response) => {
    if (!response.ok) {
        let errorData
        try {
            errorData = await response.json()
            const errorMessage = errorData.error || `HTTP error! status: ${response.status}`
            console.log(errorData)
            throw new Error(errorMessage)
        } catch (error) {
            console.error(error)
        }
    }

    return response.json()
}

export const sendRequest = async (url, data) => {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })

        const res = await handleApiResponse(response)
        return res
    }catch(error){
        console.error(error)
    }
}

export const checkAuthStatus = ()=>{
    // TODO: send request to check Auth api
}