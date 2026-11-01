// Herramienta de diseño de Mosik Beads (editor de rejilla).
// Lógica original del editor de prueba del 31 oct 2026, sin cambios de comportamiento.
// Se ejecuta una vez que el marcado (EditorMarkup.jsx) está en la página y devuelve { destroy, exportDesign, importDesign }.
export function initEditor() {
const __timers = [];
const setTimeout = (f, ms) => { const id = window.setTimeout(f, ms); __timers.push(id); return id; };
const DATA=[{"c": "A1", "h": "#FAF5CC", "t": "Sólido", "g": "m"}, {"c": "A2", "h": "#FCFED7", "t": "Sólido", "g": "m"}, {"c": "A3", "h": "#FBFF92", "t": "Sólido", "g": "m"}, {"c": "A4", "h": "#F7EB5A", "t": "Sólido", "g": "m"}, {"c": "A5", "h": "#F1D83A", "t": "Sólido", "g": "m"}, {"c": "A6", "h": "#FBAA50", "t": "Sólido", "g": "m"}, {"c": "A7", "h": "#FB8D50", "t": "Sólido", "g": "m"}, {"c": "A8", "h": "#FCD84C", "t": "Sólido", "g": "m"}, {"c": "A9", "h": "#F89C5E", "t": "Sólido", "g": "m"}, {"c": "A10", "h": "#F57E36", "t": "Sólido", "g": "m"}, {"c": "A11", "h": "#FEDB98", "t": "Sólido", "g": "m"}, {"c": "A12", "h": "#FEA377", "t": "Sólido", "g": "m"}, {"c": "A13", "h": "#FEC668", "t": "Sólido", "g": "m"}, {"c": "A14", "h": "#E75743", "t": "Sólido", "g": "m"}, {"c": "A15", "h": "#FCF65E", "t": "Sólido", "g": "m"}, {"c": "A16", "h": "#FEFF99", "t": "Sólido", "g": "m"}, {"c": "A17", "h": "#FDE273", "t": "Sólido", "g": "m"}, {"c": "A18", "h": "#FCC182", "t": "Sólido", "g": "m"}, {"c": "A19", "h": "#FC7E77", "t": "Sólido", "g": "m"}, {"c": "A20", "h": "#F9D76D", "t": "Sólido", "g": "m"}, {"c": "A21", "h": "#FAE494", "t": "Sólido", "g": "m"}, {"c": "A22", "h": "#EAF976", "t": "Sólido", "g": "m"}, {"c": "A23", "h": "#DFC9BD", "t": "Sólido", "g": "m"}, {"c": "A24", "h": "#F0F6A9", "t": "Sólido", "g": "m"}, {"c": "A25", "h": "#FED785", "t": "Sólido", "g": "m"}, {"c": "A26", "h": "#FEC832", "t": "Sólido", "g": "m"}, {"c": "B1", "h": "#DDF138", "t": "Sólido", "g": "m"}, {"c": "B2", "h": "#63F443", "t": "Sólido", "g": "m"}, {"c": "B3", "h": "#9FF686", "t": "Sólido", "g": "m"}, {"c": "B4", "h": "#5EE034", "t": "Sólido", "g": "m"}, {"c": "B5", "h": "#39E259", "t": "Sólido", "g": "m"}, {"c": "B6", "h": "#64E0A4", "t": "Sólido", "g": "m"}, {"c": "B7", "h": "#3FAE7C", "t": "Sólido", "g": "m"}, {"c": "B8", "h": "#1E9B55", "t": "Sólido", "g": "m"}, {"c": "B9", "h": "#2C5037", "t": "Sólido", "g": "m"}, {"c": "B10", "h": "#99D2BA", "t": "Sólido", "g": "m"}, {"c": "B11", "h": "#637035", "t": "Sólido", "g": "m"}, {"c": "B12", "h": "#1C6E3C", "t": "Sólido", "g": "m"}, {"c": "B13", "h": "#C8E87E", "t": "Sólido", "g": "m"}, {"c": "B14", "h": "#ADE84D", "t": "Sólido", "g": "m"}, {"c": "B15", "h": "#2F5436", "t": "Sólido", "g": "m"}, {"c": "B16", "h": "#C1EC9D", "t": "Sólido", "g": "m"}, {"c": "B17", "h": "#9CB43E", "t": "Sólido", "g": "m"}, {"c": "B18", "h": "#E6ED4E", "t": "Sólido", "g": "m"}, {"c": "B19", "h": "#26B78E", "t": "Sólido", "g": "m"}, {"c": "B20", "h": "#CBEED0", "t": "Sólido", "g": "m"}, {"c": "B21", "h": "#156268", "t": "Sólido", "g": "m"}, {"c": "B22", "h": "#0B4241", "t": "Sólido", "g": "m"}, {"c": "B23", "h": "#353B1B", "t": "Sólido", "g": "m"}, {"c": "B24", "h": "#E9FAA6", "t": "Sólido", "g": "m"}, {"c": "B25", "h": "#4E846C", "t": "Sólido", "g": "m"}, {"c": "B26", "h": "#917C36", "t": "Sólido", "g": "m"}, {"c": "B27", "h": "#D0DFB1", "t": "Sólido", "g": "m"}, {"c": "B28", "h": "#9EE5BC", "t": "Sólido", "g": "m"}, {"c": "B29", "h": "#C6E05F", "t": "Sólido", "g": "m"}, {"c": "B30", "h": "#E4FAB1", "t": "Sólido", "g": "m"}, {"c": "B31", "h": "#B2E695", "t": "Sólido", "g": "m"}, {"c": "B32", "h": "#93AC61", "t": "Sólido", "g": "m"}, {"c": "C1", "h": "#F2FEE6", "t": "Sólido", "g": "m"}, {"c": "C2", "h": "#AAF8FD", "t": "Sólido", "g": "m"}, {"c": "C3", "h": "#9EE0F8", "t": "Sólido", "g": "m"}, {"c": "C4", "h": "#45CCFD", "t": "Sólido", "g": "m"}, {"c": "C5", "h": "#07ABE4", "t": "Sólido", "g": "m"}, {"c": "C6", "h": "#54A7EA", "t": "Sólido", "g": "m"}, {"c": "C7", "h": "#3A77CD", "t": "Sólido", "g": "m"}, {"c": "C8", "h": "#1152BF", "t": "Sólido", "g": "m"}, {"c": "C9", "h": "#3448C1", "t": "Sólido", "g": "m"}, {"c": "C10", "h": "#3DBAE0", "t": "Sólido", "g": "m"}, {"c": "C11", "h": "#2ADCD1", "t": "Sólido", "g": "m"}, {"c": "C12", "h": "#1E324C", "t": "Sólido", "g": "m"}, {"c": "C13", "h": "#CDE7FE", "t": "Sólido", "g": "m"}, {"c": "C14", "h": "#D6FCFB", "t": "Sólido", "g": "m"}, {"c": "C15", "h": "#22C5C4", "t": "Sólido", "g": "m"}, {"c": "C16", "h": "#1959A3", "t": "Sólido", "g": "m"}, {"c": "C17", "h": "#03D0F2", "t": "Sólido", "g": "m"}, {"c": "C18", "h": "#213142", "t": "Sólido", "g": "m"}, {"c": "C19", "h": "#19869F", "t": "Sólido", "g": "m"}, {"c": "C20", "h": "#1B71AC", "t": "Sólido", "g": "m"}, {"c": "C21", "h": "#BDDEFB", "t": "Sólido", "g": "m"}, {"c": "C22", "h": "#6DB1BB", "t": "Sólido", "g": "m"}, {"c": "C23", "h": "#C9E1F9", "t": "Sólido", "g": "m"}, {"c": "C24", "h": "#7FC5F9", "t": "Sólido", "g": "m"}, {"c": "C25", "h": "#AAE9E0", "t": "Sólido", "g": "m"}, {"c": "C26", "h": "#43ADD3", "t": "Sólido", "g": "m"}, {"c": "C27", "h": "#CEDEF9", "t": "Sólido", "g": "m"}, {"c": "C28", "h": "#C0CEEA", "t": "Sólido", "g": "m"}, {"c": "C29", "h": "#374A8A", "t": "Sólido", "g": "m"}, {"c": "D1", "h": "#ABB6EE", "t": "Sólido", "g": "m"}, {"c": "D2", "h": "#878DD4", "t": "Sólido", "g": "m"}, {"c": "D3", "h": "#3852AF", "t": "Sólido", "g": "m"}, {"c": "D4", "h": "#152C7C", "t": "Sólido", "g": "m"}, {"c": "D5", "h": "#B24FC5", "t": "Sólido", "g": "m"}, {"c": "D6", "h": "#B37BDC", "t": "Sólido", "g": "m"}, {"c": "D7", "h": "#8958A9", "t": "Sólido", "g": "m"}, {"c": "D8", "h": "#E2D3FE", "t": "Sólido", "g": "m"}, {"c": "D9", "h": "#D5BBF6", "t": "Sólido", "g": "m"}, {"c": "D10", "h": "#2F1C48", "t": "Sólido", "g": "m"}, {"c": "D11", "h": "#BCBAE2", "t": "Sólido", "g": "m"}, {"c": "D12", "h": "#DB99CE", "t": "Sólido", "g": "m"}, {"c": "D13", "h": "#B30390", "t": "Sólido", "g": "m"}, {"c": "D14", "h": "#882794", "t": "Sólido", "g": "m"}, {"c": "D15", "h": "#311E90", "t": "Sólido", "g": "m"}, {"c": "D16", "h": "#E1E3F2", "t": "Sólido", "g": "m"}, {"c": "D17", "h": "#C7D3F8", "t": "Sólido", "g": "m"}, {"c": "D18", "h": "#9B64B9", "t": "Sólido", "g": "m"}, {"c": "D19", "h": "#D7C3D9", "t": "Sólido", "g": "m"}, {"c": "D20", "h": "#9B34AC", "t": "Sólido", "g": "m"}, {"c": "D21", "h": "#940696", "t": "Sólido", "g": "m"}, {"c": "D22", "h": "#383996", "t": "Sólido", "g": "m"}, {"c": "D23", "h": "#ECDBF8", "t": "Sólido", "g": "m"}, {"c": "D24", "h": "#768AE1", "t": "Sólido", "g": "m"}, {"c": "D25", "h": "#4951C3", "t": "Sólido", "g": "m"}, {"c": "D26", "h": "#D6C6EB", "t": "Sólido", "g": "m"}, {"c": "E1", "h": "#F7D4CB", "t": "Sólido", "g": "m"}, {"c": "E2", "h": "#FCC1DD", "t": "Sólido", "g": "m"}, {"c": "E3", "h": "#F6BDE6", "t": "Sólido", "g": "m"}, {"c": "E4", "h": "#EB639E", "t": "Sólido", "g": "m"}, {"c": "E5", "h": "#F0549D", "t": "Sólido", "g": "m"}, {"c": "E6", "h": "#EB4070", "t": "Sólido", "g": "m"}, {"c": "E7", "h": "#C73576", "t": "Sólido", "g": "m"}, {"c": "E8", "h": "#FBDCEB", "t": "Sólido", "g": "m"}, {"c": "E9", "h": "#E575C7", "t": "Sólido", "g": "m"}, {"c": "E10", "h": "#D33A95", "t": "Sólido", "g": "m"}, {"c": "E11", "h": "#F7DCD6", "t": "Sólido", "g": "m"}, {"c": "E12", "h": "#F794C1", "t": "Sólido", "g": "m"}, {"c": "E13", "h": "#B4036B", "t": "Sólido", "g": "m"}, {"c": "E14", "h": "#FAD5C0", "t": "Sólido", "g": "m"}, {"c": "E15", "h": "#F6CAC9", "t": "Sólido", "g": "m"}, {"c": "E16", "h": "#FCF5ED", "t": "Sólido", "g": "m"}, {"c": "E17", "h": "#F6E4EC", "t": "Sólido", "g": "m"}, {"c": "E18", "h": "#FBC9DC", "t": "Sólido", "g": "m"}, {"c": "E19", "h": "#F7BCD1", "t": "Sólido", "g": "m"}, {"c": "E20", "h": "#D6C6CD", "t": "Sólido", "g": "m"}, {"c": "E21", "h": "#C09EA7", "t": "Sólido", "g": "m"}, {"c": "E22", "h": "#B48C9F", "t": "Sólido", "g": "m"}, {"c": "E23", "h": "#947E8D", "t": "Sólido", "g": "m"}, {"c": "E24", "h": "#DEC0E3", "t": "Sólido", "g": "m"}, {"c": "F1", "h": "#FE9382", "t": "Sólido", "g": "m"}, {"c": "F2", "h": "#F83E4D", "t": "Sólido", "g": "m"}, {"c": "F3", "h": "#EF4C3D", "t": "Sólido", "g": "m"}, {"c": "F4", "h": "#FA2A40", "t": "Sólido", "g": "m"}, {"c": "F5", "h": "#E3052A", "t": "Sólido", "g": "m"}, {"c": "F6", "h": "#923636", "t": "Sólido", "g": "m"}, {"c": "F7", "h": "#921932", "t": "Sólido", "g": "m"}, {"c": "F8", "h": "#BB0126", "t": "Sólido", "g": "m"}, {"c": "F9", "h": "#E0667B", "t": "Sólido", "g": "m"}, {"c": "F10", "h": "#874628", "t": "Sólido", "g": "m"}, {"c": "F11", "h": "#5A2224", "t": "Sólido", "g": "m"}, {"c": "F12", "h": "#F85171", "t": "Sólido", "g": "m"}, {"c": "F13", "h": "#F25C44", "t": "Sólido", "g": "m"}, {"c": "F14", "h": "#FCADB3", "t": "Sólido", "g": "m"}, {"c": "F15", "h": "#D30629", "t": "Sólido", "g": "m"}, {"c": "F16", "h": "#F8C0A9", "t": "Sólido", "g": "m"}, {"c": "F17", "h": "#E79C7D", "t": "Sólido", "g": "m"}, {"c": "F18", "h": "#D17E49", "t": "Sólido", "g": "m"}, {"c": "F19", "h": "#BE464A", "t": "Sólido", "g": "m"}, {"c": "F20", "h": "#C59497", "t": "Sólido", "g": "m"}, {"c": "F21", "h": "#F1B9C7", "t": "Sólido", "g": "m"}, {"c": "F22", "h": "#F6C3D0", "t": "Sólido", "g": "m"}, {"c": "F23", "h": "#EC7F6E", "t": "Sólido", "g": "m"}, {"c": "F24", "h": "#E09DB0", "t": "Sólido", "g": "m"}, {"c": "F25", "h": "#E74852", "t": "Sólido", "g": "m"}, {"c": "G1", "h": "#FEE5D7", "t": "Sólido", "g": "m"}, {"c": "G2", "h": "#FDC5AD", "t": "Sólido", "g": "m"}, {"c": "G3", "h": "#F1C4A6", "t": "Sólido", "g": "m"}, {"c": "G4", "h": "#DAB287", "t": "Sólido", "g": "m"}, {"c": "G5", "h": "#E8B44F", "t": "Sólido", "g": "m"}, {"c": "G6", "h": "#E2A114", "t": "Sólido", "g": "m"}, {"c": "G7", "h": "#985C3A", "t": "Sólido", "g": "m"}, {"c": "G8", "h": "#703F2F", "t": "Sólido", "g": "m"}, {"c": "G9", "h": "#E4B585", "t": "Sólido", "g": "m"}, {"c": "G10", "h": "#D98B43", "t": "Sólido", "g": "m"}, {"c": "G11", "h": "#D9CB9A", "t": "Sólido", "g": "m"}, {"c": "G12", "h": "#FEC891", "t": "Sólido", "g": "m"}, {"c": "G13", "h": "#B26F4C", "t": "Sólido", "g": "m"}, {"c": "G14", "h": "#8C684E", "t": "Sólido", "g": "m"}, {"c": "G15", "h": "#F6F7E2", "t": "Sólido", "g": "m"}, {"c": "G16", "h": "#F1D7C2", "t": "Sólido", "g": "m"}, {"c": "G17", "h": "#7A544E", "t": "Sólido", "g": "m"}, {"c": "G18", "h": "#FFE5D7", "t": "Sólido", "g": "m"}, {"c": "G19", "h": "#DB7E40", "t": "Sólido", "g": "m"}, {"c": "G20", "h": "#A5452F", "t": "Sólido", "g": "m"}, {"c": "G21", "h": "#B48760", "t": "Sólido", "g": "m"}, {"c": "H1", "h": "#FCFCFC", "t": "Sólido", "g": "m"}, {"c": "H2", "h": "#FFFEFF", "t": "Sólido", "g": "m"}, {"c": "H3", "h": "#B5B5B5", "t": "Sólido", "g": "m"}, {"c": "H4", "h": "#878787", "t": "Sólido", "g": "m"}, {"c": "H5", "h": "#464646", "t": "Sólido", "g": "m"}, {"c": "H6", "h": "#2C2C2C", "t": "Sólido", "g": "m"}, {"c": "H7", "h": "#010101", "t": "Sólido", "g": "m"}, {"c": "H8", "h": "#E6D6DC", "t": "Sólido", "g": "m"}, {"c": "H9", "h": "#EFEDEE", "t": "Sólido", "g": "m"}, {"c": "H10", "h": "#EDEAEB", "t": "Sólido", "g": "m"}, {"c": "H11", "h": "#CECDCD", "t": "Sólido", "g": "m"}, {"c": "H12", "h": "#FBF6F0", "t": "Sólido", "g": "m"}, {"c": "H13", "h": "#F4F0D2", "t": "Sólido", "g": "m"}, {"c": "H14", "h": "#CED7D4", "t": "Sólido", "g": "m"}, {"c": "H15", "h": "#9AA6A5", "t": "Sólido", "g": "m"}, {"c": "H16", "h": "#1C1213", "t": "Sólido", "g": "m"}, {"c": "H17", "h": "#F1EEF0", "t": "Sólido", "g": "m"}, {"c": "H18", "h": "#FDFFF9", "t": "Sólido", "g": "m"}, {"c": "H19", "h": "#F2F0E6", "t": "Sólido", "g": "m"}, {"c": "H20", "h": "#96A0A0", "t": "Sólido", "g": "m"}, {"c": "H21", "h": "#F7FCE5", "t": "Sólido", "g": "m"}, {"c": "H22", "h": "#CACAD4", "t": "Sólido", "g": "m"}, {"c": "H23", "h": "#9B9C97", "t": "Sólido", "g": "m"}, {"c": "M1", "h": "#BAC5B7", "t": "Sólido", "g": "m"}, {"c": "M2", "h": "#909A92", "t": "Sólido", "g": "m"}, {"c": "M3", "h": "#697F80", "t": "Sólido", "g": "m"}, {"c": "M4", "h": "#E1D5BD", "t": "Sólido", "g": "m"}, {"c": "M5", "h": "#D0CCAF", "t": "Sólido", "g": "m"}, {"c": "M6", "h": "#B0AA85", "t": "Sólido", "g": "m"}, {"c": "M7", "h": "#B0A898", "t": "Sólido", "g": "m"}, {"c": "M8", "h": "#AD8081", "t": "Sólido", "g": "m"}, {"c": "M9", "h": "#A98766", "t": "Sólido", "g": "m"}, {"c": "M10", "h": "#C6B2BC", "t": "Sólido", "g": "m"}, {"c": "M11", "h": "#9C7694", "t": "Sólido", "g": "m"}, {"c": "M12", "h": "#664B52", "t": "Sólido", "g": "m"}, {"c": "M13", "h": "#C59265", "t": "Sólido", "g": "m"}, {"c": "M14", "h": "#C37564", "t": "Sólido", "g": "m"}, {"c": "M15", "h": "#747E7B", "t": "Sólido", "g": "m"}, {"c": "Y1", "h": "#FE6FB5", "t": "Brilla en la oscuridad", "g": "m"}, {"c": "Y2", "h": "#FCB581", "t": "Brilla en la oscuridad", "g": "m"}, {"c": "Y3", "h": "#D9FDA3", "t": "Brilla en la oscuridad", "g": "m"}, {"c": "Y4", "h": "#93DBFB", "t": "Brilla en la oscuridad", "g": "m"}, {"c": "Y5", "h": "#E988E9", "t": "Brilla en la oscuridad", "g": "m"}, {"c": "P1", "h": "#F9F9F9", "t": "Perla", "g": "m"}, {"c": "P2", "h": "#ABABAB", "t": "Perla", "g": "m"}, {"c": "P3", "h": "#B7DBAD", "t": "Perla", "g": "m"}, {"c": "P4", "h": "#FEA3A3", "t": "Perla", "g": "m"}, {"c": "P5", "h": "#EC9040", "t": "Perla", "g": "m"}, {"c": "P6", "h": "#63CEA4", "t": "Perla", "g": "m"}, {"c": "P7", "h": "#E89273", "t": "Perla", "g": "m"}, {"c": "P8", "h": "#ECDD5B", "t": "Perla", "g": "m"}, {"c": "P9", "h": "#DBD9DA", "t": "Perla", "g": "m"}, {"c": "P10", "h": "#DAC6EC", "t": "Perla", "g": "m"}, {"c": "P11", "h": "#F1E8D5", "t": "Perla", "g": "m"}, {"c": "P12", "h": "#E9EDEF", "t": "Perla", "g": "m"}, {"c": "P13", "h": "#ADCAF2", "t": "Perla", "g": "m"}, {"c": "P14", "h": "#337BAE", "t": "Perla", "g": "m"}, {"c": "P15", "h": "#668676", "t": "Perla", "g": "m"}, {"c": "P16", "h": "#FDC14D", "t": "Perla", "g": "m"}, {"c": "P17", "h": "#FBA52E", "t": "Perla", "g": "m"}, {"c": "P18", "h": "#FFBCA9", "t": "Perla", "g": "m"}, {"c": "P19", "h": "#FFDDE9", "t": "Perla", "g": "m"}, {"c": "P20", "h": "#FCBED2", "t": "Perla", "g": "m"}, {"c": "P21", "h": "#E9BDC3", "t": "Perla", "g": "m"}, {"c": "P22", "h": "#E0A9A5", "t": "Perla", "g": "m"}, {"c": "P23", "h": "#A4666A", "t": "Perla", "g": "m"}, {"c": "R1", "h": "#D40E1F", "t": "Translúcido", "g": "m"}, {"c": "R2", "h": "#F13485", "t": "Translúcido", "g": "m"}, {"c": "R3", "h": "#FC872C", "t": "Translúcido", "g": "m"}, {"c": "R4", "h": "#F8EC33", "t": "Translúcido", "g": "m"}, {"c": "R5", "h": "#33C858", "t": "Translúcido", "g": "m"}, {"c": "R6", "h": "#1EBA93", "t": "Translúcido", "g": "m"}, {"c": "R7", "h": "#1E789C", "t": "Translúcido", "g": "m"}, {"c": "R8", "h": "#185FC7", "t": "Translúcido", "g": "m"}, {"c": "R9", "h": "#925CB0", "t": "Translúcido", "g": "m"}, {"c": "R10", "h": "#F8DA54", "t": "Translúcido", "g": "m"}, {"c": "R11", "h": "#FCEDF6", "t": "Translúcido", "g": "m"}, {"c": "R12", "h": "#D8D4D4", "t": "Translúcido", "g": "m"}, {"c": "R13", "h": "#57544F", "t": "Translúcido", "g": "m"}, {"c": "R14", "h": "#A4E8DB", "t": "Translúcido", "g": "m"}, {"c": "R15", "h": "#77CEE5", "t": "Translúcido", "g": "m"}, {"c": "R16", "h": "#40CECF", "t": "Translúcido", "g": "m"}, {"c": "R17", "h": "#4E8477", "t": "Translúcido", "g": "m"}, {"c": "R18", "h": "#7DCA9C", "t": "Translúcido", "g": "m"}, {"c": "R19", "h": "#C7E665", "t": "Translúcido", "g": "m"}, {"c": "R20", "h": "#E2CCBA", "t": "Translúcido", "g": "m"}, {"c": "R21", "h": "#A27340", "t": "Translúcido", "g": "m"}, {"c": "R22", "h": "#6C372E", "t": "Translúcido", "g": "m"}, {"c": "R23", "h": "#F4BC6E", "t": "Translúcido", "g": "m"}, {"c": "R24", "h": "#E3C6C0", "t": "Translúcido", "g": "m"}, {"c": "R25", "h": "#C66364", "t": "Translúcido", "g": "m"}, {"c": "R26", "h": "#CF94BC", "t": "Translúcido", "g": "m"}, {"c": "R27", "h": "#E48DAB", "t": "Translúcido", "g": "m"}, {"c": "R28", "h": "#9F85CF", "t": "Translúcido", "g": "m"}, {"c": "S01", "h": "#D0CFD2", "t": "Sólido", "g": "s"}, {"c": "S77", "h": "#C0BFBD", "t": "Sólido", "g": "s"}, {"c": "S78", "h": "#B6B6B6", "t": "Sólido", "g": "s"}, {"c": "S79", "h": "#98A4AC", "t": "Sólido", "g": "s"}, {"c": "S07", "h": "#84909C", "t": "Sólido", "g": "s"}, {"c": "S159", "h": "#748290", "t": "Sólido", "g": "s"}, {"c": "S43", "h": "#606B79", "t": "Sólido", "g": "s"}, {"c": "S156", "h": "#4B5866", "t": "Sólido", "g": "s"}, {"c": "S89", "h": "#455360", "t": "Sólido", "g": "s"}, {"c": "S157", "h": "#374654", "t": "Sólido", "g": "s"}, {"c": "S69", "h": "#2B3845", "t": "Sólido", "g": "s"}, {"c": "S158", "h": "#293441", "t": "Sólido", "g": "s"}, {"c": "S13", "h": "#202C36", "t": "Sólido", "g": "s"}, {"c": "S93", "h": "#D0AC92", "t": "Sólido", "g": "s"}, {"c": "S154", "h": "#D2AC93", "t": "Sólido", "g": "s"}, {"c": "S67", "h": "#CBAFA2", "t": "Sólido", "g": "s"}, {"c": "S18", "h": "#CA967E", "t": "Sólido", "g": "s"}, {"c": "S155", "h": "#A88169", "t": "Sólido", "g": "s"}, {"c": "S83", "h": "#A96137", "t": "Sólido", "g": "s"}, {"c": "S57", "h": "#A16D65", "t": "Sólido", "g": "s"}, {"c": "S15", "h": "#7D383C", "t": "Sólido", "g": "s"}, {"c": "S85", "h": "#763445", "t": "Sólido", "g": "s"}, {"c": "S41", "h": "#975F49", "t": "Sólido", "g": "s"}, {"c": "S42", "h": "#667889", "t": "Sólido", "g": "s"}, {"c": "S63", "h": "#565A56", "t": "Sólido", "g": "s"}, {"c": "S51", "h": "#D7CCB9", "t": "Sólido", "g": "s"}, {"c": "S149", "h": "#DDC199", "t": "Sólido", "g": "s"}, {"c": "S32", "h": "#DDBF8D", "t": "Sólido", "g": "s"}, {"c": "S92", "h": "#C89A35", "t": "Sólido", "g": "s"}, {"c": "S68", "h": "#AA9771", "t": "Sólido", "g": "s"}, {"c": "S81", "h": "#AE9771", "t": "Sólido", "g": "s"}, {"c": "S82", "h": "#876A52", "t": "Sólido", "g": "s"}, {"c": "S47", "h": "#986E46", "t": "Sólido", "g": "s"}, {"c": "S17", "h": "#775D5D", "t": "Sólido", "g": "s"}, {"c": "S148", "h": "#615153", "t": "Sólido", "g": "s"}, {"c": "S16", "h": "#453B3C", "t": "Sólido", "g": "s"}, {"c": "SE17", "h": "#503230", "t": "Sólido (color nuevo)", "g": "s"}, {"c": "S52", "h": "#DAC779", "t": "Sólido", "g": "s"}, {"c": "S29", "h": "#DBC35E", "t": "Sólido", "g": "s"}, {"c": "S14", "h": "#E0BB3E", "t": "Sólido", "g": "s"}, {"c": "S27", "h": "#E5AD20", "t": "Sólido", "g": "s"}, {"c": "S48", "h": "#EAAA1F", "t": "Sólido", "g": "s"}, {"c": "S86", "h": "#D8A121", "t": "Sólido", "g": "s"}, {"c": "S90", "h": "#E6AE58", "t": "Sólido", "g": "s"}, {"c": "S03", "h": "#EE9A32", "t": "Sólido", "g": "s"}, {"c": "S39", "h": "#E38D4D", "t": "Sólido", "g": "s"}, {"c": "S97", "h": "#D3733F", "t": "Sólido", "g": "s"}, {"c": "S66", "h": "#E66252", "t": "Sólido", "g": "s"}, {"c": "S04", "h": "#EC7249", "t": "Sólido", "g": "s"}, {"c": "S56", "h": "#FC8945", "t": "Sólido", "g": "s"}, {"c": "S50", "h": "#F1AB91", "t": "Sólido", "g": "s"}, {"c": "S02", "h": "#DB9A8E", "t": "Sólido", "g": "s"}, {"c": "S94", "h": "#CD8985", "t": "Sólido", "g": "s"}, {"c": "S95", "h": "#CE7067", "t": "Sólido", "g": "s"}, {"c": "S96", "h": "#E37864", "t": "Sólido", "g": "s"}, {"c": "S87", "h": "#E3777B", "t": "Sólido", "g": "s"}, {"c": "S84", "h": "#A06574", "t": "Sólido", "g": "s"}, {"c": "S130", "h": "#D3719C", "t": "Sólido", "g": "s"}, {"c": "S36", "h": "#C7859D", "t": "Sólido", "g": "s"}, {"c": "S19", "h": "#E1B2B2", "t": "Sólido", "g": "s"}, {"c": "SE16", "h": "#F2B2D2", "t": "Sólido (color nuevo)", "g": "s"}, {"c": "S35", "h": "#E1C0C6", "t": "Sólido", "g": "s"}, {"c": "S129", "h": "#DBA2B9", "t": "Sólido", "g": "s"}, {"c": "S127", "h": "#DFBDE0", "t": "Sólido", "g": "s"}, {"c": "S28", "h": "#D5ACCD", "t": "Sólido", "g": "s"}, {"c": "S40", "h": "#E6A3CE", "t": "Sólido", "g": "s"}, {"c": "S06", "h": "#DB8BC6", "t": "Sólido", "g": "s"}, {"c": "S25", "h": "#E86CBB", "t": "Sólido", "g": "s"}, {"c": "S26", "h": "#E75E97", "t": "Sólido", "g": "s"}, {"c": "S132", "h": "#DD597A", "t": "Sólido", "g": "s"}, {"c": "S88", "h": "#D3508B", "t": "Sólido", "g": "s"}, {"c": "S128", "h": "#D795DC", "t": "Sólido", "g": "s"}, {"c": "S133", "h": "#D160C4", "t": "Sólido", "g": "s"}, {"c": "S134", "h": "#8B5AB3", "t": "Sólido", "g": "s"}, {"c": "S05", "h": "#C33B48", "t": "Sólido", "g": "s"}, {"c": "S34", "h": "#B62F45", "t": "Sólido", "g": "s"}, {"c": "S58", "h": "#AA2C47", "t": "Sólido", "g": "s"}, {"c": "S146", "h": "#8C1E35", "t": "Sólido", "g": "s"}, {"c": "S38", "h": "#9E2E54", "t": "Sólido", "g": "s"}, {"c": "S49", "h": "#813467", "t": "Sólido", "g": "s"}, {"c": "SE07", "h": "#C1AFD5", "t": "Sólido (color nuevo)", "g": "s"}, {"c": "SE08", "h": "#9978B3", "t": "Sólido (color nuevo)", "g": "s"}, {"c": "SE09", "h": "#6F4A89", "t": "Sólido (color nuevo)", "g": "s"}, {"c": "SE10", "h": "#B872CD", "t": "Sólido (color nuevo)", "g": "s"}, {"c": "SE11", "h": "#A149B5", "t": "Sólido (color nuevo)", "g": "s"}, {"c": "S33", "h": "#BAB8D8", "t": "Sólido", "g": "s"}, {"c": "S153", "h": "#B4BCDF", "t": "Sólido", "g": "s"}, {"c": "S152", "h": "#AFB2E0", "t": "Sólido", "g": "s"}, {"c": "S150", "h": "#8C98D8", "t": "Sólido", "g": "s"}, {"c": "S131", "h": "#C2B3E5", "t": "Sólido", "g": "s"}, {"c": "S60", "h": "#A094D3", "t": "Sólido", "g": "s"}, {"c": "S12", "h": "#8470BA", "t": "Sólido", "g": "s"}, {"c": "S23", "h": "#6E5FB0", "t": "Sólido", "g": "s"}, {"c": "S59", "h": "#6256A6", "t": "Sólido", "g": "s"}, {"c": "S22", "h": "#3D3A81", "t": "Sólido", "g": "s"}, {"c": "S64", "h": "#30446B", "t": "Sólido", "g": "s"}, {"c": "S136", "h": "#A2B4E0", "t": "Sólido", "g": "s"}, {"c": "S135", "h": "#A0B9E5", "t": "Sólido", "g": "s"}, {"c": "S137", "h": "#80AAE9", "t": "Sólido", "g": "s"}, {"c": "S138", "h": "#669AE3", "t": "Sólido", "g": "s"}, {"c": "S139", "h": "#7098DD", "t": "Sólido", "g": "s"}, {"c": "S141", "h": "#5284D7", "t": "Sólido", "g": "s"}, {"c": "S140", "h": "#5B80D4", "t": "Sólido", "g": "s"}, {"c": "S142", "h": "#4372CD", "t": "Sólido", "g": "s"}, {"c": "S143", "h": "#2C49AB", "t": "Sólido", "g": "s"}, {"c": "S44", "h": "#99C9E0", "t": "Sólido", "g": "s"}, {"c": "S10", "h": "#56B8E6", "t": "Sólido", "g": "s"}, {"c": "S101", "h": "#46B6ED", "t": "Sólido", "g": "s"}, {"c": "S24", "h": "#249DE3", "t": "Sólido", "g": "s"}, {"c": "S102", "h": "#2496E5", "t": "Sólido", "g": "s"}, {"c": "S103", "h": "#1A71C3", "t": "Sólido", "g": "s"}, {"c": "S11", "h": "#2555AC", "t": "Sólido", "g": "s"}, {"c": "S144", "h": "#1A4797", "t": "Sólido", "g": "s"}, {"c": "S54", "h": "#3592DB", "t": "Sólido", "g": "s"}, {"c": "S53", "h": "#66B0EB", "t": "Sólido", "g": "s"}, {"c": "S98", "h": "#88C6F1", "t": "Sólido", "g": "s"}, {"c": "S99", "h": "#7BC5DC", "t": "Sólido", "g": "s"}, {"c": "S100", "h": "#66B4C8", "t": "Sólido", "g": "s"}, {"c": "S73", "h": "#52B0D3", "t": "Sólido", "g": "s"}, {"c": "S74", "h": "#3EB3DC", "t": "Sólido", "g": "s"}, {"c": "S75", "h": "#3096C1", "t": "Sólido", "g": "s"}, {"c": "S107", "h": "#167EB6", "t": "Sólido", "g": "s"}, {"c": "S106", "h": "#147CB4", "t": "Sólido", "g": "s"}, {"c": "SE01", "h": "#8EACBF", "t": "Sólido (color nuevo)", "g": "s"}, {"c": "SE02", "h": "#7EA6CD", "t": "Sólido (color nuevo)", "g": "s"}, {"c": "SE03", "h": "#6B9BCC", "t": "Sólido (color nuevo)", "g": "s"}, {"c": "SE04", "h": "#4FAEC9", "t": "Sólido (color nuevo)", "g": "s"}, {"c": "SE05", "h": "#50C1C0", "t": "Sólido (color nuevo)", "g": "s"}, {"c": "SE06", "h": "#5995DB", "t": "Sólido (color nuevo)", "g": "s"}, {"c": "S30", "h": "#A6CDD9", "t": "Sólido", "g": "s"}, {"c": "S37", "h": "#7FD2DB", "t": "Sólido", "g": "s"}, {"c": "S72", "h": "#78CDE1", "t": "Sólido", "g": "s"}, {"c": "S45", "h": "#34C1CA", "t": "Sólido", "g": "s"}, {"c": "S76", "h": "#32AECD", "t": "Sólido", "g": "s"}, {"c": "S104", "h": "#1D97BE", "t": "Sólido", "g": "s"}, {"c": "S105", "h": "#1B8EAF", "t": "Sólido", "g": "s"}, {"c": "S31", "h": "#A4D7D8", "t": "Sólido", "g": "s"}, {"c": "S119", "h": "#90DBD8", "t": "Sólido", "g": "s"}, {"c": "S120", "h": "#85DDBF", "t": "Sólido", "g": "s"}, {"c": "S147", "h": "#84BFB1", "t": "Sólido", "g": "s"}, {"c": "S121", "h": "#82B4A9", "t": "Sólido", "g": "s"}, {"c": "S55", "h": "#99D6A5", "t": "Sólido", "g": "s"}, {"c": "S21", "h": "#75CB70", "t": "Sólido", "g": "s"}, {"c": "S123", "h": "#55C443", "t": "Sólido", "g": "s"}, {"c": "S122", "h": "#3ECE92", "t": "Sólido", "g": "s"}, {"c": "S20", "h": "#2EA47E", "t": "Sólido", "g": "s"}, {"c": "S71", "h": "#24874F", "t": "Sólido", "g": "s"}, {"c": "S124", "h": "#266F49", "t": "Sólido", "g": "s"}, {"c": "S125", "h": "#228787", "t": "Sólido", "g": "s"}, {"c": "S62", "h": "#23786E", "t": "Sólido", "g": "s"}, {"c": "S126", "h": "#0A757A", "t": "Sólido", "g": "s"}, {"c": "S09", "h": "#0F7476", "t": "Sólido", "g": "s"}, {"c": "S145", "h": "#CDC464", "t": "Sólido", "g": "s"}, {"c": "S61", "h": "#B4B154", "t": "Sólido", "g": "s"}, {"c": "S70", "h": "#9BA73E", "t": "Sólido", "g": "s"}, {"c": "S80", "h": "#7B874D", "t": "Sólido", "g": "s"}, {"c": "S108", "h": "#C7BC87", "t": "Sólido", "g": "s"}, {"c": "S109", "h": "#BCB384", "t": "Sólido", "g": "s"}, {"c": "S110", "h": "#A59B73", "t": "Sólido", "g": "s"}, {"c": "S111", "h": "#8A825A", "t": "Sólido", "g": "s"}, {"c": "S112", "h": "#807B55", "t": "Sólido", "g": "s"}, {"c": "SE12", "h": "#F7B169", "t": "Sólido (color nuevo)", "g": "s"}, {"c": "SE13", "h": "#EEBA91", "t": "Sólido (color nuevo)", "g": "s"}, {"c": "SE14", "h": "#D19B71", "t": "Sólido (color nuevo)", "g": "s"}, {"c": "SE15", "h": "#A47A53", "t": "Sólido (color nuevo)", "g": "s"}, {"c": "S113", "h": "#A8AF9B", "t": "Sólido", "g": "s"}, {"c": "S114", "h": "#99A17E", "t": "Sólido", "g": "s"}, {"c": "S115", "h": "#859271", "t": "Sólido", "g": "s"}, {"c": "S116", "h": "#7D8D68", "t": "Sólido", "g": "s"}, {"c": "S117", "h": "#71815D", "t": "Sólido", "g": "s"}, {"c": "S118", "h": "#4A663F", "t": "Sólido", "g": "s"}, {"c": "S151", "h": "#2D4937", "t": "Sólido", "g": "s"}, {"c": "S91", "h": "#203A40", "t": "Sólido", "g": "s"}, {"c": "S65", "h": "#D8E788", "t": "Sólido", "g": "s"}, {"c": "S46", "h": "#A4DA7B", "t": "Sólido", "g": "s"}, {"c": "S08", "h": "#4BE6A1", "t": "Sólido", "g": "s"}, {"c": "ST1", "h": "#D5D4DC", "t": "Translúcido", "g": "s"}, {"c": "ST2", "h": "#F88ABC", "t": "Translúcido", "g": "s"}, {"c": "ST3", "h": "#FAA168", "t": "Translúcido", "g": "s"}, {"c": "ST4", "h": "#D0E59C", "t": "Translúcido", "g": "s"}, {"c": "ST5", "h": "#2DD3A7", "t": "Translúcido", "g": "s"}, {"c": "ST6", "h": "#9397E2", "t": "Translúcido", "g": "s"}, {"c": "ST7", "h": "#697E87", "t": "Translúcido", "g": "s"}, {"c": "ST8", "h": "#79474D", "t": "Translúcido", "g": "s"}, {"c": "SL1", "h": "#61C1E4", "t": "Purpurina", "g": "s"}, {"c": "SL2", "h": "#14A491", "t": "Purpurina", "g": "s"}, {"c": "SL3", "h": "#BA2E38", "t": "Purpurina", "g": "s"}, {"c": "SL4", "h": "#D7B71A", "t": "Purpurina", "g": "s"}, {"c": "SL5", "h": "#7D6DCA", "t": "Purpurina", "g": "s"}, {"c": "SL6", "h": "#C7C7D2", "t": "Purpurina", "g": "s"}, {"c": "SG1", "h": "#D4D4D5", "t": "Brilla en la oscuridad", "g": "s"}, {"c": "SG2", "h": "#DCC6D4", "t": "Brilla en la oscuridad", "g": "s"}, {"c": "SG3", "h": "#67C7EA", "t": "Brilla en la oscuridad", "g": "s"}, {"c": "SG4", "h": "#A792E0", "t": "Brilla en la oscuridad", "g": "s"}, {"c": "SG5", "h": "#F7B5A3", "t": "Brilla en la oscuridad", "g": "s"}, {"c": "SG6", "h": "#B2DDAE", "t": "Brilla en la oscuridad", "g": "s"}, {"c": "SG7", "h": "#C85B6A", "t": "Brilla en la oscuridad", "g": "s"}, {"c": "SN1", "h": "#FD862F", "t": "Neón", "g": "s"}, {"c": "SN2", "h": "#2DE98E", "t": "Neón", "g": "s"}, {"c": "SN3", "h": "#D9EF77", "t": "Neón", "g": "s"}, {"c": "SN4", "h": "#E3688F", "t": "Neón", "g": "s"}, {"c": "SP1", "h": "#9DDEB7", "t": "Perla", "g": "s"}, {"c": "SP2", "h": "#FC9664", "t": "Perla", "g": "s"}, {"c": "SP3", "h": "#EFAD5F", "t": "Perla", "g": "s"}, {"c": "SP4", "h": "#DB9FAF", "t": "Perla", "g": "s"}, {"c": "SP5", "h": "#CA4B5D", "t": "Perla", "g": "s"}, {"c": "SP6", "h": "#364B9C", "t": "Perla", "g": "s"}, {"c": "SP7", "h": "#594087", "t": "Perla", "g": "s"}, {"c": "SP8", "h": "#CECED0", "t": "Perla", "g": "s"}, {"c": "SUV1", "h": "#F7C1DC", "t": "Cambia con luz UV", "g": "s"}, {"c": "SUV2", "h": "#EBDB7D", "t": "Cambia con luz UV", "g": "s"}, {"c": "SUV3", "h": "#CBCCFE", "t": "Cambia con luz UV", "g": "s"}, {"c": "SUV4", "h": "#FEB4FE", "t": "Cambia con luz UV", "g": "s"}, {"c": "SD1", "h": "#5D7384", "t": "Dos colores (tira)", "g": "s"}, {"c": "SD2", "h": "#7E94A2", "t": "Dos colores (tira)", "g": "s"}, {"c": "SD3", "h": "#5FBBEC", "t": "Dos colores (tira)", "g": "s"}, {"c": "SD4", "h": "#76B9E7", "t": "Dos colores (tira)", "g": "s"}, {"c": "SD5", "h": "#56BA90", "t": "Dos colores (tira)", "g": "s"}, {"c": "SD6", "h": "#50C6CC", "t": "Dos colores (tira)", "g": "s"}, {"c": "SD7", "h": "#BC7C91", "t": "Dos colores (tira)", "g": "s"}, {"c": "SD8", "h": "#F17EC4", "t": "Dos colores (tira)", "g": "s"}, {"c": "SD9", "h": "#9891C9", "t": "Dos colores (tira)", "g": "s"}, {"c": "SD10", "h": "#DFB750", "t": "Dos colores (tira)", "g": "s"}, {"c": "SD11", "h": "#F19988", "t": "Dos colores (tira)", "g": "s"}, {"c": "SD12", "h": "#358E86", "t": "Dos colores (tira)", "g": "s"}];
const CODES={};DATA.forEach(d=>CODES[d.c]={hex:d.h,tipo:d.t,g:d.g});
const ESPECIALES=['Purpurina','Neón','Cambia con luz UV','Dos colores (tira)'];
const clO=t=>t.startsWith('Sólido')||ESPECIALES.includes(t)?'Sólido':t;
const clD=t=>t.startsWith('Sólido')?'Sólido':t;
function lab(h){let r=[1,3,5].map(i=>parseInt(h.substr(i,2),16)/255).map(c=>c<=0.04045?c/12.92:Math.pow((c+0.055)/1.055,2.4));
const X=(0.4124564*r[0]+0.3575761*r[1]+0.1804375*r[2])/0.95047,Y=0.2126729*r[0]+0.7151522*r[1]+0.0721750*r[2],Z=(0.0193339*r[0]+0.1191920*r[1]+0.9503041*r[2])/1.08883;
const t=v=>v>0.008856?Math.cbrt(v):7.787*v+16/116;const fx=t(X),fy=t(Y),fz=t(Z);return[116*fy-16,500*(fx-fy),200*(fy-fz)]}
function de(l1,l2){const rad=Math.PI/180,deg=180/Math.PI;const[L1,a1,b1]=l1,[L2,a2,b2]=l2;
const C1=Math.hypot(a1,b1),C2=Math.hypot(a2,b2),Cm=(C1+C2)/2,G=0.5*(1-Math.sqrt(Math.pow(Cm,7)/(Math.pow(Cm,7)+Math.pow(25,7))));
const ap1=(1+G)*a1,ap2=(1+G)*a2,Cp1=Math.hypot(ap1,b1),Cp2=Math.hypot(ap2,b2);
const hp=(b,a)=>(b===0&&a===0)?0:((Math.atan2(b,a)*deg)%360+360)%360;const hp1=hp(b1,ap1),hp2=hp(b2,ap2);
const dL=L2-L1,dC=Cp2-Cp1;let dh=0;if(Cp1*Cp2!==0){const d=hp2-hp1;dh=Math.abs(d)<=180?d:(d>180?d-360:d+360)}
const dH=2*Math.sqrt(Cp1*Cp2)*Math.sin(dh*rad/2),Lm=(L1+L2)/2,Cpm=(Cp1+Cp2)/2;let hm;
if(Cp1*Cp2===0)hm=hp1+hp2;else hm=Math.abs(hp1-hp2)<=180?(hp1+hp2)/2:((hp1+hp2<360)?(hp1+hp2+360)/2:(hp1+hp2-360)/2);
const T=1-0.17*Math.cos((hm-30)*rad)+0.24*Math.cos(2*hm*rad)+0.32*Math.cos((3*hm+6)*rad)-0.20*Math.cos((4*hm-63)*rad);
const dth=30*Math.exp(-Math.pow((hm-275)/25,2)),Rc=2*Math.sqrt(Math.pow(Cpm,7)/(Math.pow(Cpm,7)+Math.pow(25,7)));
const Sl=1+0.015*Math.pow(Lm-50,2)/Math.sqrt(20+Math.pow(Lm-50,2)),Sc=1+0.045*Cpm,Sh=1+0.015*Cpm*T,Rt=-Math.sin(2*dth*rad)*Rc;
return Math.sqrt(Math.pow(dL/Sl,2)+Math.pow(dC/Sc,2)+Math.pow(dH/Sh,2)+Rt*(dC/Sc)*(dH/Sh))}
const LAB={};Object.keys(CODES).forEach(c=>LAB[c]=lab(CODES[c].hex));
function hungarian(a){const n=a.length,m=a[0].length,INF=1e12;const u=Array(n+1).fill(0),v=Array(m+1).fill(0),p=Array(m+1).fill(0),way=Array(m+1).fill(0);
for(let i=1;i<=n;i++){p[0]=i;let j0=0;const minv=Array(m+1).fill(INF),used=Array(m+1).fill(false);
do{used[j0]=true;const i0=p[j0];let delta=INF,j1=0;
for(let j=1;j<=m;j++)if(!used[j]){const cur=a[i0-1][j-1]-u[i0]-v[j];if(cur<minv[j]){minv[j]=cur;way[j]=j0}if(minv[j]<delta){delta=minv[j];j1=j}}
for(let j=0;j<=m;j++){if(used[j]){u[p[j]]+=delta;v[j]-=delta}else minv[j]-=delta}j0=j1}while(p[j0]!==0);
do{const j1=way[j0];p[j0]=p[j1];j0=j1}while(j0)}
const res=Array(n);for(let j=1;j<=m;j++)if(p[j])res[p[j]-1]=j-1;return res}
function convertDesign(codes,uniq){
const valid=[...new Set(codes)].filter(c=>CODES[c]);if(!valid.length)return{rows:[],unknown:codes};
const g=CODES[valid[0]].g;const src=valid.filter(c=>CODES[c].g===g),otros=valid.filter(c=>CODES[c].g!==g);
const dest=Object.keys(CODES).filter(c=>CODES[c].g!==g);
const allowed=(s,d)=>clO(CODES[s].tipo)===clD(CODES[d].tipo);
const near=src.map(s=>{let b=null;dest.forEach(d=>{if(!allowed(s,d))return;const x=de(LAB[s],LAB[d]);if(!b||x<b.de)b={d,de:x}});return b});
let out=near.map((b,i)=>({o:src[i],d:b.d,de:b.de,near:b.d,nearde:b.de}));
if(uniq){const BIG=1e4,cols=Math.max(dest.length,src.length);
const a=src.map(s=>{const r=dest.map(d=>allowed(s,d)?de(LAB[s],LAB[d]):BIG);while(r.length<cols)r.push(BIG);return r});
const as=hungarian(a);out=src.map((s,i)=>{const j=as[i];if(j<dest.length&&a[i][j]<BIG)return{o:s,d:dest[j],de:a[i][j],near:near[i].d,nearde:near[i].de};return{o:s,d:near[i].d,de:near[i].de,near:near[i].d,nearde:near[i].de,forced:true}})}
return{rows:out,otros,unknown:codes.filter(c=>!CODES[c]),g}}
const $=id=>document.getElementById(id);
let VIEW='bead',PW=40,PH=40,PR=1,PC=1,platesKey='1x1';
let solo=new Set(),hidden=new Set(),recolorFrom=null;
let COLS=40,ROWS=40,grid=[],CS=16,tool='move',cur='A10',img=null,imgCv=null,imgDirty=true;
const imgT={s:1,x:0,y:0,rot:0,flip:false};let hist=[],redo=[];
const cv=$('cv'),ctx=cv.getContext('2d'),cvbox=$('cvbox');
let FOCUS=null; // null = todo el diseño · {r,c} = ver una sola placa (tablero)
function newGrid(c,r,old){const g=Array.from({length:r},()=>Array(c).fill(null));if(old)for(let y=0;y<Math.min(r,old.length);y++)for(let x=0;x<Math.min(c,old[0].length);x++)g[y][x]=old[y][x];return g}
function snap(){return JSON.stringify(grid)}
function push(){hist.push(snap());if(hist.length>80)hist.shift();redo=[];upd()}
function upd(){$('undo').disabled=!hist.length;$('redo').disabled=!redo.length}
function applyFocus(){
 if(FOCUS){cvbox.style.width=PW*CS+'px';cvbox.style.height=PH*CS+'px';cv.style.transform=`translate(${-FOCUS.c*PW*CS}px,${-FOCUS.r*PH*CS}px)`}
 else{cvbox.style.width=cv.width+'px';cvbox.style.height=cv.height+'px';cv.style.transform=''}}
function size(keep){const w=$('wrap');const ow=cvbox.offsetWidth||cv.width,oh=cvbox.offsetHeight||cv.height;const fx=keep?(w.scrollLeft+w.clientWidth/2)/ow:0,fy=keep?(w.scrollTop+w.clientHeight/2)/oh:0;CS=+$('zoom').value;cv.width=COLS*CS;cv.height=ROWS*CS;applyFocus();imgDirty=true;draw();if(keep){w.scrollLeft=fx*cvbox.offsetWidth-w.clientWidth/2;w.scrollTop=fy*cvbox.offsetHeight-w.clientHeight/2}}
function drawGuides(c,k,sc){
 const W=COLS*k,H=ROWS*k;c.save();
 const line=(x0,y0,x1,y1,w,col)=>{c.strokeStyle=col;c.lineWidth=w;c.beginPath();c.moveTo(x0,y0);c.lineTo(x1,y1);c.stroke()};
 for(let i=1;i<COLS;i++){const xin=i%PW;if(xin===0)continue;if(xin%10===0)line(i*k,0,i*k,H,Math.max(1.2,k/10),'rgba(30,30,30,.45)')}
 for(let j=1;j<ROWS;j++){const yin=j%PH;if(yin===0)continue;if(yin%10===0)line(0,j*k,W,j*k,Math.max(1.2,k/10),'rgba(30,30,30,.45)')}
 const pw=Math.max(2.5,k/5);
 for(let i=0;i<=COLS;i+=PW)line(i*k,0,i*k,H,pw,'rgba(15,15,15,.9)');
 for(let j=0;j<=ROWS;j+=PH)line(0,j*k,W,j*k,pw,'rgba(15,15,15,.9)');
 c.restore()}
function plateSvg(r,cn,w,h){const g=3,bw=(w-g*(cn+1))/cn,bh=(h-g*(r+1))/r;let o=`<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">`;for(let i=0;i<r;i++)for(let j=0;j<cn;j++)o+=`<rect x="${g+j*(bw+g)}" y="${g+i*(bh+g)}" width="${bw}" height="${bh}" rx="2" fill="#e8731c33" stroke="#e8731c" stroke-width="1.5"/>`;return o+'</svg>'}
const PLATES=[['1x1','1 placa',1,1],['1x2','2 placas',1,2],['1x3','3 placas',1,3],['2x2','2 × 2',2,2],['2x3','2 × 3',2,3],['custom','Personalizar',0,0]];
function applyBoard(keepMsg){
 const t=$('preset').value;if(t==='custom'){$('pdim').style.display='';PW=Math.max(5,Math.min(100,+$('cols').value||40));PH=Math.max(5,Math.min(100,+$('rows').value||40))}else{$('pdim').style.display='none';const[a,b]=t.split('x');PW=+a;PH=+b;$('cols').value=PW;$('rows').value=PH}
 if(platesKey==='custom'){PR=Math.max(1,Math.min(6,+$('pr').value||1));PC=Math.max(1,Math.min(6,+$('pc').value||1))}else{const p=PLATES.find(x=>x[0]===platesKey);PR=p[2];PC=p[3]}
 const c=PW*PC,r=PH*PR;if(c>300||r>300){$('boardinfo').textContent='Demasiado grande: máximo 300 cuentas por lado';return}
 if(c!==COLS||r!==ROWS){push();grid=newGrid(c,r,grid);COLS=c;ROWS=r;size()}else draw();
 $('custom').classList.toggle('show',platesKey==='custom');
 $('cprev').innerHTML=plateSvg(PR,PC,54,40);
 const p=PLATES.find(x=>x[0]===platesKey);
 $('pddb').innerHTML=(platesKey==='custom'?plateSvg(PR,PC,34,24):plateSvg(p[2],p[3],34,24))+`<span>${platesKey==='custom'?PR+' × '+PC+' placas':p[1]}</span> ▾`;
 $('boardinfo').textContent=`${PR*PC} ${PR*PC===1?'placa':'placas'} (${PR} fila${PR>1?'s':''} × ${PC} columna${PC>1?'s':''}) · tablero de ${COLS} × ${ROWS} cuentas`;if(FOCUS&&(FOCUS.r>=PR||FOCUS.c>=PC))FOCUS=null;applyFocus();syncPlateBar()}
$('pddl').innerHTML=PLATES.map(p=>`<div class="pi" data-k="${p[0]}">${p[0]==='custom'?'<svg width="54" height="40" viewBox="0 0 54 40"><rect x="4" y="4" width="46" height="32" rx="3" fill="none" stroke="#e8731c" stroke-width="1.5" stroke-dasharray="4 3"/><text x="27" y="26" text-anchor="middle" font-size="18" fill="#e8731c">+</text></svg>':plateSvg(p[2],p[3],54,40)}${p[1]}</div>`).join('');
$('pddb').onclick=e=>{e.stopPropagation();$('pddl').classList.toggle('show')};
const onDocClick=e=>{if(!e.target.closest('#pdd'))$('pddl').classList.remove('show')};
document.addEventListener('click',onDocClick);
$('pddl').addEventListener('click',e=>{const it=e.target.closest('.pi');if(!it)return;platesKey=it.dataset.k;$('pddl').classList.remove('show');
 document.querySelectorAll('.pi').forEach(x=>x.classList.toggle('sel',x===it));applyBoard()});
['preset','cols','rows','pr','pc'].forEach(i=>$(i).addEventListener('change',()=>applyBoard()));
$('guides').addEventListener('input',draw);
function paintImg(c2){const r=imgRectScaled();c2.save();c2.imageSmoothingEnabled=(r.w/img.width)<1;c2.translate(r.x+r.w/2,r.y+r.h/2);c2.rotate((imgT.rot||0)*Math.PI/180);if(imgT.flip)c2.scale(-1,1);c2.drawImage(img,-r.w/2,-r.h/2,r.w,r.h);c2.restore()}
function imgRectScaled(){const f=$('isc').value/100;const w0=img.width*imgT.us*CS,h0=img.height*imgT.us*CS;const cx=(imgT.ux*CS+w0/2),cy=(imgT.uy*CS+h0/2);return{w:w0*f,h:h0*f,x:cx-w0*f/2,y:cy-h0*f/2}}
function draw(){
 ctx.clearRect(0,0,cv.width,cv.height);ctx.fillStyle='#f6f5f1';ctx.fillRect(0,0,cv.width,cv.height);
 if(img&&$('showimg').checked){ctx.globalAlpha=$('op').value/100;paintImg(ctx);ctx.globalAlpha=1}
 const bo=$('bop').value/100,sb=$('showbeads').checked,sg=$('showgrid').checked;
 for(let y=0;y<ROWS;y++)for(let x=0;x<COLS;x++){
  let c=grid[y][x];if(c&&((solo.size&&!solo.has(c))||hidden.has(c)))c=null;const cx=x*CS+CS/2,cy=y*CS+CS/2;
  if(c&&sb){ctx.globalAlpha=bo;ctx.fillStyle=CODES[c].hex;
   if(VIEW==='pix'){ctx.fillRect(x*CS,y*CS,CS,CS);ctx.globalAlpha=1}
   else{ctx.beginPath();ctx.arc(cx,cy,CS/2-.7,0,7);ctx.fill();ctx.globalAlpha=Math.min(1,bo+.2);ctx.fillStyle='rgba(246,245,241,.9)';ctx.beginPath();ctx.arc(cx,cy,CS*.16,0,7);ctx.fill();ctx.globalAlpha=1}}
  else if(sg){ctx.strokeStyle='rgba(60,60,60,.7)';ctx.lineWidth=1;ctx.beginPath();if(VIEW==='pix')ctx.rect(x*CS+.5,y*CS+.5,CS-1,CS-1);else ctx.arc(cx,cy,CS/2-.7,0,7);ctx.stroke()}
 }
 if($('guides').checked)drawGuides(ctx,CS,1);
 counts()
}
function cellAt(e){const r=cv.getBoundingClientRect();const x=Math.floor((e.clientX-r.left)*(cv.width/r.width)/CS),y=Math.floor((e.clientY-r.top)*(cv.height/r.height)/CS);return(x>=0&&y>=0&&x<COLS&&y<ROWS)?[x,y]:null}
function sample(x,y){if(!img)return null;if(imgDirty||!imgCv){imgCv=document.createElement('canvas');imgCv.width=cv.width;imgCv.height=cv.height;const c=imgCv.getContext('2d');c.fillStyle='#fff';c.fillRect(0,0,imgCv.width,imgCv.height);paintImg(c);imgDirty=false}
 const d=imgCv.getContext('2d').getImageData(Math.floor(x*CS+CS*.25),Math.floor(y*CS+CS*.25),Math.max(1,Math.floor(CS*.5)),Math.max(1,Math.floor(CS*.5))).data;let r=0,g=0,b=0,n=d.length/4;for(let i=0;i<d.length;i+=4){r+=d[i];g+=d[i+1];b+=d[i+2]}return[r/n,g/n,b/n]}
function nearest(rgb){const h='#'+rgb.map(v=>Math.round(v).toString(16).padStart(2,'0')).join('');const l=lab(h);let b=null;palList().forEach(c=>{const d=de(l,LAB[c]);if(!b||d<b.d)b={c,d}});return b&&b.c}
function palList(){const g=$('gama').value,solo=$('tipo').value==='sol';return DATA.filter(d=>d.g===g&&(!solo||d.t.startsWith('Sólido'))).map(d=>d.c)}
function renderPal(){const q=$('q').value.trim().toUpperCase();const list=palList().filter(c=>!q||c.includes(q));
 $('pal').innerHTML=list.map(c=>`<button data-c="${c}" title="${c} · ${CODES[c].tipo}" class="${c===cur?'sel':''}" style="background:${CODES[c].hex}">${c}</button>`).join('');
 $('cur').innerHTML=`<i class="sw" style="width:22px;height:22px;background:${CODES[cur].hex}"></i>${cur} <span class="mu">${CODES[cur].tipo} · ${CODES[cur].hex}</span>`}
function flood(x,y,to){const from=grid[y][x];if(from===to)return;const st=[[x,y]];while(st.length){const[a,b]=st.pop();if(a<0||b<0||a>=COLS||b>=ROWS||grid[b][a]!==from)continue;grid[b][a]=to;st.push([a+1,b],[a-1,b],[a,b+1],[a,b-1])}}
function applyAt(x,y){
 if(tool==='paint')grid[y][x]=cur;else if(tool==='erase')grid[y][x]=null;
 else if(tool==='img'){const s=sample(x,y);if(s)grid[y][x]=nearest(s)}
}
let down=false,last=null,mv=null;
// Dos dedos: mover la vista y hacer zoom con pellizco, sea cual sea la herramienta. Un dedo sigue pintando o moviendo la imagen.
const pts=new Map();let multi=null;
function startMulti(){down=false;mv=null;last=null;const[a,b]=[...pts.values()];multi={d:Math.hypot(a.x-b.x,a.y-b.y)||1,z:+$('zoom').value,cx:(a.x+b.x)/2,cy:(a.y+b.y)/2,zoom:false}}
// Zoom que mantiene fijo el punto del dibujo que hay bajo los dedos.
function zoomAt(nz,cx,cy){const w=$('wrap'),r=w.getBoundingClientRect(),ox=cx-r.left,oy=cy-r.top;const px=(w.scrollLeft+ox)/CS,py=(w.scrollTop+oy)/CS;$('zoom').value=nz;size();w.scrollLeft=px*CS-ox;w.scrollTop=py*CS-oy}
function moveMulti(){const[a,b]=[...pts.values()];const w=$('wrap');const d=Math.hypot(a.x-b.x,a.y-b.y)||1,cx=(a.x+b.x)/2,cy=(a.y+b.y)/2;
 w.scrollLeft-=cx-multi.cx;w.scrollTop-=cy-multi.cy;multi.cx=cx;multi.cy=cy;
 // El zoom solo empieza cuando los dedos se separan o se juntan de verdad (más de un 12 %): mover la vista con dos dedos no zoomea por error.
 if(!multi.zoom){if(Math.abs(d/multi.d-1)<0.12)return;multi.zoom=true;multi.d=d;multi.z=+$('zoom').value;return}
 const nz=Math.max(3,Math.min(48,Math.round(multi.z*d/multi.d*2)/2));if(nz!==+$('zoom').value)zoomAt(nz,cx,cy)}
cv.addEventListener('pointerdown',e=>{cv.setPointerCapture(e.pointerId);pts.set(e.pointerId,{x:e.clientX,y:e.clientY});if(pts.size===2){startMulti();return}if(pts.size>2)return;const c=cellAt(e);down=true;
 if(tool==='move'){const w=$('wrap');mv={x:e.clientX,y:e.clientY,ux:imgT.ux,uy:imgT.uy,sl:w.scrollLeft,st:w.scrollTop,pan:$('lock').checked||!img};cv.style.cursor='grabbing';return}
 if(!c)return;const[x,y]=c;
 if(tool==='pick'){const v=grid[y][x];if(v){cur=v;$('gama').value=CODES[v].g;renderPal()}down=false;return}
 if(tool==='fill'){push();flood(x,y,cur);draw();down=false;return}
 push();last=c;applyAt(x,y);draw()});
cv.addEventListener('pointermove',e=>{if(pts.has(e.pointerId))pts.set(e.pointerId,{x:e.clientX,y:e.clientY});if(multi){if(pts.size>=2)moveMulti();return}if(!down)return;
 if(tool==='move'&&mv){if(mv.pan){const w=$('wrap');w.scrollLeft=mv.sl-(e.clientX-mv.x);w.scrollTop=mv.st-(e.clientY-mv.y);return}const r=cv.getBoundingClientRect(),k=cv.width/r.width;imgT.ux=mv.ux+(e.clientX-mv.x)*k/CS;imgT.uy=mv.uy+(e.clientY-mv.y)*k/CS;imgDirty=true;draw();return}
 const c=cellAt(e);if(!c||!last)return;
 let[x0,y0]=last,[x1,y1]=c;const n=Math.max(Math.abs(x1-x0),Math.abs(y1-y0),1);for(let i=1;i<=n;i++){applyAt(Math.round(x0+(x1-x0)*i/n),Math.round(y0+(y1-y0)*i/n))}
 last=c;draw()});
['pointerup','pointercancel'].forEach(t=>cv.addEventListener(t,e=>{pts.delete(e.pointerId);if(pts.size<2)multi=null;down=false;last=null;mv=null;if(tool==='move')cv.style.cursor='grab'}));
const HELP={move:'Mano: arrastra para mover la imagen. Con dos dedos mueves la vista y haces zoom. Si la imagen está bloqueada, un dedo mueve la vista.',paint:'Pincel: pinta cuentas con el color elegido en la paleta.',erase:'Borrador: quita cuentas.',fill:'Bote: rellena una zona del mismo color.',pick:'Cuentagotas: toca una cuenta para elegir su color.',img:'Color de imagen: pinta cada celda con el color de paleta más cercano al de la imagen.'};
function setTool(t){tool=t;document.querySelectorAll('[data-t]').forEach(x=>x.classList.toggle('on',x.dataset.t===t));cv.style.cursor=t==='move'?'grab':'crosshair';$('toolhelp').textContent=HELP[t]}
['tools','tools2'].forEach(i=>$(i).addEventListener('click',e=>{const b=e.target.closest('[data-t]');if(b)setTool(b.dataset.t)}));
$('undo').onclick=()=>{if(!hist.length)return;redo.push(snap());grid=JSON.parse(hist.pop());upd();draw()};
$('reset').onclick=()=>{if(!grid.some(r=>r.some(Boolean)))return;push();grid=newGrid(COLS,ROWS);draw();$('imgmsg').textContent='Tablero limpio. Si ha sido sin querer, pulsa Deshacer.'};
$('redo').onclick=()=>{if(!redo.length)return;hist.push(snap());grid=JSON.parse(redo.pop());upd();draw()};
$('pal').addEventListener('click',e=>{const b=e.target.closest('[data-c]');if(!b)return;const nc=b.dataset.c;if(recolorFrom){const f=recolorFrom;push();grid=grid.map(r=>r.map(v=>v===f?nc:v));if(solo.delete(f))solo.add(nc);if(hidden.delete(f))hidden.add(nc);recolorFrom=null;$('imgmsg').textContent=`${f} sustituido por ${nc}`;cur=nc;renderPal();draw();return}cur=nc;if(tool==='erase'||tool==='move')setTool('paint');renderPal()});
['gama','tipo'].forEach(i=>$(i).addEventListener('change',()=>{if(!palList().includes(cur))cur=palList()[0];renderPal()}));
$('q').addEventListener('input',renderPal);
$('file').onchange=e=>{const f=e.target.files[0];if(!f)return;const st=$('imgmsg');st.textContent='Cargando…';
 const rd=new FileReader();
 rd.onerror=()=>{st.textContent='No se ha podido leer el archivo'};
 rd.onload=()=>{const i=new Image();
  i.onload=()=>{
   // Pixel art: se lee cuadro a cuadro de inmediato (colores y tamaño recomendado), sin pasar por la previa de colocación.
   const prevImg=img,prevCv=imgCv;let pa=false;
   if(i.width*i.height<=4e6){img=i;imgCv=null;try{const R=analyzePixelArt();pa=!!(R&&R.ok&&EXACT)}catch(_){pa=false}if(!pa){EXACT=null;img=prevImg;imgCv=prevCv}}
   if(pa){const k=Math.min(COLS/i.width,ROWS/i.height);imgT.us=k;imgT.ux=(COLS-i.width*k)/2;imgT.uy=(ROWS-i.height*k)/2;$('isc').value=100;imgT.rot=0;imgT.flip=false;$('rot').value=0;$('rotv').textContent='0°';$('showimg').checked=true;imgDirty=true;draw();autoReadPixelArt();return}
   st.textContent=`Imagen cargada (${i.width}×${i.height}). Colócala en la previa.`;openPreview(i)};
  i.onerror=()=>{st.textContent='El navegador no puede abrir este formato (¿HEIC?). Prueba con JPG o PNG.'};
  i.src=rd.result};
 rd.readAsDataURL(f);e.target.value=''};

// ---- Previa de colocación de la imagen ----
// Al elegir una foto no se pone directamente en el tablero: se abre una previa donde se ve el tablero entero,
// se elige cuántas placas hacen falta y se coloca la imagen. Solo al aceptar se aplica al tablero.
const PV={img:null,pr:1,pc:1,us:1,ux:0,uy:0,rot:0,flip:false,k:1,m:0};
const pvcv=$('pvcv'),pvx=pvcv.getContext('2d'),pvpts=new Map();let pvLast=null;
const normRot=r=>{r=((r%360)+360)%360;return r>180?r-360:r};
const pvBoard=()=>({W:PW*PV.pc,H:PH*PV.pr});
function pvSetScale(us){const cx=PV.ux+PV.img.width*PV.us/2,cy=PV.uy+PV.img.height*PV.us/2;PV.us=us;PV.ux=cx-PV.img.width*us/2;PV.uy=cy-PV.img.height*us/2}
function pvFit(cover){const{W,H}=pvBoard();const r=PV.rot*Math.PI/180,iw=PV.img.width,ih=PV.img.height;
 const bw=Math.abs(Math.cos(r))*iw+Math.abs(Math.sin(r))*ih,bh=Math.abs(Math.sin(r))*iw+Math.abs(Math.cos(r))*ih;
 const k=cover?Math.max(W/bw,H/bh):Math.min(W/bw,H/bh);PV.us=k;PV.ux=(W-iw*k)/2;PV.uy=(H-ih*k)/2}
function pvSync(){const{W,H}=pvBoard();$('pvrn').textContent=PV.pr;$('pvcn').textContent=PV.pc;
 $('pvinfo').textContent=`${PV.pr*PV.pc} ${PV.pr*PV.pc===1?'placa':'placas'} · tablero de ${W} × ${H} cuentas`+(W>300||H>300?' · demasiado grande (máximo 300 por lado)':'');
 $('pvok').disabled=W>300||H>300;const iw=Math.round(PV.img.width*PV.us);$('pvs').value=Math.max(+$('pvs').min,Math.min(+$('pvs').max,iw));$('pvsv').textContent=iw+' cuentas de ancho';
 $('pvrm').disabled=PV.pr<=1;$('pvrp').disabled=PV.pr>=6;$('pvcm').disabled=PV.pc<=1;$('pvcp').disabled=PV.pc>=6}
function pvDraw(){const{W,H}=pvBoard();const m=Math.max(4,Math.round(Math.max(W,H)*0.08));const box=$('pvview');
 const k=Math.min((box.clientWidth-2)/(W+2*m),(box.clientHeight-2)/(H+2*m));if(!(k>0))return;PV.k=k;PV.m=m;
 const cw=(W+2*m)*k,ch=(H+2*m)*k,dpr=window.devicePixelRatio||1;pvcv.style.width=cw+'px';pvcv.style.height=ch+'px';pvcv.width=Math.round(cw*dpr);pvcv.height=Math.round(ch*dpr);
 const c=pvx;c.setTransform(dpr,0,0,dpr,0,0);c.fillStyle='#cfcdc9';c.fillRect(0,0,cw,ch);
 const bx=m*k,by=m*k,bw=W*k,bh=H*k;c.fillStyle='#f6f5f1';c.fillRect(bx,by,bw,bh);
 const paint=a=>{const w0=PV.img.width*PV.us*k,h0=PV.img.height*PV.us*k;c.save();c.globalAlpha=a;c.translate((m+PV.ux)*k+w0/2,(m+PV.uy)*k+h0/2);c.rotate(PV.rot*Math.PI/180);if(PV.flip)c.scale(-1,1);c.drawImage(PV.img,-w0/2,-h0/2,w0,h0);c.restore()};
 paint(.4);c.save();c.beginPath();c.rect(bx,by,bw,bh);c.clip();paint(1);c.restore();
 c.lineWidth=1;c.strokeStyle='rgba(30,30,30,.35)';for(let i=10;i<W;i+=10){if(i%PW===0)continue;c.beginPath();c.moveTo(bx+i*k,by);c.lineTo(bx+i*k,by+bh);c.stroke()}for(let j=10;j<H;j+=10){if(j%PH===0)continue;c.beginPath();c.moveTo(bx,by+j*k);c.lineTo(bx+bw,by+j*k);c.stroke()}
 c.lineWidth=Math.max(2,k/1.5);c.strokeStyle='rgba(15,15,15,.9)';for(let i=0;i<=W;i+=PW){c.beginPath();c.moveTo(bx+i*k,by);c.lineTo(bx+i*k,by+bh);c.stroke()}for(let j=0;j<=H;j+=PH){c.beginPath();c.moveTo(bx,by+j*k);c.lineTo(bx+bw,by+j*k);c.stroke()}}
function pvRefresh(){pvSync();pvDraw()}
let pvOpener=null;
function openPreview(i){PV.img=i;PV.pr=PR;PV.pc=PC;PV.rot=0;PV.flip=false;pvOpener=document.activeElement;$('pvmodal').hidden=false;
 requestAnimationFrame(()=>{pvFit(false);pvRefresh();$('pvok').focus()})}
function closePreview(){$('pvmodal').hidden=true;PV.img=null;if(pvOpener&&pvOpener.focus)pvOpener.focus()}
const pvPlates=(dr,dc)=>{const{W,H}=pvBoard();PV.pr=Math.max(1,Math.min(6,PV.pr+dr));PV.pc=Math.max(1,Math.min(6,PV.pc+dc));pvRefresh()};
$('pvrm').onclick=()=>pvPlates(-1,0);$('pvrp').onclick=()=>pvPlates(1,0);$('pvcm').onclick=()=>pvPlates(0,-1);$('pvcp').onclick=()=>pvPlates(0,1);
$('pvs').addEventListener('input',()=>{pvSetScale(+$('pvs').value/PV.img.width);pvDraw();$('pvsv').textContent=$('pvs').value+' cuentas de ancho'});
$('pvfit').onclick=()=>{pvFit(false);pvRefresh()};$('pvfill').onclick=()=>{pvFit(true);pvRefresh()};
$('pvrl').onclick=()=>{PV.rot=normRot(PV.rot-90);pvFit(false);pvRefresh()};$('pvrr').onclick=()=>{PV.rot=normRot(PV.rot+90);pvFit(false);pvRefresh()};
$('pvfl').onclick=()=>{PV.flip=!PV.flip;pvRefresh()};
$('pvcancel').onclick=()=>{$('imgmsg').textContent='Imagen cancelada: el tablero sigue como estaba.';closePreview()};
$('pvok').onclick=()=>{if(!PV.img)return;const{W,H}=pvBoard();if(W>300||H>300)return;
 const key=PLATES.find(p=>p[0]!=='custom'&&p[2]===PV.pr&&p[3]===PV.pc);platesKey=key?key[0]:'custom';if(!key){$('pr').value=PV.pr;$('pc').value=PV.pc}
 document.querySelectorAll('.pi').forEach(x=>x.classList.toggle('sel',x.dataset.k===platesKey));applyBoard();
 img=PV.img;imgCv=null;imgT.us=PV.us;imgT.ux=PV.ux;imgT.uy=PV.uy;imgT.rot=PV.rot;imgT.flip=PV.flip;$('isc').value=100;$('rot').value=PV.rot;$('rotv').textContent=PV.rot+'°';$('showimg').checked=true;imgDirty=true;
 $('imgmsg').textContent=`Imagen colocada (${img.width}×${img.height}) en ${PV.pr*PV.pc} ${PV.pr*PV.pc===1?'placa':'placas'}.`;closePreview();fitToScreen();draw();setTimeout(autoReadPixelArt,30)};
// Arrastrar con un dedo mueve la imagen; con dos dedos se pellizca para cambiar su tamaño.
pvcv.addEventListener('pointerdown',e=>{pvcv.setPointerCapture(e.pointerId);pvpts.set(e.pointerId,{x:e.clientX,y:e.clientY});
 if(pvpts.size===2){const[a,b]=[...pvpts.values()];pvLast={d:Math.hypot(a.x-b.x,a.y-b.y)||1,us:PV.us}}else pvLast=null});
pvcv.addEventListener('pointermove',e=>{const old=pvpts.get(e.pointerId);if(!old)return;const nx=e.clientX,ny=e.clientY;pvpts.set(e.pointerId,{x:nx,y:ny});
 if(pvpts.size===2&&pvLast){const[a,b]=[...pvpts.values()];const d=Math.hypot(a.x-b.x,a.y-b.y)||1;pvSetScale(Math.max(.02,pvLast.us*d/pvLast.d));pvRefresh();return}
 if(pvpts.size===1){PV.ux+=(nx-old.x)/PV.k;PV.uy+=(ny-old.y)/PV.k;pvDraw()}});
['pointerup','pointercancel'].forEach(t=>pvcv.addEventListener(t,e=>{pvpts.delete(e.pointerId);pvLast=null}));
const onPvKey=e=>{if(e.key==='Escape'&&!$('pvmodal').hidden){e.preventDefault();$('pvcancel').click()}};document.addEventListener('keydown',onPvKey);
// Atajos de teclado (como en Figma): V mano, B pincel, E borrador, G bote, I cuentagotas, M imagen; Ctrl+Z/Ctrl+Y; + - 0.
const KEYS={v:'move',b:'paint',e:'erase',g:'fill',i:'pick',m:'img'};
const onShortcut=e=>{const tg=e.target;if(tg&&(tg.isContentEditable||/^(INPUT|TEXTAREA|SELECT)$/.test(tg.tagName)&&tg.type!=='range'&&tg.type!=='checkbox'))return;if(!$('pvmodal').hidden||$('modal').classList.contains('show'))return;
const k=e.key.toLowerCase();const mod=e.ctrlKey||e.metaKey;
if(mod&&k==='z'){e.preventDefault();$(e.shiftKey?'redo':'undo').click();return}
if(mod&&k==='y'){e.preventDefault();$('redo').click();return}
if(mod||e.altKey)return;
if(KEYS[k]){const b=document.querySelector('[data-t="'+KEYS[k]+'"]');if(b){e.preventDefault();b.click()}return}
if(k==='+'||k==='='){$('zp').click()}else if(k==='-'){$('zm').click()}else if(k==='0'){$('fit').click()}};
document.addEventListener('keydown',onShortcut);
// Porcentaje de zoom y estado inferior
const zpct=$('zpct'),zoomEl=$('zoom');const syncZ=()=>{if(zpct&&zoomEl)zpct.textContent=Math.round(zoomEl.value/16*100)+' %'};syncZ();const zInt=window.setInterval(syncZ,250);
const onPvResize=()=>{if(!$('pvmodal').hidden&&PV.img)pvDraw()};window.addEventListener('resize',onPvResize);
// ---- Tableros (placas) como páginas ----
// El botón de capas abre una bandeja con una carta pequeña por tablero. Al elegir una, el área de trabajo muestra solo ese
// tablero con sus piezas (y el recuento de colores pasa a ser el de ese tablero). El diseño completo no se toca.
function plateIdx(){return FOCUS?FOCUS.r*PC+FOCUS.c:-1}
function setFocus(i){FOCUS=i<0||i>=PR*PC?null:{r:Math.floor(i/PC),c:i%PC};applyFocus();syncPlateBar();draw();fitToScreen()}
function syncPlateBar(){const n=PR*PC,bar=$('platebar');bar.hidden=n<2;if(n<2){FOCUS=null;applyFocus();$('platetray').hidden=true;$('platesbtn').setAttribute('aria-expanded','false');return}
 const i=plateIdx();$('platelabel').textContent=i<0?`Todo el diseño · ${n} tableros`:`Tablero ${i+1} de ${n} · F${FOCUS.r+1} · C${FOCUS.c+1}`}
function thumb(x0,y0,w,h,wpx){const k=wpx/w,t=document.createElement('canvas'),dpr=window.devicePixelRatio||1;t.width=Math.round(wpx*dpr);t.height=Math.round(h*k*dpr);t.style.width=wpx+'px';t.style.height=(h*k)+'px';
 const c=t.getContext('2d');c.scale(dpr,dpr);c.fillStyle='#f6f5f1';c.fillRect(0,0,wpx,h*k);
 for(let y=0;y<h;y++)for(let x=0;x<w;x++){const v=grid[y0+y]&&grid[y0+y][x0+x];if(!v)continue;c.fillStyle=CODES[v].hex;c.fillRect(Math.floor(x*k),Math.floor(y*k),Math.ceil(k),Math.ceil(k))}return t}
function buildTray(){const tray=$('platetray');tray.innerHTML='';const n=PR*PC,cur=plateIdx();
 const card=(i,label,cnv,aria)=>{const b=document.createElement('button');b.type='button';b.className='plates__card';b.setAttribute('aria-pressed',String(cur===i));b.setAttribute('aria-label',aria);b.appendChild(cnv);const l=document.createElement('span');l.textContent=label;b.appendChild(l);b.onclick=()=>{setFocus(i);closeTray()};return b};
 tray.appendChild(card(-1,'Todo',thumb(0,0,COLS,ROWS,56),'Ver todo el diseño'));
 for(let i=0;i<n;i++){const r=Math.floor(i/PC),c=i%PC;tray.appendChild(card(i,String(i+1),thumb(c*PW,r*PH,PW,PH,56),`Tablero ${i+1}, fila ${r+1}, columna ${c+1}`))}}
function closeTray(){$('platetray').hidden=true;$('platesbtn').setAttribute('aria-expanded','false')}
$('platesbtn').onclick=()=>{const open=$('platetray').hidden;if(open){buildTray();$('platetray').hidden=false;const sel=$('platetray').querySelector('[aria-pressed="true"]');if(sel&&sel.scrollIntoView)sel.scrollIntoView({block:'nearest',inline:'center'})}else{closeTray();return}$('platesbtn').setAttribute('aria-expanded','true')};
const stepPlate=d=>{const n=PR*PC;let i=plateIdx()+d;if(i<-1)i=n-1;if(i>=n)i=-1;setFocus(i)};
$('platesprev').onclick=()=>stepPlate(-1);$('platesnext').onclick=()=>stepPlate(1);
$('clearimg').onclick=()=>{img=null;imgCv=null;draw()};
['op','showimg','isc','showbeads','showgrid','bop'].forEach(i=>$(i).addEventListener('input',()=>{imgDirty=true;draw()}));
$('zoom').addEventListener('input',()=>size(true));
const zs=d=>{$('zoom').value=Math.max(3,Math.min(48,+$('zoom').value+d));size(true)};
// Ajusta el zoom para que el tablero entero quepa en el área de trabajo.
function fitToScreen(){const w=$('wrap');const bw=FOCUS?PW:COLS,bh=FOCUS?PH:ROWS;const cs=getComputedStyle(w),pw=(parseFloat(cs.paddingLeft)||0)+(parseFloat(cs.paddingRight)||0),ph=(parseFloat(cs.paddingTop)||0)+(parseFloat(cs.paddingBottom)||0);const z=Math.floor(Math.min((w.clientWidth-pw-4)/bw,(w.clientHeight-ph-4)/bh)*2)/2;$('zoom').value=Math.max(3,Math.min(48,z||3));size();w.scrollLeft=0;w.scrollTop=0}
$('fit').onclick=fitToScreen;
$('zm').onclick=()=>zs(-3);$('zp').onclick=()=>zs(3);
$('wrap').addEventListener('wheel',e=>{if(e.ctrlKey||e.metaKey){e.preventDefault();zs(e.deltaY<0?2:-2)}},{passive:false});
$('lock').addEventListener('change',()=>{const l=$('lock').checked;$('isc').disabled=l;['rl','rr','fl','rot'].forEach(i=>$(i).disabled=l);});
const isBg=rgb=>$('bgskip').checked&&Math.min(...rgb)>205&&Math.max(...rgb)-Math.min(...rgb)<40;
const d2=(a,b)=>(a[0]-b[0])**2+(a[1]-b[1])**2+(a[2]-b[2])**2;
let PT=[],plan=null,savedPlan=null,pickIdx=null,EXACT=null,savedEXACT=null;
function collect(){PT=[];for(let y=0;y<ROWS;y++)for(let x=0;x<COLS;x++){const s=sample(x,y);if(!s||isBg(s))continue;PT.push({x,y,l:lab('#'+s.map(v=>Math.round(v).toString(16).padStart(2,'0')).join(''))})}return PT.length}
function autoPlan(K){const P=PT;K=Math.min(K,P.length,palList().length);
 const mean=[0,1,2].map(i=>P.reduce((a,p)=>a+p.l[i],0)/P.length);
 let ce=[P.reduce((b,p)=>d2(p.l,mean)<d2(b.l,mean)?p:b).l];
 while(ce.length<K){let best=null,bd=-1;P.forEach(p=>{const d=Math.min(...ce.map(c=>d2(p.l,c)));if(d>bd){bd=d;best=p}});ce.push(best.l)}
 for(let it=0;it<12;it++){const sm=ce.map(()=>[0,0,0,0]);P.forEach(p=>{let bi=0,bd=1e9;ce.forEach((c,i)=>{const d=d2(p.l,c);if(d<bd){bd=d;bi=i}});const a=sm[bi];a[0]+=p.l[0];a[1]+=p.l[1];a[2]+=p.l[2];a[3]++});ce=ce.map((c,i)=>sm[i][3]?[sm[i][0]/sm[i][3],sm[i][1]/sm[i][3],sm[i][2]/sm[i][3]]:c)}
 const pal=palList();return hungarian(ce.map(c=>pal.map(code=>de(c,LAB[code])))).map(j=>pal[j])}
function assignPts(codes){if(EXACT)return PT.map(p=>p.k);return PT.map(p=>{let bi=0,bd=1e9;codes.forEach((c,i)=>{const d=d2(p.l,LAB[c]);if(d<bd){bd=d;bi=i}});return bi})}
function addColor(){const codes=plan;let far=null,fd=-1;PT.forEach(p=>{const d=Math.min(...codes.map(c=>d2(p.l,LAB[c])));if(d>fd){fd=d;far=p}});if(!far)return;
 let b=null;palList().forEach(c=>{if(codes.includes(c))return;const d=de(far.l,LAB[c]);if(!b||d<b.d)b={c,d}});if(b)codes.push(b.c)}
function cover(){const as=assignPts(plan),n=plan.map(()=>0);as.forEach(i=>n[i]++);return n}
function renderModal(){
 const ex=!!EXACT;['mplus','mminus','mauto'].forEach(i=>$(i).style.display=ex?'none':'');$('mexact').style.display=ex?'flex':'none';
 const n=cover(),T=PT.length||1;$('mn').textContent=plan.length;$('nk').value=plan.length;
 $('chips').innerHTML=plan.map((c,i)=>`<div class="chip ${pickIdx===i?'pk':''}" data-i="${i}">${ex?`<span class="dot" style="background:${EXACT.clusters[i].hex}" title="Color del original"></span><span class="mu">→</span>`:''}<span class="dot" style="background:${CODES[c].hex}"></span><div><b>${c}</b><small>${Math.round(n[i]*100/T)} % · ${n[i]} cuentas</small></div><button class="mchg">Cambiar</button>${ex?'':`<button class="mdel" ${plan.length<=2?'disabled':''}>✕</button>`}</div>`).join('');
 const cvp=$('mprev'),k=Math.max(2,Math.floor(360/Math.max(ex?EXACT.W:COLS,ex?EXACT.H:ROWS)));const PVW=ex?EXACT.W:COLS,PVH=ex?EXACT.H:ROWS;cvp.width=PVW*k;cvp.height=PVH*k;const c=cvp.getContext('2d');c.fillStyle='#f6f5f1';c.fillRect(0,0,cvp.width,cvp.height);
 assignPts(plan).forEach((ci,j)=>{const p=PT[j];c.fillStyle=CODES[plan[ci]].hex;c.beginPath();c.arc(p.x*k+k/2,p.y*k+k/2,Math.max(1,k/2-.5),0,7);c.fill()});
 $('mwarn').textContent=ex?`Tamaño recomendado: ${EXACT.W} × ${EXACT.H} cuentas · ${EXACT.cells.length} cuentas en total · ${plan.length} colores · ${Math.ceil(EXACT.W/PW)} × ${Math.ceil(EXACT.H/PH)} placas de ${PW} × ${PH} (${Math.ceil(EXACT.W/PW)*Math.ceil(EXACT.H/PH)} placas). Cuadro de ${EXACT.cell} px en la imagen. Al aceptar, el tablero se ajusta a este tamaño.`:savedPlan?'Al aceptar se vuelve a rellenar el tablero (se puede deshacer).':'';
 renderMpal()}
/* ---- Lector de pixel art: un cuadro de la imagen = una cuenta ---- */
function mapClusters(){const pal=palList(),cl=EXACT.clusters;
 const cost=cl.map(c=>pal.map(code=>de(c.lab,LAB[code])));
 if($('mexu').checked&&cl.length<=pal.length){return hungarian(cost).map(j=>pal[j])}
 return cost.map(r=>pal[r.indexOf(Math.min(...r))])}
function openExact(){const E=EXACT;PT=E.cells;plan=mapClusters();pickIdx=null;$('modal').classList.add('show');renderModal()}
$('mexu').addEventListener('change',()=>{if(EXACT){plan=mapClusters();renderModal()}});
function runsOf(get,n,tol){const r=[];let len=1,prev=get(0);for(let i=1;i<n;i++){const c=get(i);if(c===null&&prev===null||(c!==null&&prev!==null&&Math.abs(c[0]-prev[0])+Math.abs(c[1]-prev[1])+Math.abs(c[2]-prev[2])<=tol)){len++}else{r.push(len);len=1}prev=c}r.push(len);return r}
function analyzePixelArt(){const R={ok:false,msg:''};const msg=t=>{R.msg=t};
 if(!img){msg('Sube primero una imagen');return R}
 const t0=performance.now(),iw=img.width,ih=img.height,oc=document.createElement('canvas');oc.width=iw;oc.height=ih;const cx=oc.getContext('2d',{willReadFrequently:true});cx.imageSmoothingEnabled=false;cx.drawImage(img,0,0);
 const D=cx.getImageData(0,0,iw,ih).data;let opaque=true;for(let i=3;i<D.length;i+=4*7)if(D[i]<250){opaque=false;break}
 const TOL=24,px=(x,y)=>{const i=(y*iw+x)*4;return D[i+3]<128?null:[D[i],D[i+1],D[i+2]]};
 const corner=px(0,0);const useCorner=opaque&&$('bgcorner').checked&&corner;
 const isBgPx=(x,y)=>{const c=px(x,y);if(c===null)return true;return useCorner&&Math.abs(c[0]-corner[0])+Math.abs(c[1]-corner[1])+Math.abs(c[2]-corner[2])<=TOL};
 let minx=iw,miny=ih,maxx=-1,maxy=-1;for(let y=0;y<ih;y++)for(let x=0;x<iw;x++)if(!isBgPx(x,y)){if(x<minx)minx=x;if(x>maxx)maxx=x;if(y<miny)miny=y;if(y>maxy)maxy=y}
 if(maxx<0){msg('No se ve ningún cuadro: la imagen parece vacía o todo es fondo');return R}
 const bw=maxx-minx+1,bh=maxy-miny+1;
 let cell=Math.round(+$('cellpx').value)||0,auto=false;
 if(!cell){auto=true;cell=1;
  const dif=(p,q)=>p===null&&q===null?0:(p===null||q===null?999:Math.abs(p[0]-q[0])+Math.abs(p[1]-q[1])+Math.abs(p[2]-q[2]));
  const edges=(n,m,get)=>{const E=new Float64Array(n);const st=Math.max(1,Math.floor(m/300));for(let k=0;k<m;k+=st){let prev=get(0,k);for(let i=1;i<n;i++){const c=get(i,k);if(dif(prev,c)>45)E[i]++;prev=c}}return E};
  const Ex=edges(bw,bh,(i,k)=>px(minx+i,miny+k)),Ey=edges(bh,bw,(i,k)=>px(minx+k,miny+i));
  const score=(E,sz)=>{let tot=0,on=0;const w=Math.floor(sz/4);for(let i=1;i<E.length;i++)tot+=E[i];if(!tot)return 0;
   for(let i=1;i<E.length;i++){const r=i%sz;if(r<=w||r>=sz-w)on+=E[i]}return on/tot};
  for(let sz=60;sz>=2;sz--){const base=(2*Math.floor(sz/4)+1)/sz;if(Math.min(score(Ex,sz),score(Ey,sz))>=Math.max(.8,base+.2)){cell=sz;break}}}
 const W=Math.max(1,Math.round(bw/cell)),H=Math.max(1,Math.round(bh/cell));
 if(W>300||H>300){msg(`La imagen sale de ${W} × ${H} cuadros: demasiado grande. Indica un tamaño de cuadro mayor.`);return R}
 const med=a=>{a.sort((p,q)=>p-q);return a[a.length>>1]};
 const cellColor=(i,j)=>{if(cell<3){const x=Math.min(iw-1,minx+Math.floor((i+.5)*cell)),y=Math.min(ih-1,miny+Math.floor((j+.5)*cell));return px(x,y)}
  const hw=Math.max(1,Math.floor(cell/4)),x0=minx+Math.floor(i*cell+cell/2),y0=miny+Math.floor(j*cell+cell/2),R=[],G=[],B=[];
  for(let yy=y0-hw;yy<=y0+hw;yy++)for(let xx=x0-hw;xx<=x0+hw;xx++){if(xx<0||yy<0||xx>=iw||yy>=ih)continue;const c=px(xx,yy);if(c){R.push(c[0]);G.push(c[1]);B.push(c[2])}}
  return R.length?[med(R),med(G),med(B)]:px(Math.min(iw-1,x0),Math.min(ih-1,y0))};
 const cells=[],cnt={};
 for(let j=0;j<H;j++)for(let i=0;i<W;i++){const x=Math.min(iw-1,minx+Math.floor((i+.5)*cell)),y=Math.min(ih-1,miny+Math.floor((j+.5)*cell));if(isBgPx(x,y))continue;const c=cellColor(i,j);const h='#'+c.map(v=>v.toString(16).padStart(2,'0')).join('');cells.push({x:i,y:j,h});cnt[h]=(cnt[h]||0)+1}
 const hs=Object.keys(cnt).sort((a,b)=>cnt[b]-cnt[a]),clusters=[];
 hs.forEach(h=>{const l=lab(h);const f=clusters.find(c=>d2(c.lab,l)<(hs.length<=40?16:64));if(f){f.count+=cnt[h];f.members.add(h)}else clusters.push({hex:h,lab:l,count:cnt[h],members:new Set([h])})});
 if(clusters.length>80){msg(`Se han encontrado ${clusters.length} colores distintos: no parece pixel art. Prueba con «Rellenar desde la imagen».`);return R}
 const idx={};clusters.forEach((c,k)=>c.members.forEach(h=>idx[h]=k));cells.forEach(c=>{c.k=idx[c.h];c.l=clusters[c.k].lab});
 EXACT={W,H,cell,bx:minx,by:miny,clusters,cells};
 msg(`Leído en ${Math.round(performance.now()-t0)} ms: cuadro de ${cell} px${auto?' (detectado)':''}, ${W} × ${H} cuadros, ${cells.length} cuentas, ${clusters.length} colores.`);
 R.ok=true;R.auto=auto;return R}
$('readpx').onclick=()=>{const R=analyzePixelArt();$('pxmsg').textContent=R.msg;if(R.ok)openExact()};
function autoReadPixelArt(){if(!img||img.width*img.height>4e6)return;const R=analyzePixelArt();if(R.ok&&EXACT){$('pxmsg').textContent=R.msg;$('imgmsg').textContent='Parece pixel art: se ha leído cuadro a cuadro. Revisa la propuesta y acepta, o cancela para trabajar a mano.';openExact()}else{EXACT=null}}

function renderMpal(){$('mpick').style.display=pickIdx===null?'none':'block';if(pickIdx===null)return;const q=$('mq').value.trim().toUpperCase();
 $('mpickt').textContent=`Elige el color que sustituirá a ${plan[pickIdx]}`;
 $('mpal').innerHTML=palList().filter(c=>!q||c.includes(q)).map(c=>`<button data-c="${c}" title="${c}" style="background:${CODES[c].hex}${plan.includes(c)?';opacity:.3':''}">${c}</button>`).join('')}
function openPlan(p){EXACT=null;if(!img){$('imgmsg').textContent='Sube primero una imagen';return}
 if(!collect()){$('imgmsg').textContent='No hay celdas que rellenar (¿todo es fondo claro?)';return}
 plan=p?p.slice():autoPlan(Math.max(2,Math.min(60,+$('nk').value||8)));pickIdx=null;$('modal').classList.add('show');renderModal()}
$('auto').onclick=()=>openPlan(null);
$('editplan').onclick=()=>{if(savedEXACT){EXACT=savedEXACT;openExact()}else if(savedPlan)openPlan(savedPlan)};
$('mcancel').onclick=()=>$('modal').classList.remove('show');
$('modal').addEventListener('click',e=>{if(e.target.id==='modal')$('modal').classList.remove('show')});
$('mauto').onclick=()=>{plan=autoPlan(plan.length);pickIdx=null;renderModal()};
$('mplus').onclick=()=>{if(plan.length>=60)return;addColor();renderModal()};
$('mminus').onclick=()=>{if(plan.length<=2)return;const n=cover();plan.splice(n.indexOf(Math.min(...n)),1);pickIdx=null;renderModal()};
$('chips').addEventListener('click',e=>{const ch=e.target.closest('.chip');if(!ch)return;const i=+ch.dataset.i;
 if(e.target.closest('.mdel')){if(plan.length>2){plan.splice(i,1);pickIdx=null;renderModal()}return}
 if(e.target.closest('.mchg')){pickIdx=pickIdx===i?null:i;renderModal()}});
$('mpal').addEventListener('click',e=>{const b=e.target.closest('[data-c]');if(!b||pickIdx===null)return;if(plan.includes(b.dataset.c))return;plan[pickIdx]=b.dataset.c;pickIdx=null;renderModal()});
$('mq').addEventListener('input',renderMpal);
$('macc').onclick=()=>{
 if(EXACT){const E=EXACT;
  if(E.W>COLS||E.H>ROWS){const PR2=Math.ceil(E.H/PH),PC2=Math.ceil(E.W/PW);if(PR2>6||PC2>6||PC2*PW>300||PR2*PH>300){$('mwarn').textContent='No cabe: la imagen necesita más de 6 × 6 placas. Sube el tamaño de placa.';return}
   platesKey='custom';$('pr').value=Math.max(PR,PR2);$('pc').value=Math.max(PC,PC2);applyBoard()}
  const ox=Math.floor((COLS-E.W)/2),oy=Math.floor((ROWS-E.H)/2);
  push();grid=newGrid(COLS,ROWS);PT.forEach(p=>{grid[p.y+oy][p.x+ox]=plan[p.k]});
  imgT.us=1/E.cell;imgT.ux=ox-E.bx/E.cell;imgT.uy=oy-E.by/E.cell;imgT.rot=0;imgT.flip=false;$('rot').value=0;$('rotv').textContent='0°';$('isc').value=100;$('showimg').checked=true;imgDirty=true;
  savedEXACT=E;savedPlan=null;$('editplan').disabled=false;solo.clear();hidden.clear();$('modal').classList.remove('show');
  $('imgmsg').textContent=`Leída cuadro a cuadro: ${E.W} × ${E.H} cuadros, ${plan.length} colores. La imagen queda alineada con la rejilla.`;draw();return}
 push();grid=newGrid(COLS,ROWS);assignPts(plan).forEach((ci,j)=>{const p=PT[j];grid[p.y][p.x]=plan[ci]});savedPlan=plan.slice();savedEXACT=null;$('editplan').disabled=false;solo.clear();hidden.clear();
 $('modal').classList.remove('show');$('imgmsg').textContent=`Rellenado con ${plan.length} colores. Puedes volver a editarlos con «Editar colores del relleno».`;draw()};
$('reduce').onclick=()=>{const K=Math.max(2,Math.min(60,+$('nk').value||8));let m={};grid.forEach(r=>r.forEach(c=>{if(c)m[c]=(m[c]||0)+1}));
 if(Object.keys(m).length<=K){$('imgmsg').textContent='El diseño ya tiene '+Object.keys(m).length+' colores o menos';return}
 push();const map={};Object.keys(m).forEach(c=>map[c]=c);
 while(Object.keys(m).length>K){const ks=Object.keys(m);let best=null;for(let i=0;i<ks.length;i++)for(let j=i+1;j<ks.length;j++){const a=ks[i],b=ks[j],cost=de(LAB[a],LAB[b])*Math.sqrt(Math.min(m[a],m[b]));if(!best||cost<best.c)best={c:cost,a,b}}
  const keep=m[best.a]>=m[best.b]?best.a:best.b,gone=keep===best.a?best.b:best.a;m[keep]+=m[gone];delete m[gone];Object.keys(map).forEach(k=>{if(map[k]===gone)map[k]=keep})}
 grid=grid.map(r=>r.map(c=>c?map[c]:c));solo.clear();hidden.clear();$('imgmsg').textContent=`Reducido a ${Object.keys(m).length} colores`;draw()};
$('conv').onclick=()=>{const used=[...new Set(grid.flat().filter(Boolean))];if(!used.length){$('convmsg').textContent='No hay cuentas que convertir';return}
 const r=convertDesign(used,$('uniq').checked);const mp={};r.rows.forEach(x=>mp[x.o]=x.d);
 push();grid=grid.map(row=>row.map(c=>c&&mp[c]?mp[c]:c));
 const g=r.g==='m'?'s':'m';$('gama').value=g;cur=Object.values(mp)[0]||cur;renderPal();
 const fus=used.length-new Set(Object.values(mp)).size;const med=r.rows.reduce((a,x)=>a+x.de,0)/r.rows.length;
 $('convmsg').textContent=`Convertido a ${g==='s'?'Midi':'Mini'}: ${r.rows.length} colores, ΔE medio ${med.toFixed(1)}${fus?`, ${fus} colores fundidos`:''}${r.otros&&r.otros.length?`. Ya estaban en la otra gama: ${r.otros.join(', ')}`:''}`;draw()};
function counts(){const all={},m={};let t=0;grid.forEach((r,y)=>r.forEach((c,x)=>{if(c){all[c]=(all[c]||0)+1;if(!FOCUS||(x>=FOCUS.c*PW&&x<(FOCUS.c+1)*PW&&y>=FOCUS.r*PH&&y<(FOCUS.r+1)*PH)){m[c]=(m[c]||0)+1;t++}}}));
 [...solo].forEach(c=>{if(!all[c])solo.delete(c)});[...hidden].forEach(c=>{if(!all[c])hidden.delete(c)});
 const scope=FOCUS?`<div class="mu" style="margin-bottom:4px"><b>Tablero ${FOCUS.r*PC+FOCUS.c+1}</b>: solo las cuentas de este tablero.</div>`:'';
 const ks=Object.keys(m).sort((a,b)=>m[b]-m[a]);if(!ks.length){$('cnt').innerHTML=scope+(FOCUS?'Sin cuentas en este tablero':'Sin cuentas todavía');return m}
 const mg=n=>Math.ceil(n*1.1/10)*10;
 $('cnt').innerHTML=scope+`<div class="mu" style="margin-bottom:4px">Capas por color: pulsa un color para ver solo ese, 👁 para ocultarlo, «Cambiar» para sustituirlo por otro.</div>`+(solo.size||hidden.size?'<div class="row"><button id="showall">Mostrar todos</button></div>':'')+`<table><tr><th>Capa</th><th>Cuentas</th><th>+10 %</th><th></th></tr>${ks.map(c=>`<tr data-c="${c}" style="${solo.has(c)?'background:rgba(232,115,28,.18)':''}${hidden.has(c)?';opacity:.45':''}"><td class="lay" style="cursor:pointer"><i class="sw" style="background:${CODES[c].hex}"></i>${c}</td><td>${m[c]}</td><td>${mg(m[c])}</td><td style="white-space:nowrap"><button class="eye" style="padding:2px 6px">${hidden.has(c)?'🚫':'👁'}</button> <button class="chg" style="padding:2px 6px${recolorFrom===c?';background:var(--ac);color:#fff':''}">Cambiar</button></td></tr>`).join('')}<tr><th>Total</th><th>${t}</th><th>${ks.reduce((a,c)=>a+mg(m[c]),0)}</th><th></th></tr></table><div class="mu" style="margin-top:4px">${ks.length} colores · ${COLS}×${ROWS}</div>`;return m}
$('cnt').addEventListener('click',e=>{
 if(e.target.id==='showall'){solo.clear();hidden.clear();draw();return}
 const tr=e.target.closest('tr[data-c]');if(!tr)return;const c=tr.dataset.c;
 if(e.target.closest('.eye')){hidden.has(c)?hidden.delete(c):hidden.add(c);draw();return}
 if(e.target.closest('.chg')){recolorFrom=recolorFrom===c?null:c;$('imgmsg').textContent=recolorFrom?`Elige en la paleta el color que sustituirá a ${c}`:'';$('pal').scrollIntoView&&0;draw();return}
 if(e.target.closest('.lay')){solo.has(c)?solo.delete(c):solo.add(c);hidden.delete(c);draw()}});
function dl(name,blob){const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;a.click()}
$('save').onclick=()=>dl('diseno-rejilla.json',new Blob([JSON.stringify({v:2,cols:COLS,rows:ROWS,pw:PW,ph:PH,pr:PR,pc:PC,grid})],{type:'application/json'}));
function loadDesignObject(d){if(d.gama&&$('gama')&&$('gama').value!==d.gama){$('gama').value=d.gama;$('gama').dispatchEvent(new Event('change'))}FOCUS=null;push();COLS=d.cols;ROWS=d.rows;grid=d.grid;PW=d.pw||COLS;PH=d.ph||ROWS;PR=d.pr||1;PC=d.pc||1;$('cols').value=PW;$('rows').value=PH;const std=['40x40','29x29','20x20'].includes(PW+'x'+PH);$('preset').value=std?PW+'x'+PH:'custom';platesKey=(PLATES.find(x=>x[2]===PR&&x[3]===PC&&x[0]!=='custom')||['custom'])[0];$('pr').value=PR;$('pc').value=PC;size();solo.clear();hidden.clear();applyBoard();fitToScreen()}
$('load').onchange=e=>{const f=e.target.files[0];if(!f)return;f.text().then(t=>loadDesignObject(JSON.parse(t)))};
$('csv').onclick=()=>{const m={};grid.forEach(r=>r.forEach(c=>{if(c)m[c]=(m[c]||0)+1}));dl('cuentas.csv',new Blob(['codigo;cuentas;con_margen_10\n'+Object.keys(m).sort().map(c=>`${c};${m[c]};${Math.ceil(m[c]*1.1/10)*10}`).join('\n')],{type:'text/csv'}))};
$('png').onclick=()=>{const o=document.createElement('canvas'),k=20;o.width=COLS*k;o.height=ROWS*k;const c=o.getContext('2d');c.fillStyle='#f6f5f1';c.fillRect(0,0,o.width,o.height);
 for(let y=0;y<ROWS;y++)for(let x=0;x<COLS;x++){const v=grid[y][x];if(!v)continue;c.fillStyle=CODES[v].hex;if(VIEW==='pix'){c.fillRect(x*k,y*k,k,k);continue}c.beginPath();c.arc(x*k+k/2,y*k+k/2,k/2-1,0,7);c.fill();c.fillStyle='rgba(246,245,241,.9)';c.beginPath();c.arc(x*k+k/2,y*k+k/2,k*.16,0,7);c.fill()}
 if($('guides').checked)drawGuides(c,k,1);
 o.toBlob(b=>dl('diseno-rejilla.png',b))};

function setRot(v){v=((Math.round(v)+180)%360+360)%360-180;imgT.rot=v;$('rot').value=v;$('rotv').textContent=v+'°';imgDirty=true;draw()}
$('rot').addEventListener('input',()=>setRot(+$('rot').value));
$('rl').onclick=()=>setRot((imgT.rot||0)-90);$('rr').onclick=()=>setRot((imgT.rot||0)+90);
$('fl').onclick=()=>{imgT.flip=!imgT.flip;imgDirty=true;draw()};

function setView(v){VIEW=v;$('vbead').classList.toggle('on',v==='bead');$('vpix').classList.toggle('on',v==='pix');draw()}
$('vbead').onclick=()=>setView('bead');$('vpix').onclick=()=>setView('pix');
const SCALES={"m": {"Grises": ["H2", "H18", "H1", "H12", "E16", "H19", "H17", "H9", "H10", "E17", "D16", "H8", "H14", "H11", "H22", "E20", "M1", "M10", "H3", "M7", "H15", "H20", "H23", "M2", "H4", "M15", "M3", "H5", "H6", "H16", "H7"], "Rojos": ["F1", "F17", "A19", "F20", "F23", "F12", "F13", "F9", "M8", "M14", "A14", "F2", "F3", "E6", "F4", "F25", "F5", "F19", "F15", "G20", "F8", "F7"], "Rosas": ["E8", "E11", "E1", "E18", "E15", "E2", "G2", "F22", "E3", "F16", "E19", "F21", "F14", "E12", "F24", "D12", "E21", "E9", "E22", "E4", "E5", "E23", "M11", "E10", "E7", "D13", "E13", "D21", "M12"], "Naranjas": ["G18", "G1", "E14", "G16", "G12", "A13", "A23", "G3", "A18", "G9", "A6", "A12", "G4", "A9", "G6", "A7", "A10", "G10", "M13", "G19", "F18", "G21", "M9", "G13"], "Marrones": ["G14", "G7", "G17", "F10", "F6", "G8", "F11"], "Amarillos": ["A2", "A16", "A3", "G15", "A1", "A15", "A24", "A22", "H13", "A4", "B1", "A21", "B18", "A17", "A11", "A25", "A8", "A20", "A5", "M4", "A26", "G11", "M5", "G5", "M6", "B26"], "Verdes": ["C1", "H21", "B24", "B30", "B20", "B3", "B16", "B13", "B27", "B31", "B2", "B14", "B28", "B29", "B6", "B10", "B4", "B5", "B17", "B32", "B19", "B7", "B8", "B25", "B11", "B12", "B15", "B9", "B23"], "Turquesas": ["C14", "C2", "C25", "C11", "C17", "C15", "C22", "C19", "B21", "B22"], "Azules": ["C13", "C23", "C27", "C21", "C3", "D17", "C28", "C4", "C24", "C10", "C26", "C6", "C5", "C7", "C20", "C16", "C12", "C18"], "Morados": ["D23", "D8", "D26", "E24", "D19", "D9", "D11", "D1", "D2", "D6", "D24", "D18", "D5", "D7", "D20", "D25", "D3", "C8", "C9", "D14", "C29", "D22", "D15", "D4", "D10"]}, "s": {"Grises": ["S01", "S77", "S78", "S79", "S07", "S159", "S43", "S63", "S156", "S148", "S89", "S16", "S69", "S158", "S13"], "Rojos": ["S02", "S94", "S87", "S96", "S04", "S66", "S95", "S132", "S05", "S34", "S58", "S38", "S146"], "Rosas": ["S35", "SE16", "S19", "S50", "S28", "S40", "S129", "S06", "S25", "S36", "S130", "S26", "S133", "S88", "S84", "S49", "S85"], "Naranjas": ["SE13", "SE12", "S90", "S48", "S67", "S154", "S93", "S03", "S56", "SE14", "S39", "S18", "S97", "S155", "SE15"], "Marrones": ["S57", "S47", "S83", "S82", "S41", "S17", "S15", "SE17"], "Amarillos": ["S51", "S52", "S149", "S29", "S32", "S145", "S14", "S108", "S27", "S109", "S61", "S86", "S92", "S70", "S110", "S81", "S68", "S111", "S112"], "Verdes": ["S65", "S08", "S120", "S46", "S55", "S21", "S122", "S147", "S123", "S113", "S121", "S114", "S20", "S115", "S116", "S80", "S117", "S71", "S62", "S124", "S118", "S151"], "Turquesas": ["S119", "S31", "S30", "S37", "S72", "S99", "SE05", "S45", "S100", "SE04", "S76", "S125", "S126", "S09", "S91"], "Azules": ["S44", "S98", "S153", "S135", "S136", "S10", "S101", "S53", "S137", "SE01", "S74", "S73", "SE02", "S138", "S139", "SE03", "S24", "SE06", "S102", "S54", "S75", "S104", "S141", "S105", "S140", "S107", "S42", "S106", "S142", "S103", "S157", "S64"], "Morados": ["S127", "S33", "S131", "SE07", "S152", "S128", "S60", "S150", "SE10", "SE08", "S12", "S134", "SE11", "S23", "S59", "SE09", "S11", "S143", "S144", "S22"]}};
function scaleFor(f){return SCALES[$('gama').value][f]||[]}
function renderStrip(){const f=$('famsel').value,l=scaleFor(f);$('famstrip').innerHTML=l.map(c=>`<span title="${c} · L ${LAB[c][0].toFixed(0)}" style="width:22px;height:22px;border-radius:4px;background:${CODES[c].hex};display:inline-block;border:1px solid #0002"></span>`).join('')+`<span class="mu" style="margin-left:6px">${l.length} tonos</span>`}
$('famsel').innerHTML=['Grises','Rojos','Rosas','Naranjas','Marrones','Amarillos','Verdes','Turquesas','Azules','Morados'].map(f=>`<option>${f}</option>`).join('');
$('famsel').addEventListener('change',renderStrip);$('gama').addEventListener('change',renderStrip);
function mapScale(f){const sc=scaleFor(f);if(!sc.length){$('scmsg').textContent='No hay escala de '+f+' en esta gama';return}
 const used=[...new Set(grid.flat().filter(Boolean))];if(!used.length){$('scmsg').textContent='No hay cuentas que convertir';return}
 const Ls=used.map(c=>LAB[c][0]),lo=Math.min(...Ls),hi=Math.max(...Ls),sL=sc.map(c=>LAB[c][0]),smin=Math.min(...sL),smax=Math.max(...sL);
 const mp={};used.forEach((c,i)=>{const L=Ls[i],t=$('stretch').checked&&hi>lo?smin+(L-lo)/(hi-lo)*(smax-smin):L;let b=0,bd=1e9;sL.forEach((v,j)=>{const d=Math.abs(v-t);if(d<bd){bd=d;b=j}});mp[c]=sc[b]});
 push();grid=grid.map(r=>r.map(c=>c?mp[c]:c));solo.clear();hidden.clear();
 const n=new Set(Object.values(mp)).size;$('scmsg').textContent=`Escala de ${f.toLowerCase()} aplicada: ${used.length} colores → ${n} tonos`+(n<used.length?` (${used.length-n} se han fundido porque la escala tiene menos pasos)`:'')+'.';draw()}
$('togray').onclick=()=>mapScale('Grises');$('toscale').onclick=()=>mapScale($('famsel').value);
renderStrip();
grid=newGrid(COLS,ROWS);renderPal();size();upd();setTool('move');document.querySelector('.pi[data-k="1x1"]').classList.add('sel');applyBoard();

// Diseño actual en el formato v2 del archivo JSON, más una vista previa PNG pequeña y el número de cuentas.
function exportDesign(){
  let beads=0;grid.forEach(r=>r.forEach(c=>{if(c)beads++}));
  const k=Math.max(2,Math.min(12,Math.floor(360/Math.max(COLS,ROWS))));
  const o=document.createElement('canvas');o.width=COLS*k;o.height=ROWS*k;const c=o.getContext('2d');
  c.fillStyle='#f6f5f1';c.fillRect(0,0,o.width,o.height);
  for(let y=0;y<ROWS;y++)for(let x=0;x<COLS;x++){const v=grid[y][x];if(!v)continue;c.fillStyle=CODES[v].hex;
    if(k<6||VIEW==='pix'){c.fillRect(x*k,y*k,k,k);continue}
    c.beginPath();c.arc(x*k+k/2,y*k+k/2,k/2-1,0,7);c.fill();c.fillStyle='rgba(246,245,241,.9)';c.beginPath();c.arc(x*k+k/2,y*k+k/2,k*.16,0,7);c.fill()}
  return {data:{v:2,cols:COLS,rows:ROWS,pw:PW,ph:PH,pr:PR,pc:PC,grid},preview:o.toDataURL('image/png'),beads};
}
function exportMontaje(){
    const hex={};let beads=0;grid.forEach(r=>r.forEach(c=>{if(c){beads++;hex[c]=CODES[c].hex}}));
    return {beads,hex,data:{v:2,cols:COLS,rows:ROWS,pw:PW,ph:PH,pr:PR,pc:PC,grid}};
  }
  return { exportMontaje, destroy: () => { document.removeEventListener('click', onDocClick); document.removeEventListener('keydown', onPvKey); document.removeEventListener('keydown', onShortcut); window.clearInterval(zInt); window.removeEventListener('resize', onPvResize); __timers.forEach(id => window.clearTimeout(id)); }, exportDesign, importDesign: loadDesignObject };
}
