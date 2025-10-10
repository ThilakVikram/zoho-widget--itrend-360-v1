let APIRequest = (id) => new Promise((res, rej) => {
    var config = {
        app_name: "itrend-360-v1",
        report_name: "All_Purchase_Request_Line_Items",
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

function DataConverter({ data = {} }) {
    return {
        "Basic Details": {
            type: "detail",
            data: {
                "Purchase Request Item Number": data.Purchase_Request_Item_Number || "---",
                "Item Name": data.Item.name || "---",
                "Sku": data.Item.sku || "---",
                "Asin": data.Item.cf_asin || "---",
                "Quantity": data.Quantity || "---",
                "Target Price": data.Target_Price || "---",
                "Enhancement": data.Enhancement || "---",
            }
        },
        "Previous Year Performance": {
            type: "detail",
            data: {
                "From Date": data.From_Date || "---",
                "To Date": data.To_Date || "---",
                "Days": data.Days || "---",
                "Units Sold": data.Units_Sold || "---",
                "Profit": data.Profit || "---",
                "Margin": data.Margin || "---",
                "ROI": data.ROI || "---",
            }
        },
        "Performance Prediction": {
            type: "detail",
            data: {
                "From Date": data.From_Date1 || "---",
                "To Date": data.To_Date1 || "---",
                "Estimated Unit Sold": data.Estimated_Unit_Sold || "---",
                "Estimated Profit": data.Estimated_Profit || "---",
                "Estimated Margin": data.Estimated_Margin || "---",
                "Estimated ROI": data.Estimated_ROI || "---",
            }
        },
        "Stock Details": {
            type: "detail",
            data: {
                "FBA": data.FBA || "---",
                "Warehouse": data.Warehouse || "---",
                "AWD": data.AWD || "---",
                "China": data.China || "---",
                "In-Transit to Destination Port": data.In_Transit_to_Destination_Port || "---",
            }
        },
        "QC Checklist": {
            type: "checklist",
            data: {
                "Have you understands the product's functionality, usage environment and performance expectations?": data.Have_you_understands_the_product_s_functionality_usage_environment_and_performance_expectations || "---",
                "Have you checked any enchancement in the product ?": data.Have_you_checked_any_enchancement_in_the_product || "---",
            }
        }
    }
}