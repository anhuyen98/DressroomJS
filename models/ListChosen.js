
// Hàm chọn ra ds theo type tương ứng
function listChosen(data, typeSelect) {
    let arr = [];
    data.forEach((i, index) => {
        if (data[index].type === typeSelect) {
            arr.push(i);
        }
    });
    return arr;
}

export {listChosen}