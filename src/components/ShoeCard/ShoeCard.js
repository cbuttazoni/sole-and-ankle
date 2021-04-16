import React from "react"
import styled from "styled-components/macro"

import { COLORS, WEIGHTS } from "../../constants"
import { formatPrice, pluralize, isNewShoe } from "../../utils"
import Spacer from "../Spacer"

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  const STYLES = {
    "on-sale": {
      "--showSalesPrize": "visible",
      "--textDecorationPrize": "line-through",
      "--backgroundColorFlag": COLORS.primary,
      "--showFlag": "visible",
      "--contentFlag": "Sale",
    },
    "new-release": {
      "--showSalesPrize": "hidden",
      "--textDecorationPrize": "inherit",
      "--backgroundColorFlag": COLORS.secondary,
      "--showFlag": "visible",
      "--contentFlag": "Just Released!",
    },
    default: {
      "--showSalesPrize": "hidden",
      "--textDecorationPrize": "inherit",
      "--backgroundColorFlag": COLORS.primary,
      "--showFlag": "hidden",
      "--contentFlag": "",
    },
  }
  const styles = STYLES[variant]
  let flagText = ""

  switch (variant) {
    case "on-sale": {
      flagText = "Sale"
      break
    }
    case "new-release": {
      flagText = "Just Released!"
      break
    }
  }

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Flag style={styles}>{flagText}</Flag>
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price style={styles}>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize("Color", numOfColors)}</ColorInfo>
          <SalePrice style={styles}>{formatPrice(salePrice)}</SalePrice>
        </Row>
      </Wrapper>
    </Link>
  )
}

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`

const Wrapper = styled.article`
  width: 340px;
`

const ImageWrapper = styled.div`
  position: relative;
`

const Image = styled.img`
  width: 100%;
  border-radius: 16px 16px 4px 4px;
`

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`

const Price = styled.span`
  font-weight: ${WEIGHTS.normal};
  color: ${COLORS.gray[900]};
  text-decoration: var(--textDecorationPrize);
`

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
  font-weight: ${WEIGHTS.normal};
`

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
  visibility: var(--showSalesPrize);
`

const Flag = styled.div`
  position: absolute;
  top: 12px;
  right: -4px;
  height: 32px;
  width: fit-content;
  background-color: var(--backgroundColorFlag);
  content: var(--contentFlag);
  border-radius: 2px;
  padding: 7px 9px 9px 11px;
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.white};
  line-height: initial;
  visibility: var(--showFlag);
`

export default ShoeCard
