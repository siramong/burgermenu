import PrimaryButton from '@/components/atoms/PrimaryButton';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export interface IngredientMeta {
  type: string;
  label: string;
  description?: string;
  price: number;
  accent?: string;
}

interface IngredientCardProps {
  data: IngredientMeta;
  onAdd: (type: string) => void;
}

const IngredientCard: React.FC<IngredientCardProps> = ({ data, onAdd }) => {
  return (
    <View style={[styles.card, { borderColor: data.accent || '#312E81' }]}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.label}>{data.label}</Text>
          {data.description ? <Text style={styles.description}>{data.description}</Text> : null}
        </View>
        <View style={[styles.badge, { backgroundColor: data.accent || '#312E81' }]}>
          <Text style={styles.badgeText}>${data.price.toFixed(2)}</Text>
        </View>
      </View>
      <PrimaryButton
        label="Agregar"
        onPress={() => onAdd(data.type)}
        variant="ghost"
        style={{ marginTop: 12 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 150,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderRadius: 16,
    padding: 14,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
  },
  label: {
    color: '#F3F4F6',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
  },
  description: {
    color: '#9CA3AF',
    fontSize: 12,
    lineHeight: 16,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  badgeText: {
    color: '#F9FAFB',
    fontWeight: '700',
    fontSize: 12,
  },
});

export default IngredientCard;
