var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);

import { listChosen } from '../models/ListChosen.js'
import { callAPI } from '../utils/callData.js'
import ItemClothes from '../services/Item.js'

// Hàm gọi dữ liệu từ file Data.json
function callData() {
    let promise = callAPI()
    promise
        //Nếu lấy dữ liệu thành công
        .then(function (result) {

            // Lấy dữ liệu mảng Pills ("các loại đồ để thử") từ data
            let dbnavPills = result.data.navPills;

            // Lấy dữ liệu mảng Panes ("item của từng loại") từ data
            let dbtabPanes = result.data.tabPanes;

            // Handle khi user click từng phần tử trong mảng Pills - tương ứng với mảng Panes
            clickSelect(dbnavPills, dbtabPanes)

        })

        // Nếu lấy dữ liệu thất bại
        .catch(function (err) {

            // Hiện lỗi
            console.error(err);
        })
}

// Hàm click 1phần tử mảng Pills - trả về các item chứa trong mảng Panes tương ứng
function clickSelect(data1, data2) {
    data1.forEach(i => { // Giá trị data1 = Pills

        // Lấy giá trị type mảng Pills
        let iSelect = i.type;

        // Dom tới giá trị được chọn trong mảng Pills trên HTML mà User Click
        if (iSelect) {
            $(`a#pills-${iSelect}-tab`).onclick = () => {

                // Lấy mảng Panes đã được chọn theo type Pills show UI
                let arrChosen = listChosen(data2, iSelect); // Giá trị data2 = Panes 
                renderUI(arrChosen);
            };
        }
    });
}

// Hàm render UI 
function renderUI(arr) { // Giá trị arr = mảng cần show UI

    // Content show UI
    let htmlContent = '';
    let arrV = [];

    // Lấy từ phần tử mảng arr show UI
    arr.forEach((item) => {

        // Tạo đối tượng ItemClothes tương ứng
        const v = new ItemClothes(item.id, item.desc, item.imgSrc_jpg, item.imgSrc_png, item.name, item.type)

        // Gán trị content thông qua các thuộc tính của đối tượng ItemClothes
        htmlContent += `
        <div class="card col-3 m-3" style="width: 18rem; background-color:#F8EFBA; border: 1px solid #FEA47F"  >
            <img src="${v.imgJPG}" class="card-img-top" alt="..." style="border: 1px solid #FEA47F">
            <div class="card-body p-0">
                <h5 class="card-title" style="color:#F97F51; margin-top: 0.75rem">${v.name}</h5>
                <p class="card-text">${v.desc}</p>
                <a href="#" class="btn btn-primary">Thử đồ</a>
            </div>
        </div>
        `
        // Dom tới thẻ có giá trị type tương ứng (Pill)
        $(`div#pills-${v.type}`).innerHTML = `
        <div class="row m-0">
            ${htmlContent}
        </div>
        `;

        // Copy giá trị name và imgPNG
        let { name, imgPNG, type } = v;

        // Tạo 1 đối tượng từ name và imgPNG
        let arrVItem = {
            name,
            imgPNG,
            type
        }

        // Thêm vào mảng arrV để tra cứu hình
        arrV.push(arrVItem);
    })

    // Lấy mảng thẻ button a
    let arrBtn = $$('.card-body a')
    arrBtn.forEach((i) => {

        i.onclick = (e) => {

            // Hàm ngăn thẻ a thực hiện hành động mặc định khi click (#href) là submit
            e.preventDefault();

            // Tìm title của thẻ a đc click
            let tmp = i.parentElement.firstElementChild.innerHTML;

            // Tìm giá trị ứng với title của thẻ a
            let value = arrV.find(iV => iV.name === tmp);
            let v = valueClothes(value.type);

            if (v === 'bikinitop' || v === 'bikinibottom') {
                let list = $(`.${v}`);
                list.classList.add('active');
                $(`.${v}`).style.backgroundImage = `url('${value.imgPNG}')`
            } else {
                $(`.${v}`).style.backgroundImage = `url('${value.imgPNG}')`
            };

        }
    })
}

// Hàm giá trị ứng với title của thẻ a
function valueClothes(value) {

    switch (value) {
        case 'topclothes':
            return "bikinitop";
            break;

        case 'botclothes':
            return "bikinibottom";
            break;

        case 'shoes':
            return "feet";
            break;

        case 'handbags':
            return "handbag";
            break;

        case 'necklaces':
            return "necklace";
            break;

        case 'hairstyle':
            return "hairstyle";
            break;

        case 'background':
            return "background";
            break;

        default:
            undefined;
            break;
    }
}

// Main
callData();