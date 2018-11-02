'use strict'
/*
const test = (x=2, y=4, z=3) => {
    return x+y+z;
};
console.log(test(9,1));
*/
//document.getElementById("test").innerText = "Paragraph Changed";
//const firstChange = document.getElementById("test").innerHTML = "Paragraph Changed";
const firstchange = document.querySelector('#test');
firstchange.innerHTML = "Changed <strong>this</strong> Paragraph";

const otherChanges = document.querySelectorAll('.example');
console.log(otherChanges);

const changeColor = (evt) => {
    console.log(evt.currentTarget);
    evt.currentTarget.setAttribute('style', 'background: green');
}

for(let i=0; i < otherChanges.length; i++){
    //otherChanges.innerHTML = "more <string>changes</string>";
    console.log(otherChanges[i]);
    otherChanges[i].setAttribute('style', 'color:red');
    otherChanges[i].addEventListener('click', changeColor);
}
//otherChanges.innerHTML = "more changes";
document.querySelector('h1').innerHTML = 'JS Rules';
//document.getElementsByTagName("p")[0].setAttribute("example", "Deleted01");

for(const el of otherChanges){
    el.innerHTML = 'modified';
}
/*
otherChanges.forEach(element => {

});
*/

//firstchange.addEventListener("click", changeText(this));
firstchange.addEventListener("click", (evt) => {
    console.log(evt.target);
    evt.target.setAttribute('style', 'background: yellow');
});

function changeText (element){
    firstchange.innerHTML = "Wow";
}