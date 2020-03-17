function getView() {
    $.ajax({
        type: 'get',
        url: `/index.php`,
        success(res) {
            // console.log(res);
            let str = ''
            let viewCount = res.data.length
            if (res.code == 0) {
                res.data.forEach(element => {
                    str += `
                            <div class="card w-33 mb-3" id="z_page">
                            <img src="${element.v_img}" class="card-img-top card_img" alt="...">
                            <div class="card-body text-center">
                                <p class="card-title h6">${element.v_name}</p>
                                <p class="card-text">${element.a_info}</p>
                            </div>
                            <div class="btn">
                                <button type="button" id="${element.id}" class="btn btn-id btn-info"><a href="http://localhost:3000/detail.html">查看详情</a></button>
                            </div>
                        </div>`
                });
                $("#listbox").append(str)
                // 渲染分页
            }
        }
    })
}

getView();