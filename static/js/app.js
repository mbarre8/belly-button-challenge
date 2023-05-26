
//get the sample json data from the URL
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"


// Use the D3 library to Fetch the JSON data and console log it
let data = d3.json(url).then(function(data){
  console.log("Data: ", data);

//create a variable from samples list and print results
let samples = data.samples;
  console.log("Samples: ", samples);

// create a variable to pull first array in samples list
let samplesArray = samples.filter(item =>item.id);
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
  title: "Top 10 OTUs",
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
  title: "OTUs VS Sample Size",
  margin: {
    l: 100,
    r: 100,
    t: 100,
    b: 100},
    height: 700,
    width: 1500};

// assigning graph details to a variable
let data2= [trace2];

//plot bubble graph
Plotly.newPlot('bubble', data2, layout2);

//create a variable from metadata list and print results
let metaData = data.metadata;
  console.log("Metadata: ", metaData);

// create a variable to pull first array in metadata list
let metaDataArray = metaData.filter(item =>item.id);
let firstMetaDataArray = metaDataArray[0];
console.log("First Metadata:", firstMetaDataArray);


let demographicInfo= d3.selectAll("#sample-metadata");
demographicInfo.html(" ");
Object.entries(firstMetaDataArray).forEach(([k,v])=> {
demographicInfo.append("div").text(`${k}:${v}`);
});
// append("div").text("Id: " +firstMetaDataArray.id);
// let selector = d3.select("#sample-metadata");
// for(let i=0; i< firstMetaDataArray.length;i++){
//   selector.append("option").text(firstMetaDataArray[i]);};

});






