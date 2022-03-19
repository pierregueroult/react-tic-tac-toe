type propsTypes = {
  round: number
  replay: Function
}

export default function Topbar(props: propsTypes) {
  return (
    <div className="topbar">
      Tic Tac Toe
      <div className="replay" onClick={() => props.replay()}>
        <i className="fa-solid fa-arrow-rotate-left"></i>
      </div>
    </div>
  )
}
