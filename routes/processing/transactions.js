


module.exports = {
    formatDate: function*(obj)
    {
        const date_array = obj.split('/')
        let day = date_array[0]
        let month =date_array[1]-1
        let year = '20'+date_array[2].substr(date_array[2].length-2,2)
        
        date = new Date(Date.UTC(year, month, day));
        yield day+'/'+String((month+1)).padStart(2,'0')+'/'+year
        yield date.toLocaleString('default', { month: 'long' })

        yield year
        yield date.toLocaleString('default', { month: 'long' }) + ' - ' + year
    }
}