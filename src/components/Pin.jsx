import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { AuthContext } from '../context/AuthProvider'
import { GlobalUrl } from '../helpers/GlobalUrl'


const PinStyled = styled.div`
    .pin{
        position: relative;
        block-size: 100%;

    }
    .pinImg{
        inline-size: 100%;
        block-size: 100%;
        flex: 1;
        overflow: hidden;
        object-fit: cover;
        display: block;
        border-radius: 1.25rem;
        -webkit-box-shadow: 0px 0px 17px 0px rgba(0,0,0,0.31); 
        box-shadow: 0px 0px 17px 0px rgba(0,0,0,0.31);
    }
    .moreInfo{
        position: absolute;
        opacity: 0;
        max-inline-size: 100%;
        left: .25rem;
        top: 1.25rem;
        display: flex;
        gap: .75rem;
        align-items: center;
        padding-inline-start: 1rem;
        img{
            display: block;
            border-radius: 1rem;
        }
    }
    a{
        color: white;
    }
    .containerImg{
        inline-size: 100%;
        border-radius: 1.25rem;
        block-size: 100%;
    }
    .containerImg:hover{
        background-color: #000000f4;
        .pinImg{
            opacity: .5;
            transition: .2s ease-in-out;
        }
    }
    .pin:hover .moreInfo{
        opacity: 1;
        transition: .2s ease-in-out;
    }
    .nameInfo{
        font-weight: 500;
    }
    .imgUser{
        object-fit: cover;
        border-radius: 1.5rem;
    }

    
`

function Pin({size, id, image, userId}) {

    const {auth, token} = useContext(AuthContext)
    const [user, setUser] = useState('')

    const getInfoUser = async(userId) => {
        try {
            const response = await fetch(`${GlobalUrl.url}/users/${userId}`, {
                headers: {
                    "authorization" : token
                }
            })
            const json = await response.json()
            setUser(json)
        } catch (error) {
            console-log(error)
        }
    }

    useEffect(()=> {
        getInfoUser(userId)
    }, [])

    return (
        <PinStyled className={`item ${ size === 0 ? 'small' : (size === 1 ? 'medium' : (size === 2 ? 'large' : 'big')) }`}>
            <div className="pin">
                <div className="containerImg">
                    <Link to={`post/${id}`}>
                        <img src={image.url} className="pinImg" alt={`Pin de ${user.username}`} title={`Pin de ${user.username}`} />
                        <div className="moreInfo">
                            <img className='imgUser' src={user.image ? user.image.url : 'https://res.cloudinary.com/dkzturwmj/image/upload/v1678075277/usersImage/user_default_rna1sq.jpg'} 
                            alt={user.username} title={user.username} width="32" height="32"/>
                            <span className='nameInfo'>{user.username}</span>
                        </div>
                    </Link>
                </div>
            </div>
        </PinStyled>
    )
}

export default Pin
