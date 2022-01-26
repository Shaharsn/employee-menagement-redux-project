import styled from "styled-components";

export const Form = styled("form")``;

export const FormGroup = styled("div")`
  display: block;
  max-width: 500px;
  margin: 20px auto;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    max-width: 90%;
  }
`;

export const Label = styled("label")`
  display: block;
  text-align: center;
  font-weight: 600;
`;

export const P = styled("p")`
  display: block;
  text-align: center;
`;
