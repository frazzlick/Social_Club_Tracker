import initialise from "./initialise.js"
import searchObject  from "./search.js"
import recursion from "./recursion.js"
import { dimensions } from './dimensions.js'
// import cube_structure from './cube_data.js'

let cube = {
    dimensions: dimensions,
    n_levels: [],
    data: [],
    result: '',


    initialise: (data) => {
        // initialise(data, cube)
        cube.get_n_levels()
    },

    search: (search) => {
        cube.get_n_levels(search)
        //search for the n_level items requested
        cube.result = searchObject(cube, search)
    },

    //get all the n_levels from the dimensions
    get_n_levels: (search) => {
        cube.n_levels = recursion(cube, search)
    }

}

export { cube }