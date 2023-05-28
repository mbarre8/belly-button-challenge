
//get the sample json data from the URL
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// Use the D3 library to Fetch the JSON data and console log it
d3.json(url).then(function (data){
  console.log("Data: ", data);
})

function Samples(sample){
  d3.json(url).then((data)=>{

//create a variable from samples list and print results
let samples = data.samples;
  console.log("Samples: ", samples);

// create a variable to pull first array in samples list
let samplesArray = samples.filter(item =>item.id == sample);
let firstSamplesArray = samplesArray[0];
console.log("First Array:", firstSamplesArray);

//Create variable displaying the top 10 OTU_Ids 
let TopOtuIds = firstSamplesArray.otu_ids.slice(0,10).map(item=> `OTU ${item}`).reverse();
console.log(TopOtuIds);

//Create variable displaying the top 10 sample values 
let TopSampleValues =firstSamplesArray.sample_values.slice(0,10).reverse();
console.log(TopSampleValues);

//Create variable displaying the top 10 labels
let Otulabels = firstSamplesArray.otu_labels.slice(0,10).reverse();
console.log(Otulabels);

//specifing graph type, x and y values, and hover text
let trace1 = {
  x: TopSampleValues,
  y: TopOtuIds,
  type: "bar",
  orientation: "h",
  text: Otulabels
};

//Creating title and margin parameters
let layout = {
  title: "<b>Top 10 Operational Taxonomic Units (OTUs)<b>",
  margin: {
    l: 100,
    r: 100,
    t: 100,
    b: 100},

    bargap :0.05
  };

// assigning graph details to a variable
let data1= [trace1];

//plot hortizontal bar graph
Plotly.newPlot("bar", data1, layout);


//Assigning all OTU Ids in first array sample a variable
let otuIds = firstSamplesArray.otu_ids;
console.log(otuIds);

//Assigning all sample values in first array sample a variable
let SampleValues = firstSamplesArray.sample_values;
console.log(SampleValues);

//Assigning all otu labels in first array sample a variable
let Otulabels2 = firstSamplesArray.otu_labels;
console.log(Otulabels2);

//specifing graph type, x and y values, hover text, and marker criteria
let trace2 ={
  x: otuIds,
  y: SampleValues,
  text: Otulabels2,
  mode: 'markers',
  marker: {
    color: otuIds,
    size: SampleValues,
    colorscale: "Earth"
   }
};

//Creating title, margin parameters, specify height and weight of graph
let layout2 = {
  title: "<b>OTUs Sample Size<b>",
  margin: {
    l: 100,
    r: 100,
    t: 100,
    b: 100},
    height: 600,
    width: 1400};

// assigning graph details to a variable
let data2= [trace2];

//plot bubble graph
Plotly.newPlot('bubble', data2, layout2);
});
}

function MetaData(sample) {
  d3.json(url).then((data)=>{

//create a variable from metadata list and print results
let metaData = data.metadata;
  console.log("Metadata: ", metaData);

// create a variable to pull first array in metadata list
let metaDataArray = metaData.filter(item =>item.id == sample);
let firstMetaDataArray = metaDataArray[0];
console.log("First Metadata:", firstMetaDataArray);
// console.log(metaDataArray);

//Select the sample-metadata ID and append the first object with forEach function to get all key-value pairs from first metadata array entry
let demographicInfo= d3.selectAll("#sample-metadata");
demographicInfo.html(" ");
Object.entries(firstMetaDataArray).forEach(([k,v])=> {
demographicInfo.append("div").text(`${k}:${v}`);
});
  });
}

function GaugeData(sample) {
  d3.json(url).then((data)=>{

//create a variable from metadata list and print results
let metaData = data.metadata;
  console.log("Metadata: ", metaData);

// create a variable to pull first array in metadata list
let metaDataArray = metaData.filter(item =>item.id == sample);

let gauge1 = d3.select("#gauge");
gauge1.html(" ");
let washFreq = metaDataArray.map(item =>item.wfreq);
let firstWashFreq = washFreq[0];
console.log("Wash Frequency for first ID: ", firstWashFreq);

let trace3 = [
	{
		domain: { x: [0, 1], y: [0, 1] },
		value: firstWashFreq,
		title: { text: "<b>Belly Button Washing Frequency <b><br> Scrubs Per Week" },
    type: "indicator",
		mode: "gauge+number",
    gauge: {
      axis:{range: [null, 9] },
      steps: [
      { range: [0, 1], color: "ivory" },
      { range: [1, 2] , color: "beige"},
      { range: [2, 3], color: "lightyellow" },
      { range: [3, 4], color: "yellow" },
      { range: [4, 5], color: "yellowgreen" },
      { range: [5, 6], color: "olive" },
      { range: [6, 7], color: "lightgreen" },
      { range: [7, 8], color: "green" },
      { range: [8, 9], color: "darkgreen" },
      ],
     

	}}
];

let data3 = [trace3];

let layout3 = { 
  width: 600,
  height: 500, 
  margin: { t: 0, b: 0 }
  };

Plotly.newPlot('gauge', trace3, layout3);

  });
}

function init() {
  
  // Use D3 to select the dropdown menu
  let dropdownMenu = d3.select("#selDataset");
  
  //create a variable from names list and print results
  d3.json(url).then((data) => {
    let sampleNames= data.names;
    console.log("Names: ", sampleNames);

  //ForEach Id name in variable sampleNames append results to drop down menu 
    sampleNames.forEach((sampleName)=> {
    dropdownMenu.append("option").text(`${sampleName}`).property("value", sampleName);
    }); 
  
   // Initializes the page with a default ID with default bar, bubble graph and demographic info
  const sampleOne = sampleNames[0];
  Samples(sampleOne);
  MetaData(sampleOne);
  GaugeData(sampleOne);
  console.log("Sample one:", sampleOne);

});
}

function optionChanged(newSample){
  Samples(newSample);
  MetaData(newSample);
  GaugeData(newSample);
  }



  init();
