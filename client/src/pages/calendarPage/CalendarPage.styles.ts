import styled from 'styled-components'

export const CustomCalendarPage = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  height: 100vh;
  min-width: 930px;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;

    .title {
      font-style: normal;
      font-weight: 400;
      font-size: 24px;
      line-height: 28px;
      color: #262842;
      white-space: nowrap;
    }
  }
`
