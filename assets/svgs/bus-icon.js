import { useTheme } from "@react-navigation/native";
import * as React from "react";
import Svg, { Path } from "react-native-svg";

const BusIcon = (props) => {
    const { colors } = useTheme();

    return (
        <Svg
            width="24"
            height="35"
            viewBox="0 0 21 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <Path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M8.1338 0.0131238C6.02385 0.151398 4.80161 0.320767 3.80923 0.612313C2.53824 0.985744 1.85056 1.44351 1.53482 2.12638C1.4069 2.40308 1.40468 2.42643 1.3896 3.66235L1.37422 4.91732L1.11246 4.97676C0.795732 5.04859 0.45293 5.2606 0.27857 5.49241C0.0325846 5.8195 0 6.00842 0 7.10836V8.12253L0.160211 8.43607C0.348324 8.80415 0.642521 9.04541 1.01308 9.13544C1.14726 9.16803 1.2848 9.20218 1.31866 9.21132C1.36732 9.22442 1.38028 10.0732 1.38028 13.2433C1.38028 17.6202 1.37668 17.5587 1.66324 18.0926C1.78382 18.3173 2.27091 18.8293 2.36408 18.8293C2.38562 18.8293 2.41387 19.2286 2.42683 19.7166C2.44704 20.4789 2.46587 20.6448 2.56057 20.8938C2.69268 21.2412 3.07344 21.6576 3.40811 21.8207C4.08795 22.1521 4.89734 22.0157 5.42465 21.481C5.83376 21.0661 5.964 20.6345 5.96449 19.6916L5.96479 19.1792H10.4932H15.0216L15.0472 19.8916C15.0676 20.4615 15.0945 20.662 15.1816 20.8938C15.3121 21.2411 15.6917 21.6569 16.0278 21.8207C16.7077 22.1521 17.5171 22.0157 18.0444 21.481C18.4718 21.0475 18.5825 20.6485 18.5861 19.5292L18.5883 18.8543L18.7801 18.7198C19.0423 18.536 19.3429 18.1379 19.4806 17.7921L19.5951 17.5045L19.6197 13.3567L19.6444 9.20882L19.8415 9.17413C20.3164 9.09055 20.6368 8.85229 20.8463 8.42717L21 8.11533V7.10476C21 6.00867 20.9673 5.8193 20.7214 5.49241C20.5471 5.2606 20.2043 5.04859 19.8875 4.97676L19.6258 4.91732L19.6104 3.66235C19.5954 2.43068 19.5927 2.40218 19.4669 2.13008C18.9448 1.00144 17.3523 0.409651 13.9507 0.0801114C13.4182 0.028521 8.72368 -0.0255191 8.1338 0.0131238ZM15.6359 2.13413C16.018 2.24176 16.2224 2.73902 16.0387 3.114C15.9883 3.21668 15.8846 3.34716 15.808 3.4039C15.6698 3.50638 15.6323 3.50723 10.632 3.52158C7.86169 3.52952 5.52364 3.52298 5.43629 3.50708C5.08299 3.44269 4.83005 3.04451 4.90049 2.66358C4.94308 2.43358 5.14204 2.19547 5.34036 2.13723C5.56401 2.07159 15.4033 2.06859 15.6359 2.13413ZM16.5161 4.98226C17.2664 5.12653 17.845 5.63938 18.0901 6.37735C18.1905 6.67944 18.1934 6.76418 18.1797 8.94772L18.1655 11.2057L18.0069 11.5343C17.7082 12.1534 17.0941 12.6223 16.4401 12.7308C16.0411 12.797 4.95886 12.797 4.55986 12.7308C3.9059 12.6223 3.29182 12.1534 2.99309 11.5343L2.83451 11.2057L2.82031 8.94772C2.80656 6.76418 2.80951 6.67944 2.90988 6.37735C3.08237 5.85804 3.45016 5.41508 3.90718 5.17617C4.36302 4.93791 4.29366 4.94046 10.4563 4.93601C14.1625 4.93336 16.3486 4.95006 16.5161 4.98226ZM4.81738 15.06C5.64555 15.4654 5.8346 16.6134 5.18567 17.2963C4.87994 17.6181 4.67146 17.7033 4.19014 17.7033C3.85508 17.7033 3.73159 17.6817 3.57394 17.5957C3.30908 17.4511 3.03435 17.1538 2.91225 16.8797C2.78876 16.6025 2.77535 16.0604 2.88533 15.7935C3.20556 15.0162 4.06291 14.6907 4.81738 15.06ZM17.4371 15.06C18.2653 15.4654 18.4543 16.6134 17.8054 17.2963C17.4997 17.6181 17.2912 17.7033 16.8099 17.7033C16.4748 17.7033 16.3513 17.6817 16.1937 17.5957C15.9288 17.4511 15.6541 17.1538 15.532 16.8797C15.4085 16.6025 15.3951 16.0604 15.505 15.7935C15.8253 15.0162 16.6826 14.6907 17.4371 15.06Z"
                fill={props.fill || colors.background}
            />
        </Svg>
    );
};

export default BusIcon;
