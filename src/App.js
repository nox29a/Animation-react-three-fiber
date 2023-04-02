import { useRef} from 'react'
import { Canvas} from '@react-three/fiber'
import { Physics, RigidBody } from '@react-three/rapier'
import { OrbitControls} from '@react-three/drei'
const Colors = ['blue', 'pink', 'green', 'yellow', 'purple', 'red'] // kolory piłek
export default function App() {
  const balls = Array.from({ length: 25 }) // ilość piłek
  return (
    <Canvas style={{ background: "black", position: "absolute", top: 0, left: 0 }} camera={{ position: [0, 0, 150], fov: 30 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 0, 100]} />
        <Physics>
          <Frame />
          {balls.map((ball, index) => (
            <Sphere key={index} position={[5-Math.floor(Math.random()*10),0,5-Math.floor(Math.random()*10)]} />
          ))}
          <Container />
          <Frame />
        </Physics>
        <gridHelper args={[120, 40, "teal", "gray"]} rotation-x={Math.PI / 2} />
        <OrbitControls />
    </Canvas>
  )
}

function Container() { // duża kula
  const ref = useRef()
  return (
      <RigidBody ref={ref} type="fixed" colliders="trimesh" restitution={1}>
        <mesh visible="false">
          <sphereGeometry args={[30, 100, 100]} />
          <meshStandardMaterial color="black"  opacity={0.1} transparent  />
        </mesh>
      </RigidBody>
  )
}

function Frame() { // ramka
  const ref = useRef()
  return (
    <RigidBody ref={ref} type="fixed" colliders="trimesh" restitution={2}>
        <mesh visible="false" >
          <ringGeometry args={[30, 30.5, 100]} />
          <meshStandardMaterial color="white" />
        </mesh>
    </RigidBody>
  )
}

const Sphere = (props) => ( // małe kulki
  <RigidBody colliders="ball" restitution={1}>
    <mesh  {...props}>
      <sphereGeometry args={[1, 100, 100]} />
      <meshStandardMaterial color={Colors[Math.floor(Math.random() * Colors.length)]} />
    </mesh>
  </RigidBody>
)

