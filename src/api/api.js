import axios from 'axios'
axios.defaults.baseURL = 'https://apijcdj.shyunhua.com';
axios.defaults.withCredentials = true;
import router from '../router'
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 添加响应拦截器
axios.interceptors.response.use(response => {
    // 对响应数据做点什么




    if (response.data.code == 213 || response.data.code == 214) {
        this.$message({
            type: "error",
            message: response.status
        });
        // 登录失败跳转登录页面
        router.replace({
            path: '/'
        })
        return response

    }

    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});
async function get(url, pam) {

    let res = await axios.get(url, {
        params: pam
    })
    return res.data
}
async function post(url, pam) {
    let res = await axios.post(url, pam)
    return res.data
}
async function deletes(url, pam) {
    let res = await axios.delete(url, pam)
    return res.data
}
async function put(url, pam) {
    let res = await axios.put(url, pam)
    return res.data
}

//右侧列表
export function getTableList(pam) {
    return get('/showscreen/elevator/elevators_map', pam)
}

// 头部小区树筛选

export function headerCity(pam) {
    return get('/showscreen/elevator/community_block_tree', pam)
}
//非关联小区树查看
export function headerCityNoe(pam) {
    return get('/admin/elevator/community_block', pam)
}

//登录接口 
export function loginFn(pam, type) {

    if (type === 'post') {
        return post('/admin/system/login', pam)
    } else {
        return get('/admin/system/login_type_list', pam)

    }

}

//访问统计结果
export function getCount(pam) {
    return get('showscreen/elevator/community_count_list', pam)
}


// 数据缓存

export function setCachePoint(pam, type = 'post') {
    if (type === 'post') {
        console.dir(pam)
        return post('showscreen/elevator/upd_tmplocation', pam)
    } else {
        return get('showscreen/elevator/upd_tmplocation', pam)

    }
}