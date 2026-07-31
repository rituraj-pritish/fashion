import React, {useState} from 'react'

import useAuthentication from 'hooks/useAuthentication'
import Input from 'atoms/Input'
import Text from 'atoms/Text'
import Button from 'atoms/Button'
import { PageContainer } from 'index.styles'
import fetch from 'core/fetch'

export default function Upload() {
  const {user} = useAuthentication()
  const [data, setData] = useState({
    variants: [{}]
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  if(user?.email !== 'admin@admin.com') return (
    <Text mt={6} mx='auto' style={{width: 'fit-content'}}>Not authorized to upload products</Text>
  )

  const handleChange = (e, field, index) => {
    setData(prevData => {
      if(typeof index === 'number') {
        return {
          ...prevData,
          variants: (prevData.variants).map((variant, idx) => {
            if(idx === index) {
              return {
                ...variant,
                [field]: field === 'images' ? e.target.files : e.target.value
              }
            }
            return variant
          })
        }
      }

      return {
        ...prevData,
        [field]: e.target.value
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()

    formData.append('data', JSON.stringify({
      ...data,
      variants: data.variants
        .map(variant => ({
          ...variant,
          images: Object.values(variant.images).map(({name, size, type}) => ({
            name,
            size,
            type
          }))
        }))
    }))
    data.variants.forEach(({images}) => {
      Object.values(images).forEach((file, idx) => {
        formData.append('file', file)
      })
    })

    try {
      const res = await fetch('/products', {
        method: 'post',
        body: formData
      })
    } catch (error) {
      console.error('err', error)
    }
  }

  const getVariantFields = (index) => {
    return (
      <>
        <Text>{index + 1}</Text>
        <Input placeholder='Variant' onChange={e => handleChange(e, 'variant', index)}/>
        <Input placeholder='Color' onChange={e => handleChange(e, 'color', index)}/>
        <Input placeholder='Stock' onChange={e => handleChange(e, 'stock', index)}/>
        <Input placeholder='Price' onChange={e => handleChange(e, 'price', index)}/>
        <Input placeholder='Images' type='file' multiple
          onChange={e => handleChange(e, 'images', index)}
        />
      </>
    )
  }
  return (
    <PageContainer>
      <Input placeholder='Name' onChange={e => handleChange(e, 'name')}/>
      <Input placeholder='Brand' onChange={e => handleChange(e, 'brand')}/>
      <Text mb='2'>Variants</Text>
      {data.variants.map((_, idx) => getVariantFields(idx))}
      <Button
        variant='secondary'
        onClick={() => setData(prevData => ({...prevData, variants: prevData.variants.concat({})}))}
      >
        Add variant
      </Button>

      <Button mt={4} onClick={handleSubmit}>Upload</Button>
    </PageContainer>
  )
}
