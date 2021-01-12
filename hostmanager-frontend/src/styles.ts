import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    :not(input):not(textarea),
    :not(input):not(textarea)::after,
    :not(input):not(textarea)::before {
        -webkit-user-select: none;
        user-select: none;
        cursor: default;
    }
    input, button, textarea, :focus {
        outline: none; // You should add some other style for :focus to help UX/a11y
    }

    ::-webkit-scrollbar {
        width: 8px;
    }
     
    ::-webkit-scrollbar-track {
        // -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.3); 
        border-radius: 10px;
        background: #FFFFFF;
    }
     
    ::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background: #7F7F7F;
        // -webkit-box-shadow: inset 0 0 10px rgba(0,0,0,0.5); 
    }
`