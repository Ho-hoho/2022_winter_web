const express = require('express');
const router = express.Router();
const {Like} = require("../models/Like")
const {Dislike} = require("../models/Dislike")


router.post("/getLikes", (req,res) =>{
    let variable = {}
    if(req.body.videoId){
        variable = {videoId : req.body.videoId}
    } else {
        variable = {commentId: req.body.commentId}
    }
    
    Like.find(variable)
    .exec((err,likes) => {
        if(err) return res.status(400).send(err)
        res.status(200).json({success: true, likes})
    })

})

router.post("/getDislikes", (req,res) =>{
    let variable = {}
    if(req.body.videoId){
        variable = {videoId : req.body.videoId}
    } else {
        variable = {commentId: req.body.commentId}
    }
    
    Dislike.find(variable)
    .exec((err,dislikes) => {
        if(err) return res.status(400).send(err)
        res.status(200).json({success: true, dislikes})
    })

})


router.post("/upLike", (req, res) => {

    let variable = {}

    if (req.body.videoId) {
        variable = { videoId: req.body.videoId, userId: req.body.userId }
    } else {
        variable = { commentId: req.body.commentId, userId: req.body.userId }
    }


    const like = new Like(variable)

    // Like collection에 클릭 정보를 넣음
    like.save((err, likeResult) => {
        if (err) return res.json({ success: false, err })

        // 만약에 Dislike이 이미 클릭이 되어있다면 Dislike을 1 줄여준다
        Dislike.findOneAndDelete(variable)
            .exec((err, disLikeResult) => {
                if (err) return res.status(400).json({ success: false, err })
                return res.status(200).json({ success: true })
            })
    })
})


router.post("/unLike", (req, res) => {

    let variable = {}

    if (req.body.videoId) {
        variable = { videoId: req.body.videoId, userId: req.body.userId }
    } else {
        variable = { commentId: req.body.commentId, userId: req.body.userId }
    }

    Like.findOneAndDelete(variable)
        .exec((err, result) => {
            if (err) return res.status(400).json({ success: false, err })
            return res.status(200).json({ success: true })
        })
})

///////////////////////////////////////////////////////////
router.post("/upDislike", (req, res) => {

    let variable = {}

    if (req.body.videoId) {
        variable = { videoId: req.body.videoId, userId: req.body.userId }
    } else {
        variable = { commentId: req.body.commentId, userId: req.body.userId }
    }


    const dislike = new Dislike(variable)

    // Like collection에 클릭 정보를 넣음
    dislike.save((err, dislikeResult) => {
        if (err) return res.json({ success: false, err })

        // 만약에 Dislike이 이미 클릭이 되어있다면 Dislike을 1 줄여준다
        Like.findOneAndDelete(variable)
            .exec((err, likeResult) => {
                if (err) return res.status(400).json({ success: false, err })
                return res.status(200).json({ success: true })
            })
    })
})


router.post("/unDislike", (req, res) => {

    let variable = {}

    if (req.body.videoId) {
        variable = { videoId: req.body.videoId, userId: req.body.userId }
    } else {
        variable = { commentId: req.body.commentId, userId: req.body.userId }
    }

    Dislike.findOneAndDelete(variable)
        .exec((err, result) => {
            if (err) return res.status(400).json({ success: false, err })
            return res.status(200).json({ success: true })
        })
})

module.exports = router
module.exports = router