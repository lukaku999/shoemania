import ImageUrlBuilder  from '@sanity/image-url'
import client from './client'

function imageResize(source, height, width) {
    return ImageUrlBuilder(client).image(source).width(width).height(height).url()
}

export {imageResize}