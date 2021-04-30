import styled from 'styled-components/macro';

export const TextInput = styled.input`
  color: ${p => p.theme.primary};
  text-decoration: none;

  outline:none;
  width:100%;
  font-style: italic;
  opacity:0.4;

  height: 2rem;
  
  ${({ theme }) => theme && `
    border-color: ${theme.error} !important;
  `}

  text-align: center;
  border-width: 0 0 2px 0;
  border-color: ${p => p.theme.accent}; 

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.4;
  }
`;