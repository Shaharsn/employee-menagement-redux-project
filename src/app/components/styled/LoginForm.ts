import styled from "styled-components";
import { BgColorProps } from './StyleIntefaces';

export const Form = styled.form``;

export const FormGroup = styled.div`
  display: block;
  max-width: 500px;
  margin: 20px auto;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    max-width: 90%;
  }
`;

export const Label = styled.label`
  display: block;
  text-align: center;
  font-weight: 600;
`;

export const P = styled.p`
  display: block;
  text-align: center;
`;

export const Icon = styled.span<BgColorProps>`
  display: block;
  height: 40px;
  width: 40px;
  background-color: ${({ bg, theme }) => bg || theme.colors.header};
  color: ${({ color }) => color || "white"};
  border-radius: 50%;
  text-align: center;
  margin: 10px auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  padding-top: 5px;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    flex-direction: column;
    margin: 5px auto;
    height: 30px;
    width: 30px;
    padding-top: 2px;

    & > svg {
      height: 80%;
      width: 80%;
    }
  }
`;