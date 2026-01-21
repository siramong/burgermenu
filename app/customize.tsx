import PrimaryButton from '@/components/atoms/PrimaryButton';
import BurgerViewer from '@/components/organisms/BurgerViewer';
import ConfiguratorPanel from '@/components/organisms/ConfiguratorPanel';
import { useBurger } from '@/context/BurgerContext';
import { useRouter } from 'expo-router';
import { ArrowLeft, BadgeDollarSign, Sparkles } from 'lucide-react-native';
import React from 'react';
import { ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';

const CustomizeScreen = () => {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isWide = width >= 900;
  const {
    catalog,
    viewerIngredients,
    allModelPaths,
    totals,
    addIngredient,
    removeIngredient,
    selectedIngredients,
  } = useBurger();

  return (
    <View style={styles.root}>
      <View style={styles.glow} />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[styles.page, { flexDirection: isWide ? 'row' : 'column' }]}
      >
        <View style={[styles.sidebar, isWide ? styles.sidebarWide : undefined]}>
          <View style={styles.breadcrumb}>
            <PrimaryButton
              label="Inicio"
              variant="ghost"
              leftIcon={<ArrowLeft color="#E5E7EB" size={16} />}
              onPress={() => router.replace('/')}
              style={{ flex: 0 }}
            />
            <View style={styles.stepPill}>
              <Sparkles color="#FDE68A" size={16} />
              <Text style={styles.stepText}>Personalización</Text>
            </View>
          </View>
          <Text style={styles.title}>Ajusta tu burger en vivo</Text>
          <Text style={styles.subtitle}>
            Añade ingredientes premium, quita la última capa si cambias de idea y pasa directo a facturación cuando estés listo.
          </Text>

          <View style={styles.viewerShell}>
            <BurgerViewer ingredients={viewerIngredients} allModelPaths={allModelPaths} />
          </View>
        </View>

        <View style={[styles.panelColumn, isWide ? styles.panelWide : styles.panelNarrow]}>
          <ConfiguratorPanel
            catalog={catalog}
            onAdd={addIngredient}
            onRemove={removeIngredient}
            onCheckout={() => router.push('/billing')}
            totals={{ total: totals.total, extras: totals.extras }}
            layerCount={selectedIngredients.length}
          />

          <View style={styles.footerCard}>
            <View>
              <Text style={styles.footerTitle}>Listo para pagar</Text>
              <Text style={styles.footerCopy}>El detalle final se verá en la siguiente pantalla.</Text>
            </View>
            <PrimaryButton
              label={`Facturar $${totals.total.toFixed(2)}`}
              onPress={() => router.push('/billing')}
              leftIcon={<BadgeDollarSign color="#0B1021" size={18} />}
              style={{ minWidth: 180 }}
            />
          </View>
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
    flexGrow: 1,
    padding: 16,
    gap: 16,
    alignItems: 'stretch',
  },
  glow: {
    position: 'absolute',
    top: -120,
    right: -100,
    width: 300,
    height: 300,
    backgroundColor: '#22C55E',
    opacity: 0.12,
    borderRadius: 260,
  },
  sidebar: {
    flex: 1,
    gap: 14,
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    padding: 18,
  },
  sidebarWide: {
    maxWidth: 520,
  },
  breadcrumb: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stepPill: {
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
  stepText: {
    color: '#EDE9FE',
    fontWeight: '700',
    fontSize: 12,
  },
  title: {
    color: '#F9FAFB',
    fontSize: 24,
    fontWeight: '800',
    lineHeight: 30,
  },
  subtitle: {
    color: '#9CA3AF',
    fontSize: 14,
    lineHeight: 20,
  },
  viewerShell: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    minHeight: 360,
    backgroundColor: '#0B1021',
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
  footerCard: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    borderRadius: 16,
    padding: 14,
  },
  footerTitle: {
    color: '#F9FAFB',
    fontWeight: '700',
    fontSize: 14,
  },
  footerCopy: {
    color: '#9CA3AF',
    fontSize: 12,
  },
});

export default CustomizeScreen;
