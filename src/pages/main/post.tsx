import { addDoc, collection, getDoc, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { PostfixUnaryExpression } from 'typescript'
import { auth, db } from '../../config/firebase';
import {Post as Ipost} from './main'
import { useAuthState } from 'react-firebase-hooks/auth'
import {useNavigate} from 'react-router-dom'


interface Props{
    post: Ipost;
}

interface Like{
    likeId: string,
    userId: string

}

function Post(props:Props) {

    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    const [likes,setLikes] = useState<Like[] | null>(null);

    const {post} = props;

    const likesRef = collection(db,"likes");

    const likesDoc = query(likesRef, where("postId","==",post.id));

    const getLikes = async () =>
    {
        const data = await getDocs(likesDoc);
        setLikes(data.docs.map((doc)=>({userId:doc.data().userId, likeId:doc.id})));
    }

    const addLike = async () => {
    try{
    const newDoc = await addDoc(likesRef,{userId: user?.uid,postId: post.id});
    if(user){
    setLikes((prev) => prev ? [...prev, {userId:user.uid, likeId:newDoc.id}] : [{userId:user.uid, likeId:newDoc.id}] );
    }
    } catch (err){
    console.log(err);
    }
};

    const removeLike = async () => {
        try{
            const likeToDeleteQuery = query(likesRef, where("postId","==",post.id),
            where("userId", "==",user?.uid));

            const likeToDeleteData = await getDocs(likeToDeleteQuery);
            const LikeId = likeToDeleteData.docs[0].id;
            const likeToDelete = doc(db,"likes", LikeId );

        await deleteDoc(likeToDelete);
        if(user){
        setLikes((prev) => prev && prev.filter((like)=>like.likeId !== LikeId));
        }
        } catch (err){
        console.log(err);
        }
    };

    useEffect(()=>{
        getLikes();
    },[]);

    const hasUserLiked = likes?.find((like)=>like.userId === user?.uid);
  

  return (
    <><div className="container">
          <div className="card">
              <div className="card__header">
                  <div className='title'><h1>{post.title}</h1></div>
              </div>
              <div className="card__body">
                  <p>{post.description}</p>
              </div>
              <div className="card__footer">
                  <p>@{post.username}</p>
                  <button onClick={hasUserLiked ? removeLike : addLike}>{hasUserLiked ? <>&#128078;</> : <>&#128077;</>}</button>
                  {likes && <p>Likes: {likes?.length}</p>}
              </div>
          </div>
      </div>
      {/* <div className='post_home'>
              <div className='title'><h1>{post.title}</h1></div>
              <div className='body'><p>{post.description}</p></div>
              <div className='footer'>
                  <p>@{post.username}</p>
                  <button onClick={hasUserLiked ? removeLike : addLike}>{hasUserLiked ? <>&#128078;</> : <>&#128077;</>}</button>
                  {likes && <p>Likes: {likes?.length}</p>}
              </div>
          </div> */}
          
          </>
  )


}

export default Post
