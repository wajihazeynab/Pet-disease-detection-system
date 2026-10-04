import * as React from "react";
import Svg, { G, Path, Rect, Defs, Pattern, Use, Image } from "react-native-svg";

function HomeIcon(props) {
    return (

        <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="26px" height="26px" fill={props.color}>
            <Path d="M 12 2.0996094 L 1 12 L 4 12 L 4 21 L 10 21 L 10 15 L 14 15 L 14 21 L 20 21 L 20 12 L 23 12 L 12 2.0996094 z" />
        </Svg>

    );
}

export default HomeIcon;
