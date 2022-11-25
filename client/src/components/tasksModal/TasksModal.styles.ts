import styled from 'styled-components'

export const CustomTasksModal = styled.div`
  position: absolute;
  padding: 10% 20%;
  top: -77px;
  left: -25px;
  width: 100vw;
  height: 100vh;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .modal {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px;
    width: 200px;
    height: fit-content;
    min-width: 500px;
    background-color: #fff;
    border-radius: 10px;
    justify-content: space-between;
    gap: 20px;
    box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;

    .tasks {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 5px;

      .task_container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: lightblue;
        padding: 5px;
        border-radius: 5px;

        .task {
          display: flex;
          align-items: center;
          min-height: 21px;
          width: 100%;
          margin-right: 20px;
          overflow: auto;
        }

        .delete {
          background-color: #fff;
          border-radius: 5px;
          height: 15px;
          width: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          cursor: pointer;

          &:hover {
            background-color: salmon;
          }
        }
      }
    }
  }
`
