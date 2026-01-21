import carne from '@/assets/models/ingredients/carne.glb';
import lechuga from '@/assets/models/ingredients/lechuga.glb';
import panInferior from '@/assets/models/ingredients/panInferior.glb';
import panSuperior from '@/assets/models/ingredients/panSuperior.glb';
import queso from '@/assets/models/ingredients/queso.glb';
import tomate from '@/assets/models/ingredients/tomate.glb';
import BurgerViewer from '@/components/organisms/BurgerViewer';
import ConfiguratorPanel from '@/components/organisms/ConfiguratorPanel';
import { useMemo, useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, View, useWindowDimensions } from 'react-native';

type IngredientCatalogEntry = {
  type: string;
  label: string;
  price: number;
  description?: string;
  accent?: string;
};

const ingredientModels: Record<string, any> = {
  panInferior,
  carne,
  queso,
  tomate,
  lechuga,
  panSuperior,
};

const Index = () => {
  const { width } = useWindowDimensions();
  const isWide = width >= 900;

  const catalog: IngredientCatalogEntry[] = [
    {
      type: 'panInferior',
      label: 'Pan inferior',
      price: 1.5,
      description: 'Soporte brioche tostado',
      accent: '#F59E0B',
    },
    { type: 'carne', label: 'Carne', price: 3.0, description: '180g sellada a la plancha', accent: '#DC2626' },
    { type: 'queso', label: 'Queso', price: 1.1, description: 'Cheddar fundido', accent: '#FBBF24' },
    { type: 'tomate', label: 'Tomate', price: 0.8, description: 'Rodajas frescas', accent: '#EF4444' },
    { type: 'lechuga', label: 'Lechuga', price: 0.7, description: 'Crujiente y verde', accent: '#22C55E' },
    { type: 'panSuperior', label: 'Pan superior', price: 1.5, description: 'Corona de ajonjolí', accent: '#F59E0B' },
  ];

  const [selectedIngredients, setSelectedIngredients] = useState<Array<
    IngredientCatalogEntry & { id: string; modelPath: any }
  >>([
    {
      id: 'panInferior-base',
      type: 'panInferior',
      label: 'Pan inferior',
      price: 1.5,
      description: 'Soporte brioche tostado',
      accent: '#F59E0B',
      modelPath: panInferior,
    },
  ]);

  const handleAddIngredient = (type: string) => {
    const meta = catalog.find((item) => item.type === type);
    if (!meta) return;

    const newItem = {
      ...meta,
      id: `${type}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      modelPath: ingredientModels[type],
    };

    setSelectedIngredients((prev) => [...prev, newItem]);
  };

  const handleRemoveIngredient = () => {
    setSelectedIngredients((prev) => {
      if (prev.length <= 1) return prev;
      const clone = [...prev];
      clone.pop();
      return clone;
    });
  };

  const viewerIngredients = useMemo(
    () => selectedIngredients.map(({ type, modelPath }) => ({ type, modelPath })),
    [selectedIngredients]
  );

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <View style={styles.backgroundGlow} />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[styles.page, { flexDirection: isWide ? 'row' : 'column' }]}
      >
        <View
          style={[
            styles.viewerColumn,
            isWide ? styles.viewerWide : styles.viewerNarrow,
          ]}
        >
          <BurgerViewer ingredients={viewerIngredients} />
        </View>

        <View style={[styles.panelColumn, isWide ? styles.panelWide : styles.panelNarrow]}>
          <ConfiguratorPanel
            catalog={catalog}
            selectedIngredients={selectedIngredients}
            onAdd={handleAddIngredient}
            onRemove={handleRemoveIngredient}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#050711',
  },
  backgroundGlow: {
    position: 'absolute',
    top: -160,
    left: -120,
    width: 380,
    height: 380,
    backgroundColor: '#7C3AED',
    opacity: 0.12,
    borderRadius: 300,
  },
  page: {
    flexGrow: 1,
    padding: 16,
    gap: 16,
    alignItems: 'stretch',
  },
  viewerColumn: {
    flex: 1,
    minWidth: 320,
    borderRadius: 24,
    overflow: 'hidden',
  },
  viewerWide: {
    minHeight: 520,
  },
  viewerNarrow: {
    minHeight: 380,
  },
  panelColumn: {
    flex: 1,
    minWidth: 320,
  },
  panelWide: {
    maxWidth: 460,
  },
  panelNarrow: {
    width: '100%',
  },
});

export default Index;