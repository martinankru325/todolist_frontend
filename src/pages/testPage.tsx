import { useNavigate } from "react-router-dom"

export const TestPage = () => {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate('/auth')}>ТЫКНУТЬ СЮДА</button>
  )
}
