
export default function cartesianProduct(n_levels)
{
    const cartesian =
    (...a) => a.reduce((a, b) => a.flatMap(d => b.map(e => [d, e].flat())));
    let cartesian_array = []
    for(let n of n_levels){
        cartesian_array.push(n.items[0])
    }

    let output = cartesian(cartesian_array[0], cartesian_array[1])
    let final_output = []
    for(let o of output)
    {
        final_output.push(returnObjectKeys(o))
    }
    return final_output
    
    function returnObjectKeys(object)
    {
        let new_obj = []
        for(let obj of object)
        {
            new_obj = {
                ...new_obj,
                ...obj
            }
        }
        return new_obj
    }
}

