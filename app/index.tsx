import PrimaryButton from '@/components/atoms/PrimaryButton';
import BurgerViewer from '@/components/organisms/BurgerViewer';
import { useBurger } from '@/context/BurgerContext';
import { useRouter } from 'expo-router';
import { ArrowRight, Layers, Sparkles, Star, UtensilsCrossed } from 'lucide-react-native';
import { ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';

const Index = () => {
  const router = useRouter();
  const { viewerIngredients, allModelPaths, totals, selectedIngredients } = useBurger();
  const { width } = useWindowDimensions();
  const isWide = width >= 900;

  const featureCards = [
    { title: 'Render 3D en vivo', copy: 'La pila se actualiza en tiempo real al añadir capas.', icon: Sparkles },
    { title: 'Recetas modulares', copy: 'Combina ingredientes premium y observa el precio al instante.', icon: Layers },
    { title: 'Checkout guiado', copy: 'Facturación clara sin pasarelas externas, solo un toque.', icon: Star },
  ];

  return (
    <View style={styles.root}>
      <View style={styles.glowOne} />
      <View style={styles.glowTwo} />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[styles.page, { flexDirection: isWide ? 'row' : 'column' }]}
      >
        <View style={[styles.hero, isWide ? styles.heroWide : undefined]}>
          <View style={styles.tag}>
            <Sparkles color="#FDE68A" size={16} />
            <Text style={styles.tagText}>Burger Lab v2</Text>
          </View>
          <Text style={styles.title}>Diseña, visualiza y compra la burger perfecta.</Text>
          <Text style={styles.subtitle}>
            Explorá el configurador 3D, seleccioná ingredientes con feedback visual y finalizá la compra sin salir de la app.
          </Text>
          <View style={styles.ctaRow}>
            <PrimaryButton
              label="Armar mi burger"
              onPress={() => router.push('/customize')}
              leftIcon={<UtensilsCrossed color="#0B1021" size={18} />}
              style={{ flex: 1, maxWidth: 220 }}
            />
            <PrimaryButton
              label="Ver facturación"
              variant="ghost"
              onPress={() => router.push('/billing')}
              leftIcon={<ArrowRight color="#E5E7EB" size={18} />}
              style={{ flex: 1, maxWidth: 180 }}
            />
          </View>
          <View style={styles.miniStats}>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Capas activas</Text>
              <View style={styles.statValueRow}>
                <Layers color="#C4B5FD" size={18} />
                <Text style={styles.statValue}>{selectedIngredients.length}</Text>
              </View>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Total estimado</Text>
              <View style={styles.statValueRow}>
                <Star color="#FCD34D" size={18} />
                <Text style={styles.statValue}>${totals.total.toFixed(2)}</Text>
              </View>
            </View>
          </View>
          <View style={styles.featureGrid}>
            {featureCards.map((feature) => {
              const Icon = feature.icon;
              return (
                <View key={feature.title} style={styles.featureCard}>
                  <Icon color="#A78BFA" size={18} />
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  <Text style={styles.featureCopy}>{feature.copy}</Text>
                </View>
              );
            })}
          </View>
        </View>

        <View style={[styles.viewerColumn, isWide ? styles.viewerWide : styles.viewerNarrow]}>
          <BurgerViewer ingredients={viewerIngredients} allModelPaths={allModelPaths} />
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
  glowOne: {
    position: 'absolute',
    top: -160,
    left: -120,
    width: 360,
    height: 360,
    backgroundColor: '#7C3AED',
    opacity: 0.16,
    borderRadius: 320,
    zIndex: 0,
  },
  glowTwo: {
    position: 'absolute',
    bottom: -120,
    right: -60,
    width: 280,
    height: 280,
    backgroundColor: '#22D3EE',
    opacity: 0.10,
    borderRadius: 240,
  },
  hero: {
    flex: 1,
    backgroundColor: 'rgba(10,10,22,0.8)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    borderRadius: 24,
    padding: 20,
    gap: 16,
  },
  heroWide: {
    maxWidth: 560,
  },
  title: {
    color: '#F9FAFB',
    fontSize: 28,
    fontWeight: '800',
    lineHeight: 34,
  },
  subtitle: {
    color: '#9CA3AF',
    fontSize: 15,
    lineHeight: 22,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(124, 58, 237, 0.12)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(124,58,237,0.35)',
  },
  tagText: {
    color: '#EDE9FE',
    fontWeight: '700',
    fontSize: 12,
  },
  ctaRow: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
  },
  miniStats: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
  },
  statBox: {
    flex: 1,
    minWidth: 140,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    borderRadius: 14,
    padding: 12,
  },
  statLabel: {
    color: '#9CA3AF',
    fontSize: 12,
    marginBottom: 6,
  },
  statValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statValue: {
    color: '#F9FAFB',
    fontSize: 18,
    fontWeight: '800',
  },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  featureCard: {
    flex: 1,
    minWidth: 140,
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    padding: 12,
    gap: 6,
  },
  featureTitle: {
    color: '#E5E7EB',
    fontWeight: '700',
    fontSize: 13,
  },
  featureCopy: {
    color: '#9CA3AF',
    fontSize: 12,
    lineHeight: 17,
  },
  viewerColumn: {
    flex: 1,
    minWidth: 320,
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    backgroundColor: '#0B1021',
  },
  viewerWide: {
    minHeight: 520,
  },
  viewerNarrow: {
    minHeight: 380,
  },
});

export default Index;