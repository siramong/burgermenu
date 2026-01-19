import burger from '@/assets/models/burger.glb';
import { useGLTF, OrbitControls, Stage } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React, { useLayoutEffect } from 'react';
import * as THREE from 'three';

// Definimos el tipo para evitar el error de 'any' en el child
interface GLTFResult {
  scene: THREE.Group;
}

const Model = () => {
  // Forzamos el tipo o desestructuramos de forma segura
  const { scene } = useGLTF(burger) as unknown as GLTFResult;

  useLayoutEffect(() => {
    scene.traverse((child) => {
      // Usamos type guards de Three.js
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        
        if (child.material) {
          child.material.envMapIntensity = 1;
        }
      }
    });
  }, [scene]);

  return <primitive object={scene} scale={1} />;
};

const Index = () => {
  return (
    <Canvas 
      shadows 
      camera={{ position: [5, 5, 5], fov: 45 }} 
      style={{ height: '100vh', background: '#202020' }}
    >
      {/* Error corregido: 'contactShadow' es una prop de Stage en versiones antiguas, 
        pero en las nuevas se usa 'contactShadow' como componente aparte o se omite.
        Si quieres quitar la sombra de contacto, usa contactShadow={undefined} o ajusta según tipos.
      */}
      <Stage environment="city" intensity={0.6}>
        <Model />
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