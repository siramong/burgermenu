import PrimaryButton from '@/components/atoms/PrimaryButton';
import { Beef, Milk, Leaf, PlusCircle, Salad, Sandwich } from 'lucide-react-native';
import React, { useMemo } from 'react';
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
  const Icon = useMemo(() => {
    switch (data.type) {
      case 'carne':
        return Beef;
      case 'queso':
        return Milk;
      case 'tomate':
        return Salad;
      case 'lechuga':
        return Leaf;
      default:
        return Sandwich;
    }
  }, [data.type]);

  return (
    <View style={[styles.card, { borderColor: data.accent || '#312E81' }]}>
      <View style={styles.headerRow}>
        <View style={styles.iconBadge}>
          <Icon color={data.accent || '#C4B5FD'} size={18} />
        </View>
        <View style={{ flex: 1 }}>
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
        leftIcon={<PlusCircle color="#E5E7EB" size={16} />}
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 12,
  },
  iconBadge: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.04)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
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
