//d3 library read
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
const samplesData = d3.json(url)
samplesData.then(function(data) {

});
    console.log(data);

//Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
//using sample_values as the values, otu_ids as the labels, & otu_labels as the hovertext
   let sortedOTU = samplesData.sort((a,b) => b.samples.sample_values - a.samples.sample_values);
   let top10otu = sample_values.slice(0,10);
   let trace1 = {
        x: top10otu.map(d => d.samples.sample_values),
        y: top10otu.map(d => 'OTU ${d.otu_ids}'),
        text: top10otu.map(d => d.otu_labels)
   }; 
