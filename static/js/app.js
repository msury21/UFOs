// from data.js
const tableData = data;

// get table references
var tbody = d3.select("tbody");

function buildTable(data) {
  // First, clear out any existing data
  tbody.html("");

  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  data.forEach((dataRow) => {
    // Append a row to the table body
    let row = tbody.append("tr");

    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    });
  });
}

// 1. Create a variable to keep track of all the filters as an object.
var filters = {};

// 3. Use this function to update the filters. 
function updateFilters() {

    // 4a. Save the element that was changed as a variable.
    let dateElement = d3.select("#datetime");
    let cityElement = d3.select("#city");
    let stateElement = d3.select("#state");
    let countryElement = d3.select("#country");
    let shapeElement = d3.select("#shape");
    // 4b. Save the value that was changed as a variable.
    let dateValue = dateElement.property("value");
    let cityValue = cityElement.property("value");
    let stateValue = stateElement.property("value");
    let countryValue = countryElement.property("value");
    let shapeValue = shapeElement.property("value");
    // 4c. Save the id of the filter that was changed as a variable.
    let dateId = dateElement.attr("id");
    let cityId = cityElement.attr("id");
    let stateId = stateElement.attr("id");
    let countryId = countryElement.attr("id");
    let shapeId = shapeElement.attr("id");
    
    // 5. If a filter value was entered then add that filterId and value
    // to the filters list. Otherwise, clear that filter from the filters object.

    if (dateValue) {
        filters[dateId] = dateValue;
    }
    else {
        delete filters[dateId];
    }
    if (cityValue) {
        filters[cityId] = cityValue;
    }
    else {
        delete filters[cityId];
    }
    if (stateValue) {
        filters[stateId] = stateValue;
    }
    else {
        delete filters[stateId];
    }
    if (countryValue) {
        filters[countryId] = countryValue;
    }
    else {
        delete filters[countryId];
    }
    if (shapeValue) {
        filters[shapeId] = shapeValue;
    }
    else {
        delete filters[shapeId];
    }
    // 6. Call function to apply all filters and rebuild the table
    filterTable(filters);
  
};
  
  // 7. Use this function to filter the table when data is entered.
  function filterTable(filters) {
  
    // 8. Set the filtered data to the tableData.
    let filteredData = tableData
  
    // 9. Loop through all of the filters and keep any data that
    // matches the filter values
    if (filters["datetime"]) {
        filteredData = filteredData.filter(row => row.datetime === filters["datetime"]);
    }
    if (filters["city"]) {
        filteredData = filteredData.filter(row => row.city === filters["city"]);
    }
    if (filters["state"]) {
        filteredData = filteredData.filter(row => row.state === filters["state"]);
    }
    if (filters["country"]) {
        filteredData = filteredData.filter(row => row.country === filters["country"]);
    }
    if (filters["shape"]) {
        filteredData = filteredData.filter(row => row.shape === filters["shape"]);
    }
    
    // for (var ID in filters) {
    //     filteredData = filteredData.filter(row => row.ID === filters[ID]);
    // };
    //need ifferent way to call row?

    // 10. Finally, rebuild the table using the filtered data
    buildTable(filteredData);
};
  
  // 2. Attach an event to listen for changes to each filter
d3.selectAll("#datetime").on("change", updateFilters);
d3.selectAll("#city").on("change", updateFilters);
d3.selectAll("#state").on("change", updateFilters);
d3.selectAll("#country").on("change", updateFilters);
d3.selectAll("#shape").on("change", updateFilters);
  
  // Build the table when the page loads
buildTable(tableData);
