export const requiredField = value => {
    if (value) return undefined;
    return "Field is required"
}

const maxLength = (max) => value => {
    if (value && value.length > max) {
        return `Length must be ${max} or less`
    } else return undefined
}

export const maxLength30 = maxLength(30)
export const maxLength5 = maxLength(5)

// const maxLength2 = max => value =>
//   value && value.length > max ? `Must be ${max} characters or less` : undefined

// export const maxLength15 = maxLength2(15)