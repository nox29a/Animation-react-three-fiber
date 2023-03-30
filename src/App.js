import * as THREE from 'three'
import { Suspense, useRef, useState, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Physics, RigidBody } from '@react-three/rapier'

const niceColors = ['blue', 'brown', 'green', 'orange', 'purple', 'red']
export default function App() {
  const balls = Array.from({ length: 20 }, () => ({
    position: [
      (Math.random() - 0.5) * 2, // x coordinate between -10 and 10
      Math.random() * 1, // y coordinate between 5 and 15
      (Math.random() - 0.5) * 2 // z coordinate between -10 and 10
    ]
  }));
  return (
    <Canvas style={{ background: "black", position: "absolute", top: 0, left: 0 }} camera={{ position: [-50, -25, 150], fov: 15 }}>
      <Suspense fallback={null}>
        <hemisphereLight intensity={0.9} />
        <ambientLight intensity={0.9} />
        <Physics colliders={false}>
        {balls.map((ball, index) => (
          <Sphere key={index} position={ball.position} />
        ))}
          <Container />
        </Physics>
      </Suspense>
    </Canvas>
  )
}

function Container() {
  const ref = useRef()
  return (
    <group>
      <RigidBody ref={ref} type="fixed" colliders="trimesh" restitution={1}>
        <mesh visible="false" rotation={[Math.PI / 2, 0, 0]}>
          <sphereGeometry args={[15, 20, 20]} />
          <meshStandardMaterial color="orange"  opacity={0.1} transparent  />
        </mesh>
      </RigidBody>
    </group>
  )
}

const Sphere = (props) => (
  <RigidBody colliders="ball" restitution={1}>
    <mesh castShadow receiveShadow {...props}>
      <sphereGeometry args={[0.7, 10, 10]} />
      <meshStandardMaterial color={niceColors[Math.floor(Math.random() * niceColors.length)]} />
    </mesh>
  </RigidBody>
)

