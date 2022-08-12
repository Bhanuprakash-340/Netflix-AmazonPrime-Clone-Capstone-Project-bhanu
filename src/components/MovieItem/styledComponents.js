import styled from 'styled-components'

export const MovieItemBg = styled.div`
  height: 420px;
  background-size: cover;
  background-position: center;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(24, 24, 24, 0.546875) 38.26%,
    #131313 92.82%,
    #131313 98.68%,
    #131313 108.61%
  );
  background-image: url('${props => props.movieItemBgSm}');
  @media screen and (min-width: 768px) {
    height: 100vh;
    background-image: url('${props => props.movieItemBgLg}');
    background-size: cover;
  }
`
