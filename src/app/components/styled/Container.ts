import styled from 'styled-components'

export const Container = styled("div")`
  width: 1000px;
  max-width: 100%;
  padding: 0 20px;
  margin: 0 auto;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    padding: 0;
    margin: 0;
  }
`