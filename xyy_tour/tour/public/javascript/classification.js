let page_num = 1
let page_count = 20

let search = document.querySelector('#search')
let viewBox = document.querySelector('#viewBox')
let search_btn = document.querySelector('#search_btn')

//筛选点击事件
$("span").click(function () {
    if ($('.city').is('.current1')) {
        $(".city").removeClass("current1")
    } else if ($(this)[0] == $("#show")[0]) {
        $(".city").addClass("current1")
    }
    
})
$("span").click(function () {
    $(this).addClass('current').siblings().removeClass('current')
    
})

//请求数据，渲染数据
function getView() {
    viewBox.innerHTML = ''
    $.ajax({
        type: 'post',
        url: `/classification.php`,
        data: {
            page_num: page_num,
            page_count: page_count,
            search: search.value,

        },
        success(res) {
            let str = ''
            if (res.code == 0) {
                res.data.forEach(element => {
                    str += `<div class="col-lg-3 mt-2 mb-2 ml-2 mr-2 con_item" >
                                <img src="${element.v_img}" alt="" class="mt-2">
                                <h4>${element.v_name}</h4>
                                <p>${element.a_info}</p>
                                <p><a class="btn btn-info mt-3" id="${element.id}" href="http://localhost:3000/detail.html" role="button">详情 »</a></p>
                            </div>`
                });
                viewBox.innerHTML = str
                // 渲染分页
                
                new Pagination({
                    el: '#pageBox',
                    counter: Math.ceil(res.list_count / page_count),
                    callback: function () {
                        getView()
                    }
                })
            } else {
                console.log('查询失败');
            }
            $('#viewBox').on('click', '.btn-info', function () {
                sessionStorage.id = $(this).attr('id')
                console.log(sessionStorage.id);
                
            })
        }
    })
}

getView()

//监听搜索按钮
search_btn.addEventListener('click', throttle((e) => {
    // 需要执行的代码
    getView()
}, 1000), false);


//实现条件筛选
$("span").click(function (e) { 
    let filter_name=e.target.attributes[0].nodeName
    let filter_id=e.target.attributes[0].value
    $.ajax({
            type: 'post',
            url: `/filter.php`,
            data: {
                page_num: page_num,
                page_count: page_count,
                filter_name:filter_name,
                filter_id:filter_id,
            },
            success(res) {
                let str = ''
                if (res.code == 0) {
                    res.data.forEach(element => {
                        str += `<div class="col-lg-3 mt-2 mb-2 ml-2 mr-2 con_item">
                                    <img src="${element.v_img}" alt="" class="mt-2">
                                    <h4>${element.v_name}</h4>
                                    <p>${element.a_info}</p>
                                    <p><a class="btn btn-info mt-3" id="${element.id}" href="http://localhost:3000/detail.html" role="button">详情 »</a></p>
                                </div>`
                    });
                    viewBox.innerHTML = str
                    // 渲染分页
                    new Pagination({
                        el: '#pageBox',
                        counter: Math.ceil(res.list_count / page_count),
                        callback: function () {
                            getView()
                        }
                    })
                } else {
                    console.log('查询失败');
                }
            }
        })
        
 })

//创建节点函数
function parseDom(arg) {
    var objE = document.createElement("div");
    objE.innerHTML = arg;
    return objE.children[0];
}

 //分页函数
function Pagination(params) {
    this.el = document.querySelector(params.el) // 插件目标节点
    this.prev = document.querySelector(params.prev)
    this.next = document.querySelector(params.next)
    this.counter = params.counter //总页数
    this.pages = null //根据总页数 生成的 分页 按钮
    this.callback = params.callback || function () {} // 分页按钮点击的 回调函数 可以是 发起 ajax请求
    // 分页主体 代码 
    this.wrap = parseDom(`
                        <nav aria-label="Page navigation example">
                            <ul class="pagination">
                                <li class="page-item"><a class="page-link" href="#" data-id=上一页>上一页</a></li>
                                <li class="page-item"><a class="page-link" href="#" data-id=下一页>下一页</a></li>
                            </ul>
                        </nav>
        `);

    this.init()
    this.handle()
}

//绑定分页方法
Pagination.prototype = {
    constructor: Pagination,
    init() {
        // 如果页面没有 主体 结构 才生成 主体 结构  避免每次点击 生成
        if (!document.querySelector('nav')) {
            this.el.appendChild(this.wrap)
        }
        // 生成 分页 按钮
        let str = ''
        for (let i = 1; i <= this.counter; i++) {
            str = parseDom(`<li class="page-item"><a class="page-link" href="#" data-id=${i} >${i}</a></li>`)
            // console.log(document.querySelector('.pagination'));
            
            if (document.querySelector('.pagination').children.length <= this.counter + 1) {
                document.querySelector('.pagination').insertBefore(str, document.querySelector('.pagination li:last-child'))
            }
        }
    },
    handle() {
        // 绑定事件
        this.el.addEventListener('click', function (e) {
            e.preventDefault();
            let id = e.target.dataset.id
            if (e.target.innerHTML == "上一页") {
                if (page_num = 1) {
                    this.callback()
                    page_num = 1
                } else {
                    id--
                    this.callback()
                    page_num = id
                }
            } else if (e.target.innerHTML == "下一页") {
                if (page_num = this.counter) {
                    this.callback()
                    page_num = this.counter
                } else {
                    id++
                    this.callback()
                    page_num = id
                }
            } else {
                this.callback()
                page_num = id
            }
        }.bind(this))
    }
}

//函数节流
function throttle(fn, interval = 500) {
    let timer = null;
    let firstTime = true;

    return function (...args) {
        if (firstTime) {
            // 第一次加载
            fn.apply(this, args);
            return firstTime = false;
        }
        if (timer) {
            // 定时器正在执行中，跳过
            return;
        }
        timer = setTimeout(() => {
            clearTimeout(timer);
            timer = null;
            fn.apply(this, args);
        }, interval);
    };
}