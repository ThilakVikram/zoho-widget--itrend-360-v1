function Coalesce(...values) {
    for (let item of values) {
        if (item != "" && item) {
            return item
        }
    }
}

function DefineData(type, dataobj = {}) {
    return {
        type,
        data: Object.fromEntries(Object.entries(dataobj).map(([k,v])=>[k,Coalesce(v,"---")]))
    }
}