import { Heading } from "../Heading";
import { Link } from "../Link";
import { Paragraph } from "../Paragraph";

export const Home = () => (
  <div>
    <Heading>Home</Heading>
    <Paragraph>
      This is the example app for NAMPI useApi. Please go to{" "}
      <Link to="/persons">Persons</Link> to start.
    </Paragraph>
  </div>
);
