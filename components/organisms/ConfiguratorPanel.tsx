import PrimaryButton from '@/components/atoms/PrimaryButton';
import IngredientCard, { IngredientMeta } from '@/components/molecules/IngredientCard';
import { ArrowRightCircle, Layers, Receipt, Trash2 } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface ConfiguratorPanelProps {
  catalog: IngredientMeta[];
  onAdd: (type: string) => void;
  onRemove: () => void;
  onCheckout: () => void;
  totals: { total: number; extras: number };
  layerCount: number;
}

const ConfiguratorPanel: React.FC<ConfiguratorPanelProps> = ({
  catalog,
  onAdd,
  onRemove,
  onCheckout,
  totals,
  layerCount,
}) => {
  return (
    <View style={[styles.panel, { backgroundColor: '#FFF', borderRadius: 10 }]}>
      <View style={styles.headerRow}>
        <View>
          <Text style={[styles.title, { color: '#FF6347' }]}>Personaliza tu burger</Text>

          <Text style={styles.subtitle}>Añade capas sin perder la vista 3D.</Text>
        </View>
        <View style={styles.totalBadge}>
          <Receipt color="#FDE68A" size={16} />
          <View>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${totals.total.toFixed(2)}</Text>
          </View>
        </View>
      </View>

      <View style={styles.metricsRow}>
        <View style={styles.metricBox}>
          <Layers color="#C4B5FD" size={18} />
          <View>
            <Text style={styles.metricLabel}>Capas activas</Text>
            <Text style={styles.metricValue}>{layerCount}</Text>
          </View>
        </View>
        <View style={styles.metricBox}>
          <Receipt color="#FDE68A" size={18} />
          <View>
            <Text style={styles.metricLabel}>Extras</Text>
            <Text style={styles.metricValue}>${totals.extras.toFixed(2)}</Text>
          </View>
        </View>
      </View>

      <View style={styles.grid}>
        {catalog
          .filter((item) => item.type !== 'panInferior' && item.type !== 'panSuperior')
          .map((item) => (
            <IngredientCard key={item.type} data={item} onAdd={onAdd} />
          ))}
      </View>

      <View style={styles.actionsRow}>
        <PrimaryButton
          label="Quitar última capa"
          onPress={onRemove}
          variant="ghost"
          disabled={layerCount <= 2}
          leftIcon={<Trash2 color="#E5E7EB" size={18} />}
          style={{ flex: 1 }}
        />
        <PrimaryButton
          label="Ir a facturación"
          onPress={onCheckout}
          leftIcon={<ArrowRightCircle color="#0B1021" size={18} />}
          style={{ flex: 1, marginLeft: 12 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  panel: {
    backgroundColor: 'rgba(10,10,22,0.85)',
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
    flexDirection: 'row',
    gap: 10,
    backgroundColor: 'rgba(124, 58, 237, 0.15)',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(124,58,237,0.35)',
    alignItems: 'center',
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
  metricsRow: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
  },
  metricBox: {
    flex: 1,
    minWidth: 140,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 14,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  metricLabel: {
    color: '#9CA3AF',
    fontSize: 12,
  },
  metricValue: {
    color: '#F9FAFB',
    fontSize: 18,
    fontWeight: '800',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionsRow: {
    flexDirection: 'row',
    marginTop: 4,
  },
});

export default ConfiguratorPanel;
