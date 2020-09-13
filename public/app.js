var coll = document.getElementsByClassName("collapsible");


for (let i = 0; i < coll.length; i++) {                 // For collapsible navbar
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
var firebaseConfig = {                       // Fetching json data from Firebase Realtime Database
  apiKey: "AIzaSyD_TlGlkrPTFRp0Nxos2e68eQPlKzOKi6Q",
  authDomain: "json-test-6eaa3.firebaseapp.com",
  databaseURL: "https://json-test-6eaa3.firebaseio.com",
  projectId: "json-test-6eaa3",
  storageBucket: "json-test-6eaa3.appspot.com",
  messagingSenderId: "1060518651112",
  appId: "1:1060518651112:web:6c6783496e471864f3555d",
  measurementId: "G-1QE7WHJP06"
};

fetchData = () => {                 // Fetch and render initial data
  window.localStorage.clear();
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();
  var ref = database.ref("data")

  const app = document.getElementById('categories')
  const load = document.createElement('div')
  load.setAttribute('class', 'loaderMessage')
  load.innerHTML = "Loading..."
  app.appendChild(load)

  ref.on("value", (snapshot) => {
    myData = snapshot.val();
    const app = document.getElementById('categories')
    const container = document.createElement('div')
    container.setAttribute('class', 'container')
    app.appendChild(container)
    var request = new XMLHttpRequest()
    request.open('GET', 'https://api.herokuapp.com/furniture', true)  
    request.onload = () => {
     
    }
    var response = myData
    createDynamicHtml(response)
  })
}

filter = (e) => {                            // Function to filter data when user searches from search box.
  if (e && (e.keyCode === 13 || e.target.value == "") || e == null) {
    var userInput = document.getElementById("userInput").value;
    var a = userInput;
    if (a == "") {
      createDynamicHtml(myData)
    } else {
      a = a.toLowerCase();
      const app = document.getElementById('categories')
      app.innerHTML = ''
      filteredData = myData.filter(f => f['title'].toLowerCase() == a)
      if (filteredData.length > 0) createDynamicHtml(filteredData)
      else app.innerHTML = 'No Resuls Found! Please try with different filters'
    }
  }

}
getFilterData = (e) => {                        // Function to filter data when user selects category/color          
  closeSide();
  const app = document.getElementById('categories')
  app.innerHTML = ''
  var filteredData
  
  filteredData = getFilteredArray(e)
  if (filteredData.length > 0) {
    createDynamicHtml(filteredData)
  } else {
    app.innerHTML = 'No Resuls Found! Please try with different filters'
  }
}

