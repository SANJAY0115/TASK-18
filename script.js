let buttons = document.getElementsByClassName("btn");
let countrys = document.getElementById("weather");

//function for getting countries details 

const getcountries = () => {
    fetch("https://restcountries.com/v3.1/all")
        .then(res => res.json())
        .then(data => {
            countrys.innerHTML = ``;
            for (let i = 0; i < data.length - 1; i++) {

                countrys.innerHTML += `
            <div class="weatherdata" >             
               <h3>${data[i]?.continents}</h3>
               <p>Name : ${data[i]?.name?.common}</p>
               <p>Country code : ${data[i]?.cca2}</p> 
               <p>Capital : ${data[i]?.capital?.[0]}<p>
               <img src="${data[i]?.flags.png}" width="200px" height="100px">
               <p>lat & long :${data[i]?.latlng[0].toFixed(2)} , ${data[i]?.latlng[1].toFixed(2)}</p>
               <button class ="button" onclick="getWeather(${i})" id="btn${i}">click for weather</button>                                   
            </div> `


  //  function for getting weather details          
            }
            getWeather = (id) => {
                let duplicateID = document.getElementById("temp" + id)
                if (!duplicateID) {
                    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${data[id].name.common}&appid=7b70895ba7a088e839146922c3c4aed1`)
                        .then(res => res.json())
                        .then(data => {
                            let div = document.createElement('div');
                            div.setAttribute("id", "temp" + id)
                            div.innerHTML += ` 
                                   <p>Temprature : ${data.main.temp}</p>
                                    <p>Wind-degree : ${data.wind.deg}</p> 
                                    <p>Wind-speed : ${data.wind.speed}<p>
                                     `

                            document.getElementById('btn' + id).after(div)
                        })
                }
            }
        });


}
