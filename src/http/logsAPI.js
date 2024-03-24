
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