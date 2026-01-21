import Ingredient from '@/components/Ingredient';
import React, { useMemo } from 'react';

interface BurgerProps {
  ingredients: Array<{ type: string; modelPath: any }>;
}

// Alturas predeterminadas para cada ingrediente
const INGREDIENT_HEIGHTS: Record<string, number> = {
  panInferior: 8,
  carne: 4,
  queso: 2,
  tomate: 3,
  lechuga: 5,
  panSuperior: 8,
};

const Burger: React.FC<BurgerProps> = ({ ingredients }) => {
  const memoizedIngredients = useMemo(() => ingredients, [ingredients]);

  const positions = useMemo(() => {
    let currentY = 0;
    const newPositions: Record<number, number> = {};
    
    memoizedIngredients.forEach((ingredient, index) => {
      newPositions[index] = currentY;
      const ingredientHeight = INGREDIENT_HEIGHTS[ingredient.type] || 3;
      currentY += ingredientHeight;
    });
    
    return newPositions;
  }, [memoizedIngredients]);

  return (
    <>
      {memoizedIngredients.map((ingredient, index) => (
        <Ingredient
          key={`${ingredient.type}-${index}`}
          modelPath={ingredient.modelPath}
          position={[0, positions[index] || 0, 0]}
        />
      ))}
    </>
  );
};

export default Burger;
