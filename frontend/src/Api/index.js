import {create} from 'apisauce'

const api = create({
    baseUrl: process.env.API_PATH
})

api.post('/')