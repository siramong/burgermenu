import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface IngredientSelectorProps {
  onAddIngredient: (type: string) => void;
  onRemoveIngredient: () => void;
}

const IngredientSelector: React.FC<IngredientSelectorProps> = ({
  onAddIngredient,
  onRemoveIngredient,
}) => {
  const ingredients = [
    { type: 'panInferior', label: 'Pan Inferior' },
    { type: 'carne', label: 'Carne' },
    { type: 'queso', label: 'Queso' },
    { type: 'tomate', label: 'Tomate' },
    { type: 'lechuga', label: 'Lechuga' },
    { type: 'panSuperior', label: 'Pan Superior' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ingredientes</Text>
      <View style={styles.buttonContainer}>
        {ingredients.map((ingredient) => (
          <TouchableOpacity
            key={ingredient.type}
            style={styles.button}
            onPress={() => onAddIngredient(ingredient.type)}
          >
            <Text style={styles.buttonText}>+ {ingredient.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity
        style={[styles.button, styles.removeButton]}
        onPress={onRemoveIngredient}
      >
        <Text style={styles.buttonText}>Quitar Último</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    padding: 15,
    borderRadius: 10,
    zIndex: 1000,
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  buttonContainer: {
    gap: 8,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginBottom: 8,
  },
  removeButton: {
    backgroundColor: '#f44336',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default IngredientSelector;
