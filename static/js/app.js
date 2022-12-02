// import the data from data.js
const tableData = data;

// Reference the HTML table using d3
var tbody = d3.select("tbody");

//build table
function buildTable(data) {
    
    //clear table
    tbody.html("");

    //get the data in the table
    data.forEach((dataRow) => {
        //append row to table body
        let row = tbody.append("tr");
        //loop thru each field in dataRow
        Object.values(dataRow).forEach((val) => {
          let cell = row.append("td");
          //cell text is value
          cell.text(val); 
          }
        );
      });

};

//filter data based on date
function handleClick() {
    let date = d3.select("#datetime").property("value");
    
    //if no filter, default is all data
    let filteredData = tableData;

    //if filter, filter data (data equal to date entered)
    if (date) {
        filteredData = filteredData.filter(row => row.datetime === date);
    };

    //build table
    buildTable(filteredData);
};

//detect click
d3.selectAll("#filter-btn").on("click", handleClick);

//call this immediately, builds table when page loads
buildTable(tableData);