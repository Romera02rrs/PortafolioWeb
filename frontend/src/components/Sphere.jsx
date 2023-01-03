const Sphere = ({ color, position}) => {
  return (
    <mesh position={position} scale={0.3}>
        <sphereGeometry />
        <meshStandardMaterial color={color}/>
    </mesh>
  )
}

export default Sphere