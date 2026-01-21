import { useGLTF } from '@react-three/drei/native';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Group } from 'three';

// Definimos la interfaz para los resultados de GLTF
interface GLTFResult {
  scene: THREE.Group;
}

// Definimos las props del componente
interface IngredientProps {
  modelPath: string | any;
  position?: [number, number, number];
  scale?: number;
  rotation?: [number, number, number];
}

const Ingredient: React.FC<IngredientProps> = ({ 
  modelPath, 
  position = [0, 0, 0], 
  scale = 1, 
  rotation = [0, 0, 0],
}) => {
  const { scene } = useGLTF(modelPath) as unknown as GLTFResult;
  const groupRef = useRef<Group>(null);

  useEffect(() => {
    if (!groupRef.current) return;

    // Limpiar el grupo
    while (groupRef.current.children.length > 0) {
      groupRef.current.children[0].removeFromParent();
    }

    // Clonar la escena
    const clonedScene = scene.clone();
    
    // Configurar materiales
    clonedScene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        if (child.material) {
          child.material.envMapIntensity = 1;
        }
      }
    });

    // Agregar al grupo
    groupRef.current.add(clonedScene);
  }, [scene]);

  return (
    <group
      ref={groupRef}
      position={position}
      scale={scale}
      rotation={rotation}
    />
  );
};

export default Ingredient;