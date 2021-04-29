import { Heading } from "../Heading";
import { Link } from "../Link";
import { Paragraph } from "../Paragraph";

export const NoMatch = () => (
  <div>
    <Heading>Error</Heading>
    <Paragraph>
      Page not found, go back to <Link to="/">Home</Link>.
    </Paragraph>
  </div>
);
