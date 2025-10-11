let APIRequest = (id) => new Promise((res, rej) => {
    var config = {
        app_name: "itrend-360-v1",
        report_name: "All_Quotations",
        id: id,
        field_config: "detail_view"
    };
    ZOHO.CREATOR.DATA.getRecordById(config).then(function (response) {
        console.log(response)
        res(DataConverter(response))
    }).catch(err => {
        console.log("err", err)
    });
})

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


function DataConverter({ data }) {
    return {
        "Reference Detail": DefineData("detail",
            {
                "Quotation Number": data.Quotation_Number,
                "Purchase Request Line Items": data.Purchase_Request_Line_Items.Purchase_Request_Item_Number,
            }
        ),
        "Item Detail": DefineData("detail",
            {
                "Date": data.Date_field,
                "Item Name": data.Item_Name.name,
                "Sku": data.Item_Name.sku,
                "Asin": data.Item_Name.cf_asin
            }
        ),
        "Vendor Details":DefineData("detail",
            {
                "Vendor Name":data.Vendor_Name,
                "Company Name":data.Company_Name
            }
        ),
        "Quotation Details":DefineData("detail",
            {
                "Target Price":data.Target_Price,
                "Quote Price":data.Quote_Price,
                "Quantity":data.Quantity,
                "Lead Time":data.Lead_Time,
                "Shipment Term":data.Shipment_Term,
                "Port":data.Port
            }
        ),
        "Sample Details Checklist (QC)":DefineData("checklist",
            {
                "Have you verified sample against the Specification Sheet?":data.Have_you_verified_sample_against_the_Specification_Sheet,
                "Did the Product pass all the Quality tests?":data.Did_the_Product_pass_all_the_Quality_tests,
                "Have you created a complete inspection report for each sample?":data.Have_you_created_a_complete_inspection_report_for_each_sample
            }
        )
    }
}