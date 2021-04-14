import styled from 'styled-components';

interface HeadingProps {
  title?: string,
  subtitle?: string
}

function Heading(props: HeadingProps) {
  return (
    <div>
      <Title>{props.title}</Title>
      <Subtitle>{props.subtitle}</Subtitle>
    </div>
  )
}

const Title = styled.h2`
  margin-bottom: 5px;
`;

const Subtitle = styled.h5`
  margin-top: 5px;
  font-weight: normal;
`;

export default Heading;