const stBerry = document.getElementById('berry');
stBerry.style.backgroundColor = 'red';
const ornge = document.querySelector('[data-foodtype="squishy"]');
ornge.style.backgroundColor = 'orange';
const tagEl = document.getElementsByTagName('li');
const liElements = document.querySelectorAll('li');


// 1
console.log(stBerry);
console.log('I found the berry: ' + stBerry.innerHTML);

// 2
console.log(ornge);
console.log('I found the fruit: ' + ornge.innerHTML);

// 3.1
console.log(tagEl);

// 3.2
console.log('Using the for loop here:')
for(let i = 0; i < tagEl.length; i++){
    
    console.log(tagEl[i].innerHTML);
    if(tagEl[i].innerHTML == 'Pear'){
        tagEl[i].style.backgroundColor = '#57E193';
    }
    
    tagEl[i].style.width = '100px';
    tagEl[i].style.listStyleType = 'none';
}

// 4.1
console.log(liElements);

// 4.2
console.log('Using forEach here:')
liElements.forEach(element => {
    console.log(element.innerHTML);
    element.style.border = '1px solid black';
});