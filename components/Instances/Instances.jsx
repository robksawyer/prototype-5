/**
 * @file Instances.jsx
 * @see https://codesandbox.io/s/react-three-fiber-react-spring-forked-8i67e?file=/src/Instances.js:0-1816
 */
import React, {
  useRef,
  useMemo,
  useState,
  useEffect,
  useImperativeHandle,
  createContext,
  useContext,
  forwardRef,
} from 'react'

let uuid = 0

export let context = createContext()

/**
 * Instances
 * @param {*} param0
 */
export function Instances({ children }) {
  const ref = useRef()
  const [ticker, set] = useState(0)
  const instances = useRef({})
  const api = useMemo(
    () => ({ ref, update: () => set((state) => state + 1), instances }),
    []
  )
  const count = Object.keys(instances.current).length

  useEffect(() => {
    Object.values(instances.current).forEach((matrix, index) =>
      ref.current.setMatrixAt(index, matrix)
    )
    ref.current.instanceMatrix.needsUpdate = true
  }, [count, ticker])

  return (
    <context.Provider value={api}>
      <instancedMesh key={count} ref={ref} args={[null, null, count || 1]}>
        {children}
      </instancedMesh>
    </context.Provider>
  )
}

/**
 * Instance
 */
export const Instance = forwardRef(({ children, ...props }, forwardRef) => {
  const [id] = useState(() => uuid++)
  const group = useRef()
  const { ref, update, instances } = useContext(context)

  useEffect(() => {
    group.current.updateMatrixWorld()
    instances.current[id] = group.current.matrixWorld
    update()
    return () => delete instances.current[id]
  }, [])

  useImperativeHandle(forwardRef, () => ({
    position: group.current.position,
    scale: group.current.scale,
    rotation: group.current.rotation,
    update: () => {
      // todo: optimize into a static object lookup
      Object.keys(instances.current).forEach((key, index) => {
        if (String(key) === String(id)) {
          group.current.updateMatrixWorld()
          ref.current.setMatrixAt(index, group.current.matrixWorld)
        }
      })
      ref.current.instanceMatrix.needsUpdate = true
    },
  }))

  return (
    <group ref={group} {...props}>
      {children}
    </group>
  )
})
