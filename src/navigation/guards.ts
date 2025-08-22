import { NavigationContainerRef } from '@react-navigation/native';
import { RootStackParamList } from './types';

export class NavigationGuard {
  private static instance: NavigationGuard;
  private navigationRef: NavigationContainerRef<RootStackParamList> | null =
    null;

  static getInstance(): NavigationGuard {
    if (!NavigationGuard.instance) {
      NavigationGuard.instance = new NavigationGuard();
    }
    return NavigationGuard.instance;
  }

  setNavigationRef(ref: NavigationContainerRef<RootStackParamList>) {
    this.navigationRef = ref;
  }

  canNavigate(_routeName: keyof RootStackParamList): boolean {
    return true;
  }

  navigate(routeName: keyof RootStackParamList, params?: any) {
    if (this.navigationRef && this.canNavigate(routeName)) {
      this.navigationRef.navigate(routeName, params);
    }
  }
}
