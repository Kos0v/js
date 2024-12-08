let array=  JSON.parse(localStorage.getItem('array')) || [];                                         //головний масив з даними
add = document.getElementById('add')
let form = document.forms.form;
let output = document.getElementById('output')

function out(array){
    for (const Element of array) {
        let div = document.createElement('div')
        div.innerText =`${Element.name}=${Element.value}`
        output.appendChild(div)
    }
    localStorage.setItem('array',JSON.stringify(array))
}
 out(array)

console.log('1' - 'a');


add.onclick=function (e) {
    e.preventDefault()
    let rez = form.nameValue.value.replace(/\s+/g, "").split('=')                  // розділяю за допомогою спліт і пушу в array i видаляю всі пробіли
    if(rez[1]){                                                                    //перевірка на правильність синтаксису
        array.push({name:rez[0],value:rez[1]})
        localStorage.setItem('array',JSON.stringify(array))
        let div = document.createElement('div')
        div.innerText =`${rez[0]}=${rez[1]}`
        output.appendChild(div)
    }
    form.nameValue.value =''                                            //видаляю текст з інпута


}

let sortByName = document.getElementById('sortByName')
sortByName.onclick = function (e){
    e.preventDefault()
    array= array.sort((a,b)=>a.name-b.name)
    console.log(array);
    output.innerText=''                                                     // видаляю всі елементи з div  та заповнюю  його відсортованим масивом
    out(array)
}


let sortByValue = document.getElementById('sortByValue')     // скопіював sortByName та замінив значенння .name на .value
sortByValue.onclick = function (e){
    e.preventDefault()
    array= array.sort((a,b)=>a.value-b.value)
    console.log(array);
    output.innerText=''
    out(array)
}


