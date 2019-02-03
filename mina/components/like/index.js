// components/like/classic.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        like: {
            type: Boolean
        },
        count: {
            type: Number
        },
        readOnly:{
            type:Boolean
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        yesSrc: 'images/like.png',
        noSrc: 'images/like@dis.png',
        goods: []
    },
    /**
     * 组件的方法列表
     */
    methods: {
        // onLike事件会见听到./classic.wxml 中的bind:tap='onLike'事件，
        // 并将like的值通过触发组建的调用方( pages/classic/classic.wxml中的<v-like bind:like="onLike"> )并将值传递给pages
        onLike: function () {
            if(this.properties.readOnly){
                return
            }
            let like = this.properties.like
            let count = this.properties.count

            count = like ? count - 1 : count + 1
            this.setData({
                count: count,
                like: !like
            })

            let behavior = this.properties.like ? 'like' : 'cancel'
            this.triggerEvent('like', {
                behavior: behavior
            }, {})
        }
    }
})