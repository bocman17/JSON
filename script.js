let myForm = document.getElementById("test-form")

if(localStorage.getItem("criminals") == null){
    var myArray = []
} else {
    myArray = JSON.parse(localStorage.getItem("criminals"))
}

myForm.addEventListener("submit", function(e) {
    e.preventDefault();
   
    myArray.push({
        id: "",
        firstName: e.target.elements.firstName.value,
        lastName: e.target.elements.lastName.value,
        crime: e.target.elements.crime.value
    })

    e.target.elements.firstName.value = ""
    e.target.elements.lastName.value = ""
    e.target.elements.crime.value = ""

    myArrayJSON = JSON.stringify(myArray)
    localStorage.setItem("criminals", myArrayJSON)
})

// Vypisování zpět do stránky
let toList = document.querySelector(".to-list")
toList.addEventListener("click", function(e) {
    if(localStorage.getItem("criminals") == null) {

        let paragraph = document.createElement("p")
        paragraph.textContent = "Database is empty"
        paragraph.classList.add("basic-styles")
        document.querySelector(".list-criminals").appendChild(paragraph)

    } else { 

    let myStorage = localStorage.getItem("criminals")
    let myStorageJSON = JSON.parse(myStorage)

    document.querySelector(".list-criminals").innerHTML = ""

    myStorageJSON.forEach(function(oneCriminal) {
        let paragraph = document.createElement("p")
       
        paragraph.innerHTML = `First Name: ${oneCriminal.firstName}<br>Last Name: ${oneCriminal.lastName}<br> Crime: ${oneCriminal.crime}`

        paragraph.classList.add("basic-styles")

        document.querySelector(".list-criminals").appendChild(paragraph)
    })

    }

    

})

// filter
let nameFilter = document.querySelector(".name-filter")
let myStorage = localStorage.getItem("criminals")
let myStorageJSON = JSON.parse(myStorage)

nameFilter.addEventListener("input", function(e) {
    let whatWeSearch = e.target.value

    let ourResults = myStorageJSON.filter(function(oneCriminal) {
        return oneCriminal.firstName.toLowerCase().includes(whatWeSearch.toLowerCase())
    })

    document.querySelector(".filter-name").innerHTML = ""
    document.querySelector(".list-criminals").innerHTML = ""

    ourResults.forEach(function(oneCriminal) {
        let paragraph = document.createElement("p")
        paragraph.innerHTML = `First Name: ${oneCriminal.firstName} <br>
        Last Name: ${oneCriminal.lastName} <br>
        Crime: ${oneCriminal.crime}`
        document.querySelector(".filter-name").appendChild(paragraph)
    })
})