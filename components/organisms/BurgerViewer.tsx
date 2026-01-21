import Burger from '@/components/Burger';
import { Canvas, useFrame } from '@react-three/fiber';
import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

interface BurgerViewerProps {
  ingredients: Array<{ type: string; modelPath: any }>;
  cameraAngle?: { x: number; y: number };
}

const BurgerViewer: React.FC<BurgerViewerProps> = ({ ingredients, cameraAngle = { x: 0.45, y: 0.6 } }) => {
  const memoizedAngle = useMemo(() => cameraAngle, [cameraAngle]);

  const CameraController = () => {
    useFrame(({ camera }) => {
      const distance = 420;
      const x = distance * Math.sin(memoizedAngle.y) * Math.cos(memoizedAngle.x);
      const y = distance * Math.sin(memoizedAngle.x) + 60;
      const z = distance * Math.cos(memoizedAngle.y) * Math.cos(memoizedAngle.x);

      camera.position.set(x, y, z);
      camera.lookAt(0, 50, 0);
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
