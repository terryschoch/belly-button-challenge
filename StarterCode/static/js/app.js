// Define the url to be scraped for data as a "const"
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// // Fetch the JSON data and console log it
// // d3.json(url).then((data) => {
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
        sampleName.forEach((sample) => {
            dropdownMenu.append("option").text(sample).property("value", sample);    
        })

        // Isolate the first sampleName result and use it to build the default plots ("charts" function) and demographic info ("subjectInfo" function)
        let firstSample = sampleName[0];
        console.log(firstSample);
        charts(firstSample);
        // subjectInfo(firstSample);
    });
};

// -------------------------------------------------------------------------
// // Drop Down Menu
// // Fetch the JSON data and console log it
// // d3.json(url).then(function(data) {
// //   console.log(data);
// // });

// // Define an "init(ialize)" function to load dropdown menu and trigger a splashpage featuring a default Sample/Test Subject
// function init() {
//     // Grab a reference to the dropdown select element within the index.html
//     let dropdownMenu = d3.select("#selDataset");
        
//     // Fetch the JSON data and isolate the sample names by defining a function/=> to search within retrieved "data"
//     d3.json(url).then(function(data) {
//         // Define "sampleName" variable to contain all retrieved Test Subject "names"
//         let sampleName = data.names;
//         console.log(sampleName);
        
//         // Populate the dropdown menu with the names by chaining together .append, .text. and .property
//         sampleName.forEach(function(sample) {
//             dropdownMenu.append("option").text(sample).property("value", sample);    
//         })

//         // Isolate the first sampleName result and use it to build the default plots
//         let firstSample = sampleName[0];
//         console.log(firstSample);
//         charts(firstSample);
//         // subjectInfo(firstSample);
//     });
// };
// -------------------------------------------------------------------------

// Initialize dashboard by triggering "init" function
init();


// -------------------------------------------------------------------------


// Define "optionChanged" function found within index.html
function optionChanged(newSelection) {
    // Fetch correct refreshed data each time a new sample selection is made
    charts(newSelection);
    // subjectInfo(newSelection);
};


// -------------------------------------------------------------------------


// Bar Chart
// Define a "charts" function to plot horizontal bar chart of top 10 OTUs per sample
function charts(sample) {
    // Fetch the JSON data and define functions (=>) within to search for desired info to filter
    d3.json(url).then((data) => {
        // Define variable to hold "samples" information
        let samplesInfo = data.samples;
        console.log(samplesInfo)
        // Filter through "samplesInfo" to find correct "samples" info relative to Test Subject/Sample selected in drop down menu
        let sampleSelected = samplesInfo.filter(samplesID => samplesID.id == sample);
        console.log(sampleSelected);        

        // Define variable to hold "metadata" information
        let metadataInfo = data.metadata;
        console.log(metadataInfo);
        // Filter through "metadataInfo" to find correct "samples" info relative to selected Test Subject/Sample selected
        let metadataSelected = metadataInfo.filter(samplesID => samplesID.id == sample);
        console.log(metadataSelected);

        // Define variables to hold otu_ids, otu_labels, and sample_values of selected Test Subject/Sample for charting
        let otu_ids = sampleSelected[0].otu_ids;
        console.log(otu_ids);
        let otu_labels = sampleSelected[0].otu_labels;
        console.log(otu_labels);
        let sample_values = sampleSelected[0].sample_values;
        console.log(sample_values);

        // Use .slice to determine top ten otu ids, labels and values; apply .reverse to list in descending order for plotting and define as variables
        let topOtu_ids = otu_ids.slice(0, 10).reverse();
        console.log(topOtu_ids);
        let topOtu_labels = otu_labels.slice(0, 10).reverse();
        console.log(topOtu_labels);
        let topSample_values = sample_values.slice(0, 10).reverse();
        console.log(topSample_values);
        
        // Transform topOtu_ids to be used as yticks using .map function
        let topOtu_yds = topOtu_ids.map(item => `OTU ${item}`);
                   
        // Trace bar chart for the selected Test Subject/Sample data
        let trace1 = {
            x: topSample_values,
            y: topOtu_yds,
            type: 'bar',
            orientation: 'h',
            text: topOtu_labels            
        }

        // Data trace array
        let data1 = [trace1];

        let layout1 = {
            title: 'Bubble Chart Hover Text',
            showlegend: false,
            height: 600,
            width: 600
        };

        // Render the plot to the div tag with id "plot"
        Plotly.newPlot("bar", data1 //, layout
        );

        // Define a variable to hold the washing frequency of Test Subject/Sample
        // let wfreq = parseInt(metadataSelected[0].wfreq, 10)
        let wfreq = parseFloat(metadataSelected[0].wfreq)
        console.log(wfreq)

        // Trace bubble chart for the selected Test Subject/Sample data
        let trace2 = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: 'markers',
            marker: {
                color: otu_ids,
                size: sample_values,
            }
        };
        
        let data2 = [trace2];
        
        let layout2 = {
            title: 'Bubble Chart Hover Text',
            showlegend: false,
            height: 600,
            width: 600
        };

        Plotly.newPlot('bubble', data2 //, layout2//
        );

    })
}
  

      
// // Define "optionChanged" function found within index.html
// function optionChanged(newSelection) {
//   // Fetch correct refreshed data each time a new sample selection is made
//   charts(newSelection);
//   // subjectInfo(newSelection);
// };


// -------------------------------------------------------------------------