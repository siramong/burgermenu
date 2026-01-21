import Burger from '@/components/Burger';
import ModelPreloader from '@/components/ModelPreloader';
import { Canvas, useFrame } from '@react-three/fiber';
import React, { useMemo, useRef } from 'react';
import { StyleSheet, View } from 'react-native';

interface BurgerViewerProps {
  ingredients: Array<{ type: string; modelPath: any }>;
  cameraAngle?: { x: number; y: number };
  allModelPaths?: any[];
}

// Alturas de ingredientes para calcular el tamaño total
const INGREDIENT_HEIGHTS: Record<string, number> = {
  panInferior: 8,
  carne: 4,
  queso: 2,
  tomate: 3,
  lechuga: 5,
  panSuperior: 8,
};

const BurgerViewer: React.FC<BurgerViewerProps> = ({ ingredients, cameraAngle = { x: 0.45, y: 0.6 }, allModelPaths = [] }) => {
  const memoizedAngle = useMemo(() => cameraAngle, [cameraAngle]);

  // Calcular el tamaño total de la hamburguesa
  const burgerHeight = useMemo(() => {
    return ingredients.reduce((total, ingredient) => {
      return total + (INGREDIENT_HEIGHTS[ingredient.type] || 3);
    }, 0);
  }, [ingredients]);

  // Calcular el centro vertical de la hamburguesa
  const burgerCenter = useMemo(() => burgerHeight / 2, [burgerHeight]);

  // Calcular distancia de cámara basada en el tamaño (más ingredientes = más lejos)
  const cameraDistance = useMemo(() => {
    const baseDistance = 420;
    const scaleFactor = Math.max(1, burgerHeight / 50); // Ajustar según el tamaño
    return baseDistance * scaleFactor;
  }, [burgerHeight]);

  const CameraController = () => {
    const orbitAngleRef = useRef(0);

    useFrame(({ camera }, delta) => {
      // Animación de órbita automática
      orbitAngleRef.current += delta * 0.2; // Velocidad de rotación

      const angle = orbitAngleRef.current;
      const distance = cameraDistance;
      
      // Posición de la cámara en órbita alrededor del centro de la hamburguesa
      const x = distance * Math.sin(angle) * Math.cos(memoizedAngle.x);
      const y = distance * Math.sin(memoizedAngle.x) + burgerCenter;
      const z = distance * Math.cos(angle) * Math.cos(memoizedAngle.x);

      camera.position.set(x, y, z);
      camera.lookAt(0, burgerCenter, 0); // Mirar al centro de la hamburguesa
    });
    return null;
  };

  return (
    <View style={styles.viewerCard}>
      <View style={styles.viewerShadow} />
      <Canvas
        camera={{ position: [300, 50, 300], fov: 35, near: 0.1, far: 10000 }}
        style={styles.canvas}
        dpr={[1, 1.5]}
      >
        <ModelPreloader modelPaths={allModelPaths} />
        <CameraController />
        <Burger ingredients={ingredients} />
        <directionalLight position={[10, 20, 10]} intensity={1} />
        <ambientLight intensity={0.65} />
      </Canvas>
    </View>
  );
};

const styles = StyleSheet.create({
  viewerCard: {
    flex: 1,
    backgroundColor: '#0B1021',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    borderRadius: 24,
    overflow: 'hidden',
    position: 'relative',
  },
  canvas: {
    width: '100%',
    height: '100%',
  },
  viewerShadow: {
    position: 'absolute',
    top: -60,
    left: -40,
    right: -40,
    height: 180,
    backgroundColor: '#7C3AED',
    opacity: 0.12,
    borderRadius: 180,
    transform: [{ scaleX: 1.4 }],
  },
});

export default BurgerViewer;
