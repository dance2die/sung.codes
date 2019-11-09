import { graphql } from "gatsby"

export const bannerImage = graphql`
  fragment bannerImage260 on File {
    childImageSharp {
      fluid(maxWidth: 260, traceSVG: { color: "#FFC600" }, quality: 50) {
        ...GatsbyImageSharpFluid_withWebp_tracedSVG
      }
    }
  }
  fragment bannerImage640 on File {
    childImageSharp {
      fluid(maxWidth: 640, traceSVG: { color: "#FFC600" }) {
        ...GatsbyImageSharpFluid_withWebp_tracedSVG
      }
    }
  }
  fragment bannerImage720 on File {
    childImageSharp {
      fluid(maxWidth: 720, traceSVG: { color: "#FFC600" }, quality: 75) {
        ...GatsbyImageSharpFluid_withWebp_tracedSVG
      }
    }
  }
`
