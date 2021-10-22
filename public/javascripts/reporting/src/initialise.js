

export default function initialise(data, cube){

    cube.data = data
    cube.n_levels = [
        {
            id: 1,
            name: 'fraser',
            month: 'October'
        },
        {
            id: 2,
            name: 'Addy',
            month: 'September'
        },
        {
            id: 3,
            name: 'fraser',
            month: 'September'
        }
    ]
    return cube
}