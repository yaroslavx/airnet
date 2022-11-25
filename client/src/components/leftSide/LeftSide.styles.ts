import styled from 'styled-components'

type LeftSide = {
  width: number
}

export const CustomLeftSide = styled.div<LeftSide>`
  position: relative;
  border-right: 1px solid rgba(38, 40, 66, 0.12);
  min-width: 170px;
  max-width: 80vw;
  width: ${(props) => `${props.width}px`};

  .resize {
    position: absolute;
    right: 0px;
    height: 100%;
    border: none;
    width: 5px;
    background-color: rgba(38, 40, 66, 0.05);
    cursor: col-resize;
    transition: 0.3s;

    &:active {
      width: 5px;
      background-color: rgb(52, 127, 235);
    }

    &:hover {
      width: 5px;
      background-color: rgb(52, 127, 235);
    }
  }

  .leftside_header {
    height: 48px;
    background-color: #fafafa;
    padding: 15px 20px;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 18px;
    color: #6d6e85;
    border-radius: 10px 0px 0px 0;
    border-bottom: 1px solid rgba(38, 40, 66, 0.12);
    overflow: hidden;
  }

  .add_bar {
    display: flex;
    align-items: center;
    height: 40px;
    padding-left: 18px;
    border-bottom: 1px solid rgba(38, 40, 66, 0.12);
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    color: #262842;
    overflow: hidden;

    .add_button {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      height: 24px;
      width: fit-content;
      padding: 5px;
      border-radius: 4px;
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 18px;
      color: #6d6e85;
      border: 1px solid rgba(38, 40, 66, 0.12);
      cursor: pointer;
    }
  }

  .profiles {
    overflow: hidden;

    .profile_container {
      display: flex;
      align-items: center;
      border-bottom: 1px solid rgba(38, 40, 66, 0.12);
      height: 40px;
      padding-left: 25px;

      .profile {
        font-style: normal;
        font-weight: 500;
        font-size: 15px;
        line-height: 18px;
        color: #6d6e85;
      }
    }

    .selected {
      background-color: #eee;
    }
  }
`
