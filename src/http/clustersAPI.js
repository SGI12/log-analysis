import { $clusters } from "."



export const getClusters = async () =>  {
    const response = await $clusters.get('', {
       
    })
    return response
}