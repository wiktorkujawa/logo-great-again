import styled from 'styled-components/macro';

export const StartButton = styled.button`
  color: ${p => p.theme.brand};
  background-color: white;
  text-decoration: none;
  width:auto;
  border-radius: 20px;
  height: 2.2rem;
  text-align: center;
  border-width: 0px;
  border-color: #E8E8E8;
  font-weight:bold;

  -webkit-box-shadow: 0px 0px 10px 2px rgba(232,232,232,1);
-moz-box-shadow: 0px 0px 10px 2px rgba(232,232,232,1);
box-shadow: 0px 0px 10px 2px rgba(232,232,232,1);
  

  .text-with-icon{
    padding: 0 .5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    cursor: pointer;
  }

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.4;
  }
`;