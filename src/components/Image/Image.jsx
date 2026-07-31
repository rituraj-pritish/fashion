import React, { useEffect, useState } from 'react'
import MoonLoader from 'react-spinners/MoonLoader'
import { Loader } from './Image.styles'
import fetch from 'core/fetch'

const CustomImage = ({ src, alt, size: loaderSize, s3Key }) => {
	const [loading, setLoading] = useState(false)
	const [imageUrl, setImageUrl] = useState()

	useEffect(() => {
    if(src || isCached(s3Key)) return
    getImageUrl()
	}, [s3Key])

	useEffect(() => {
    if(s3Key || isCached(src)) return
		setLoading(true)
	}, [src])

	const getImageUrl = async () => {
    setLoading(true)
    const res = await fetch(`/products/images/${s3Key}`)
    const url = await res.text()

		setImageUrl(url)
		setLoading(false)
	}

	const isCached = src => {
		const image = new Image()
		image.src = src
		return image.complete
	}

	return (
		<>
			<Loader loading={loading}>
				<MoonLoader size={loaderSize === 'small' ? 20 : 50} color='#757575' />
			</Loader>
			<img src={imageUrl || src} onLoad={() => setLoading(false)} alt={alt} />
		</>
	)
}

export default CustomImage
