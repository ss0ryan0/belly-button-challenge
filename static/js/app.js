// Okey so I spotted a few potential problems in your code:
// 1. The d3.json() function returns a Promise that needs to be resolved in order to access the data. You should perform the data manipulation and chart creation inside the .then() block where the data is available.
// 2. The samplesData variable holds the Promise returned by d3.json(), and you're trying to sort it directly without waiting for the data to be retrieved.
// 3.  After figuring that out you might see some errors relating to elements that don't match your html divs. Just go back to your html file and ensure that the classes or ID's you gave for the divs to put the charts match where the charts are being created (bubble-chart vs bubble etc)
// 4. Then to keep things as clear for the browser as possible, I would suggest working in some functions to control large portions of your script like for example:
// function updatePlots(selectedID) {
//       // Perform operations to update plots here based on the selectedID
//       // ...
//     }
// Give these suggestions a try and see if you can troubleshoot your errors as they come up by looking at what line numbers are specified in the console.
// And then if you still get stuck on some of these errors or new errors you can submit another question and we can help you through them.

//d3 library read: refer to class 12/ activity  14.3.1-2, 
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
const samplesData = d3.json(url)
samplesData.then((data) => {
    let metadata = data.metadata;
    console.log(metadata)
});
//put in the "promise"
console.log("Data Promise: ", dataPromise);

// Fetch the JSON data and console log it
d3.json(url).then(function(metadata) {
  console.log(metadata);

//Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
//using sample_values as the values, otu_ids as the labels, & otu_labels as the hovertext
   let sortedOTU = samplesData.sort((a,b) => b.samples.sample_values - a.samples.sample_values);
   let top10otu = sample_values.slice(0,10);
   let trace1 = {
        x: top10otu.map(d => d.samples.sample_values),
        y: top10otu.map(d => 'OTU ${d.otu_ids}'),
        text: top10otu.map(d => d.samples.otu_labels)
   }; 

   let barChart = [trace1];
   let barLayout = {
    title: "Top 10 OTUs",
    margin: {
        l: 200,
        r: 200,
        t: 200,
        b: 200,
    }
   };
   Plotly.newPlot("plot", barChart, barLayout);
//Create a bubble chart that displays each sample.   
   var trace2 = {
    x: samples.otu_ids, //Use otu_ids for the x values.
    y: samples.sample_values, //Use sample_values for the y values.
    text: samples.otu_labels, //Use otu_labels for the text values.
    mode: 'markers',
    marker: {
        size: samples.sample_values, //Use sample_values for the marker size.
        color: samples.otu_ids //Use otu_ids for the marker colors.
    }
   };

// Display the sample metadata, i.e., an individual's demographic information.
const metadataDisplay = d3.select("#metadata");
const selectedData = data.find(entry => entry.otu_id === selectedID);

metadataDisplay.html(""); // Clear existing content

//Display each key-value pair from the metadata JSON object somewhere on the page.
for (const [key, value] of Object.entries(selectedData)) {
    metadataDisplay.append("p").text(`${key}: ${value}`);
}


// Dropdown event listener
d3.select("#dropdown").on("change", function() {
const selectedID = d3.select(this).property("value");
updatePlots(selectedID);
})
});