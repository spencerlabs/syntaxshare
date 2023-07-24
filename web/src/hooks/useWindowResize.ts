import { useEffect } from 'react'

const useWindowResize = (
  handleResize: () => void,
  deps?: React.DependencyList
) => {
  useEffect(() => {
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

export default useWindowResize
