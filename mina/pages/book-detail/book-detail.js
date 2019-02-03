import {BookModel} from '../../models/book.js'
import {LikeModel} from '../../models/like.js'
const likeModel = new LikeModel()
const bookModel = new BookModel()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        comments: [],
        book: null,
        likeStatus: false,
        likeCount: 0,
        posting:false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.showLoading()
        const bid = options.bid||options.cid
        const detail = bookModel.getDetail(bid)
        const comments = bookModel.getComment(bid)
        const likeStatus = bookModel.getLikeStatus(bid)

        Promise.all([detail, comments, likeStatus])
            .then(res => {
                this.setData({
                    book: res[0],
                    comments: res[1].comments,
                    likeStatus: res[2].like_status,
                    likeCount: res[2].fav_nums
                })
                wx.hideLoading()
            })

        // detail.then(res => {
        //   console.log(res)
        //   this.setData({
        //     book: res
        //   })
        //   wx.hideLoading()
        // })

        // comments.then(res => {
        //   console.log(res)
        //   this.setData({
        //     comments: res.comments
        //   })
        // })

        // likeStatus.then(res => {
        //   console.log(res)
        //   this.setData({
        //     likeStatus: res.like_status,
        //     likeCount: res.fav_nums
        //   })
        // })
        // wx.hideLoading()
    },
    onLike(e){
        const like_or_cancel = e.detail.behavior
        likeModel.like(like_or_cancel,this.data.book.id,400)
    },
    onFakePost(e){
        this.setData({
            posting:true
        })
    },
    onCancel(e){
        this.setData({
            posting:false
        })
    },

    onPost(event) {
        const comment = event.detail.text || event.detail.value

        if (!comment) {
            return
        }

        if (comment.length > 12) {
            wx.showToast({
                title: '短评最多12个字',
                icon: 'none'
            })
            return
        }

        bookModel.postComment(this.data.book.id, comment)
            .then(res => {
                wx.showToast({
                    title: '+ 1',
                    icon: "none"
                })

                this.data.comments.unshift({
                    content: comment,
                    nums: 1
                })

                this.setData({
                    comments: this.data.comments,
                    posting: false
                })
            })
    }
})