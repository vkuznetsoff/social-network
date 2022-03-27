export const updateObjectInArray = (
  items,
  itemID,
  objPropName,
  newObjProps
) => {
  ///Копирование массива, когда
  //нужно поменять элемент внутри объекта, т.е.
  //мы копируем массив с помощью функции map и меняем
  // нужное свойство 
  return items.map( (u) => {
    if (u[objPropName] === itemID) {
      return { ...u, ...newObjProps };
    }
    
    return u;
  });
};
