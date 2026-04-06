import React, { createContext, useContext, useState, useRef, useCallback } from 'react';
import { StyleSheet, Text, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type ToastType = 'success' | 'error' | 'info';

interface ToastOptions {
  message: string;
  type?: ToastType;
  duration?: number;
}

interface ToastContextType {
  showToast: (options: ToastOptions) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toast, setToast] = useState<ToastOptions | null>(null);
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(-50)).current;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const insets = useSafeAreaInsets();

  const showToast = useCallback(({ message, type = 'success', duration = 3000 }: ToastOptions) => {
    // Clear existing timer if any
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    setToast({ message, type, duration });

    // Animate In
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: 0,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();

    // Auto Hide
    timerRef.current = setTimeout(() => {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: -50,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => setToast(null));
    }, duration);
  }, [opacity, translateY]);

  const getIcon = (type: ToastType) => {
    switch (type) {
      case 'success': return 'checkmark-circle';
      case 'error': return 'alert-circle';
      case 'info': return 'information-circle';
    }
  };

  const getBackgroundColor = (type: ToastType) => {
    switch (type) {
      case 'success': return '#FFFFFF'; // Clean professional white
      case 'error': return '#FFF0F0';
      case 'info': return '#F0F8FF';
    }
  };

  const getIconColor = (type: ToastType) => {
    switch (type) {
      case 'success': return '#5CB85C';
      case 'error': return '#FF6B6B';
      case 'info': return '#339AF0';
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <Animated.View
          style={[
            styles.container,
            { top: insets.top + 10 },
            {
              opacity,
              transform: [{ translateY }],
              backgroundColor: getBackgroundColor(toast.type!),
            },
          ]}
        >
          <Ionicons 
            name={getIcon(toast.type!)} 
            size={24} 
            color={getIconColor(toast.type!)} 
            style={styles.icon}
          />
          <Text style={styles.message}>{toast.message}</Text>
        </Animated.View>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 20,
    right: 20,
    padding: 16,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
    zIndex: 9999,
  },
  icon: {
    marginRight: 12,
  },
  message: {
    flex: 1,
    fontSize: 15,
    fontFamily: 'DMSans_500Medium',
    color: '#000000',
  },
});
