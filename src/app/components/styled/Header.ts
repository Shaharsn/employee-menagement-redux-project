import styled from "styled-components";

export const StyledHeader = styled.header`
  background-color: ${({ theme }) => theme.colors.header};
  padding: 30px 0;
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
`;

export const Title = styled.div`
  margin: 0px;
  padding: 0;
  color: white;
  text-align: center;
  font-size: 24px;

`;

export const RightMenu = styled.div`
  text-align: right;
  margin-right: 20px;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    margin-right: 0;
  }
`;
