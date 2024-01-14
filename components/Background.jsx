import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { useRef, useEffect } from 'react'
import { Vector2 } from 'three'

import usePlayer from '@/hooks/usePlayer'
import '../materials/PlofierMaterial'


const ShaderPlane = () => {
  const { playing } = usePlayer()

  const materialRef = useRef()
  const viewport = useThree((state) => state.viewport)
  const size = useThree((state) => state.size)
  
  useEffect(() => {
    materialRef.current.resolution = new Vector2(size.width, size.height)
  }, [size])

  useFrame(({}, delta) => {
    if (!playing) return
    materialRef.current.time += delta
  })

  return (
    <mesh>
      <planeGeometry args={[viewport.width, viewport.height]} />
      <plofierMaterial ref={materialRef} />
    </mesh>
  )
}

export default function Background() {
  return (
    <div className="w-screen h-screen">
      <Canvas>
        <ShaderPlane />
      </Canvas>
    </div>
  )
}
