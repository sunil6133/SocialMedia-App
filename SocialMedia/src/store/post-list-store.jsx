import { createContext } from "react";
import { useReducer } from "react";

export const PostList = createContext({
  postList:[],
  addPost:() => {},
  deletePost:() => {},
});


const postListReducer = (currPostList, action) => {
  let newPostList = currPostList;
  if(action.type === "DELETE_POST")
  {
    newPostList = currPostList.filter((post) => 
    post.id !== action.payload.postId);
  }
  else if (action.type === "ADD_POST"){
    newPostList = [action.payload, ...currPostList];
  }
  return newPostList;
}

const PostListProvider = ({children}) => {

  const[postList,dispatchPostList] = useReducer(postListReducer, DEFAULT_POSTLIST);

  const addPost = (userId, postTitle, postBody, reactions, tags) => {
    dispatchPostList({
      type: "ADD_POST",
      payload: {
        id: Date.now(),
        title: postTitle,
        body: postBody,
        reactions: reactions,
        userId: userId,
        tags: tags,
      },
    });
  };

  const deletePost = (postId) => {
    dispatchPostList({
      type:"DELETE_POST",
      payload: {
        postId,
      },
    })
  }



  return <PostList.Provider value={{
    postList,addPost,deletePost}
    }>
    {children}
  </PostList.Provider>
}

const DEFAULT_POSTLIST = [
  {
    id: '1',
    title:'Going to Mumbai',
    body:'Hi Friends , Going to enjoy in mumbai. Peace Out',
    reactions:99,
    userId:'user-009',
    tags:['vacation','mumbai','enjoyment']
  },


  {
    id: '2',
    title:'Success',
    body:'Happy with the success',
    reactions:12,
    userId:'user-005',
    tags:['success','proud']
  },

  {
    id: '3',
    title:'Congrats',
    body:'Congratulations on your wedding',
    reactions:15,
    userId:'user-007',
    tags:['happy','together','wedding']
  }
];

export default PostListProvider;