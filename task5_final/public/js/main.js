'use strict';

const frm = document.querySelector('#mediaform');
const updatefrm = document.querySelector('#updateform');
const list = document.querySelector('#imagelist');
const deleteBtn = document.querySelector('#btn_delete');
const searchFrm = document.querySelector('#searchField');
const resetBtn = document.querySelector('#reset');
const p = document.querySelector('#prompt');


const search = (evt) => {
  evt.preventDefault();
  const data = document.querySelector('input[name="searchWord"]').value;

  if (data !== "") {

    const settings = {
      method: 'GET'
    };

    fetch('/node/search/' + data, settings).then((response) => {
      //console.log(response);
      return response.json();
    }).then((json) => {
      console.log(json);

      list.innerHTML = '';
      p.innerText = 'Search Results...';

      json.forEach((image) => {
        const li = document.createElement('li');
        const title = document.createElement('h3');
        title.innerHTML = image.title;
        li.appendChild(title);
        const img = document.createElement('img');
        img.src = './thumbs/' + image.thumbnail;
        img.addEventListener('click', () => {
          fillUpdate(image);
        });
        li.appendChild(img);
        list.appendChild(li);
      });
    });
  }
  else{
    console.log('Search field is empty!!!');
  }
};

const fillUpdate = (image) => {
  console.log(image);
  document.querySelector('#updateform input[name=mID]').value = image.mID;
  document.querySelector('#updateform input[name=category]').value = image.category;
  document.querySelector('#updateform input[name=title]').value = image.title;
  document.querySelector('#updateform input[name=details]').value = image.details;
  document.querySelector('#updateform input[name=original]').value = image.original;
  document.querySelector('#updateform button').removeAttribute('disabled');
  deleteBtn.removeAttribute('disabled');
};

const getImages = () => {
  fetch('/node/images').then((response) => {
    return response.json();
  }).then((json) => {
    console.log(json);
    // clear list before adding updated data
    list.innerHTML = '';
    p.innerText = 'All images...';
    json.forEach((image) => {
      const li = document.createElement('li');
      const title = document.createElement('h3');
      title.innerHTML = image.title;
      li.appendChild(title);
      const img = document.createElement('img');
      img.src = 'thumbs/' + image.thumbnail;
      img.addEventListener('click', () => {
        fillUpdate(image);
      });
      li.appendChild(img);
      list.appendChild(li);
    });
  });
};

const sendForm = (evt) => {
  evt.preventDefault();
  const fd = new FormData(frm);
  const settings = {
    method: 'post',
    body: fd,
  };

  fetch('/node/upload', settings).then((response) => {
    return response.json();
  }).then((json) => {
    console.log(json);
    // update list
    getImages();
  });
};

const sendUpdate = (evt) => {
  evt.preventDefault();
  // get data from updatefrm and put it to body
  const data = JSON.stringify([
    updatefrm.querySelector('input[name="category"]').value,
    updatefrm.querySelector('input[name="title"]').value,
    updatefrm.querySelector('input[name="details"]').value,
    updatefrm.querySelector('input[name="mID"]').value,
  ]);
  const settings = {
    method: 'PATCH',
    body: data,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  };
  // app.patch('/images'.... needs to be implemented to index.js (remember body-parser)
  fetch('/node/images', settings).then((response) => {
    return response.json();
  }).then((json) => {
    console.log(json);
    updatefrm.reset();
    document.querySelector('#updateform button').setAttribute('disabled', 'disabled');
    // update list
    getImages();
  });
};

const deleteImage = (evt) => {
  evt.preventDefault();
  //disable update
  document.querySelector('#updateform button').setAttribute('disabled', 'disabled');
  // get data from updatefrm and put it to body
  const data = JSON.stringify([
    updatefrm.querySelector('input[name="mID"]').value,
    updatefrm.querySelector('input[name="original"]').value,
  ]);
  const settings = {
    method: 'DELETE',
    body: data,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  };
  // app.delete('/images'.... needs to be implemented to index.js (remember body-parser)
  fetch('/node/delete', settings).then((res) => {
    console.log(res);
    updatefrm.reset();
    deleteBtn.setAttribute('disabled', 'disabled');
    // update list
    getImages();
  });
};

searchFrm.addEventListener('submit', search);
frm.addEventListener('submit', sendForm);
updatefrm.addEventListener('submit', sendUpdate);
deleteBtn.addEventListener('click', deleteImage);
resetBtn.addEventListener('click', getImages);

getImages();
