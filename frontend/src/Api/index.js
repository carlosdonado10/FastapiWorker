import {create} from 'apisauce'

const api = create({
    baseURL: 'http://localhost:8080'
})

let getApiWithEndpoints = (api) => ({
        createProcess: (process) => api.post('/create_process', process),
        getProcessList: () => api.get('/process/list'),
        getProgress: (processId) => api.get(`/status/${processId}`),
})

export default getApiWithEndpoints(api)
