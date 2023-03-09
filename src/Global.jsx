import {createGlobalStyle} from 'styled-components'

const GlobalStyled = createGlobalStyle`

    body{
        margin: 0;
        font-family: 'Poppins', sans-serif;
    }
    .divError{
        background-color: #a4031c;
        color: white;
        padding: .25rem;
        text-align: center;
        border-radius: .25rem;
    }
    .divLoading{
        display: flex;
        justify-content: center;
    }
    ::-webkit-scrollbar {
        inline-size: .5rem;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        background: #f1f1f1; 
    }
    
    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #888; 
        border-radius: 1.5rem;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: #555; 
    }
`

export default GlobalStyled
