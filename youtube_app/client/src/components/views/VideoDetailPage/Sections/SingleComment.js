import React,{useState} from 'react'
import {Comment,Avatar,Button,Input} from 'antd'
import {useSelector} from 'react-redux'
import Axios from 'axios';
import LikeDislikes from './LikeDislikes';
const { TextArea } = Input;

function SingleComment(props) {

  const user = useSelector(state => state.user)

  const [OpenReply, setOpenReply] = useState(false)
  const [CommentValue, setCommentValue] = useState("")
  const onClickReplyOpen = () =>{
      setOpenReply(!OpenReply)
  }
  const onHandleChange = (event) =>{
      setCommentValue(event.currentTarget.value)
  }
  const onSubmit = (event) =>{
      event.preventDefault()

      const variables = {
        content: CommentValue,
        writer: user.userData._id,
        videoId: props.videoId,
        responseTo: props.comment._id
    }

    Axios.post('/api/comment/saveComment', variables)
        .then(response => {
            if (response.data.success) {
                props.refreshFunction(response.data.result)
                setCommentValue("")
                setOpenReply(false)
                console.log(response.data.result)
            } else {
                alert("코멘트를 저장하지 못했습니다")
            }
        })    
    }

  const actions = [
    <LikeDislikes userId={localStorage.getItem('userId')} commentId={props.comment._id} />
    ,<span onClick={onClickReplyOpen} key="comment-basic-reply-to"> Reply to</span>
  ]
  
  return (
    <div>
        <Comment
            actions={actions}
            author={props.comment.writer.name}
            avatar={<Avatar src={props.comment.writer.image} alt />}
            content={<p>{props.comment.content}</p>}
        />

        {OpenReply &&
            <form style={{ display: 'flex' }} onSubmit={onSubmit}>
            <textarea
              style={{ width: '100%', borderRadius: '5px' }}
              onChange={onHandleChange}
              value={CommentValue}
              placeholder="코멘트를 작성해주세요"
            />
            <br />
            <button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>Submit</button>
          </form>
        }
    </div>
  )
}

export default SingleComment