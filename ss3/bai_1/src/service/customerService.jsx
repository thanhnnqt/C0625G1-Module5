const customerList = [
    {
        id: 1,
        cId: "KH-01",
        name: "Nguyễn Văn A",
        address: "Đà Nẵng",
        category: "Vàng"
    },
    {
        id: 2,
        cId: "KH-02",
        name: "Nguyễn Văn B",
        address: "Quảng Trị",
        category: "Kim cương"
    },
    {
        id: 3,
        cId: "KH-03",
        name: "Nguyễn Văn C",
        address: "Huế",
        category: "Bạch kim"
    },
    {
        id: 4,
        cId: "KH-04",
        name: "Nguyễn Văn D",
        address: "Quảng Nam",
        category: "Bạc"
    }
]

export function getAll() {
    return [...customerList];
}

export function deleteById(id) {
    for (let i = 0; i < customerList.length; i++) {
        if (customerList[i].id == id) {
            customerList.splice(i, 1);
            break;
        }
    }
}