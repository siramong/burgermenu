import React from 'react';
import { GLView } from 'expo-gl';
import { Canvas } from '@react-three/fiber';
const Ingredient = () => {
    return (
      <GLView
        style={{ flex: 1 }}
        onContextCreate={(gl) => {
          // Set up the WebGL context
        }}
      >
        <Canvas>
          {/* 3D components go here */}
        </Canvas>
      </GLView>
    );
  };
  export default Ingredient;