export default async (city, filters) => {
    const {data, error} = await useFetch(`/api/cars/${city}`, {
        params : {
            ...filters,
        }
    })

    if (error.value) {
        throw createError({
            ...error.value,
            statusMessage: "Unable de fetch cars"
        })
    }

    return data
}