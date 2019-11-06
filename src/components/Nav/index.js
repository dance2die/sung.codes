/** @jsx jsx */
import { jsx } from "theme-ui"
import { Header } from "theme-ui"
import { Heading, Flex } from "@theme-ui/components"

const Title = () => (
  <Flex>
    <Heading as="h1">{"{ sung.codes }"}</Heading>
    <Heading as="sup">by dance2die</Heading>
  </Flex>
)

export default () => {
  return (
    <Header>
      <Title />
    </Header>
  )
}
