import axios from 'axios'
axios.defaults.baseURL = 'https://apijcdj.shyunhua.com';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


async function get(url, pam) {
    let res = await axios.get(url, pam)
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
export function getTableList(pam) {
    return get('/showscreen/elevator/elevators_map', {
        params: pam
    })
}