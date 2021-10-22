import findParentElement from "./recursion_methods/findParentElement.js";
imp

export default function recursion(cube, search = '')
{
    let n_levels = []
    for(let dimension of cube.dimensions){
        let mysearch = Object.keys(search).find(x => x == dimension.dimension_name)
        if(mysearch)
        {
            dimension = findParentElement(dimension.elements[0], mysearch, dimension)
            eachDimension(dimension, n_levels)
        } else {
            eachDimension(dimension, search, n_levels)
        }
    }

    //for each dimension create n_levels as dimension name then an array of items of the lowest level of each dimension.
    //this can be then used to create the cartesian product
    function eachDimension(dimension, n_levels){
        for(let d of dimension.elements)
        {
            let dimension_name = dimension.dimension_name
            let leaf = []
            n_levels.push({dimension_name, items: []})
            n_levels[n_levels.findIndex(element => element.dimension_name == dimension_name)].items
            .push(recursiveChild(d, leaf, dimension_name))
        }

        function recursiveChild(element, leaf, dimension_name, search_dimension = '')
        {
            if(element.children == undefined){
                leaf.push({[dimension_name]: element.description})
                return leaf
            }

            for(let child of element.children){
                recursiveChild(child, leaf, dimension_name)
            }
            
            return leaf
        }
        return n_levels
    }
    
    return cartesianProduct(n_levels)
}
