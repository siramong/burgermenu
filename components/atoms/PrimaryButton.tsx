import React from 'react';
import { GestureResponderEvent, StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';

interface PrimaryButtonProps {
  label: string;
  onPress: (event: GestureResponderEvent) => void;
  variant?: 'primary' | 'ghost';
  disabled?: boolean;
  style?: ViewStyle;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  label,
  onPress,
  variant = 'primary',
  disabled = false,
  style,
}) => {
  const isGhost = variant === 'ghost';

  return (
    <TouchableOpacity
      accessibilityRole="button"
      activeOpacity={0.85}
      style={[
        styles.base,
        isGhost ? styles.ghost : styles.primary,
        disabled ? styles.disabled : undefined,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.label, isGhost ? styles.ghostLabel : undefined]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: '#7C3AED',
  },
  ghost: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    color: '#F9FAFB',
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  ghostLabel: {
    color: '#E5E7EB',
  },
});

export default PrimaryButton;
