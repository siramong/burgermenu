import PrimaryButton from '@/components/atoms/PrimaryButton';
import IngredientCard, { IngredientMeta } from '@/components/molecules/IngredientCard';
import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface SelectedIngredient extends IngredientMeta {
  id: string;
}

interface ConfiguratorPanelProps {
  catalog: IngredientMeta[];
  selectedIngredients: SelectedIngredient[];
  onAdd: (type: string) => void;
  onRemove: () => void;
}

const ConfiguratorPanel: React.FC<ConfiguratorPanelProps> = ({
  catalog,
  selectedIngredients,
  onAdd,
  onRemove,
}) => {
  const total = useMemo(
    () => selectedIngredients
      .filter(item => item.id !== 'panInferior-base' && item.id !== 'panSuperior-base')
      .reduce((acc, item) => acc + (item.price || 0), 0),
    [selectedIngredients]
  );

  return (
    <View style={styles.panel}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.title}>Arma tu burger</Text>
          <Text style={styles.subtitle}>Añade capas, revisa el total y paga en un toque.</Text>
        </View>
        <View style={styles.totalBadge}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
        </View>
      </View>

      <View style={styles.grid}>
        {catalog
          .filter((item) => item.type !== 'panInferior' && item.type !== 'panSuperior')
          .map((item) => (
            <IngredientCard key={item.type} data={item} onAdd={onAdd} />
          ))}
      </View>

      <View style={styles.selectedBox}>
        <Text style={styles.selectedTitle}>Tu pila</Text>
        {selectedIngredients.length === 0 ? (
          <Text style={styles.empty}>Todavía no agregas ingredientes.</Text>
        ) : (
          <View style={styles.selectedList}>
            {selectedIngredients.map((ingredient) => (
              <View key={ingredient.id} style={styles.selectedRow}>
                <Text style={styles.selectedName}>{ingredient.label}</Text>
                <Text style={styles.selectedPrice}>${ingredient.price.toFixed(2)}</Text>
              </View>
            ))}
          </View>
        )}
        <View style={styles.actionsRow}>
          <PrimaryButton
            label="Quitar última capa"
            onPress={onRemove}
            variant="ghost"
            disabled={selectedIngredients.length <= 2}
            style={{ flex: 1 }}
          />
          <PrimaryButton
            label={`Pagar $${total.toFixed(2)}`}
            onPress={() => {}}
            style={{ flex: 1, marginLeft: 12 }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  panel: {
    backgroundColor: 'rgba(10,10,22,0.8)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    padding: 18,
    borderRadius: 20,
    gap: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  title: {
    color: '#F9FAFB',
    fontSize: 20,
    fontWeight: '800',
  },
  subtitle: {
    color: '#9CA3AF',
    marginTop: 4,
  },
  totalBadge: {
    backgroundColor: 'rgba(124, 58, 237, 0.15)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(124,58,237,0.35)',
    alignItems: 'flex-end',
  },
  totalLabel: {
    color: '#D8B4FE',
    fontSize: 12,
  },
  totalValue: {
    color: '#F3F4F6',
    fontSize: 18,
    fontWeight: '800',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  selectedBox: {
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  selectedTitle: {
    color: '#E5E7EB',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 10,
  },
  empty: {
    color: '#6B7280',
    fontSize: 12,
  },
  selectedList: {
    gap: 8,
  },
  selectedRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.06)',
  },
  selectedName: {
    color: '#F9FAFB',
    fontSize: 13,
    fontWeight: '600',
  },
  selectedPrice: {
    color: '#C4B5FD',
    fontWeight: '700',
  },
  actionsRow: {
    flexDirection: 'row',
    marginTop: 12,
  },
});

export default ConfiguratorPanel;
