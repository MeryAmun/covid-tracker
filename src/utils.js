export const sortData = (data) =>{
    const sortedData = [...data];
   return sortedData.sort((a,b) =>  b.cases - a.cases)//descending order
   //return sortedData.sort((a,b) => a.cases - b.cases) ascending order
  
}