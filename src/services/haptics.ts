import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';

export class HapticsService {
  // Light haptic feedback for button taps
  static async light() {
    try {
      await Haptics.impact({ style: ImpactStyle.Light });
    } catch (error) {
      console.log('Haptics not available:', error);
    }
  }

  // Medium haptic feedback for selections
  static async medium() {
    try {
      await Haptics.impact({ style: ImpactStyle.Medium });
    } catch (error) {
      console.log('Haptics not available:', error);
    }
  }

  // Heavy haptic feedback for important actions
  static async heavy() {
    try {
      await Haptics.impact({ style: ImpactStyle.Heavy });
    } catch (error) {
      console.log('Haptics not available:', error);
    }
  }

  // Success haptic feedback
  static async success() {
    try {
      await Haptics.notification({ type: NotificationType.Success });
    } catch (error) {
      console.log('Haptics not available:', error);
    }
  }

  // Warning haptic feedback
  static async warning() {
    try {
      await Haptics.notification({ type: NotificationType.Warning });
    } catch (error) {
      console.log('Haptics not available:', error);
    }
  }

  // Error haptic feedback
  static async error() {
    try {
      await Haptics.notification({ type: NotificationType.Error });
    } catch (error) {
      console.log('Haptics not available:', error);
    }
  }

  // Selection haptic feedback (for sliders, switches)
  static async selection() {
    try {
      await Haptics.selectionStart();
      await Haptics.selectionChanged();
      await Haptics.selectionEnd();
    } catch (error) {
      console.log('Haptics not available:', error);
    }
  }
}
