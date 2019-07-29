/* Oyunun qanunlari:
En az bir defe komek alinibsa bele fail sayilir
Eger her birini ozu tapibsa o zaman success sayilir
---------------------------------------------------
Diiiiiqqqeett----->Qeydler:
Bezi bayraglarda ag reng var,bu sizi aldatmasin!
ve SetTimeout funksiyasindan istifade olunub,bezi problemler ona gore yarana biler

*/



//Using colors array
var allColor = ["blue", "red", "green", "yellow", "white", "black", "violet", "brown", "lightblue"]
// Our Countries
var countries = [
    {
        name: "Azerbaijan",
        colors: ["blue", "red", "green"],
        status: "active"
    },
    {
        name: "Germany",
        colors: ["black", "red", "yellow"],
        status: "active"
    },
    {
        name: "Bulgaria",
        colors: ["white", "green", "red"],
        status: "active"
    },
    {
        name: "Hungary",
        colors: ["red", "white", "green"],
        status: "active"
    },
    {
        name: "Lithuania",
        colors: ["yellow", "green", "red"],
        status: "active"
    },
    {
        name: "Estonia",
        colors: ["blue", "black", "white"],
        status: "active"
    }
]
//  Color Boxes
for (let i = 0; i < allColor.length; i++) {
    var colorDiv = document.createElement("div")
    colorDiv.style.width = "50px"
    colorDiv.style.height = "50px"
    colorDiv.style.height = "50px"
    colorDiv.style.marginBottom = "10px"
    colorDiv.style.borderRadius = "50%"
    colorDiv.style.border = "1px solid gray"
    colorDiv.style.backgroundColor = allColor[i]
    colorDiv.setAttribute("draggable", "true")
    colorDiv.addEventListener("dragstart", dragStart)
    document.getElementById("colorBox").append(colorDiv)

}

//  Dropzones
var drop = document.querySelectorAll(".flag");
for (let i = 0; i < drop.length; i++) {
    drop[i].style.backgroundColor = "transparent"
    drop[i].addEventListener("dragover", dragOver)
    drop[i].addEventListener("dragleave", dragLeave)
    drop[i].addEventListener("drop", dragDrop)

}
//  Countries Names
for (let i = 0; i < countries.length; i++) {
    var countryList = document.createElement("li")
    countryList.style.fontSize = "20px"
    countryList.style.listStyleType = "none"
    countryList.className = "countryChoose"
    countryList.innerText = countries[i].name
    countryList.addEventListener("click", getColor)

    document.getElementById("countries").append(countryList)
}

function dragStart(e) {
    e.dataTransfer.setData("color", e.target.style.backgroundColor)
}
function dragOver(e) {
    e.preventDefault()
}
function dragLeave(e) {
    e.preventDefault()
}
//Variables
var dropCount = 0;
var clickCount = 0;
var bool;
var gameOver;
var searchElem;
var listElem = document.getElementsByClassName("countryChoose")

//Drop function
function dragDrop(e) {
    e.target.style.backgroundColor = e.dataTransfer.getData("color")
    dropCount = dropCount + 1
    if (dropCount == 3) {
        dropCount = 0
        for (let i = 0; i < countries.length; i++) {
            bool = true
            for (let n = 0; n < drop.length; n++) {
                if (countries[i].colors[n] != drop[n].style.backgroundColor) {
                    bool = false;
                    break;
                }

            }
            if (bool && countries[i].status == "active") {
                searchElem = countries[i].name
                countries[i].status = "deactive"
                document.getElementById("findingCountry").innerHTML = '<h1>Great!You find flag of ' + searchElem + '</h1>'
                break;
            }
            else if (bool && countries[i].status == "deactive") {
                document.getElementById("findingCountry").innerHTML = "<h1>You already find flag of " + countries[i].name + " !</h1>"
                break;
            }
            else if (bool && countries[i].status == "fail") {
                document.getElementById("findingCountry").innerHTML = "<h1>You already used help of us for finding flag of " + countries[i].name + " !</h1>"
                break;
            }
            else {
                document.getElementById("findingCountry").innerHTML = "<h1>Wrong!This flag does not exist.</h1>"

            }
        }
        endGame()
        setTimeout(transParent, 2000)

    }
    for (const item of listElem) {
        if (item.innerText == searchElem) {
            item.style.textDecoration = "line-through"
            item.style.textDecorationColor = "red"
            item.removeEventListener("click", getColor)

        }
    }

}

//Function for transparent background
function transParent() {
    for (let i = 0; i < drop.length; i++) {
        drop[i].style.backgroundColor = "transparent"

    }
    document.getElementById("findingCountry").innerHTML = " "
}

//Function for get color in click
function getColor(e) {
    switch (++clickCount) {
        case 1:
            for (let i = 0; i < countries.length; i++) {
                if (countries[i].name == e.target.innerText) {
                    e.target.style.color = "red"
                    countries[i].status = "fail"
                    drop[0].style.backgroundColor = countries[i].colors[0]
                    break
                }
            }
            break;
        case 2:
            for (let i = 0; i < countries.length; i++) {
                if (countries[i].name == e.target.innerText) {

                    drop[1].style.backgroundColor = countries[i].colors[1]
                    break
                }
            }
            break
        case 3:
            for (let i = 0; i < countries.length; i++) {
                if (countries[i].name == e.target.innerText) {
                    drop[2].style.backgroundColor = countries[i].colors[2]
                    break
                }
            }
            setTimeout(transParent, 1500)
            setTimeout(endGame, 1600)
            clickCount = 0
    }


}

//Function for end of game
function endGame() {
    gameOver = true;
    for (let i = 0; i < countries.length; i++) {
        if (countries[i].status == "active") {
            gameOver = false;
            break;
        }
    }
    if (gameOver) {
        document.getElementById("mainContent").style.display = "none"
        var endSection = document.createElement("div")
        var image = document.createElement("img")
        image.style.width = "700px"
        image.style.height = "400px"
        endSection.style.textAlign = "center"
        endSection.style.fontSize = "50px"
        for (let i = 0; i < countries.length; i++) {
            if (countries[i].status == "fail") {
                endSection.innerHTML = "<h1>You used help of us!Try again without help!</h1>"
                image.src = "images/fail.jpg"
                break;
            }
            else {
                endSection.innerHTML = "<h1>You are perfect!You find all flags without help!</h1>"
                image.src = "images/success.jpg"
            }
        }
        endSection.appendChild(image)
        document.body.appendChild(endSection)
    }

}