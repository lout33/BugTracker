export const itemsFiltered = (searchedItem, arrayOfObject) => {
  let toFilter = ["name", "email", "assignedProjects"];
    
  let arrayFiltered = arrayOfObject.filter(function(obj) {
    let objectClean = {};
    console.log(obj);

    for (let i = 0; i < toFilter.length; i++) {

      if (obj[toFilter[i]]) {
        if (obj[toFilter[i]].length > 1) {
          for (let j = 0; j < obj[toFilter[i]].length; j++) {
            objectClean[toFilter[j]] = obj[toFilter[i]][j];
          }
          return
        }
        objectClean[toFilter[i]] = obj[i];
      } else {
        objectClean[i] = "";
      }
    }
    for (let key in objectClean) {
      if (
        JSON.stringify(objectClean[key])
          .toLowerCase()
          .includes(searchedItem.toLowerCase())
      ) {
        return objectClean;
      }
    }
  });
  return arrayFiltered;
};
