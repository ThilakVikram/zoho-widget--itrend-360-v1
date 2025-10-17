// let APIRequest = (id) => new Promise((res, rej) => {
//     var config = {
//         app_name: appName,
//         report_name: reportName,
//         id: id,
//         field_config: "detail_view"
//     };
//     ZOHO.CREATOR.DATA.getRecordById(config).then(function (response) {
//         console.log(response)
//         res(DataConverter(response))
//     }).catch(err => {
//         console.log("err", err)
//     });
// })

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