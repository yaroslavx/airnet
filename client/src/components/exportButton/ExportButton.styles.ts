import styled from 'styled-components'

export const CustomExportButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;
  width: 101px;
  height: 40px;
  background: #ffffff;
  border: 1px solid rgba(38, 40, 66, 0.12);
  border-radius: 10px;
  padding: 16px 19px 16px 19px;
  cursor: pointer;

  .icon {
    color: #262842;
    font-size: 17px;
    margin-right: 12px;
    margin-bottom: -2px;
  }

  span {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 18px;
    color: #262842;
  }
`
