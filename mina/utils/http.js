import {config} from '../config.js'

const tips = {
    1:'抱歉，出现了一个错误',
    1005:'appky无效',
    3000:'期刊不存在'
}

class HTTP {
    constructor() {
        this.baseRestUrl = config.api_blink_url
    }

    //http 请求类, 当noRefech为true时，不做未授权重试机制
    request(params) {
        var that = this;
        var url = this.baseRestUrl + params.url;
        if (!params.method) {
            params.method = 'GET';
        }
        wx.request({
            url: url,
            data: params.data,
            method: params.method,
            header: {
                'content-type': 'application/json',
                'appkey': config.appkey
            },
            success: function (res) {
                // 判断以2（2xx)开头的状态码为正确
                // 异常不要返回到回调中，就在request中处理，记录日志并showToast一个统一的错误即可
                var code = res.statusCode.toString();
                // var startChar = code.charAt(0);
                if (code.startsWith('2')) {
                    params.success && params.success(res.data);
                } else {
                    let error_code = res.data.error_code
                    // params.error && params.error(res);
                    this._show_error(error_code)
                }
            },
            fail: function (err) {
                this._show_error(1)
            }
        });
    }

    _show_error(error_code){
        if(!error_code){
            error_code=1
        }
        wx.showToast({
            title:tips[error_code],
            icon:'none',
            duration:2000
        })
    }
};

export {HTTP};