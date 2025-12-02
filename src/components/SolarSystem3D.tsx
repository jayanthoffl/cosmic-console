import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Text } from "@react-three/drei";
import * as THREE from "three";

const Sun = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2, 32, 32]} />
      <meshBasicMaterial color="#ffcc00" />
      <pointLight intensity={2} distance={100} decay={2} />
    </mesh>
  );
};

interface PlanetProps {
  name: string;
  radius: number;
  distance: number;
  color: string;
  speed: number;
  onClick?: () => void;
}

const Planet = ({ name, radius, distance, color, speed, onClick }: PlanetProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  // Create orbit line
  const orbitLine = useMemo(() => {
    const points = [];
    for (let i = 0; i <= 64; i++) {
      const angle = (i / 64) * Math.PI * 2;
      points.push(new THREE.Vector3(Math.cos(angle) * distance, 0, Math.sin(angle) * distance));
    }
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: "#00ff41", opacity: 0.2, transparent: true });
    return new THREE.Line(geometry, material);
  }, [distance]);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += speed * 0.01;
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <>
      {/* Orbit line */}
      <primitive object={orbitLine} />

      {/* Planet group */}
      <group ref={groupRef}>
        <mesh
          ref={meshRef}
          position={[distance, 0, 0]}
          onClick={onClick}
          onPointerOver={(e) => {
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={(e) => {
            document.body.style.cursor = "default";
          }}
        >
          <sphereGeometry args={[radius, 32, 32]} />
          <meshStandardMaterial color={color} roughness={0.8} metalness={0.2} />
        </mesh>
      </group>
    </>
  );
};

interface SolarSystem3DProps {
  onPlanetClick?: (planetName: string) => void;
}

const SolarSystem3D = ({ onPlanetClick }: SolarSystem3DProps) => {
  const planets = [
    { name: "Mercury", radius: 0.15, distance: 4, color: "#8c8c8c", speed: 4.7 },
    { name: "Venus", radius: 0.3, distance: 5.5, color: "#e6c87e", speed: 3.5 },
    { name: "Earth", radius: 0.32, distance: 7, color: "#4a90d9", speed: 3 },
    { name: "Mars", radius: 0.2, distance: 8.5, color: "#d9534f", speed: 2.4 },
    { name: "Jupiter", radius: 0.8, distance: 12, color: "#d4a574", speed: 1.3 },
    { name: "Saturn", radius: 0.7, distance: 15, color: "#f4d59e", speed: 0.9 },
    { name: "Uranus", radius: 0.45, distance: 18, color: "#7fdbda", speed: 0.6 },
    { name: "Neptune", radius: 0.43, distance: 21, color: "#4169e1", speed: 0.5 },
  ];

  return (
    <div className="w-full h-[500px] terminal-border rounded-sm overflow-hidden">
      <Canvas camera={{ position: [0, 20, 30], fov: 60 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[0, 0, 0]} intensity={2} />

        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

        <Sun />

        {planets.map((planet) => (
          <Planet
            key={planet.name}
            {...planet}
            onClick={() => onPlanetClick?.(planet.name)}
          />
        ))}

        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={10}
          maxDistance={50}
        />

        {/* Grid helper for terminal aesthetic */}
        <gridHelper args={[50, 50, "#00ff41", "#003300"]} position={[0, -3, 0]} />
      </Canvas>

      {/* Overlay instructions */}
      <div className="absolute bottom-4 left-4 text-xs text-muted-foreground">
        <p>[DRAG] Rotate view | [SCROLL] Zoom | [CLICK] Select planet</p>
      </div>
    </div>
  );
};

export default SolarSystem3D;
