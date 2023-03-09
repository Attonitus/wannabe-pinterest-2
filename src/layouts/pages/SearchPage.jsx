import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import Pin from '../../components/Pin'
import { AuthContext } from '../../context/AuthProvider'
import { GlobalUrl } from '../../helpers/GlobalUrl'

const SearchPageStyled = styled.div`
    .grid{
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-auto-rows: 6.25rem;
      gap: .5rem;
      max-inline-size: 85rem;
      margin: auto;
      padding-inline: .5rem;
    }

    @media screen and (min-width: 520px){
      .grid{
        grid-template-columns: repeat(3, 1fr);
      }
    }

    @media screen and (min-width: 768px){
      .grid{
        grid-template-columns: repeat(4, 1fr);
      }
    }

    @media screen and (min-width: 1024px){
      .grid{
        grid-template-columns: repeat(5, 1fr);
      }
    }

    .item.small {
      grid-row-end: span 2;
    }

    .item.medium{
        grid-row-end: span 3;
    }

    .large {
        grid-row-end: span 4;
    }

    .big {
        grid-row-end: span 5;
    }
`

function SearchPage() {
    const [pins, setPins] = useState([])
    const {auth, token} = useContext(AuthContext)
  
    const {search} = useParams()
  
    const getRandomSize = (max) => {
      return Math.floor(Math.random() * max)
    }

    const searchPosts = async() => {
        try {
          const response = await fetch(`${GlobalUrl.url}/post/buscar/${search}`, {
            headers : {
              "authorization" : token
            }
          })
          const json = await response.json()
          setPins(json)
        } catch (error) {
          console.log(error)        
        }
    }
      
    useEffect(()=> {
        searchPosts() 
    }, [search])

    return (
        <SearchPageStyled>
            <div className="grid">
                {
                    pins.length < 1 ? <h3>No hay resultados</h3> : 
                    pins.map(pin => {
                        return( <Pin key={pin._id} id={pin._id} size={getRandomSize(4)} image={pin.image} {...pin} /> )
                    })
                }
            </div>
        </SearchPageStyled>
    )
}

export default SearchPage
