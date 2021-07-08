//notes:
//defer script
//get json-server running: json-server --watch db.json

//global variables

let allDogs; //so we can store an array of ALL dogs
let goodDogs; //so we can store an array of only GOOD dogs

//initial render
function initialRender(){
    fetchDogBarData() //adds dog names to the top bar

    //#good-dog-filter event listener 
    document.querySelector('#good-dog-filter').addEventListener('click', goodDogToggle)
}

initialRender() //calls initial render


//Fetches 

//Fetch dogs for dog bar
function fetchDogBarData(){
    fetch('http://localhost:3000/pups')
    .then(res => res.json())
    .then(json => json.forEach(renderDogBar)) //for each dog in the JSON, execute the renderDogBar function
}

//special fetch when GOOD dog filter is ON
function fetchGoodDogBarData(){
    fetch('http://localhost:3000/pups')
    .then(res => res.json())
    .then(json => {
        allDogs = json;  //array of all dog 
        goodDogs = allDogs.filter((dog) => dog.isGoodDog === true) //filtering all dogs and returning a new array with dogs that have "isGoodDog" : true in data
        goodDogs.forEach(renderDogBar) //for each dog in this new good dog array, execute the renderDogBar function to update our dog bar with only good dogs
    })
}

//Fetch dog page data
function fetchDogPageData(id)  {
    fetch(`http://localhost:3000/pups/${id}`) //will only pull that specific dog's data, based on id
    .then(res => res.json())
    .then(json => renderDogPage(json)) //execute the renderDogPage function passing the dog's specific dataset as the argument
}


//DOM manipulations

function renderDogBar(data){
    //create span elements for each dog
    let span = document.createElement('span')
    //console.log(data.id)
    span.className = "dogSpan"
    //span.id = data.id
    span.textContent = data.name

    //append to id #dog-bar
    document.querySelector('#dog-bar').append(span)

    //add event listener to each Span
    span.addEventListener('click', () => {
        fetchDogPageData(data.id) //calls the fetchDogPageData function, passing the dog's specific ID (data.id) as the argument
    })

}

function renderDogPage(data){
    //clear whatever content is in the #dog-info div
    document.querySelector('#dog-info').innerHTML = ''

    //create elements
    let img = document.createElement('img')
    let h2 = document.createElement('h2')
    let btn = document.createElement('button')

    //add content
    img.src = data.image
    h2.textContent = data.name
    if (data.isGoodDog === true){ 
        btn.textContent = "Good Dog"
    } else { btn.textContent = "Bad Dog"}
   
    //append to #dog-info
    document.querySelector('#dog-info').append(img, h2, btn)

    //add event listener to good / bad dog button

    btn.addEventListener('click', () => {
        //1. changes text of button from good to bad
        if (btn.textContent === "Good Dog"){
            btn.textContent = "Bad Dog"
        } else {btn.textContent = "Good Dog"}
    //2. updates database with new status ("isGoodDog": true or false)
       // Skip
    })
}


//Event handlers

function goodDogToggle(){
    //declare variables for elements
    let toggle = document.querySelector('#good-dog-filter')
    let dogBar = document.querySelector('#dog-bar')

    //if textContent = "Filter good dogs: OFF" then update to "Filter good dogs: ON"
    //clear render dog bar
    //update with only the good dogs 
    if (toggle.textContent === "Filter good dogs: OFF"){
        toggle.textContent = "Filter good dogs: ON";
        dogBar.innerHTML = ''
        fetchGoodDogBarData();
        
    //else update textContent to "Filter good dogs: OFF"
    //clear render dog bar
    //update with only the bad dogs 
    } else {
        toggle.textContent = "Filter good dogs: OFF"
        dogBar.innerHTML = ''
        fetchDogBarData()
    }
  

  
}

