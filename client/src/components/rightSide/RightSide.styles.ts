import styled from 'styled-components'

export const CustomRightSide = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: auto;

  .rightside_header {
    display: flex;
    align-items: center;
    height: 48px;
    min-width: 770px;
    background-color: #fafafa;
    padding: 15px 20px;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 18px;
    color: #6d6e85;
    border-radius: 0 10px 0 0;
    border-bottom: 1px solid rgba(38, 40, 66, 0.12);

    .current_day {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #fff;
      border: none;
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

      /* box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px; */
      cursor: pointer;
    }
  }

  .days {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: calc(100vh - 150px);
    min-width: 880px;
    overflow: auto;
    border-radius: 0 0 10px 0;
    padding: 5px;

    .day_container {
      width: calc(100% / 7);
      height: calc(100% / 5);
      min-height: 150px;
      padding: 5px;

      .day {
        position: relative;
        background-color: aliceblue;
        width: 100%;
        height: 100%;
        background-color: #fafafa;
        border-radius: 9px;

        .date {
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          right: 7px;
          top: 7px;
          width: 28px;
          height: 28px;
          border-radius: 100%;
          text-align: center;
        }

        .date_description {
          position: absolute;
          left: 7px;
          top: 11px;
          color: #aaa;
        }

        .today {
          background-color: rgb(236, 84, 70);
        }

        .add_task {
          display: none;
        }

        &:hover {
          .add_task {
            display: block;
            position: absolute;
            font-size: 29px;
            height: 29px;
            width: 29px;
            bottom: 5px;
            right: 6px;
            border: none;
            color: #000;
            background-color: transparent;
            cursor: pointer;
          }
        }
      }

      .date_description {
        color: #fff;
      }
    }
  }
`
