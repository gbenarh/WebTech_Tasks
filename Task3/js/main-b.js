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
// After the loop print the HTML into <ul> element using innerHTML.

const showImages = () => {
    fetch('images.json').then((res) => {
        return res.json();
    }).then((data) => {
        let item = document.querySelector('ul').innerHTML = data.map((image) => {
            return `<li> 
                        <figure>
                            <a href="img/original/${image.mediaUrl}"><img src="img/thumbs/${image.mediaThumb}"></a>
                            <figcaption>
                                <h3>${image.mediaTitle}</h3>
                            </figcaption>
                        </figure>
                    </li>`;
        }).join("");
    })
};

showImages();