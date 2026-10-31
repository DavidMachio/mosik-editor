// Marcado del editor, convertido del HTML original a JSX.
// Es estático a propósito: la lógica de initEditor.js lo lee y modifica por id,
// igual que hacía el HTML de una sola pieza.
export default function EditorMarkup() {
  return (
    <>
    <div className="app">
    <div>
     <div className="pn"><h3>1 · Tablero e imagen</h3>
      <div className="row">
       <select id="preset" title="Tamaño de una placa"><option value="40x40">Placa 40 × 40</option><option value="29x29">Placa 29 × 29</option><option value="20x20">Placa 20 × 20</option><option value="custom">Otra placa…</option></select>
       <label id="pdim" style={{ display: 'none' }}>Ancho <input type="number" id="cols" min="5" max="100" defaultValue="40" /> Alto <input type="number" id="rows" min="5" max="100" defaultValue="40" /></label>
       <div id="pdd"><button id="pddb" type="button"></button><div id="pddl"></div></div>
      </div>
      <div className="row" id="custom"><label>Filas de placas <input type="number" id="pr" min="1" max="6" defaultValue="1" /></label><label>Columnas de placas <input type="number" id="pc" min="1" max="6" defaultValue="1" /></label><span id="cprev"></span><span className="mu">Cada cuadro es una placa.</span></div>
      <div className="mu" id="boardinfo"></div>
      <label style={{ marginBottom: '6px' }}><input type="checkbox" id="guides" defaultChecked /> Guías cada 10 cuentas y división de placas</label>
      <div className="row"><input type="file" id="file" accept="image/*" /><button id="clearimg">Quitar imagen</button></div><div className="mu" id="imgmsg"></div>
      <div className="row"><label style={{ flex: '1' }}>Opacidad imagen <input type="range" id="op" min="0" max="100" defaultValue="60" /></label><label><input type="checkbox" id="showimg" defaultChecked /> Ver imagen</label></div>
      <div className="row"><label style={{ flex: '1' }}><b>Zoom de la vista</b> <input type="range" id="zoom" min="8" max="48" defaultValue="16" /></label><button id="zm">−</button><button id="zp">+</button></div>
      <div className="mu" style={{ margin: '-2px 0 6px' }}>Acerca o aleja todo junto: tablero, cuentas e imagen. También con Ctrl + rueda.</div>
      <div className="row"><label style={{ flex: '1' }}>Tamaño de la imagen <input type="range" id="isc" min="20" max="300" defaultValue="100" /></label><label><input type="checkbox" id="lock" /> Bloquear imagen</label></div>
      <div className="row"><span>Girar imagen</span><button id="rl" title="90° a la izquierda">↺ 90°</button><button id="rr" title="90° a la derecha">↻ 90°</button><button id="fl" title="Voltear horizontalmente">⇋ Voltear</button><label style={{ flex: '1', minWidth: '140px' }}>Ángulo <input type="range" id="rot" min="-180" max="180" defaultValue="0" /></label><b id="rotv" style={{ minWidth: '42px' }}>0°</b></div>
      <div className="mu" style={{ margin: '-2px 0 6px' }}>Colócala con la Mano y bloquéala antes de dibujar: así ya no se mueve ni cambia de tamaño.</div>
      <div className="row"><span>Vista</span><button id="vbead" className="on">⚪ Cuentas</button><button id="vpix">⬛ Píxeles</button><label><input type="checkbox" id="showbeads" defaultChecked /> Ver diseño</label><label><input type="checkbox" id="showgrid" defaultChecked /> Ver rejilla vacía</label><label style={{ flex: '1' }}>Opac. cuentas <input type="range" id="bop" min="30" max="100" defaultValue="100" /></label></div>
     </div>
     <div className="pn"><h3>2 · Dibujar</h3>
      <div className="row" id="tools">
       <button data-t="move" className="on big">✋ Mano</button><button data-t="paint" className="big">🖌 Pincel</button><button data-t="erase" className="big">⌫ Borrador</button>
       <button id="undo">Deshacer</button><button id="redo">Rehacer</button><button id="reset" title="Quita todas las cuentas; la imagen se queda">Resetear tablero</button>
      </div>
      <div className="mu" id="toolhelp" style={{ marginBottom: '6px' }}></div>
      <div className="row" id="tools2"><span className="mu">Más:</span><button data-t="fill">Bote</button><button data-t="pick">Cuentagotas</button><button data-t="img">Color de imagen</button></div>
     </div>
     <div id="wrap"><canvas id="cv"></canvas></div>
    </div>
    <div>
     <div className="pn"><h3>Paleta</h3>
      <div className="row"><select id="gama"><option value="m">Mini (Artkal M)</option><option value="s">Midi (Artkal S)</option></select>
       <select id="tipo"><option value="sol">Solo sólidos</option><option value="all">Todos los tipos</option></select></div>
      <div className="row"><input type="search" id="q" placeholder="Código (A10, S56…)" style={{ flex: '1' }} /></div>
      <div className="row" id="cur"></div>
      <div id="pal"></div>
     </div>
     <div className="pn"><h3>Escalas de color</h3>
      <div className="row"><select id="famsel"></select><label><input type="checkbox" id="stretch" defaultChecked /> Ajustar contraste a la escala</label></div>
      <div id="famstrip" className="row" style={{ gap: '2px' }}></div>
      <div className="row"><button id="togray">1 · Pasar a escala de grises</button><button id="toscale">2 · Aplicar la escala elegida</button></div>
      <div className="mu" id="scmsg">Primero pasa el diseño a grises (cada color toma el gris de su misma claridad). Después elige una escala, por ejemplo Verdes, y aplícala: cada gris se cambia por el tono de esa escala con la misma claridad. Usa la gama (Mini/Midi) elegida en la paleta. Se puede deshacer.</div>
     </div>
     <div className="pn"><h3>Cambiar de gama</h3>
      <div className="row"><button id="conv">Convertir diseño a la otra gama</button></div>
      <div className="row"><label><input type="checkbox" id="uniq" defaultChecked /> Sin fundir colores</label></div>
      <div className="mu" id="convmsg"></div>
    </div>
     <div className="pn"><h3>Leer imagen cuadro a cuadro</h3>
      <div className="mu" style={{ marginBottom: '6px' }}>Para pixel art (sprites, capturas, imágenes hechas de cuadrados). Cada cuadro de la imagen pasa a ser una cuenta, sin promediar ni suavizar.</div>
      <div className="row"><label>Tamaño del cuadro (px) <input type="number" id="cellpx" min="1" max="200" placeholder="Auto" style={{ width: '72px' }} /></label><label><input type="checkbox" id="bgcorner" defaultChecked /> Fondo = color de la esquina</label></div>
      <div className="row"><button id="readpx" className="big">Leer cuadro a cuadro</button></div>
      <div className="mu" id="pxmsg"></div>
     </div>
     <div className="pn"><h3>Número de colores</h3>
      <div className="row"><label>Colores <input type="number" id="nk" min="2" max="60" defaultValue="8" /></label><label><input type="checkbox" id="bgskip" defaultChecked /> Fondo claro vacío</label></div>
      <div className="row"><button id="auto">Rellenar desde la imagen</button><button id="editplan" disabled title="Vuelve a abrir los colores del último relleno">Editar colores del relleno</button><button id="reduce">Reducir el diseño</button></div>
      <div className="mu">Rellenar: elige los N colores que más contrastan en la imagen y pinta cada celda con el más cercano. Reducir: fusiona los colores más parecidos del diseño actual hasta dejar N. Todo se puede deshacer.</div>
     </div>
     <div className="pn"><h3>Cuentas</h3><div id="cnt" className="mu">Sin cuentas todavía</div>
      <div className="row" style={{ marginTop: '8px' }}><button id="png">Descargar PNG</button><button id="save">Guardar JSON</button><button id="csv">CSV cuentas</button><label className="mu" style={{ cursor: 'pointer', border: '1px solid var(--bd)', borderRadius: '8px', padding: '6px 10px' }}>Cargar JSON<input type="file" id="load" accept=".json" hidden /></label></div>
     </div>
    </div></div>
    <div id="modal"><div id="card">
     <h2>Colores del relleno</h2><div className="mu">Propuesta a partir de la imagen. Cambia, quita o añade colores; la vista previa se actualiza sola.</div>
     <div className="row" style={{ marginTop: '8px' }}><span>Número de colores</span><button id="mminus">−</button><b id="mn">8</b><button id="mplus">+</button><button id="mauto" title="Vuelve a la propuesta automática">Recalcular propuesta</button></div>
     <div className="row" id="mexact" style={{ display: 'none' }}><label><input type="checkbox" id="mexu" defaultChecked /> Sin fundir colores (cada color del original, un color distinto de la carta)</label></div>
     <div className="chips" id="chips"></div>
     <div id="mpick" style={{ display: 'none' }}><div className="mu" id="mpickt"></div><input type="search" id="mq" placeholder="Código (A10, S56…)" style={{ width: '160px' }} /><div id="mpal"></div></div>
     <canvas id="mprev" width="360" height="360"></canvas>
     <div className="row" style={{ marginTop: '10px', justifyContent: 'flex-end' }}><span className="mu" id="mwarn" style={{ flex: '1' }}></span><button id="mcancel">Cancelar</button><button id="macc" className="on big">Aceptar y rellenar</button></div>
    </div></div>
    </>
  );
}
