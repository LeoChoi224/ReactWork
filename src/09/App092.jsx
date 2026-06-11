/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useState } from 'react';
import Box1 from './Box1';
import Box2 from './Box2';

/**
 * 메모이제이션(memoization)은
 * 컴퓨터 프로그램이 동일한 계산을 반복해야 할 때, 이전에 계산한 값을 메모리에 저장함으로써
 * 동일한 계산의 '반복 수행을 제거'하여 프로그램 실행 속도를 빠르게 하는 기술이다.
 * 동적 계획법의 핵심이 되는 기술이다
 */

/**
 * useCallback 또한 메모이제이션(memoization) 기법으로 
 * 컴포넌트 '성능을 최적화' 시켜주는 도구로 사용된다.
 *
 *  const cachedFn = useCallback(fn, dependencies)
 * 
 *  useMemo vs. useCallback
 *    useMemo 는 인자로 넘겨준 '콜백함수가 리턴하는 값'을 메모이제이션
 *    useCallback 는 인자로 넘겨준 '콜백함수 자체' 를 메모이제이션 
 */

const App092 = () => {

  return (
    <>

    </>
  );
};

export default App092;