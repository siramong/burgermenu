import carne from '@/assets/models/ingredients/carne.glb';
import lechuga from '@/assets/models/ingredients/lechuga.glb';
import panInferior from '@/assets/models/ingredients/panInferior.glb';
import panSuperior from '@/assets/models/ingredients/panSuperior.glb';
import queso from '@/assets/models/ingredients/queso.glb';
import tomate from '@/assets/models/ingredients/tomate.glb';
import React, { PropsWithChildren, createContext, useContext, useMemo, useState } from 'react';

export type IngredientCatalogEntry = {
  type: string;
  label: string;
  price: number;
  description?: string;
  accent?: string;
  icon?: string;
};

export type SelectedIngredient = IngredientCatalogEntry & {
  id: string;
  modelPath: any;
};

interface BurgerContextValue {
  catalog: IngredientCatalogEntry[];
  selectedIngredients: SelectedIngredient[];
  addIngredient: (type: string) => void;
  removeIngredient: () => void;
  totals: {
    base: number;
    extras: number;
    total: number;
  };
  viewerIngredients: Array<{ type: string; modelPath: any }>;
  allModelPaths: any[];
  reset: () => void;
}

const BurgerContext = createContext<BurgerContextValue | null>(null);

const ingredientModels: Record<string, any> = {
  panInferior,
  carne,
  queso,
  tomate,
  lechuga,
  panSuperior,
};

const baseBuns: SelectedIngredient[] = [
  {
    id: 'panInferior-base',
    type: 'panInferior',
    label: 'Pan inferior',
    price: 1.5,
    description: 'Soporte brioche tostado',
    accent: '#F59E0B',
    modelPath: panInferior,
  },
  {
    id: 'panSuperior-base',
    type: 'panSuperior',
    label: 'Pan superior',
    price: 1.5,
    description: 'Corona de ajonjolí',
    accent: '#F59E0B',
    modelPath: panSuperior,
  },
];

const catalogData: IngredientCatalogEntry[] = [
  { type: 'carne', label: 'Carne', price: 3.0, description: '180g sellada a la plancha', accent: '#DC2626', icon: 'beef' },
  { type: 'queso', label: 'Queso', price: 1.1, description: 'Cheddar fundido', accent: '#FBBF24', icon: 'cheese' },
  { type: 'tomate', label: 'Tomate', price: 0.8, description: 'Rodajas frescas', accent: '#EF4444', icon: 'tomato' },
  { type: 'lechuga', label: 'Lechuga', price: 0.7, description: 'Crujiente y verde', accent: '#22C55E', icon: 'leafyGreen' },
];

export const BurgerProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [selectedIngredients, setSelectedIngredients] = useState<SelectedIngredient[]>(baseBuns);

  const addIngredient = (type: string) => {
    const meta = catalogData.find((item) => item.type === type);
    if (!meta) return;

    const newItem: SelectedIngredient = {
      ...meta,
      id: `${type}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      modelPath: ingredientModels[type],
    };

    setSelectedIngredients((prev) => {
      if (type === 'panSuperior') {
        const filtered = prev.filter((item) => item.type !== 'panSuperior' || item.id === 'panSuperior-base');
        const hasBaseSuperior = filtered.some((item) => item.id === 'panSuperior-base');
        if (hasBaseSuperior) {
          return filtered.map((item) => (item.id === 'panSuperior-base' ? newItem : item));
        }
        return [...filtered, newItem];
      }

      const superiorIndex = prev.findIndex((item) => item.type === 'panSuperior');
      if (superiorIndex !== -1) {
        const newList = [...prev];
        newList.splice(superiorIndex, 0, newItem);
        return newList;
      }

      return [...prev, newItem];
    });
  };

  const removeIngredient = () => {
    setSelectedIngredients((prev) => {
      if (prev.length <= 2) return prev;

      let removeIndex = -1;
      for (let i = prev.length - 1; i >= 0; i -= 1) {
        if (prev[i].id !== 'panInferior-base' && prev[i].id !== 'panSuperior-base') {
          removeIndex = i;
          break;
        }
      }

      if (removeIndex === -1) return prev;

      const clone = [...prev];
      clone.splice(removeIndex, 1);
      return clone;
    });
  };

  const totals = useMemo(() => {
    const base = selectedIngredients
      .filter((item) => item.type === 'panInferior' || item.type === 'panSuperior')
      .reduce((acc, item) => acc + (item.price || 0), 0);

    const extras = selectedIngredients
      .filter((item) => item.type !== 'panInferior' && item.type !== 'panSuperior')
      .reduce((acc, item) => acc + (item.price || 0), 0);

    return { base, extras, total: base + extras };
  }, [selectedIngredients]);

  const viewerIngredients = useMemo(
    () => selectedIngredients.map(({ type, modelPath }) => ({ type, modelPath })),
    [selectedIngredients]
  );

  const allModelPaths = useMemo(() => Object.values(ingredientModels), []);

  const reset = () => setSelectedIngredients([...baseBuns]);

  const value: BurgerContextValue = {
    catalog: catalogData,
    selectedIngredients,
    addIngredient,
    removeIngredient,
    totals,
    viewerIngredients,
    allModelPaths,
    reset,
  };

  return <BurgerContext.Provider value={value}>{children}</BurgerContext.Provider>;
};

export const useBurger = () => {
  const ctx = useContext(BurgerContext);
  if (!ctx) throw new Error('useBurger debe usarse dentro de BurgerProvider');
  return ctx;
};
