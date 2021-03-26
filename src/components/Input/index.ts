import styled from 'styled-components'

const Input = styled.input`
  background: #fff;
  border-radius: 8px;
  padding: 18px 24px;
  width: 100%;
  border: 0;
  font-size: 16px;

  &::placeholder {
    color: #b7b7cc;
  }

  & + input {
    margin-top: 24px;
  }
`

export default Input
