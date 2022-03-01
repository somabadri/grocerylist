// Action for updating a field with a specified value
export const update = (field, value) => {
    return {
        type: `UPDATE_${field}`,
        payload: value
    }
}