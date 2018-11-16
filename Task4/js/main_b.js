'use strict';

// HTML contains element 'message'. This is used to show the server's response
// Select it and save it as a variable/object

// make function 'upload' which
// - prevents the form from sending
// - writes 'Upload in progress...' into 'message' element
// - selects the file input field
// - makes FormData -object and adds the file selected by the user into the object
// - send the file to the same url as in task a by using fetch -method
// - when file upload is complete, writes server response to 'message' element
// function ends

// make an event listener which calls upload function when the form is submitted


const prompt = document.querySelector('#message');
const input = document.querySelector('input[type="file"]');

const upload = (click) => {

  click.preventDefault();
  prompt.innerHTML = 'Upload in progress...';

  const form = new FormData();
  form.append('selectedFile', input.files[0]);

  const settings = {
    method: 'POST',
    body: form
  };
  fetch('/node/task4', settings).then((res) => {

  }).then((json) => {
    console.log(json);
    prompt.innerHTML = 'upload complete';

  });
};

document.querySelector('form').addEventListener('submit', upload);