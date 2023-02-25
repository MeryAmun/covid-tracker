// sort data function

export const sortData = (data) =>{
    const sortedData = [...data];
   return sortedData.sort((a,b) =>  b.cases - a.cases)//descending order
   //return sortedData.sort((a,b) =>  a.cases > a.cases ? -1 : 1)//descending order
   //return sortedData.sort((a,b) => a.cases - b.cases) ascending order
  
}


// set data to graph format function

export const buildChartData = (data, caseType='cases') => {
    const chartData = [];
    let lastDataPoint;
for(let date in data.cases){
        if(lastDataPoint){
            let newDataPoint = {
                x:date,
                y:data[caseType][date] - lastDataPoint
            };
            chartData.push(newDataPoint)
        }
        lastDataPoint = data[caseType][date]
    };
    return chartData
}