import 'bootstrap/dist/css/bootstrap.min.css';
let axios = require('axios') //jeg bruger require i stedet for at import axios, require er npm package

let URL = "https://meassurement1420190604103656.azurewebsites.net/api/m14"

let table: HTMLTableElement = <HTMLTableElement>document.getElementById("m14")
let tablebody = document.getElementById('tbody') as HTMLTableElement


let inputID = document.createElement("input") as HTMLInputElement
let inputPressure = document.createElement("input") as HTMLInputElement
let inputHumidity = document.createElement("input") as HTMLInputElement
let inputTemperature = document.createElement("input") as HTMLInputElement
let inputTimeStamp = document.createElement("input") as HTMLInputElement


let buttonGetOne = document.createElement('button') as HTMLButtonElement
let deletebtn = document.createElement('button') as HTMLButtonElement

//variables above this comment




inputID.placeholder="Enter id"
inputPressure.placeholder="Pressure"
inputHumidity.placeholder="Humidity"
inputTemperature.placeholder="Temperature"
inputTimeStamp.placeholder="TimeStamp"
buttonGetOne.textContent = "Get One"
deletebtn.textContent = "Delete"
//naming the fileds / buttons


document.body.appendChild(inputID)
document.body.appendChild(buttonGetOne)
document.body.appendChild(deletebtn)

//appening input filed and button to the html body


//axios GET request below
axios.get(URL)
  .then(function (response : any) {    
    console.log("apiData",response); //logging response to make sure im getting the data
    response.data.forEach(data => {
      let row = document.createElement("tr");
      table.appendChild(row);

      let id = document.createElement("td"); //creating table data when data is recvied 
      let Pressure = document.createElement("td");
      let Humidity = document.createElement("td");
      let Temperature = document.createElement("td");
      let TimeStamp = document.createElement("td");
     

      id.innerText=data.id
      Pressure.innerText=data.pressure //setting the data im getting from the REST to corrospond with my local client variables
      Humidity.innerText=data.humidity
      Temperature.innerText=data.temperature
      TimeStamp.innerText=data.dateTime


      row.appendChild(id); //appending data to my parent element (table)
      row.appendChild(Pressure);
      row.appendChild(Humidity);
      row.appendChild(Temperature);
      row.appendChild(TimeStamp);   

        
    });
  });

  

  buttonGetOne.onclick =() =>{
    tablebody.innerText=" "  //emptying tablebody when clicking the get1 button --- dosent work as expected...
    axios.get(URL+"/"+inputID.value)
    .then(function (response : any) {      
      console.log("GetOne",response);
      response.data.forEach(data => {
        let row = document.createElement("tr");
        tablebody.appendChild(row);
  
  
        let id = document.createElement("td");
        let Pressure = document.createElement("td");
        let Humidity = document.createElement("td");
        let Temperature = document.createElement("td");
        let TimeStamp = document.createElement("td");
       
  
        id.innerText=data.id
        Pressure.innerText=data.pressure
        Humidity.innerText=data.humidity
        Temperature.innerText=data.temperature
        TimeStamp.innerText=data.dateTime
  
  
        row.appendChild(id);
        row.appendChild(Pressure);
        row.appendChild(Humidity);
        row.appendChild(Temperature);
        row.appendChild(TimeStamp); 
        
      });
    });
  }
  
  deletebtn.onclick = () => {
    axios.delete(URL+"/"+inputID.value)
    .then(function (response) {
      //altid kørt
    })
    .catch(function (error) {
      // fejl
    console.log(error)
    });
    }

