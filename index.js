

let container = document.getElementById("container")
let form = document.getElementById("form")

// get
async function getData() {
    try {
        let res = await fetch("https://json-server-2pfw.onrender.com/users")
        let data = await res.json()
        console.log(data)
        appendData(data)
    }
    catch (e) {
        console.log('e', e)
    }
}
getData()

// post 
async function postData(name,email){
    try{
      await fetch('https://json-server-2pfw.onrender.com/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
             name,email
            })
        })
        getData()  // call the getData fun

    }
    catch(e){
        console.log('e', e)
    }
}

// delete
async function deleteData(id){
    try {
      await fetch(`https://json-server-2pfw.onrender.com/users/${id}`, {
            method: 'DELETE',
        })
        getData() // call the getData fun
    }
    catch (e) {
        console.log('e', e)
    }
}

// edit
async function patchData(id,name){
    try{
      await fetch(`https://json-server-2pfw.onrender.com/users/${id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            name
            })
        })
        getData()  // call the getData fun

    }
    catch(e){
        console.log('e', e)
    }
}

function appendData(data) {
    container.innerHTML = ""

    data && data.map((el, index) => {
        let box = document.createElement("div")
        box.style.border = "1px solid black"
        box.style.textAlign="center"

        let name = document.createElement("p")
        name.innerText = el.name

        let email = document.createElement("p")
        email.innerText = el.email

        let delbtn = document.createElement("button")
        delbtn.innerText="Delete"
        delbtn.addEventListener("click",function(){
            deleteFn(el,index)
        })
        let editbtn = document.createElement("button")
        editbtn.innerText="Edit"
        editbtn.addEventListener("click",function(){
            editFn(el,index)
        })

        box.append(el.id, name, email, editbtn, delbtn)
        container.append(box)

        form.reset()
    })
}

// post fun
form.addEventListener("submit",function(e){
e.preventDefault()
let name = document.getElementById("name").value
let email = document.getElementById("email").value

postData(name,email) // call postData fun

})

// delete fun
function  deleteFn(el,index){
    // console.log('el', el)
    deleteData(el.id)
}

// edit fun
function  editFn(el,index){
    // console.log('el', el)
    // let name = document.getElementById("name").value
   let change=prompt()
//    console.log('a', a)
    if(change.length > 0){
    patchData(el.id, change)
   }
}



