import React, { useLayoutEffect } from 'react';
import { useGLTF } from '@react-three/drei/native';
import * as THREE from 'three';

// Definimos la interfaz para los resultados de GLTF
interface GLTFResult {
  scene: THREE.Group;
}

// Definimos las props del componente
interface IngredientProps {
  modelPath: string | any; // 'any' para soportar require() de assets locales en Expo
  position?: [number, number, number];
  scale?: number;
  rotation?: [number, number, number];
}

const Ingredient: React.FC<IngredientProps> = ({ 
  modelPath, 
  position = [0, 0, 0], 
  scale = 1, 
  rotation = [0, 0, 0] 
}) => {
  // Cargamos el modelo dinámicamente según la prop modelPath
  const { scene } = useGLTF(modelPath) as unknown as GLTFResult;

  useLayoutEffect(() => {
    // Clonamos la escena si planeas usar el mismo ingrediente varias veces 
    // al mismo tiempo para evitar conflictos de referencia.
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        
        if (child.material) {
          child.material.envMapIntensity = 1;
        }
      }
    });
  }, [scene]);

  return (
    <primitive 
      object={scene} 
      position={position} 
      scale={scale} 
      rotation={rotation} 
    />
  );
};

export default Ingredient;