function DataConverter({ data }) {
    return {
        "Basic Information": {
            type: "detail",
            data: {
                "Requestor Name": data.Requestor_Name || "---",
                "Submitter email ID": data.Submitter_email_ID || "---",
                "Reference#": data.Reference || "---",
                "Notes_to_Approver": data.Notes_to_Approver || "---",
                "By when you need this order to be available ": data.By_when_you_need_this_order_to_be_available || "---",
                "Expected Date": data.Expected_Date || "---",
                "Season": data.Season || "---",
                "Target Marketplace": data.Target_Marketplace || "---",
                "Category": data.Category || "---"
            }
        },
        "Item Details": {
            type: "td",
            data: data?.Line_Items?.map(i => {
                return {
                    "PR Item Number": i.Purchase_Request_Item_Number,
                    "Item Name": i.Item.name,
                    "Sku": i.Item.sku,
                    "Quantity": i.Quantity,
                    "Target Price": i.Target_Price
                }
            }) || []
        },
        "Product Owner Checklist": {
            type: "checklist",
            data: {
                "Have you analysed the marketing trend of the product?": data.Have_you_analysed_the_marketing_trend_of_the_product || "---",
                "Have you checked the Last two months sales history of the product?": data.Have_you_checked_the_Last_two_months_sales_history_of_the_product || "---",
                "Have you estimate the sales justification for this order monthwise?": data.Have_you_estimate_the_sales_justification_for_this_order_monthwise || "---",
                "Have you submitted the Product justification?": data.Have_you_submitted_the_Product_justification || "---"
            }
        },
        "Marketing Manager Checklist": {
            type: "checklist",
            data: {
                "Have you checked the and confirm that the Product Owner’s submission is complete and clear?": data.Have_you_checked_the_and_confirm_that_the_Product_Owner_s_submission_is_complete_and_clear || "---",
                "Have you checked the Product Justification? (ROI,Marketing plan, Forcast Plant)": data.Have_you_checked_the_Product_Justification_ROI_Marketing_plan_Forcast_Plant1 || "---",
                "Have you checked, what impact will this order have on business? If yes write/attach in remarks": data.Have_you_checked_what_impact_will_this_order_have_on_business_If_yes_write_attach_in_remarks || "---",
                "Have you checked it is profitable? If yes, Justify in remarks": data.Have_you_checked_it_is_profitable_If_yes_Justify_in_remarks || "---",
                "In previous, for which month sales we placed this order?": data.In_previous_for_which_month_sales_we_placed_this_order || "---",
                "Any specific Quality need to be checked while QC?": data.Any_specific_Quality_need_to_be_checked_while_QC || "---",
                "Status (Marketing Manager)": data.Status_Marketing_Manager || "---"
            }
        },
        "MD Checklist": {
            type: "checklist",
            data: {
                "Have you ensured that the market analysis aligns with overall business goals?": data.Have_you_ensured_that_the_market_analysis_aligns_with_overall_business_goals || "---",
                "Have you evaluated if pricing, demand forecast, and seasonality are realistically assessed?": data.Have_you_evaluated_if_pricing_demand_forecast_and_seasonality_are_realistically_assessed || "---",
                "Have you considered the risk of price volatility (drop or increase)?": data.Have_you_considered_the_risk_of_price_volatility_drop_or_increase || "---",
                "Have you verified that the seasonal relevance aligns with expected sales peaks?": data.Have_you_verified_that_the_seasonal_relevance_aligns_with_expected_sales_peaks || "---",
                "Have you evaluated whether the expected ROI will cover the cost and yield sufficient profit?": data.Have_you_evaluated_whether_the_expected_ROI_will_cover_the_cost_and_yield_sufficient_profit || "---",
                "Status": data.Status_MD || "---"
            }
        },
    }
}