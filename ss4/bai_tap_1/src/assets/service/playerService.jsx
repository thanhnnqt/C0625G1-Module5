const playerList = [
    {
        id: 1,
        pId: "PL-01",
        name: "Villa",
        dob: 1987,
        value: 100000000,
        location: "Tiền đạo"
    },
    {
        id: 2,
        pId: "PL-02",
        name: "Xavi",
        dob: 1988,
        value: 200000000,
        location: "Tiền vệ"
    },
    {
        id: 3,
        pId: "PL-03",
        name: "Iniesta",
        dob: 1989,
        value: 150000000,
        location: "Tiền vệ"
    },
    {
        id: 4,
        pId: "PL-04",
        name: "Busquest",
        dob: 1991,
        value: 120000000,
        location: "Tiền vệ"
    },
    {
        id: 5,
        pId: "PL-05",
        name: "Puyol",
        dob: 1984,
        value: 140000000,
        location: "Trung vệ"
    },
    {
        id: 6,
        pId: "PL-06",
        name: "Casillas",
        dob: 1992,
        value: 90000000,
        location: "Thủ môn"
    }

]

export function getAll() {
    return [...playerList];
}

export function addNew(player) {
    playerList.push(player);
}

export function deleteById(id) {
    for (let i = 0; i < playerList.length; i++) {
        if (playerList[i].id === id) {
            playerList.splice(i, 1);
            break;
        }
    }
}

export function detailById(id){
    for (let i = 0; i < playerList.length; i++) {
        if (id == playerList[i].id) {
            return playerList[i];
        }
    }
}

export function searchByNameContaining(keyword) {
    if (!keyword || keyword.trim() === "") {
        return [...playerList];
    }
    const lowerKeyword = keyword.toLowerCase();
    return playerList.filter(player =>
        player.name.toLowerCase().includes(lowerKeyword)
    );
}