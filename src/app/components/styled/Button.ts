import styled from "styled-components";

export const Button = styled("button")<{ bg: string; color: string }>`
  display: block;
  text-align: center;
  margin: 10px auto;
  border-radius: 50px;
  border: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);

  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  padding: 15px 60px;
  background-color: ${({ bg }) => bg || "#fff"};
  color: ${({ color }) => color || "#333"};

  &:hover {
    opacity: 0.8;
    transform: scale(0.98);
  }
`;

export const IconButton = styled("span")<{ bg?: string; color?: string }>`
  display: block;
  height: 40px;
  width: 40px;
  background-color: ${({ bg, theme }) => bg || theme.colors.header};
  color: ${({ color }) => color || "white"};
  border-radius: 50%;
  text-align: center;
  margin: 10px auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  cursor: pointer;

  & > span {
    margin: 25%;
  }

  &:hover {
    opacity: 0.8;
    transform: scale(0.95);
  }
`;
