type PropsType = {
  status: string
}

export default function Symbols(props: PropsType) {
  return (
    <div className={props.status}>
      <div className="shape"></div>
      <div className="shape"></div>
    </div>
  )
}
