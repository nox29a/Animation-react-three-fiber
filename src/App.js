import { useRef} from 'react'
import { Canvas} from '@react-three/fiber'
import { Physics, RigidBody } from '@react-three/rapier'
import { OrbitControls} from '@react-three/drei'
const Colors = ['blue', 'pink', 'green', 'yellow', 'purple', 'red']
export default function App() {
  const balls = Array.from({ length: 25 }, () => ({
    position: [
      Math.floor(Math.random() * 10)-5,
      Math.floor(Math.random() * 10)-5,
      5
    ]
  }));
  return (
    <Canvas style={{ background: "black", position: "absolute", top: 0, left: 0 }} camera={{ position: [0, 0, 150], fov: 30 }}>
      <pointLight position={[0, 0, 50]} intensity={1}/>
        <Physics>
          {balls.map((ball, index) => (
            <Sphere key={index} position={[0,0,20-index]} />
          ))}
          <Container />
          <Frame />
        </Physics>
        <gridHelper args={[120, 40, "teal", "gray"]} rotation-x={Math.PI / 2} />
        <OrbitControls />
    </Canvas>
  )
}

function Container() {
  const ref = useRef()
  return (
      <RigidBody ref={ref} type="fixed" colliders="trimesh" restitution={1}>
        <mesh visible="false" rotation={[0, 0, 0]}>
          <sphereGeometry args={[30, 700, 700]} />
          <meshStandardMaterial color="black"  opacity={0.1} transparent  />
        </mesh>
      </RigidBody>
  )
}
function Frame() {
  const ref = useRef()
  return (
        <mesh visible="false" >
          <ringGeometry args={[30, 30.5, 100]} />
          <meshStandardMaterial color="white" />
        </mesh>
  )
}

const Sphere = (props) => (
  <RigidBody colliders="ball" restitution={1}>
    <mesh {...props}>
      <sphereGeometry args={[1, 100, 100]} />
      <meshStandardMaterial color={Colors[Math.floor(Math.random() * Colors.length)]} />
    </mesh>
  </RigidBody>
)

