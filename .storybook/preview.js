import GlobalStyles from "../src/GlobalStyles"
import { MemoryRouter } from "react-router";

export const decorators = [
  (Story) => (
    <>
    <GlobalStyles />
    <Story />
    </>
  ),
  (Story) => (
    <MemoryRouter><Story/></MemoryRouter>
  )
]

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}