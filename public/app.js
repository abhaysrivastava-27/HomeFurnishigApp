// var slider = document.getElementById("myRange");
// var output = document.getElementById("demo");
// output.innerHTML = slider.value;

// slider.oninput = function() {
//   output.innerHTML = this.value;
// }


var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}

var myData
var firebaseConfig = {
  apiKey: "AIzaSyD_TlGlkrPTFRp0Nxos2e68eQPlKzOKi6Q",
  authDomain: "json-test-6eaa3.firebaseapp.com",
  databaseURL: "https://json-test-6eaa3.firebaseio.com",
  projectId: "json-test-6eaa3",
  storageBucket: "json-test-6eaa3.appspot.com",
  messagingSenderId: "1060518651112",
  appId: "1:1060518651112:web:6c6783496e471864f3555d",
  measurementId: "G-1QE7WHJP06"
};



function fetchData(e) {
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();
  var ref = database.ref("data")

  const app = document.getElementById('categories')
  const load = document.createElement('div')
  load.setAttribute('class','loaderMessage')
  load.innerHTML="Loading..."
  app.appendChild(load)

  ref.on("value", function (snapshot) {
    myData = snapshot.val();
    console.log(myData, "oooo")
    const app = document.getElementById('categories')
    
    
    const container = document.createElement('div')
    container.setAttribute('class', 'container')
    app.appendChild(container)
    var request = new XMLHttpRequest()
    request.open('GET', 'https://ghibliapi.herokuapp.com/films', true)
    request.onload = function () {
      var response = myData   
     createDynamicHtml(response)
    }

    request.send()

  })
}

function filter() {
  var userInput = document.getElementById("userInput").value;
  var a = userInput;
  //a = a.toLowerCase();
  const app = document.getElementById('categories')
  app.innerHTML = '' 
  filteredData = myData.filter(f =>  f['title'] == a)
  createDynamicHtml(filteredData)
  }


function getFilterData(e) {
  closeSide();
  let filterKey
  let filterVal
  const app = document.getElementById('categories')
  app.innerHTML = '' 
  let val = e.target.id
  var filteredData
  if(e.target.tagName == "BUTTON"){
    window.localStorage.clear();
    filteredData = myData
  }else{
  
   filterKey = window.localStorage.getItem("filter")
   filterVal = window.localStorage.getItem("value")
  
  if(filterKey){
    if(e.target.id != filterKey){
      window.localStorage.setItem("filter",val );
      window.localStorage.setItem("value",e.target.innerHTML );
    }
  }else {
    window.localStorage.setItem("filter",val );
    window.localStorage.setItem("value",e.target.innerHTML );
  }
  filteredData = myData.filter(f =>  {if(filterKey){return ((f[e.target.id] == e.target.innerHTML) && (f[filterKey] == filterVal))}else return f[e.target.id] == e.target.innerHTML})
}
   
  if(filteredData.length>0){
  createDynamicHtml(filteredData)
  } else {
    app.innerHTML = 'No Resuls Found! Please try with different filters'
  }
}

function createDynamicHtml(filteredData){
  const app = document.getElementById('categories')
  app.innerHTML = ''
  const container = document.createElement('div')
  container.setAttribute('class', 'container')
  app.appendChild(container)
  return(
    filteredData.map((d) => {
      const card = document.createElement('div')
      card.setAttribute('class', 'displayContent')
      const card1 = document.createElement('div')
      card1.setAttribute('class', 'imgCover')
      const logo = document.createElement('img')
      logo.setAttribute('src', d.image)
      logo.setAttribute('class', 'image')
      const p = document.createElement('p')
      p.textContent = d.title
      p.setAttribute('class', 'proInfoN')
      container.appendChild(card)
      card.appendChild(card1)
      card1.appendChild(logo)
      card.appendChild(p)
  
    })
  )
}
function showSide() {
  document.getElementById("loginArea").className += ' displaySide';
}
function closeSide() {
  document.getElementById("loginArea").className = 'area';
}