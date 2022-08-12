import styled from 'styled-components'

export const HomeBg = styled.div`
  font-family: 'Roboto';
  //   border: 2px solid #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background-size: cover;
  background-position: center;
  height: 501px;
  background-image: url('${props => props.bgImageSmall}');
  @media screen and (min-width: 768px) {
    height: 100vh;
    background-image: url('${props => props.bgImageBig}');
  }
`
