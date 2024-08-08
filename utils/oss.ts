import COS from 'cos-js-sdk-v5'
import { md5 } from 'js-md5'
import { loginApi } from '@/api'

const OSSConfig = {
  ossParams: {
    region: 'ap-guangzhou',
    bucket: import.meta.env.VITE_COSS_BUCKET,
  },
}

function random_string(file: any) {
  const tmpArr = file.name.split('.')
  let tmpName = md5(Date.now() + tmpArr[0])

  const parts = file.type.split('/')

  let firstFileValue
  if (file.type === '')
    firstFileValue = tmpArr[tmpArr.length - 1]
  else
    firstFileValue = parts.length > 1 ? parts[0] : ''

  const tmpNameWithCategory = file.categoryPath || ''

  tmpName
    = `${tmpNameWithCategory
     }/${
     firstFileValue
     }/${
     tmpName
     }.${
     tmpArr[tmpArr.length - 1]}`

  return tmpName
}

function uploadOSS(file: any, returnRelativePath = false) {
  return new Promise((resolve, reject) => {
    const fileName = random_string(file)
    const cos = new COS({
      getAuthorization: (options, callback) => {
        loginApi.getCOSToken()
          .then((res: any) => {
            const credentials = res.credentials
            if (!credentials)
              return console.error('credentials invalid')
            callback({
              TmpSecretId: credentials.tmpSecretId,
              TmpSecretKey: credentials.tmpSecretKey,
              SecurityToken: credentials.sessionToken,
              // 建议返回服务器时间作为签名的开始时间，避免用户浏览器本地时间偏差过大导致签名错误
              StartTime: res.startTime, // 时间戳，单位秒，如：1580000000
              ExpiredTime: res.expiredTime, // 时间戳，单位秒，如：1580000000
              ScopeLimit: true, // 细粒度控制权限需要设为 true，会限制密钥只在相同请求时重复使用
            })
          })
          .catch((error) => {
            reject(error)
          })
      },
    })
    cos.uploadFile({
      Bucket: OSSConfig.ossParams.bucket /* 填写自己的 bucket，必须字段 */,
      Region: OSSConfig.ossParams.region /* 存储桶所在地域，必须字段 */,
      Key: fileName /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */,
      Body: file, // 上传文件对象
    }).then((res: any) => {
      // 获取URL的相对路径部分
      const url = new URL(`https://${res.Location}`)
      const relativePath = url.pathname
      // 根据 returnRelativePath 参数决定返回结果
      resolve(returnRelativePath ? { url: relativePath } : { url: url.href })
    }).catch((error) => {
      reject(error)
    })
  })
}

export { uploadOSS }
