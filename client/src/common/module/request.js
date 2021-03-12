import axios from 'axios';
/*
api: /开头
data: {}
ispost: boolen || string(put, delete)
*/
export default (options) => {
  let { api, data, method } = options;
  if(method.toLowerCase() === 'get'){
    let getParams='?';
    for(let key in data){
      getParams += `${key}=${data[key]}&`
    }
    api += getParams.slice(0,getParams.length-1);
  }
  const params = {
    url: api,
    method: method,
    data: data
  }

  return new Promise((resolve,reject) => {
    axios(params).then(value => {
      let result = value.data;
      resolve(result);
    }).catch(error => {
      reject(error);
    })
  })
}
