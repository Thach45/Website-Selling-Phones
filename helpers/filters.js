
module.exports = (query) => {
    let filters = [
        {
            name: "Tất cả",
            status: "",
            class: "active"
        },
        {
            name: "Hoạt động",
            status: "active",
            class: ""
        },
        {
            name: "Dừng hoạt động",
            status: "inactive",
            class: ""
        }
    ]

    const parems = query.status;
    for (let key = 0; key < filters.length; key++) {
        if (parems == "active") {
            {
                if (filters[key].status == "active") {
                    filters[key].class = "active";
                    filters[0].class = "";
                }
            }
        }

        if (parems == "inactive") {
            {
                if (filters[key].status == "inactive") {
                    filters[key].class = "active";
                    filters[0].class = "";
                }
            }
        }
    }

    return filters;


}