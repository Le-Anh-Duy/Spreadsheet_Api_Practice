var nameBox = document.getElementById("nameBox")
var priceBox = document.getElementById("priceBox")
var tableData = document.getElementById("myTable")
const buy = document.getElementById("Buy")
const sell = document.getElementById("Sell")

table = []

class newRow {
    constructor(method, rName, rPrice, rId) {
        console.log(method, rName, rPrice, rId);
        this.rId = Number(rId)
        this.row = tableData.insertRow(-1);
        
        this.ID = this.row.insertCell(0)
        this.ID.innerText = rId + 1
        this.ID.id = `id_${rId}`
        
        this.method = this.row.insertCell(1)
        this.method.innerText = method
        this.method.id = `method_${rId}`
        
        this.name = this.row.insertCell(2)
        this.name.innerText = rName
        this.name.id = `name_${rId}`
        
        this.price = this.row.insertCell(3)
        this.price.innerText = rPrice
        this.price.id = `price_${rId}`
        
        this.row.id = `row_${rId}`;

        this.upButton = document.createElement('button')
        this.dwButton = document.createElement('button')
        this.upButton.id = `btn_${2*rId}`
        this.dwButton.id = `btn_${2*rId + 1}`

        this.upButton.textContent = "^"
        this.dwButton.textContent = "v"


        const lastCell = this.row.insertCell(4)
        lastCell.appendChild(this.upButton)
        lastCell.appendChild(this.dwButton)

        this.upButtonBehavior = this.upButtonBehavior.bind(this);
        this.dwButtonBehavior = this.dwButtonBehavior.bind(this);

        this.upButton.addEventListener("click", this.upButtonBehavior)
        this.dwButton.addEventListener("click", this.dwButtonBehavior)
    }

    interChange(other) {
        let temp = this.ID.innerText
        this.ID.innerText = other.ID.innerText
        other.ID.innerText = temp

        temp = this.method.innerText
        this.method.innerText = other.method.innerText
        other.method.innerText = temp

        temp = this.name.innerText
        this.name.innerText = other.name.innerText
        other.name.innerText = this.name.innerText

        temp = this.price.innerText
        this.price.innerText = other.price.innerText
        other.price.innerText = temp
    }

    upButtonBehavior = function() {
        console.log("this call up func", this.rId)
        if (this.rId == 0) return
        this.interChange(table[this.rId - 1])
    }

    dwButtonBehavior = function() {
        console.log("this call dw func", this.rId)
        if (this.rId + 1 >= table.length) return
        this.interChange(table[this.rId + 1])
    }
}


buy.addEventListener("click", () =>{
    const strName = nameBox.value
    const strPrice = priceBox.value
    const new_row = new newRow("buy", strName, strPrice, table.length)
    // new_row.ID.innerText = 123;
    table.push(new_row)
})

sell.addEventListener("click", () =>{
    const strName = nameBox.value
    const strPrice = priceBox.value
    const new_row = new newRow("sell", strName, strPrice, table.length)
    // new_row.ID.innerText = 123;
    table.push(new_row)
})
