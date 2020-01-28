import axios from 'axios';

export default function ajax(url,data={},type='GET'){
    if(type==='GET'){
        let parastr=''
        Object.keys(data).forEach(key=>{
            parastr+=key+'='+data[key]+'&'
        })
        if(parastr){
            parastr=parastr.substring(0,parastr.length-1)
        }
        return axios.get(url+'?'+parastr)
    }else{
        return axios.post(url,data)
    }
}