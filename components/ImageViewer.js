import React, { useState } from 'react'
import ImageView from 'react-native-image-viewing'
import { Image, TouchableOpacity } from 'react-native'
import { string, object } from 'prop-types'

const ImageViewer = ({ imageUri, style }) => {
    const [fullScreenVisible, setFullScreenVisible] = useState(false)

    return fullScreenVisible ? (
        <ImageView
            images={[{ uri: imageUri }]}
            imageIndex={0}
            visible={fullScreenVisible}
            onRequestClose={() => setFullScreenVisible(false)}
        />
    ) : (
        <TouchableOpacity
            onPress={() => {
                setFullScreenVisible(true)
            }}
        >
            <Image
                source={{ uri: imageUri }}
                style={style}
                resizeMode="contain"
            />
        </TouchableOpacity>
    )
}

ImageViewer.propTypes = {
    imageUri: string.isRequired,
    style: object
}

export default ImageViewer
