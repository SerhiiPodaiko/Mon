import { getCookie } from 'cookies-next'

import API from '@lib/api/api'

export const uploadPhoto = (file: any): Promise<{ link: string; filename: string }> => {
  console.log(file)

  const idToken = getCookie('id_token')
  const formData = new FormData()
  console.log(formData)
  formData.append('file', file)
  return API.post(
    'rights_holder/upload_photo/',
    { file },
    {
      headers: {
        'id-token': idToken,
        'Content-Type': 'multipart/form-data'
      }
    }
  )
    .then((response) => {
      return {
        link: response.data.link,
        filename: response.data.filename
      }
    })
    .catch((error) => {
      return error?.data
    })
}
