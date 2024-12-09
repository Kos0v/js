let array=  JSON.parse(localStorage.getItem('array')) || [];                                         //головний масив з даними
add = document.getElementById('add')
let form = document.forms.form;
let output = document.getElementById('output')
let target = [];                                                                    // масив де зберігаються індекси виділених елементів
let id = +localStorage.getItem('id') || 1;                                   // унікальний номер для кожного елементу


function out(array){                                                                //фунція для виводу алементів в output
    output.innerText=''
    for (const element of array) {
        let div = document.createElement('div')
        div.innerText =`${element.name}=${element.value}`
        output.appendChild(div)
        div.onclick = function (){                                                    //функція для виділення обєктів
            if(div.style.backgroundColor==='skyblue'){                                  //збереження та видалення id виділених обєктів
                div.style.backgroundColor='white'
                index = target.findIndex(ind=>ind === id)
                target.splice(index,1)
            } else{
                div.style.backgroundColor='skyblue'
                target.push(element.id);
            }
        }
    }
    localStorage.setItem('array',JSON.stringify(array))                                             //збереження масиву
}


out(array)                                                          // вивожу дані в масив після того як оновили сторінку


add.onclick=function (e) {
    e.preventDefault()
    let rez = form.nameValue.value.split('=')                       //розділяю стрінгу по символу "="
    if(rez[1]){
        array.push({name:rez[0].trim(),value:rez[1].trim(),id:id})                  // прибираю лишні ' '
        localStorage.setItem('array',JSON.stringify(array))                         //зберігаю новий масив
        form.nameValue.value =''                                                    //прибираю  текс з інпута
        out(array)
        localStorage.setItem('id',id)                                               //зберігаю і оновлюю id
        id++
    }
}

let sortByName = document.getElementById('sortByName')
sortByName.onclick = function (e){
    e.preventDefault()
    array= array.sort((a,b)=>{                                  //сортую за name та вивожу новий масив він збережеться в функції out в localStorage
        if (a.name>b.name){
            return 1;
        } else if (a.name<b.name){
            return -1;
        }else{
            return 0;
        }
    })
    out(array)
}


let sortByValue = document.getElementById('sortByValue')
sortByValue.onclick = function (e){                            //теж саме що і sortByName
    e.preventDefault()
    array= array.sort((a,b)=>{
        if (a.value>b.value){
            return 1;
        } else if (a.value<b.value){
            return -1;
        }else{
            return 0;
        }
    })
    out(array)
}

let deleteObj = document.getElementById('delete')
deleteObj.onclick = function (e){
    e.preventDefault()
    for (let i = 0; i < target.length; i++) {                        //за допомогою циклу прохожусь по всім id виділених обєктів знаходжу їх індекс та вирізаю з array
        const element = target[i];
        let index = array.findIndex(obj=>obj.id === element)
        array.splice(index,1)
    }
    target=[]
    out(array)
}




