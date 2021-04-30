
import styled from 'styled-components/macro';

interface ISlot {
  input?: boolean,
  width?: number,
  height?: number
}

const ImageSlot = styled.div<ISlot>`

background-color: ${p => p.input? 'white' : '#F5F5F5'};

width: ${p => p.width+'px'} !important;
height: ${p => p.height+'px'} !important;

border: ${p => p.input? 'none' : '2px dashed #00D2B4'};

margin-bottom:6rem;

-webkit-box-shadow: ${p => p.input? '0px 0px 10px 2px rgba(232,232,232,1)':'none'};
-moz-box-shadow: ${p => p.input? '0px 0px 10px 2px rgba(232,232,232,1)':'none'};
box-shadow: ${p => p.input? '0px 0px 10px 2px rgba(232,232,232,1)':'none'};

display: flex;
justify-content: center;

height:100%;
max-height: 149px;
padding:2rem;

`;

ImageSlot.defaultProps = {
  input: false,
  width: 148,
  height: 148
};
export default ImageSlot;
