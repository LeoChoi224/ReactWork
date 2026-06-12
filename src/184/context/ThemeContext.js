import { createContext } from "react";

/**
 * createContext(기본값)
 * 
 *  https://ko.react.dev/reference/react/createContext
 * 
 *  매개변수 '기본값' 
 *    컴포넌트가 컨텍스트를 읽을 때 상위에 일치하는 컨텍스트 제공자가 없는 경우 
 *    컨텍스트가 가져야 할 값입니다.  의미 있는 기본값이 없으면 null을 지정합니다.
 */

export const ThemeContext = createContext(null);