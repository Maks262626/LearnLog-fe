import { ColDef, colorSchemeDark, themeMaterial } from 'ag-grid-community';

export const sidebarWidth = 100;

export const myTableTheme = themeMaterial.withPart(colorSchemeDark).withParams({
  headerTextColor: 'rgb(204, 245, 172)',
});

export const defaultColDef: ColDef = {
  flex: 1,
};
