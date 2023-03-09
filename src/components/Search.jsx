import styled from 'styled-components'
import {useNavigate} from 'react-router-dom'
import { useForm } from '../hooks/useForm'

const SearchStyled = styled.div`
    flex: 1;
    .inputSearch{
        position: relative;
    }
    input{
        padding-block: .85rem;
        border-radius: 1.25rem;
        inline-size: 100%;
        font-family: sans-serif;
        font-size: 1rem;
        border: none;
        padding-inline-start: 2rem;
        padding-inline-end: 1rem;
        background-color: #E8E8E8;
        font-family: 'Poppins', sans-serif;
    }
    input:focus{
        outline: .25rem solid;
        outline-color: #68baf9;
        transition: .1s ease-in-out;
    }

    .icon-search{
        opacity: 1;
        position: absolute;
        left: .6rem;
        top: calc(50% - .65rem);
        font-weight: 600;
        color: #5f5f5f;
        font-size: 1.25rem;
    }

    input[type="search"]::-webkit-search-cancel-button {
        -webkit-appearance: none;
        block-size: 1.5rem;
        inline-size: 1.5rem;
        border-radius: 1rem;
        background: url(https://pro.fontawesome.com/releases/v5.10.0/svgs/solid/times-circle.svg) no-repeat 50% 50%;
        background-size: contain;
        opacity: 0;
        pointer-events: none;
    }

    input[type="search"]::-webkit-search-cancel-button:hover{
        cursor: pointer;
    }
    
    input[type="search"]:focus::-webkit-search-cancel-button {
        opacity: .3;
        pointer-events: all;
    }

`

function Search() {

    const navigate = useNavigate()

    const {form, onInputChange} = useForm({
        search: ''
    })

    const {search} = form

    const onSubmit = async(e) => {
        e.preventDefault()
        navigate(`search/${search}`)
    }

    return (
        <SearchStyled>
            <form onSubmit={onSubmit}>
                <div className="inputSearch">
                    <span className="material-symbols-outlined icon-search">search</span>
                    <input type="search" placeholder='Buscar' id='search' name='search' value={search} onChange={onInputChange} />
                </div>
            </form>
        </SearchStyled>
    )
}

export default Search
