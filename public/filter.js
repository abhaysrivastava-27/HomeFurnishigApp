getFilteredArray = (e) => {   
    var filteredData
    var arr = []
    let dataName = e.target.dataset.name
    
    let filterKey
    let filterVal
    if (e.target.tagName == "BUTTON") {
        window.localStorage.clear();
        filteredData = myData
    } else {

        filterKey = window.localStorage.getItem("filter")
        filterVal = window.localStorage.getItem("value")

        if (filterKey) {
            if (dataName != filterKey) {
                window.localStorage.setItem("filter", dataName);

                filteredData = myData.filter(f => ((f[dataName] == e.target.innerHTML) && ((f[filterKey] == JSON.parse(filterVal)[0]) || (f[filterKey] == JSON.parse(filterVal)[1]))))
            } else
                if (e.target.innerHTML != filterVal) {
                    let val = JSON.parse(filterVal)
                    if (val.length == 2) {
                        filteredData = myData
                        window.localStorage.clear();
                    } else if (val.length > 2) {

                        filteredData = myData.filter(f => f[dataName] == e.target.innerHTML)
                    } else {
                        arr.push(val[0])
                        arr.push(e.target.innerHTML)
                        window.localStorage.setItem("value", JSON.stringify(arr));
                        filteredData = myData.filter(f => ((f[filterKey] == val[0] || (f[filterKey] == e.target.innerHTML))))
                    }
                }

        } else {
            arr.push(e.target.innerHTML)
            window.localStorage.setItem("filter", dataName);
            window.localStorage.setItem("value", JSON.stringify(arr));
            filteredData = myData.filter(f => f[dataName] == e.target.innerHTML)
        }
    }
    return filteredData
}
showSide = () => {
    document.getElementById("loginArea").className += ' displaySide';
}
closeSide = () => {
    document.getElementById("loginArea").className = 'area';
}