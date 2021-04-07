interface HeadingProps {
  title?: string,
  subtitle?: string
}

function Heading(props: HeadingProps) {
  return (
    <div>
      <h2>{props.title}</h2>
      <h5>{props.subtitle}</h5>
    </div>
  )
}

export default Heading;