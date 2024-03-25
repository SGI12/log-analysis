
import { $logs } from "."


export const getLogs = async (lastID) =>  {
    const response = await $logs.get('', {
        params: {
            'url': '' ,
            'last_id': lastID,

        }
    })
    return response
}

export const changeCluster = async (id, clusterID) => {
    const data = {
        'id': id,
        'cluster_id': clusterID
    }
    const res = await $logs.post('/update_cluster_id', data)
    return res
}