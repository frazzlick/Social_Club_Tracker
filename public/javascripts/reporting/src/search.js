export default function searchObject(cube, search)
{
    let n_levels = cube.n_levels
    
    function searchItem(object)
    {
        let criteria = 0;
        for(let s in search)
        {
            if(search[s] === object[s])
            {
                criteria++
            }
        }
        if(criteria == Object.keys(search).length){
            return object
        }
        return undefined
    }

    let result = n_levels.filter(searchItem)
    return result

}