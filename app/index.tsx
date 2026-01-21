import burger from '@/assets/models/burger.glb';
import { useGLTF, OrbitControls, Stage } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React, { useLayoutEffect } from 'react';
import * as THREE from 'three';
import Ingredient from '@/components/Ingredient'

const Index = () => {
  return (
    <Canvas 
      shadows 
      camera={{ position: [5, 5, 5], fov: 45 }} 
      style={{ height: '100vh', background: '#202020' }}
    >
      <Stage environment="city" intensity={0.6}>
        <Ingredient modelPath={burger}/>
      </Stage>

      <directionalLight
        position={[5, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0001}
      />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <shadowMaterial transparent opacity={0.4} />
      </mesh>

      <OrbitControls makeDefault />
    </Canvas>
  );
};

export default Index;