import { useGLTF } from '@react-three/drei/native';
import React, { useEffect } from 'react';

interface ModelPreloaderProps {
  modelPaths: any[];
}

const ModelPreloader: React.FC<ModelPreloaderProps> = ({ modelPaths }) => {
  useEffect(() => {
    // Precargar los modelos dentro del contexto de Canvas
    modelPaths.forEach((modelPath) => {
      useGLTF.preload(modelPath);
    });
  }, [modelPaths]);

  return null; // No renderizar nada, solo precargar
};

export default ModelPreloader;
