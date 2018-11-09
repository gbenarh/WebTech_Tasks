// Create function 'showImages' which
// loads images.json which has links to images as an array.

// create a loop which builds the following HTML from every image in the array: 
/*
<li>
    <figure>
        <a href="img/original/filename.jpg"><img src="img/thumbs/filename.jpg"></a>
        <figcaption>
            <h3>Title</h3>
        </figcaption>
    </figure>
</li>
*/
// Make the above HTML by using DOM methods.
// Create elements with createElement()
// Add attributes with setAttribute()
// Add elements with appendChild
// When the above HTML is ready append it to the <ul> element

const showImages = () => {

    fetch('images.json').then((res) =>{
        return res.json();
      }).then((data) =>{
            const ulist = document.querySelector('ul');
            
            data.forEach((image) =>{
            const header = document.createElement('h3');
            const figC = document.createElement('figcaption');
            const link = document.createElement('a');
            const img = document.createElement('img');
            const fig = document.createElement('figure');
            const item = document.createElement('li');
            
            header.innerText = image.mediaTitle;
            figC.appendChild(header);
            link.setAttribute('href', `img/original/${image.mediaUrl}`);
  
            img.setAttribute('src', `img/thumbs/${image.mediaThumb}`);
            link.appendChild(img);
            fig.appendChild(link);
  
            fig.appendChild(figC);
            item.appendChild(fig);
            ulist.appendChild(item);

        });
    });

    
};
  
showImages();