
export const updateObjectInArray = (array, itemID, objPropName, newObjProps) => {
    return array.map( u => {
        if (u[objPropName] === itemID) {
            return {...u, ...newObjProps}
        };

        return u;
    })
}