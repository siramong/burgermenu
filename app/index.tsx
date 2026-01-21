import carne from '@/assets/models/ingredients/carne.glb';
import lechuga from '@/assets/models/ingredients/lechuga.glb';
import panInferior from '@/assets/models/ingredients/panInferior.glb';
import panSuperior from '@/assets/models/ingredients/panSuperior.glb';
import queso from '@/assets/models/ingredients/queso.glb';
import tomate from '@/assets/models/ingredients/tomate.glb';
import Burger from '@/components/Burger';
import IngredientSelector from '@/components/IngredientSelector';
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import { View } from 'react-native';

const ingredientModels: Record<string, any> = {
  panInferior,
  carne,
  queso,
  tomate,
  lechuga,
  panSuperior,
};

const Index = () => {
  const [ingredients, setIngredients] = useState<Array<{ type: string; modelPath: any }>>([
    { type: 'panInferior', modelPath: panInferior },
  ]);
  const [cameraAngle, setCameraAngle] = useState({ x: 0.5, y: 0.5 });
  const cameraRef = useRef<any>(null);

  const handleAddIngredient = (type: string) => {
    setIngredients([...ingredients, { type, modelPath: ingredientModels[type] }]);
  };

  const handleRemoveIngredient = () => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.slice(0, -1));
    }
  };

  const CameraController = () => {
    useFrame(({ camera }) => {
      const distance = 400;
      const x = distance * Math.sin(cameraAngle.y) * Math.cos(cameraAngle.x);
      const y = distance * Math.sin(cameraAngle.x) + 50;
      const z = distance * Math.cos(cameraAngle.y) * Math.cos(cameraAngle.x);

      camera.position.set(x, y, z);
      camera.lookAt(0, 50, 0);
    });
    return null;
  };

  return (
    <View style={{ flex: 1 }}>
      <Canvas
        camera={{ position: [300, 50, 300], fov: 35, near: 0.1, far: 10000 }}
        style={{ height: '100vh', background: '#202020' }}
        dpr={[1, 1.5]}
      >
        <CameraController />
        <Burger ingredients={ingredients} />

        <directionalLight
          position={[10, 15, 10]}
          intensity={1}
        />

        <ambientLight intensity={0.6} />
      </Canvas>

      <IngredientSelector
        onAddIngredient={handleAddIngredient}
        onRemoveIngredient={handleRemoveIngredient}
      />
    </View>
  );
};

export default Index;