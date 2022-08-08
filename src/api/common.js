import Axios from "./axiosConfig";
export async function Test(data) {
  // eslint-disable-next-line no-useless-catch
  try {
    const { data: result } = await Axios.request({
      url: `http://quan.suning.com/getSysTime.do`,
      method: 'get',
      data
    })
    const CODE = result.code
    if (CODE === '200') {
      return result
    } else {
      // Message({
      //   message: result.msg,
      //   duration: 1000,
      //   type: 'error'
      // });
    }
  } catch (e) {
    throw e
  }
}


