import React, {useState, useEffect } from 'react'
import Gallery from 'react-grid-gallery';
import { useHistory} from 'react-router-dom';

 const GalleryGrid = ({images}) => {
    const history = useHistory();

    const [pagePosition, setPagePosition] = useState(0);
    const [selectedImg, setSelectedImg] = useState([]); /* image clicked by the user */

    let IMAGES = []

    images.forEach(img => {
        IMAGES.push(    /*build array of images for Gallery component*/
         {
            src: img.urls.regular,
            thumbnail: img.urls.small,
            thumbnailWidth: img.width/10,
            thumbnailHeight: img.height/10,
            caption: img.alt_description,
            key: img.id
        })
    });

 
    const imageClicked = (index) => {
        setSelectedImg(IMAGES[index]);
        setPagePosition(window.pageYOffset)
      }


    useEffect(() => { 
        if(selectedImg.length !== 0){
             history.push(`/imageDetails/${selectedImg.key}`,
              {selectedImg:selectedImg, pagePosition:pagePosition, images: images})
        }

    }, [selectedImg])



    return (
        <div>
            <Gallery images={IMAGES}
                enableImageSelection={false}
                enableLightbox={false}
                rowHeight={250}
                onClickThumbnail={imageClicked}
                margin={3}/>
        </div>
    )
}

export default GalleryGrid;