/**
 * AES util:页面需要先引入<script src="https://cdn.bootcss.com/crypto-js/3.1.9-1/crypto-js.min.js"></script>
 */
var key = CryptoJS.enc.Utf8.parse("1234567887654321");
const AES = {
    encode: (params) => {
        //加密
        let encrypted = CryptoJS.AES.encrypt(
            params,
            key,
            {
                iv: key,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.ZeroPadding
            }
        )
        return encrypted.toString();
    },
    decode: (params) => {
        let { data, param, key } = params
        let result = JSON.parse(JSON.stringify(data))
        param.forEach(ele => {
            let data = result[ele]
            key = CryptoJS.enc.Utf8.parse(key)
            let iv = key
            let decrypt = CryptoJS.AES.decrypt(data, key, {
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.ZeroPadding
            });
            let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
            result[ele] = decryptedStr.toString();
        })
        return result
    },
}