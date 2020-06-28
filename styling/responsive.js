import { Dimensions, PixelRatio } from "react-native";

let { width, height } = Dimensions.get("window");

const widthToDp = (number) => {
  let givenWidth = typeof number === "number" ? number : parseFloat(number);
  return PixelRatio.roundToNearestPixel((width * givenWidth) / 100);
};

const heightToDp = (number) => {
  let givenHeight = typeof number === "number" ? number : parseFloat(number);
  return PixelRatio.roundToNearestPixel((height * givenHeight) / 100);
};

const listenToOrientationChange = (ref) => {
  Dimensions.addEventListener("change", (newDimension) => {
    width = newDimension.screen.width;
    height = newDimension.screen.height;
    ref.setState({ orientation: height > width ? "portrait" : "landscape" });
  });
};

const removeOrientationChange = () => {
  Dimensions.removeEventListener("change");
};

export {
  widthToDp,
  heightToDp,
  listenToOrientationChange,
  removeOrientationChange,
};
