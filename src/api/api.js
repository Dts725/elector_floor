import axios from 'axios'
axios.defaults.baseURL = 'https://apijcdj.shyunhua.com';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


async function get(url, pam) {

    let res = await axios.get(url, {
        params: pam
    })
    return res.data
}
async function post(url, pam) {
    let res = await axios.get(url, pam)
    return res.data
}
async function deletes(url, pam) {
    let res = await axios.get(url, pam)
    return res.data
}
async function put(url, pam) {
    let res = await axios.get(url, pam)
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
    return get('admin/elevator/community_block', pam)
}