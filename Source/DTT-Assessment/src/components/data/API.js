const headers = {
  'X-Api-Key': '5gYzjH2QcGXEqSZv_Fk6pmW8-3hfJTDo',
}

export default {
  getData: async () => {
    try {
      const response = await fetch('https://api.intern.d-tt.nl/api/houses/', {
        method: 'get',
        headers: headers
      })
      const dataDone = await response.json()
      return dataDone
    } catch (error) {
      console.error('Error fetching houses data:', error)
    }
  },
  getOneHouse: async (id) => {
    try {
      const response = await fetch(`https://api.intern.d-tt.nl/api/houses/${id}`, {
        method: 'get',
        headers: headers
      })
      const dataDone = await response.json()
      return dataDone
    } catch (error) {
      console.error('Error fetching house data:', error)
      return error
    }
  },
  deleteHouse: async (id) => {
    try {
      await fetch(`https://api.intern.d-tt.nl/api/houses/${id}`, {
        method: 'delete',
        headers: headers
      })
      return true;
    } catch (error) {
      console.error('Error deleting house data:', error)
      return error
    }
  },
  createHouse: async (formData) => {
    try {
      console.log(formData)
      const response = await fetch(`https://api.intern.d-tt.nl/api/houses`, {
        method: 'post',
        headers: headers,
        body: formData ? formData : ''
      })
      const final = await response.json()
      return final
    } catch (error) {
      console.error('Error creating house data:', error)
      return error
    }
  },
  createImage: async (id, photoData) => {
    try {
      await fetch(`https://api.intern.d-tt.nl/api/houses/${id}/upload`, {
        method: 'post',
        headers: headers,
        body: photoData ? photoData : ''
      })
      return true;
    } catch (error) {
      console.error('Error creating image data:', error)
      return error
    }
  },
  editHouse: async (id, formData) => {
    try {
      const response = await fetch(`https://api.intern.d-tt.nl/api/houses`, {
        method: 'post',
        headers: headers,
        body: formData ? formData : ''
      })
      const final = await response.json()
      return final
    } catch (error) {
      console.error('Error editing house data:', error)
      return error
    }
  }
}
