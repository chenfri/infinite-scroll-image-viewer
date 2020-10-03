import React from 'react'
import './ImageDetails.css'
import { useHistory } from 'react-router-dom';
import StickyHeader from 'react-sticky-header';
import Navbar from '../Navbar';

const ImageDetails = (selectedImg) => {
    window.scrollTo(0, 0)
    const history = useHistory();
    const img = selectedImg.location.state.selectedImg;

    let showDetails = true;
    if(img.caption == null)
        showDetails = false;

    const onClickDownload = () => {
        fetch(img.src)
        .then(resp => resp.blob())
        .then(blob => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.style.display = 'none';
          a.href = url;
          a.download = 'newImg.jpg';
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
        })
    }


    const onClickBack= () =>{
        history.push('/home')
    }

    let shareData = {
        title: 'MDN',
        text: 'Learn web development on MDN!',
        url: 'https://developer.mozilla.org',
      }

    const onClickShare= () =>{
        alert("hi");
        if (navigator.share) {
            navigator
              .share({
                title: "infinite-scroll image viewer",
                text: `Sharing this link with you`,
                url: document.location.href,
              })
              .then(() => {
                console.log('Successfully shared');
              })
              .catch(error => {
                console.error('Something went wrong sharing the blog', error);
              });
          }
    }



    return (
        <div className="mainDiv">

            <StickyHeader header={<Navbar/>}/>

            <div className="firstRow">
                <button 
                        type="button"
                        class="btn btn-primary back" 
                        onClick={onClickBack}>Back</button>

                <img className="selected-Img" key={img.key} src={img.thumbnail}/>
            </div>
            
            <div className="row sec">
                {showDetails ? (<div className="titles col"><h6 >Image details:</h6>
                <h6>{img.caption}</h6></div>): (null)} 

                <div className="col">
                    <button 
                        type="button"
                        class="btn btn-primary share" 
                        onClick={onClickShare}>Share</button>
                    <button 
                        type="button"
                        class="btn btn-primary download" 
                        onClick={onClickDownload}>Download</button>
                </div>
            </div>
            
        </div>
    )
}

export default ImageDetails;