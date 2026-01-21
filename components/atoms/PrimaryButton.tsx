import React, { ReactElement } from 'react';
import { GestureResponderEvent, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';

interface PrimaryButtonProps {
  label: string;
  onPress: (event: GestureResponderEvent) => void;
  variant?: 'primary' | 'ghost';
  disabled?: boolean;
  style?: ViewStyle;
  leftIcon?: ReactElement;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  label,
  onPress,
  variant = 'primary',
  disabled = false,
  style,
  leftIcon,
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
      <View style={styles.content}>
        {leftIcon ? <View style={styles.icon}>{leftIcon}</View> : null}
        <Text style={[styles.label, isGhost ? styles.ghostLabel : undefined]}>{label}</Text>
      </View>
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
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  icon: {
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
