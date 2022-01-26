import styled from "styled-components";

export const Card = styled("div")`
  display: block;
  align-items: center;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  margin: 40px 0;
  padding: 15px;

  img {
    width: 80%;
  }

  @media (max-width: ${({ theme }) => theme.mobile}) {
    flex-direction: column;
    margin: 4px 0;
    padding: 0;
    border-radius: 0;
  }
`;

export const CardHeader = styled("div")`
  display: flex;
  flex: 1;
  justify-content: space-between;
  margin: 0 15px 0 0;
  
  @media (max-width: ${({ theme }) => theme.mobile}) {
    margin: 0;
  }
`;

export const CardHeaderTitle = styled("label")`
  padding-left: 20px;
  padding-top: 10px;
  font-size: 26px;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    padding: 10px;
    font-size: 22px;
  }
`;

export const CardHeaderActions = styled("div")`
  padding:  5px 10px 0 0;
  text-align: right;
`;

export const CardBody = styled("div")`
  display: block;
  padding: 20px;
  max-height: 400px;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    padding: 10px;
  }
`;
