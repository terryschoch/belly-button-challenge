// Define the url to be scraped for data as a "const"
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// // Fetch the JSON data and console log it
// // d3.json(url).then(function(data) {
// //   console.log(data);
// // });

// Drop Down Menu
// Define an "init(ialize)" function to load dropdown menu and trigger a splashpage featuring a default Sample/Test Subject
function init() {
    // Grab a reference to the dropdown select element within the index.html
    let dropdownMenu = d3.select("#selDataset");
        
    // Fetch the JSON data and isolate the sample names by defining a function/=> to search within retrieved "data"
    d3.json(url).then((data) => {
        // Define "sampleName" variable to contain all retrieved Test Subject "names"
        let sampleName = data.names;
        console.log(sampleName);
        
        // Populate the dropdown menu with the names by chaining together .append, .text. and .property
        sampleName.forEach(function(sample) {
            dropdownMenu.append("option").text(sample).property("value", sample);    
        })

        // Isolate the first sampleName result and use it to build the default plots
        let firstSample = sampleName[0];
        console.log(firstSample);
        charts(firstSample);
        // subjectInfo(firstSample);
    });
};

// ------------------------------------------
// // Populate the dropdown menu with the scraped sample names found using the "names" key
//   d3.json(url).then((data) => {
//     // Define "sampleName" variable to contain all sample names
//     let sampleName = data.names;

//     // Add each sample to the  drop down menu using .append, .text, and .property
//     sampleName.forEach((sample) => {
//       dropdownMenu
//         .append("option")
//         .text(sample)
//         .property("value", sample);
//     });

//     // Use the first sample from the list to build the default initial plots
//     let firstSample = sampleName[0];
//     buildCharts(firstSample);
//     buildMetadata(firstSample);
//   });
// }

// // Initialize dashboard by triggering created function
// -----------------------------------------------
// Initialize dashboard by triggering function
init();


// -----------------------------------------------
// Bar Chart
// Define a "charts" function to plot horizontal bar chart of top 10 OTUs per sample
function charts(sample) {
    // Fetch the "samples" data and define variable to hold the arrays 
    d3.json(url).then((data) => {
        let sampleData = data.samples;
        console.log(sampleData)
        // Filter through samples arrays to find correct sample ID relative to drop down menu selection
        let sampleFiltered = sampleData.filter(sampleID => sampleID.id == sample);
        console.log(sampleFiltered)
        // Define variables to hold otu_ids, otu_labels, and sample_values for charting
        let otu_ids = sampleFiltered.otu_ids
        console.log(otu_ids)
        let otu_labels = sampleFiltered.otu_labels
        console.log(otu_labels)
        let sample_values = sampleFiltered.sample_values                
        console.log(sample_values)
    })
}