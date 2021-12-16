// import original module declarations
import 'styled-components';

// 기본이 되는 DefaultTheme 을 설정하고 요소의 자료유형을 설정.
// theme.ts 에서 DefaultTheme 을 extend 하여 사용가능.
declare module 'styled-components' {
    export interface DefaultTheme {

    }
}