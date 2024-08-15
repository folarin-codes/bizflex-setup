import * as React from "react";
import Svg, { SvgProps, Rect, Path } from "react-native-svg";
const EditDirectorSvg = (props: any) => (
  <Svg
    width={11}
    height={11}
    viewBox="0 0 11 11"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Rect width={10.7586} height={10.7586} rx={1.65517} fill="#E4E7EC" />
    <Path
      d="M5.8574 2.19283L2.74327 5.48904C2.62568 5.61421 2.51189 5.86076 2.48913 6.03145L2.34878 7.26042C2.29947 7.70421 2.61809 8.00766 3.05809 7.9318L4.27947 7.72318C4.45016 7.69283 4.68913 7.56766 4.80671 7.43869L7.92085 4.14249C8.45947 3.57352 8.70223 2.9249 7.86396 2.13214C7.02947 1.34697 6.39602 1.62387 5.8574 2.19283Z"
      stroke="#292D32"
      strokeWidth={0.568965}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M5.33789 2.74316C5.50099 3.79006 6.35065 4.59041 7.40513 4.69661"
      stroke="#292D32"
      strokeWidth={0.568965}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M1.9668 9.17236H8.79438"
      stroke="#292D32"
      strokeWidth={0.568965}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default EditDirectorSvg;
