import styled from 'styled-components'

export const CustomAddTaskModal = styled.div`
  position: absolute;
  padding: 10% 20%;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  .modal {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px;
    width: 100%;
    height: 100%;
    min-width: 500px;
    min-height: 300px;
    background-color: #fff;
    border-radius: 10px;
    justify-content: space-between;
    gap: 20px;
    box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;

    .textarea {
      width: 100%;
      height: 100%;
      border: 1px solid rgba(38, 40, 66, 0.12);
      border-radius: 10px;
      outline: none;
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 18px;
      color: #000;
      padding: 20px;
      resize: none;
    }

    .buttons {
      display: flex;
      width: 100%;
      gap: 20px;

      .add_task {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 8px;
        height: 28px;
        width: 200px;
        padding: 5px;
        padding-left: 20px;
        border-radius: 4px;
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 18px;
        color: #6d6e85;
        border: 1px solid rgba(38, 40, 66, 0.12);
        cursor: pointer;
      }

      .upload_file {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 8px;
        height: 28px;
        width: 140px;
        padding: 5px;
        padding-left: 20px;
        border-radius: 4px;
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 18px;
        color: #6d6e85;
        border: 1px solid rgba(38, 40, 66, 0.12);
        cursor: pointer;
      }

      .uploaded_file {
        width: 100%;
        background-color: aliceblue;
      }
    }
  }
`
