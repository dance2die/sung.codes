/** @jsx jsx */
import { jsx } from "theme-ui"
import { Header } from "theme-ui"
import { Heading } from "@theme-ui/components"

export default () => {
  return (
    <Header>
      <Heading as="h1">{"{ sung.codes }"}</Heading>
      <Heading as="sup">by dance2die</Heading>
    </Header>
  )
}
