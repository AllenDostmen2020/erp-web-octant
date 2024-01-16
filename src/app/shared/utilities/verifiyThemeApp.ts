import { MatFormFieldAppearance } from '@angular/material/form-field';

export declare type TypeTheme =
  | 'dark'
  | 'light'
  | 'system-dark'
  | 'system-light';
  export declare type TypeApareance =
  | 'theme-color-yellow'
  | 'theme-color-rose'
  | 'theme-color-red'
  | 'theme-color-blue'
  | 'theme-color-green';
export declare type TypeDrawerApp = 'drawer-standard' | 'drawer-dark-full';
export declare type TypeInputsApp = 'outlined' | 'filled' | 'default';

export enum ThemeColorName {
  YELLOW = 'yellow',
  BLUE = 'blue',
  GREEN = 'green',
  ROSE = 'rose',
  RED = 'red',
  CYAN = 'cyan',
  PURPLE = 'purple',
  EMERALD = 'emerald',
}

export const THEME_COLOR_NAMES = Object.values(ThemeColorName);

export const getThemeApp: () => TypeTheme = () => {
  if (
    localStorage.getItem('themeApp') == 'dark' ||
    localStorage.getItem('themeApp') == 'light'
  )
    return localStorage.getItem('themeApp') as 'dark' | 'light';
  else if (window.matchMedia('(prefers-color-scheme: dark)').matches)
    return 'system-dark';
  else return 'system-light';
};

export const setThemeApp = (nameTheme: TypeTheme) => {
  localStorage.setItem('themeApp', nameTheme);
  const theme = getThemeApp();
  if (theme == 'dark' || theme == 'system-dark') {
    document.body.classList.add('dark');
    document.body.classList.remove('light');
  } else {
    document.body.classList.remove('dark');
    document.body.classList.add('light');
  }
};

export const getApareanceApp: () => ThemeColorName = () => {
  const apareanceApp = localStorage.getItem('apareanceApp');
  if (THEME_COLOR_NAMES.includes(apareanceApp as ThemeColorName))
    return apareanceApp as ThemeColorName;
  else return ThemeColorName.YELLOW;
};

export const setApareanceApp = (nameApareance: ThemeColorName) => {
  localStorage.setItem('apareanceApp', nameApareance);
  const theme = getApareanceApp();
  for (const e of THEME_COLOR_NAMES) {
    document.body.classList.remove('theme-color-' + e);
  }
  document.body.classList.add('theme-color-' +theme);
};

export const getApareanceDrawer: () => TypeDrawerApp = () => {
  if (
    localStorage.getItem('apareanceDrawer') == 'drawer-standard' ||
    localStorage.getItem('apareanceDrawer') == 'drawer-dark-full'
  )
    return localStorage.getItem('apareanceDrawer') as TypeDrawerApp;
  else return 'drawer-dark-full';
};

export const setApareanceDrawer = (nameApareance: TypeDrawerApp) => {
  localStorage.setItem('apareanceDrawer', nameApareance);
  const theme = getApareanceDrawer();
  document.body.classList.remove('drawer-standard');
  document.body.classList.remove('drawer-dark-full');
  document.body.classList.add(theme);
};

export const getApareanceInputs: () => MatFormFieldAppearance = () => {
  if (
    localStorage.getItem('apareanceInputs') == 'fill' ||
    localStorage.getItem('apareanceInputs') == 'outline'
  )
    return localStorage.getItem(
      'apareanceInputs'
    ) as MatFormFieldAppearance;
  else return 'fill';
};

export const setApareanceInputs = (nameApareance: MatFormFieldAppearance) => {
  localStorage.setItem('apareanceInputs', nameApareance);
};

export const setConfigApp = () => {
  const theme = getThemeApp();
  setThemeApp(theme);
  const appearance = getApareanceApp();
  setApareanceApp(appearance);
};
