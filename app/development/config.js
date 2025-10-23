let appName = "itrend-360-v1"
let reportName = "All_Quotations"
let id = ""
let field_config = "detail_view"
let DocType = "Quotation"
let isnottest = false

let APIRequest = (id) => new Promise((res, rej) => {
    var config = {
        app_name: appName,
        report_name: reportName,
        id: id,
        field_config: "detail_view"
    };
    ZOHO.CREATOR.DATA.getRecordById(config).then(function (response) {
        res(response)
    }).catch(err => {
        console.log("err", err)
    });
})

function DataConverter({ data = DATA }) {
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
        "Vendor Details": DefineData("detail",
            {
                "Vendor Name": data.Vendor_Name,
                "Company Name": data.Company_Name
            }
        ),
        "Quotation Details": DefineData("detail",
            {
                "Target Price": data.Target_Price,
                "Quote Price": data.Quote_Price,
                "Quantity": data.Quantity,
                "Lead Time": data.Lead_Time,
                "Shipment Term": data.Shipment_Term,
                "Port": data.Port
            }
        ),
        "Sample Details Checklist (QC)": DefineData("checklist",
            {
                "Have you verified sample against the Specification Sheet?": data.Have_you_verified_sample_against_the_Specification_Sheet,
                "Did the Product pass all the Quality tests?": data.Did_the_Product_pass_all_the_Quality_tests,
                "Have you created a complete inspection report for each sample?": data.Have_you_created_a_complete_inspection_report_for_each_sample
            }
        )
    }
}

function TrackingConverter({ data }) {
    try {
        let d = data
        let process = {
            "Marketing Manager Approval": { completeddate: d.Completed_Date_Marketing_Managerf },
            "MD Approval": { completeddate: d.Completed_Date_MD }
        }
        let currentprocess = 1;
        (() => {
            for (let [key, val] of Object.entries(process)) {
                if (val.completeddate && val.completeddate != "") {
                    currentprocess += 1
                }
                else {
                    break;
                }
            }
        })()
        return {
            currentprocess: currentprocess,
            data: process
        }
    }
    catch (err) {
        return {
            currentprocess: 0,
            data: { "test1": { completeddate: "1/1/2011" } }

        }
    }
}