import React from 'react'
import { matchPath, useLocation } from 'react-router-dom'

const useRouteMatch = (path) => {
    const location = useLocation();
  return matchPath(location.pathname, { path })
}

export default useRouteMatch
