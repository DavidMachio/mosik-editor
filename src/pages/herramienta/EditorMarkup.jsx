// Marcado de la herramienta (JSX). Antes era el HTML único del editor de prueba; ahora está organizado en
// barra de herramientas + lienzo + panel con pestañas. La lógica (initEditor.js) lo lee por id y por clase,
// así que los identificadores (#cv, #wrap, #pal, #cnt, #tools, data-t...) no deben cambiarse.
// Es estático a propósito: no tiene estado de React. Las pestañas las gestiona initTabs.js.
import Icon from '../../components/Icon.jsx';

export default function EditorMarkup() {
  return (
    <>
<div className="tool" data-sheet="open" data-layers="open">

<div className="tool__bar" id="tool-strip" role="toolbar" aria-label="Herramientas de dibujo">
<div className="tool__group" id="tools">
<button type="button" data-t="move" className="on" title="Mano (V): mueve la imagen o la vista"><span aria-hidden="true"><Icon name="mover" size={22} /></span><span className="lbl">Mano</span></button>
<button type="button" data-t="paint" title="Pincel (B)"><span aria-hidden="true"><Icon name="pincel" size={22} /></span><span className="lbl">Pincel</span></button>
<button type="button" data-t="erase" title="Borrador (E)"><span aria-hidden="true"><Icon name="borrador" size={22} /></span><span className="lbl">Borrador</span></button>
</div>
<div className="tool__group" id="tools2">
<button type="button" data-t="fill" title="Bote de pintura (G)"><span aria-hidden="true"><Icon name="bote" size={22} /></span><span className="lbl">Bote</span></button>
<button type="button" data-t="pick" title="Cuentagotas (I): coge el color de una cuenta"><span aria-hidden="true"><Icon name="cuentagotas" size={22} /></span><span className="lbl">Cuentagotas</span></button>
<button type="button" data-t="img" aria-label="Color de imagen" title="Color de imagen (M): pinta cada celda con el color de paleta más cercano al de la imagen"><span aria-hidden="true"><Icon name="imagen-color" size={22} /></span><span className="lbl">Imagen</span></button>
</div>
<div className="tool__group">
<button type="button" id="undo" title="Deshacer (Ctrl+Z)"><span aria-hidden="true"><Icon name="deshacer" size={22} /></span><span className="lbl">Deshacer</span></button>
<button type="button" id="redo" title="Rehacer (Ctrl+Y)"><span aria-hidden="true"><Icon name="rehacer" size={22} /></span><span className="lbl">Rehacer</span></button>
<button type="button" id="reset" title="Vaciar la capa activa: quita sus cuentas; la imagen se queda"><span aria-hidden="true"><Icon name="vaciar" size={22} /></span><span className="lbl">Vaciar</span></button>
</div>
<div className="tool__group tool__group--assemble"><button type="button" id="montajebtn" title="Enviar el diseño a montaje: colócalo cuenta a cuenta, color a color"><span aria-hidden="true"><Icon name="cuentas" size={22} /></span><span className="lbl">Montaje</span></button></div>
<div className="tool__group tool__group--layers"><button type="button" id="layersbtn" aria-pressed="true" aria-controls="tool-layers" title="Capas: mostrar u ocultar las cuentas por color"><span aria-hidden="true"><Icon name="capas" size={22} /></span><span className="lbl">Capas</span></button></div>
</div>
<div className="tool__topbar" id="tool-topbar">
<button type="button" className="tool__corner" id="beadmenu" aria-label="Menú de Mosik" title="Menú de Mosik"><svg viewBox="0 0 32 32" width="30" height="30" aria-hidden="true"><circle cx="16" cy="16" r="9.5" fill="none" stroke="#F57E36" strokeWidth="6.5" /></svg></button>
<div role="tablist" aria-label="Paneles de la herramienta" className="tabs">
<button type="button" role="tab" id="tab-tablero" title="Tablero e imagen" aria-controls="tp-tablero" aria-selected="true" tabIndex={0}><Icon name="tablero" size={18} /><span className="lbl">Tablero e imagen</span></button>
<button type="button" role="tab" id="tab-paleta" title="Paleta" aria-controls="tp-paleta" aria-selected="false" tabIndex={-1}><Icon name="paleta" size={18} /><span className="lbl">Paleta</span></button>
<button type="button" role="tab" id="tab-colores" title="Colores y gamas" aria-controls="tp-colores" aria-selected="false" tabIndex={-1}><Icon name="gamas" size={18} /><span className="lbl">Colores y gamas</span></button>
<button type="button" role="tab" id="tab-descargar" title="Descargar" aria-controls="tp-descargar" aria-selected="false" tabIndex={-1}><Icon name="descargar" size={18} /><span className="lbl">Descargar</span></button>
</div>
<button type="button" className="tool__savebtn" id="savebtn" aria-label="Guardar en mi perfil" title="Guardar en mi perfil"><Icon name="guardar-cuenta" size={22} /></button>
</div>
<aside className="tool__layers" id="tool-layers" aria-label="Capas del diseño"></aside>
<div className="tool__stage">
<div className="tool__stagebar">
<label className="tool__zoom">Zoom <input type="range" id="zoom" min="3" max="48" step="0.5" defaultValue="16" title="Acerca o aleja todo junto: tablero, cuentas e imagen. También con Ctrl + rueda." /></label>
<output id="zpct" className="tool__pct" title="Zoom">100 %</output>
<button type="button" id="zm" title="Alejar (-)" aria-label="Alejar"><Icon name="alejar" size={20} /></button>
<button type="button" id="zp" title="Acercar (+)" aria-label="Acercar"><Icon name="acercar" size={20} /></button>
<button type="button" id="fit" title="Ajustar a la pantalla (0)" aria-label="Ajustar el tablero a la pantalla"><Icon name="tamano" size={20} /></button>
</div>
<div id="wrap"><div id="cvbox"><canvas id="cv"></canvas></div></div>
<div className="plates" id="platebar" hidden>
<div className="plates__tray" id="platetray" role="group" aria-label="Tableros del diseño" hidden></div>
<div className="plates__bar">
<button type="button" id="platesbtn" aria-expanded="false" aria-controls="platetray" aria-label="Ver los tableros" title="Tableros: ver cada placa por separado"><Icon name="capas" size={22} /></button>
<button type="button" id="platesprev" aria-label="Tablero anterior" title="Tablero anterior"><Icon name="flecha" size={20} className="flip" /></button>
<span id="platelabel" className="plates__label" aria-live="polite">Todo el diseño</span>
<button type="button" id="platesnext" aria-label="Tablero siguiente" title="Tablero siguiente"><Icon name="flecha" size={20} /></button>
</div>
</div>
<p className="tool__status mu" id="toolhelp" aria-live="polite"></p>
</div>
<aside className="tool__side" aria-label="Controles">
<div className="sheet__bar"><span className="sheet__grip" aria-hidden="true"></span><button type="button" className="sheet__close" aria-label="Cerrar ajustes"><Icon name="cerrar" size={18} /></button></div>
<div role="tabpanel" className="tabpanel" id="tp-tablero" aria-labelledby="tab-tablero">
<section className="pn" id="sec-grupos">
<h3>Capas</h3>
<div className="row"><button type="button" id="lyadd" className="ico"><Icon name="mas" size={18} /> Capa nueva</button></div>
<ul id="lylist" className="ly-list" aria-label="Capas del diseño (la de arriba tapa a las de abajo)"></ul>
<div className="mu">Cada imagen que subes crea su propia capa. Lo que pintas va a la capa elegida; la de arriba tapa a las de abajo.</div>
</section>
<section className="pn">
<h3>Tablero</h3>
<div className="row">
       <select id="preset" title="Tamaño de una placa"><option value="40x40">Placa 40 × 40</option><option value="29x29">Placa 29 × 29</option><option value="20x20">Placa 20 × 20</option><option value="custom">Otra placa…</option></select>
       <label id="pdim" style={{ display: 'none' }}>Ancho <input type="number" id="cols" min="5" max="100" defaultValue="40" /> Alto <input type="number" id="rows" min="5" max="100" defaultValue="40" /></label>
       <div id="pdd"><button id="pddb" type="button"></button><div id="pddl"></div></div>
      </div>
<div className="row" id="custom"><label>Filas de placas <input type="number" id="pr" min="1" max="6" defaultValue="1" /></label><label>Columnas de placas <input type="number" id="pc" min="1" max="6" defaultValue="1" /></label><span id="cprev"></span><span className="mu">Cada cuadro es una placa.</span></div>
<div className="mu" id="boardinfo"></div>
<label style={{ marginBottom: '6px' }}><input type="checkbox" id="guides" defaultChecked /> Guías cada 10 cuentas y división de placas</label>
</section>
<section className="pn">
<h3>Vista</h3>
<div className="row"><span>Vista</span><button id="vbead" className="on ico"><Icon name="vista-cuentas" size={18} /> Cuentas</button><button id="vpix" className="ico"><Icon name="vista-pixeles" size={18} /> Píxeles</button><label><input type="checkbox" id="showbeads" defaultChecked /> Ver diseño</label><label><input type="checkbox" id="showgrid" defaultChecked /> Ver rejilla vacía</label><label style={{ flex: '1' }}>Opac. cuentas <input type="range" id="bop" min="30" max="100" defaultValue="100" /></label></div>
</section>
<section className="pn">
<h3>Imagen</h3>
<div className="row"><input type="file" id="file" accept="image/*" /><button id="clearimg" className="ico"><Icon name="imagen-quitar" size={18} /> Quitar imagen</button></div>
<div className="mu" id="imgmsg"></div>
<div className="row"><label style={{ flex: '1' }}>Opacidad imagen <input type="range" id="op" min="0" max="100" defaultValue="85" /></label><label><input type="checkbox" id="showimg" defaultChecked /> Ver imagen</label></div>
<div className="row"><label style={{ flex: '1' }}>Tamaño de la imagen <input type="range" id="isc" min="20" max="300" defaultValue="100" /></label><label><input type="checkbox" id="lock" /> Bloquear imagen</label></div>
<div className="row"><span>Girar imagen</span><button id="rl" title="90° a la izquierda" aria-label="Girar 90° a la izquierda"><Icon name="girar-izq" size={18} /> 90°</button><button id="rr" title="90° a la derecha" aria-label="Girar 90° a la derecha"><Icon name="girar-der" size={18} /> 90°</button><button id="fl" title="Voltear horizontalmente"><Icon name="voltear" size={18} /> Voltear</button><label style={{ flex: '1', minWidth: '140px' }}>Ángulo <input type="range" id="rot" min="-180" max="180" defaultValue="0" /></label><b id="rotv" style={{ minWidth: '42px' }}>0°</b></div>
<div className="mu" style={{ margin: '-2px 0 6px' }}>Colócala con la Mano y bloquéala antes de dibujar: así ya no se mueve ni cambia de tamaño.</div>
</section>
<section className="pn">
<h3>Leer imagen cuadro a cuadro</h3>
<div className="mu" style={{ marginBottom: '6px' }}>Para pixel art (sprites, capturas, imágenes hechas de cuadrados). Cada cuadro de la imagen pasa a ser una cuenta, sin promediar ni suavizar.</div>
<div className="row"><label>Tamaño del cuadro (px) <input type="number" id="cellpx" min="1" max="200" placeholder="Auto" style={{ width: '72px' }} /></label><label><input type="checkbox" id="bgcorner" defaultChecked /> Fondo = color de la esquina</label></div>
<div className="row"><button id="readpx" className="big ico"><Icon name="leer" size={18} /> Leer cuadro a cuadro</button></div>
<div className="mu" id="pxmsg"></div>
</section>
</div>
<div role="tabpanel" className="tabpanel" id="tp-paleta" aria-labelledby="tab-paleta" hidden>
<section className="pn">
<h3>Paleta</h3>
<div className="row"><select id="gama"><option value="m">Mini (Artkal M)</option><option value="s">Midi (Artkal S)</option></select>
       <select id="tipo"><option value="sol">Solo sólidos</option><option value="all">Todos los tipos</option></select></div>
<div className="row"><input type="search" id="q" placeholder="Código (A10, S56…)" style={{ flex: '1' }} /></div>
<div className="row" id="cur"></div>
<div id="pal"></div>
</section>
<section className="pn" id="sec-capas">
<h3>Colores usados</h3>
<div id="cnt" className="mu">Sin cuentas todavía</div>
</section>
</div>
<div role="tabpanel" className="tabpanel" id="tp-colores" aria-labelledby="tab-colores" hidden>
<section className="pn">
<h3>Número de colores</h3>
<div className="row"><label>Colores <input type="number" id="nk" min="2" max="60" defaultValue="8" /></label><label><input type="checkbox" id="bgskip" defaultChecked /> Fondo claro vacío</label></div>
<div className="row"><button id="auto" className="ico"><Icon name="rellenar" size={18} /> Rellenar desde la imagen</button><button id="editplan" disabled title="Vuelve a abrir los colores del último relleno">Editar colores del relleno</button><button id="reduce" className="ico"><Icon name="reducir" size={18} /> Reducir el diseño</button></div>
<div className="mu">Rellenar: elige los N colores que más contrastan en la imagen y pinta cada celda con el más cercano. Reducir: fusiona los colores más parecidos del diseño actual hasta dejar N. Todo se puede deshacer.</div>
</section>
<section className="pn">
<h3>Escalas de color</h3>
<div className="row"><select id="famsel"></select><label><input type="checkbox" id="stretch" defaultChecked /> Ajustar contraste a la escala</label></div>
<div id="famstrip" className="row" style={{ gap: '2px' }}></div>
<div className="row"><button id="togray">1 · Pasar a escala de grises</button><button id="toscale">2 · Aplicar la escala elegida</button></div>
<div className="mu" id="scmsg">Primero pasa el diseño a grises (cada color toma el gris de su misma claridad). Después elige una escala, por ejemplo Verdes, y aplícala: cada gris se cambia por el tono de esa escala con la misma claridad. Usa la gama (Mini/Midi) elegida en la paleta. Se puede deshacer.</div>
</section>
<section className="pn">
<h3>Cambiar de gama</h3>
<div className="row"><button id="conv" className="ico"><Icon name="cambiar-gama" size={18} /> Convertir diseño a la otra gama</button></div>
<div className="row"><label><input type="checkbox" id="uniq" defaultChecked /> Sin fundir colores</label></div>
<div className="mu" id="convmsg"></div>
</section>
</div>
<div role="tabpanel" className="tabpanel" id="tp-descargar" aria-labelledby="tab-descargar" hidden>
<section className="pn">
<h3>Descargar y guardar</h3>
<div className="row" style={{ marginTop: '8px' }}><button id="png" className="ico"><Icon name="png" size={18} /> Descargar PNG</button><button id="save" className="ico"><Icon name="guardar-json" size={18} /> Guardar JSON</button><button id="csv" className="ico"><Icon name="csv" size={18} /> CSV cuentas</button><label className="mu" style={{ cursor: 'pointer', border: '1px solid var(--bd)', borderRadius: '8px', padding: '6px 10px' }}><Icon name="cargar-json" size={18} /> Cargar JSON<input type="file" id="load" accept=".json" hidden /></label></div>
<div className="mu">El PNG es la imagen del diseño. El JSON guarda el diseño para poder abrirlo más tarde. El CSV es el recuento de cuentas por color, con un 10 % de margen.</div>
</section>
</div>
</aside>
</div>
<div id="modal"><div id="card">
     <h2>Colores del relleno</h2><div className="mu">Propuesta a partir de la imagen. Cambia, quita o añade colores; la vista previa se actualiza sola.</div>
     <div className="row" style={{ marginTop: '8px' }}><span>Número de colores</span><button id="mminus" aria-label="Menos colores"><Icon name="menos" size={18} /></button><b id="mn">8</b><button id="mplus" aria-label="Más colores"><Icon name="mas" size={18} /></button><button id="mauto" className="ico" title="Vuelve a la propuesta automática"><Icon name="recalcular" size={18} /> Recalcular propuesta</button></div>
     <div className="row" id="mexact" style={{ display: 'none' }}><label><input type="checkbox" id="mexu" defaultChecked /> Sin fundir colores (cada color del original, un color distinto de la carta)</label></div>
     <div className="chips" id="chips"></div>
     <div id="mpick" style={{ display: 'none' }}><div className="mu" id="mpickt"></div><input type="search" id="mq" placeholder="Código (A10, S56…)" style={{ width: '160px' }} /><div id="mpal"></div></div>
     <canvas id="mprev" width="360" height="360"></canvas>
     <div className="row" style={{ marginTop: '10px', justifyContent: 'flex-end' }}><span className="mu" id="mwarn" style={{ flex: '1' }}></span><button id="mcancel">Cancelar</button><button id="macc" className="on big">Aceptar y rellenar</button></div>
    </div></div>
<div id="pvmodal" className="pv" hidden role="dialog" aria-modal="true" aria-labelledby="pvt">
<div className="pv__card">
<h2 id="pvt">Colocar la imagen</h2>
<p className="mu">Ves el tablero entero. Elige cuántas placas necesitas y mueve la imagen con el dedo (con dos dedos, cambias su tamaño). Al aceptar se pasa al tablero.</p>
<div id="pvview" className="pv__view"><canvas id="pvcv" aria-label="Previa del tablero con la imagen"></canvas></div>
<p className="mu" id="pvinfo" aria-live="polite"></p>
<div className="row pv__row">
<span className="pv__lbl">Filas</span><button type="button" id="pvrm" aria-label="Quitar una fila de placas"><Icon name="menos" size={18} /></button><b id="pvrn">1</b><button type="button" id="pvrp" aria-label="Añadir una fila de placas"><Icon name="mas" size={18} /></button>
<span className="pv__lbl">Columnas</span><button type="button" id="pvcm" aria-label="Quitar una columna de placas"><Icon name="menos" size={18} /></button><b id="pvcn">1</b><button type="button" id="pvcp" aria-label="Añadir una columna de placas"><Icon name="mas" size={18} /></button>
</div>
<div className="row pv__row">
<label className="pv__size">Tamaño de la imagen <input type="range" id="pvs" min="4" max="400" defaultValue="40" /></label><span className="mu" id="pvsv"></span>
</div>
<div className="row pv__row">
<button type="button" id="pvfit" className="ico"><Icon name="tamano" size={18} /> Que quepa entera</button>
<button type="button" id="pvfill" className="ico"><Icon name="imagen" size={18} /> Rellenar el tablero</button>
<button type="button" id="pvrl" aria-label="Girar 90° a la izquierda"><Icon name="girar-izq" size={18} /></button>
<button type="button" id="pvrr" aria-label="Girar 90° a la derecha"><Icon name="girar-der" size={18} /></button>
<button type="button" id="pvfl" aria-label="Voltear"><Icon name="voltear" size={18} /></button>
</div>
<div className="row pv__end"><button type="button" id="pvcancel">Cancelar</button><button type="button" id="pvok" className="on big ico"><Icon name="aceptar" size={18} /> Usar este encuadre</button></div>
</div>
</div>
    </>
  );
}
