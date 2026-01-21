import PrimaryButton from '@/components/atoms/PrimaryButton';
import BurgerViewer from '@/components/organisms/BurgerViewer';
import { useBurger } from '@/context/BurgerContext';
import { useRouter } from 'expo-router';
import { ArrowLeft, BadgePercent, CreditCard, Receipt, Truck } from 'lucide-react-native';
import React, { useMemo } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';

const BillingScreen = () => {
  const router = useRouter();
  const { selectedIngredients, totals, viewerIngredients, allModelPaths } = useBurger();

  const lineItems = useMemo(
    () =>
      selectedIngredients.map((item) => ({
        id: item.id,
        label: item.label,
        price: item.price,
        accent: item.accent,
      })),
    [selectedIngredients]
  );

  const extrasCount = useMemo(
    () => selectedIngredients.filter((item) => item.type !== 'panInferior' && item.type !== 'panSuperior').length,
    [selectedIngredients]
  );

  const handlePurchase = () => {
    Alert.alert('Compra simulada', 'Tu burger se marcó como pagada. No se abrió ninguna pasarela.');
    router.replace('/');
  };

  return (
    <View style={styles.root}>
      <ScrollView contentContainerStyle={styles.page}>
        <View style={styles.headerRow}>
          <PrimaryButton
            label="Regresar"
            variant="ghost"
            leftIcon={<ArrowLeft color="#E5E7EB" size={16} />}
            onPress={() => router.back()}
            style={{ flex: 0 }}
          />
          <View style={styles.receiptPill}>
            <Receipt color="#FDE68A" size={16} />
            <Text style={styles.receiptText}>Facturación</Text>
          </View>
        </View>

        <Text style={styles.title}>Detalle de tu burger</Text>
        <Text style={styles.subtitle}>Confirma el total y simula la compra en un toque.</Text>

        <View style={styles.summaryCard}>
          <View style={styles.summaryHeader}>
            <View>
              <Text style={styles.summaryLabel}>Total a pagar</Text>
              <Text style={styles.summaryValue}>${totals.total.toFixed(2)}</Text>
            </View>
            <View style={styles.badge}>
              <BadgePercent color="#34D399" size={16} />
              <Text style={styles.badgeText}>{extrasCount} extras</Text>
            </View>
          </View>

          <View style={styles.divider} />

          {lineItems.map((item) => (
            <View key={item.id} style={styles.lineRow}>
              <View style={[styles.bullet, { backgroundColor: item.accent || '#7C3AED' }]} />
              <Text style={styles.lineLabel}>{item.label}</Text>
              <Text style={styles.linePrice}>${item.price.toFixed(2)}</Text>
            </View>
          ))}

          <View style={styles.totalsRow}>
            <Text style={styles.totalsLabel}>Total</Text>
            <Text style={styles.totalsValue}>${totals.total.toFixed(2)}</Text>
          </View>
        </View>

        <View style={styles.viewerBlock}>
          <BurgerViewer ingredients={viewerIngredients} allModelPaths={allModelPaths} />
        </View>

        <View style={styles.actions}>
          <PrimaryButton
            label="Simular compra"
            onPress={handlePurchase}
            leftIcon={<CreditCard color="#0B1021" size={18} />}
            style={{ flex: 1 }}
          />
          <PrimaryButton
            label="Seguir personalizando"
            variant="ghost"
            onPress={() => router.replace('/customize')}
            leftIcon={<Truck color="#E5E7EB" size={18} />}
            style={{ flex: 1 }}
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
  page: {
    padding: 16,
    gap: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  receiptPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(124,58,237,0.35)',
    backgroundColor: 'rgba(124, 58, 237, 0.12)',
  },
  receiptText: {
    color: '#EDE9FE',
    fontWeight: '700',
    fontSize: 12,
  },
  title: {
    color: '#F9FAFB',
    fontSize: 24,
    fontWeight: '800',
  },
  subtitle: {
    color: '#9CA3AF',
    fontSize: 14,
  },
  summaryCard: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    padding: 14,
    gap: 10,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  summaryLabel: {
    color: '#9CA3AF',
    fontSize: 12,
  },
  summaryValue: {
    color: '#F9FAFB',
    fontSize: 24,
    fontWeight: '800',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(52,211,153,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(52,211,153,0.35)',
  },
  badgeText: {
    color: '#D1FAE5',
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.06)',
    marginVertical: 4,
  },
  lineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 6,
  },
  bullet: {
    width: 10,
    height: 10,
    borderRadius: 999,
  },
  lineLabel: {
    color: '#F9FAFB',
    fontSize: 14,
    flex: 1,
  },
  linePrice: {
    color: '#C4B5FD',
    fontWeight: '700',
  },
  totalsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
  },
  totalsLabel: {
    color: '#9CA3AF',
    fontSize: 14,
  },
  totalsValue: {
    color: '#F9FAFB',
    fontSize: 18,
    fontWeight: '800',
  },
  viewerBlock: {
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    backgroundColor: '#0B1021',
    minHeight: 320,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
  },
});

export default BillingScreen;
