//notes:
//defer script
//get json-server running: json-server --watch db.json

//global variables

let allDogs;
let goodDogs;

//initial render
function initialRender(){
    fetchDogBarData()

    //#good-dog-filter event listener 
    document.querySelector('#good-dog-filter').addEventListener('click', goodDogToggle)
}

initialRender()


//Fetch dogs for dog bar
function fetchDogBarData(){
    fetch('http://localhost:3000/pups')
    .then(res => res.json())
    .then(json => json.forEach(renderDogBar))
}

function fetchGoodDogBarData(){
    fetch('http://localhost:3000/pups')
    .then(res => res.json())
    .then(json => {
        allDogs = json;
        goodDogs = allDogs.filter((dog) => dog.isGoodDog === true)
        goodDogs.forEach(renderDogBar)
    })
}

//fetch dog page data
function fetchDogPageData(id)  {
    fetch(`http://localhost:3000/pups/${id}`)
    .then(res => res.json())
    .then(json => renderDogPage(json))
}


//DOM manipulations

function renderDogBar(data){
    //create span elements for each dog
    let span = document.createElement('span')
    let id = data.id
    //console.log(id)
    span.className = "dogSpan"
    //span.id = data.id
    span.textContent = data.name

    //append to id #dog-bar
    document.querySelector('#dog-bar').append(span)

    //add event listener to each Span
    //callback function  ==> function renderDogPage()
    span.addEventListener('click', () => {
        fetchDogPageData(data.id)
    })

}

function renderDogPage(data){
    //clear whatever content is in the #dog-info
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
    //callback function --> function buttonToggle()

    btn.addEventListener('click', () => {
        //1. changes text of button from good to bad
        if (btn.textContent === "Good Dog"){
            btn.textContent = "Bad Dog"
        } else {btn.textContent = "Good Dog"}
    //2. updates database with new status ("isGoodDog": true or false)
       // data.id

    

    })
}


//Event handlers

function goodDogToggle(){
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

