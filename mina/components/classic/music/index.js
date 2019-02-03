// components/classic/music/classic.js
import {classicBeh} from "../classic-beh";

const mMgr = wx.getBackgroundAudioManager()

Component({
    /**
     * 组件的属性列表
     */
    behaviors: [classicBeh],
    properties: {
        src: String,
        title: String
    },

    /**
     * 组件的初始数据
     */
    data: {
        playing: false,
        pauseUrl: 'images/player@pause.png',
        playUrl: 'images/player@play.png'
    },
    attached: function (event) {
        this._recoverStatus()
    },
    /**
     * 组件的方法列表
     */
    methods: {
        onPlay: function () {
            // 播放按钮图片切换
            if (!this.data.playing) {
                this.setData({
                    playing: true
                })
                mMgr.title = this.properties.title
                mMgr.src = this.properties.src
            } else {
                this.setData({
                    playing: false
                })
                mMgr.pause()
            }
        },
        _recoverStatus: function () {
            if (mMgr.paused) {
                this.setData({
                    playing: false
                })
                return
            }
            if (mMgr.src == this.properties.src) {
                this.setData({
                    playing: true
                })
            }
        },
        _monitorSwitch: function () {
            mMgr.onPlay(() => {
                this._recoverStatus()
            })
            mMgr.onPause(() => {
                this._recoverStatus()
            })
            mMgr.onStop(() => {
                this._recoverStatus()
            })
            mMgr.onEnded(() => {
                this._recoverStatus()
            })
        }
    }
})
