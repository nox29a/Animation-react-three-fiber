import * as THREE from 'three'
import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Debug, Physics, RigidBody } from '@react-three/rapier'
import { useControls } from 'leva'

export default function App() {
  return (
    <Canvas style={{ background: "black", position: "absolute", top: 0, left: 0 }} camera={{ position: [-50, -25, 150], fov: 15 }}>
      <Suspense fallback={null}>
        <hemisphereLight intensity={0.45} />

        <Physics colliders={false}>
          <group position={[2, 3, 0]}>
            <Sphere position={[0, 1, 0]} />
            <Sphere position={[6, 2, 0]} />
            <Sphere position={[0, 5, 0]} />
            <Sphere position={[5, 8, 0]} />
            <Sphere position={[0, 3, 0]} />
            <Sphere position={[-3, 4, 0]} />
            <Sphere position={[0, 5, 0]} />
            <Sphere position={[-3, 5, 0]} />
            <Container />
          </group>
        </Physics>

      </Suspense>
    </Canvas>
  )
}

function Container() {
  const ref = useRef()
  return (
    <group>
      <RigidBody ref={ref} type="fixed" colliders="trimesh" restitution={1.1}>
        <mesh visible="false" rotation={[Math.PI / 2, 0, 0]}>
          <sphereGeometry args={[15, 200, 200]} />
          <meshStandardMaterial color="black"  opacity={0.1} transparent  />
        </mesh>
      </RigidBody>
    </group>
  )
}

const Sphere = (props) => (
  <RigidBody colliders="ball" restitution={1}>
    <mesh castShadow receiveShadow {...props}>
      <sphereGeometry args={[0.5, 100, 100]} />
      <meshStandardMaterial color="white"  />
    </mesh>
  </RigidBody>
)

