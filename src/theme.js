// https://theme-ui.com/theming#example
const heading = {
  fontFamily: "heading",
}

export const theme = {
  initialColorMode: "light",
  colors: {
    text: "#000",
    background: "#fff",
    primary: "#33e",
    gray: ["#efefef", "#ddd", "#333", "#111"],

    modes: {
      dark: {
        text: "#fff",
        background: "#000",
      },
    },
  },

  sizes: {
    default: "90vw",
  },
  breakpoints: ["40em", "52em", "64em"],
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96],
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  fonts: {
    heading: `"Ropa Sans", sans-serif`,
    body: `"Open Sans", sans-serif`,
    monospace: "Menlo, monospace",
  },
  styles: {
    root: {
      fontFamily: "body",
      lineHeight: "body",
      fontWeight: "body",
    },
    Layout: { fontFamily: "body" },
    Header: { fontFamily: "heading" },
    h1: {
      fontFamily: "heading",
      fontSize: 8,
    },
    h2: {
      ...heading,
      fontSize: 4,
    },
    h3: {
      ...heading,
      fontSize: 3,
    },
    h4: {
      ...heading,
      fontSize: 2,
    },
    h5: {
      ...heading,
      fontSize: 1,
    },
    h6: {
      ...heading,
      fontSize: 0,
    },
    pre: {
      fontFamily: "monospace",
      overflowX: "auto",
      code: {
        color: "inherit",
      },
    },
    code: {
      fontFamily: "monospace",
      fontSize: "inherit",
    },
    table: {
      width: "100%",
      borderCollapse: "separate",
      borderSpacing: 0,
    },
    th: {
      textAlign: "left",
      borderBottomStyle: "solid",
    },
    td: {
      textAlign: "left",
      borderBottomStyle: "solid",
    },
  },
}
