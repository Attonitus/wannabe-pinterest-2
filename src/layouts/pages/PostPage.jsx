import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { AuthContext } from '../../context/AuthProvider'
import { GlobalUrl } from '../../helpers/GlobalUrl'

const PostPageStyled = styled.div`
    max-inline-size: 75rem;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin: auto;
    .pinUp{
        display: flex;
        position: relative;
    }
    .imgPin{
        inline-size: 100%;
        flex: 1;
        display: block;
        object-fit: cover;
        border-radius: 1rem;
    }

    .textDown{
        display: flex;
        flex-direction: column;
        padding: 1rem;
    }
    .title{
        font-size: 2rem;
        font-weight: 500;
        margin-block: 1rem;
    }
    .descri{
        margin-block-end: 1rem;
    }
    .userInfo{
        display: flex;
        align-items: center;
        gap: .75rem;
        img{
            display: block;
            border-radius: 1.5rem;
        }
    }
    .userName{
        font-weight: 500;
    }
    .deleteButton{
        position: absolute;
        top: 1rem;
        right: 1rem;
        padding-block: .5rem;
        padding-inline: .5rem;
        display: block;
        border-radius: 1rem;
        border: 1px solid #e60527;
        background-color: #e60527;
        span{
            font-size: 2rem;
            color: white;
        }
    }
    .deleteButton:hover{
        transition: .2s ease-in-out;
        cursor: pointer;
        background-color: white;
        span{
            color: #e60527;
        }
    }
    .imgPerfil{
        object-fit: cover;
    }
    @media screen and (min-width: 768px){
        .pinUp{
            inline-size: 60%;
        }
    }
`

function PostPage() {

    const {id} = useParams()
    const {auth, token} = useContext(AuthContext)
    const [post, setPost] = useState()
    const [user, setUser] = useState()
    const navigate = useNavigate()

    const getPin = async(id) => {
        try {
            const pinData = await fetch(`${GlobalUrl.url}/post/${id}`, {
                headers : {
                    "authorization" : token
                }
            })
            const pinJson = await pinData.json()

            setPost(pinJson.post)
            setUser(pinJson.userInfo)

        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

    const onDelete = async() => {
        try {
            const response = await fetch(`${GlobalUrl.url}/post/${id}`, {
                method: "delete",
                headers: {
                    "authorization" : token
                }
            })
            await response.json()
            navigate("/feed")
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=> {
        getPin(id)
    },[])

    if(post && user){
        return (
            <PostPageStyled>
                <div className="pinUp">
                    <img src={post.image.url} className="imgPin" alt={`Pin de ${user.username}`} title={`Pin de ${user.username}`} />
                    {
                        auth._id === post.userId ? <button onClick={onDelete} className='deleteButton'><span className="material-symbols-outlined">delete</span></button> : null
                    }
                    
                </div>
                <div className="textDown">
                    <span className='title'>{post.title}</span>
                    <span className='descri'>{post.description}</span>
                    <div className="userInfo">
                        <img className='imgPerfil' src={user.image ? user.image.url : 'https://res.cloudinary.com/dkzturwmj/image/upload/v1678075277/usersImage/user_default_rna1sq.jpg'} width="50" height="50" alt={`Imagen de perfil de ${user.username}`} title={`Imagen de perfil de ${user.username}`} />
                        <span className='userName'>{user.username}</span>
                    </div>
                </div>
            </PostPageStyled>
        )
    } 


    
}

export default PostPage
