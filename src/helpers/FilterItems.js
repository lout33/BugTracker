export const itemsFiltered = (searchedItem, arrayOfObject) => {
  let toFilter = ["name", "email", "assignedProjects"];
    
  let arrayFiltered = arrayOfObject.filter(function(obj) {
    let objectClean = {};
    console.log(obj);

    for (let i = 0; i < toFilter.length; i++) {

      if (obj[toFilter[i]]) {
        console.log(Array.isArray(obj[toFilter[i]]));
        
        if ( Array.isArray(obj[toFilter[i]] )) {
          
          for (let j = 0; j < obj[toFilter[i]].length; j++) {
            objectClean[[j]] = obj[toFilter[i]][j];
          }
          
        }else{
          objectClean[toFilter[i]] = obj[toFilter[i]];
        }
      } else {
        objectClean[toFilter[i]] = "";
      }
    }
    console.log(objectClean);
    
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
