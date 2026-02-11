export interface IconSet {
  name: string;
  displayName: string;
  iconCount: number;
  previewIcons: string[];
  icons: string[];
}

export interface Manifest {
  sets: IconSet[];
  totalIcons: number;
}

export interface SelectedIcon {
  set: string;
  setDisplayName: string;
  icon: string;
}
