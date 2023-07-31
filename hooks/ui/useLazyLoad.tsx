import { useInView } from 'react-intersection-observer'

const useLazyLoad = () => {
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true
  })

  return {
    ref,
    inView
  }
}

export default useLazyLoad
