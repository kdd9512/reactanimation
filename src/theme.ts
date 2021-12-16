import {DefaultTheme} from "styled-components";

// ThemeProvider 에서 사용할 props 를 전달한다.
// 여기서 설정한 색상이 App의 styled-components 에 전달되어 css 를 결정한다.

// interface 인 DefaultTheme 을 extend.

export const darkTheme: DefaultTheme = {};

// export const LightTheme:DefaultTheme = {
//     bgColor:"#dcdde1",
//     textColor:"#222f3e",
//     linkColor: "#44bd32",
//     boxColor: "#0097e6",
//     detailBoxColor: "whitesmoke",
// }