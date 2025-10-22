let root = ReactDOM.createRoot(document.getElementById("root"))
// openUrl("https://creatorapp.zoho.com/scm_itrendsolution/itrend-360-v1/#Page:Page2?recid=" + input.ID,"new window");

root.render(<LoadingPage />)

// Production Live
// ZOHO.CREATOR.UTIL.getQueryParams().then(function (response) {
//     console.log(response)
//     id = response.recid;
//     APIRequest(response.recid).then(res => {
//         if (res) {
//             root.render(<App data={res} />)
//         }
//         else {
//             root.render(<NotFoundPage />)
//         }
//     }).catch(err => {
//         console.log(err)
//         root.render(<NotFoundPage />)
//     })
// });

root.render(<App data={DataConverter(DATA)} tdata={TrackingConverter(DATA)} />)

console.log("Data ----->", DATA)



function LoadingPage() {
    return <div className="h-screen w-screen flex items-center justify-center">
        <img src="./Assert/LoadingGif.gif" className="h-24 aspect-square"></img>
    </div>
}

function NotFoundPage() {
    return <div className="h-screen w-screen flex items-center justify-center pointer-events-none">
        <div className=""></div>
        <img className="w-full h-full max-h-fit max-w-fit" src="./Assert/Record-Not-Found.png"></img>
    </div>
}


function App({ data, tdata }) {
    let showapproval = React.useState(false)
    console.log(tdata)
    return <div className="w-full h-full bg-white p-3 flex flex-row">
        <div className="min-w-full h-full p-3">
            <div className="text-5xl text-gray-600 font-bold text-center my-3 mb-6 relative">
                {DocType}
            </div>
            <div className="w-full h-fit flex flex-row items-center justify-center">
                <Tracking Data={tdata} />
            </div>
            <ComponentMapAppender data={data} />
        </div>
    </div>
}

const Tracking = ({ Data }) => {
    let data = Data.data
    let currentStep = Data.currentprocess
    return <div className="max-w-full h-fit flex items-center overflow-scroll sbh my-3 relative">
        <div className="absolute top-0 text-6xl w-full h-full text-center text-gray-100 font-bold left-0">
            Tracking
        </div>
        <div className="max-w-fit w-full h-fit flex flex-row items-center">
            {Object.entries(data).map(([key, value], i, obj) => {
                return <div className="flex flex-1 flex-col items-center rounded-t-full gap-3 relative">
                    <div className="h-full w-full flex flex-row items-center justify-center relative">
                        <div className={`w-12 aspect-square font-bold ${currentStep <= i ? "bg-gray-300" : currentStep == i + 1 ? "bg-yellow-300" : "bg-green-300"} rounded-full flex items-center justify-center z-10`}>
                            {i + 1}
                        </div>
                        <div className="w-full flex flex-row absolute">
                            <div className={`w-1/2 h-1 ${i == 0 ? "" : currentStep <= i ? "bg-gray-300" : "bg-green-500"}`}></div>
                            <div className={`w-1/2 h-1 ${obj.length == i + 1 ? "" : currentStep <= i + 1 ? "bg-gray-300" : "bg-green-500"}`}></div>
                        </div>
                    </div>
                    <div className="max-w-fit flex flex-col text-sm items-center">
                        <span className="text-gray-900 max-w-96 font-bold text-nowrap overflow-ellipsis overflow-hidden px-12" title="Marketing Manager Approval">{key}</span>
                        <span className="text-gray-600">Completed : <span className="text-gray-900 font-bold">{(value.completeddate || "Pending")}</span></span>
                    </div>
                </div>
            })}
        </div >
    </div >
};

function DetailComponent({ data, HeaderName = "Header Not Set" }) {
    return <div className="w-full h-fit bg-gray-100 p-3 border-gray-300 py-6 hover:shadow-sm shadow-gray-300 my-3">
        {/* Header */}
        <div className="pb-3 dark:border-gray-700 font-semibold text-2xl text-gray-800 dark:text-gray-100">
            <span className="min-h-full bg-gray-600 rounded-full mr-3 inline-block aspect-square"></span>{HeaderName}
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 p-3">
            {Object.entries(data).map(([key, value], i) => (
                <div
                    key={i}
                    className="p-2 bg-gray-50 hover:drop-shadow-md"
                >
                    <span className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                        {key}
                    </span>
                    <span className="block mt-1 h-fit text-lg font-semibold text-gray-700 dark:text-gray-100 relative">
                        {(value ?? "-").toString() || "-"}
                    </span>
                </div>
            ))}
        </div>
    </div>
}
function TableComponent({ data = [], HeaderName = "Header Name" }) {
    if (!data || data.length === 0) {
        return (
            <div className="overflow-x-auto p-3 py-6 bg-gray-100 border-b border-gray-300 hover:shadow-md my-3">
                <div className="pb-3 dark:border-gray-700 font-semibold text-2xl text-gray-800 dark:text-gray-100">
                    <span className="min-h-full rounded-full mr-3 inline-block aspect-square"></span>{HeaderName}
                </div>
                <p className="text-center text-gray-500 py-4">No data available</p>
            </div>
        );
    }

    // Dynamically get table headers from object keys
    const headers = Object.keys(data[0]);

    return (<div className="overflow-x-auto p-3 py-6 bg-gray-100 border-b border-gray-300 hover:shadow-md my-3">
        <div className="pb-3 dark:border-gray-700 font-semibold text-2xl text-gray-800 dark:text-gray-100">
            <span className="min-h-full rounded-full mr-3 inline-block aspect-square"></span>{HeaderName}
        </div>
        <div className="max-h-full shadow-md overflow-scroll sbh">
            <table className="min-w-full border-collapse text-left text-sm text-gray-700">
                <thead className="text-gray-900 rounded-t-xl font-bold sticky top-0 shadow-sm bg-gray-200">
                    <tr>
                        {headers.map((key) => (
                            <th
                                key={key}
                                className="px-6 py-3 uppercase tracking-wider"
                            >
                                {key}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-gray-50">
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex} className="hover:bg-green-50 transition-colors hover:font-semibold hover:text-gray-700">
                            {headers.map((key) => (
                                <td
                                    key={key}
                                    className="px-6 py-4 max-w-[200px] truncate whitespace-nowrap cursor-pointer"
                                    title={row[key]} // full text on hover
                                >
                                    {row[key]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
    );
}

function ChecklistComponent({ data, HeaderName = "Header Name" }) {
    return (
        <div className="p-6 bg-gray-100 hover:shadow-sm border border-gray-200 my-3">
            <h2 className="text-xl font-bold mb-4 text-gray-800">{HeaderName}</h2>
            <ul className="space-y-4">
                {Object.entries(data).map(([question, answer], index) => (
                    <li key={index} className="p-4 bg-gray-50 hover:shadow-md">
                        <p className="font-medium text-gray-800">{question}</p>
                        <p className="text-gray-600 mt-1">{answer}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function ComponentMapAppender({ data = {} }) {
    // data = {}
    return <>
        {
            Object.entries(data).map(([SectionName, DataObject]) => {
                switch (DataObject.type) {
                    case "detail":
                        return <DetailComponent key={SectionName.replace(" ", "-")} data={DataObject.data} HeaderName={SectionName} />
                    case "td":
                        return <TableComponent key={SectionName.replace(" ", "-")} data={DataObject.data} HeaderName={SectionName} />
                    case "checklist":
                        return <ChecklistComponent key={SectionName.replace(" ", "-")} data={DataObject.data} HeaderName={SectionName} />
                    default:
                        break
                }
            })
        }
    </>
}