#!/usr/bin/env python3
"""Prepara un luchador para la web a partir de su carpeta de sprites (una carpeta por movimiento, PNG con fondo transparente).

Uso:  python3 scripts/luchadores/construir.py <id> "<Nombre>" "<País>" <carpeta_sprites> <cara.png> '{"fondo":"#..","circulo":"#..","circulo2":"#..","acento":"#.."}'
Salida:
  public/luchadores/<id>/cara.png
  public/luchadores/<id>/<movimiento>/f1.png, f2.png…   (fotogramas distintos)  y  anim.gif  (todos los fotogramas, en bucle)
  src/data/luchadores/<id>.json                        (categorías y movimientos, con sus datos: cuentas, colores, tamaño)
Orden: Reposo, Movimiento, Defensas, Puños, Patadas, Especiales, Golpes recibidos, Victoria y extras.
"""
import json, os, re, sys, unicodedata, hashlib
from PIL import Image

pid, nombre, pais, carpeta, cara = sys.argv[1:6]
# colores de los fondos: los de la ROPA del jugador. «ropa» los lee de scripts/luchadores/paletas.json; también vale un JSON con fondo/circulo/circulo2/acento, o «auto» (tonos de piel)
tema = None if len(sys.argv) <= 6 or sys.argv[6] in ('auto', 'ropa') else json.loads(sys.argv[6])
AUTO = sys.argv[6:7] == ['auto']
PUB = os.path.join('public', 'luchadores', pid)
os.makedirs(PUB, exist_ok=True)

# --- paleta Mini (Artkal M, sólidos) para contar colores igual que las fichas de colección ---
src = open('src/pages/herramienta/initEditor.js', encoding='utf-8').read()
data = json.loads(re.search(r'const DATA=(\[.*?\]);', src, re.S).group(1))
def rgb(h): return tuple(int(h[i:i + 2], 16) for i in (1, 3, 5))
def lab(c):
    def f(t):
        t /= 255
        return ((t + 0.055) / 1.055) ** 2.4 if t > 0.04045 else t / 12.92
    r, g, b = map(f, c)
    X = (0.4124 * r + 0.3576 * g + 0.1805 * b) / 0.95047; Y = 0.2126 * r + 0.7152 * g + 0.0722 * b; Z = (0.0193 * r + 0.1192 * g + 0.9505 * b) / 1.08883
    q = lambda t: t ** (1 / 3) if t > 0.008856 else 7.787 * t + 16 / 116
    return (116 * q(Y) - 16, 500 * (q(X) - q(Y)), 200 * (q(Y) - q(Z)))
MINI = [(d['c'], lab(rgb(d['h']))) for d in data if d['g'] == 'm' and d['t'] == 'Sólido']
cache = {}
def codigo(c):
    if c not in cache:
        l = lab(c); cache[c] = min(MINI, key=lambda p: sum((u - v) ** 2 for u, v in zip(l, p[1])))[0]
    return cache[c]

def slug(t):
    t = unicodedata.normalize('NFD', t).encode('ascii', 'ignore').decode().lower()
    return re.sub(r'[^a-z0-9]+', '-', t).strip('-')

# --- clasificación y orden ---
BASE = {'Reposo': 'reposo', 'Caminar': 'mov', 'Salto': 'mov', 'Salto adelante': 'mov', 'Bloqueo': 'def', 'Agachado': 'def',
        'Golpeado': 'golpes', 'Golpe en la cara': 'golpes', 'Golpe en el estómago': 'golpes', 'Golpe en la cabeza': 'golpes', 'Golpe fuerte': 'golpes',
        'Agachado golpeado': 'golpes', 'Derribo': 'golpes', 'Derribo y recuperación': 'golpes', 'Aturdido': 'golpes',
        'Victoria 1': 'final', 'Victoria 2': 'final', 'Tiempo agotado': 'final', 'Paletas alternativas': 'final', 'Retratos': 'final', 'Intro': 'final'}
CATS = [('reposo', 'Reposo'), ('mov', 'Movimiento'), ('def', 'Defensas'), ('puno', 'Puños'), ('patada', 'Patadas'), ('esp', 'Especiales'), ('golpes', 'Golpes recibidos'), ('final', 'Victoria y extras')]
def categoria(n):
    n = re.sub(r' \(\d+\)$', '', n)  # «Salto adelante (2)» se clasifica como «Salto adelante»
    if n in BASE: return BASE[n]
    if n.startswith('Golpeado'): return 'golpes'
    if 'puño' in n.lower(): return 'puno'
    if 'patada' in n.lower(): return 'patada'
    return 'esp'
def clave_ataque(n):
    pref = 0
    for i, p in enumerate(('Adelante ', 'Agachado ', 'Salto adelante ', 'Salto ')):
        if n.startswith(p): pref = {0: 1, 1: 2, 2: 4, 3: 3}[i]; break
    niv = 9
    for k, w in enumerate(('débil', 'medio', 'fuerte')):
        if w in n: niv = min(niv, k)
    return (pref, niv, n)
def orden(cat, n):
    if cat in ('puno', 'patada'): return clave_ataque(n)
    if cat in ('final',): return (['Victoria 1', 'Victoria 2', 'Tiempo agotado', 'Paletas alternativas', 'Retratos'].index(n) if n in ['Victoria 1', 'Victoria 2', 'Tiempo agotado', 'Paletas alternativas', 'Retratos'] else 9, n)
    return (0, 0, n)

def frames_de(d):
    fs = sorted(f for f in os.listdir(d) if f.lower().endswith('.png'))
    return [Image.open(os.path.join(d, f)).convert('RGBA') for f in fs]

movs = []
for nom in sorted(os.listdir(carpeta)):
    d = os.path.join(carpeta, nom)
    if not os.path.isdir(d): continue
    fr = frames_de(d)
    if not fr: continue
    sl = slug(nom); out = os.path.join(PUB, sl); os.makedirs(out, exist_ok=True)
    # fotogramas distintos (se quitan los repetidos, p. ej. Reposo 01 = Reposo 03)
    vistos = {}; distintos = []
    for f in fr:
        h = hashlib.md5(f.tobytes() + str(f.size).encode()).hexdigest()
        if h not in vistos: vistos[h] = len(distintos) + 1; distintos.append(f)
    rutas = []
    for i, f in enumerate(distintos, 1):
        f.save(os.path.join(out, f'f{i}.png'), optimize=True); rutas.append(f'/luchadores/{pid}/{sl}/f{i}.png')
    # GIF en bucle con todos los fotogramas, centrados y con un pequeño margen, ampliado sin suavizar.
    # Se hacen dos tamaños: «anim-s» (mitad, para cargar antes) y «anim» (completo, se cambia al entrar en pantalla).
    PAD = 3
    W = max(f.width for f in fr) + 2 * PAD; H = max(f.height for f in fr) + 2 * PAD; K = max(2, min(6, round(300 / H)))
    lienzos = []; cerca = {'l': False, 'r': False, 't': False}
    for f in fr:
        c = Image.new('RGBA', (W, H), (0, 0, 0, 0)); x0 = (W - f.width) // 2; y0 = H - PAD - f.height
        c.paste(f, (x0, y0), f)
        if x0 <= PAD + 1: cerca['l'] = True
        if W - (x0 + f.width) <= PAD + 1: cerca['r'] = True
        if y0 <= PAD + 1: cerca['t'] = True
        lienzos.append(c)
    def guardar(escala, nombre_archivo):
        ls = [c.resize((W * escala, H * escala), Image.NEAREST) for c in lienzos]
        if len(ls) == 1:
            ls[0].save(os.path.join(out, nombre_archivo + '.png')); return f'/luchadores/{pid}/{sl}/{nombre_archivo}.png'
        ps = []
        for c in ls:
            p = c.convert('RGB').convert('P', palette=Image.ADAPTIVE, colors=255)
            p.paste(255, Image.eval(c.split()[3], lambda v: 255 if v < 128 else 0)); ps.append(p)
        ps[0].save(os.path.join(out, nombre_archivo + '.gif'), save_all=True, append_images=ps[1:], duration=260 if nom == 'Reposo' else 150, loop=0, transparency=255, disposal=2)
        return f'/luchadores/{pid}/{sl}/{nombre_archivo}.gif'
    gif = guardar(K, 'anim'); gif_s = guardar(max(1, K // 2), 'anim-s')
    # datos de cada fotograma distinto: cuentas, colores (gama Mini), tamaño
    cu, co, an, al = [], [], [], []
    for f in distintos:
        w, h = f.size; px = f.load(); cs = set(); n = 0
        for y in range(h):
            for x in range(w):
                r, g, b, a = px[x, y]
                if a >= 128: n += 1; cs.add(codigo((r, g, b)))
        cu.append(n); co.append(len(cs)); an.append(w); al.append(h)
    cat = categoria(nom)
    movs.append({'cat': cat, 'orden': orden(cat, nom), 'id': sl, 'nombre': nom, 'frames': rutas, 'gif': gif, 'gifPeq': gif_s, 'gifAncho': W * K, 'gifAlto': H * K, 'bordes': cerca, 'fotogramas': len(fr),
                 'datos': {'cuentasMin': min(cu), 'cuentasMax': max(cu), 'colores': max(co), 'ancho': max(an), 'alto': max(al)}})

def tema_auto():
    """Paleta de la piel del luchador (tonos oscuro, medio y claro más frecuentes) para el fondo, los círculos y el acento."""
    import colorsys, collections
    cnt = collections.Counter()
    for nom in os.listdir(carpeta):
        d = os.path.join(carpeta, nom)
        if not os.path.isdir(d): continue
        for f in frames_de(d):
            for r, g, b, a in f.getdata():
                if a >= 128: cnt[(r, g, b)] += 1
    piel = []
    for c, n in cnt.items():
        h, sa, v = colorsys.rgb_to_hsv(*[x / 255 for x in c])
        if 8 <= h * 360 <= 40 and 0.35 <= sa <= 0.75 and 0.25 <= v <= 0.97: piel.append((v, n, c))
    piel.sort(); tot = sum(n for _, n, _ in piel); acum = 0; tonos = []
    for v, n, c in piel:  # tonos con peso suficiente, de oscuro a claro
        if n / tot >= 0.04: tonos.append(c)
    hx = lambda c: '#%02x%02x%02x' % c
    k = lambda q: tonos[round(q * (len(tonos) - 1))]
    print('tonos de piel:', [hx(c) for c in tonos])
    return {'fondo': hx(k(0.3)), 'circulo': hx(k(0.65)), 'circulo2': hx(k(0)), 'acento': hx(k(0.85))}

def contraste(a, b):
    lum = lambda h: sum(w * ((c / 255 / 12.92) if c / 255 <= 0.03928 else ((c / 255 + 0.055) / 1.055) ** 2.4) for w, c in zip((0.2126, 0.7152, 0.0722), (int(h[1:3], 16), int(h[3:5], 16), int(h[5:7], 16))))
    x, y = sorted((lum(a), lum(b)), reverse=True)
    return (x + 0.05) / (y + 0.05)
def completar(t):
    # texto legible sobre el fondo y sobre el acento (blanco u oscuro, el que más contraste dé)
    mejor = lambda fondo: '#ffffff' if contraste('#ffffff', fondo) >= contraste('#1b0f0a', fondo) else '#1b0f0a'
    t = {k: v for k, v in t.items() if k != 'ropa'}
    t['texto'] = mejor(t['fondo']); t['acentoTexto'] = mejor(t.get('acento', t['circulo']))
    return t
if sys.argv[6:7] == ['ropa']: tema = json.load(open(os.path.join(os.path.dirname(__file__), 'paletas.json'), encoding='utf-8'))[pid]
if AUTO: tema = tema_auto(); print('tema automático:', tema)
if tema: tema = completar(tema)
categorias = []
for cid, titulo in CATS:
    ms = sorted([m for m in movs if m['cat'] == cid], key=lambda m: m['orden'])
    if ms: categorias.append({'id': cid, 'titulo': titulo, 'movimientos': [{k: v for k, v in m.items() if k not in ('cat', 'orden')} for m in ms]})

cara_img = Image.open(cara).convert('RGBA')
px = cara_img.load()
for y in range(cara_img.height):  # el fondo magenta de la hoja puede dejar píxeles sueltos dentro del pelo
    for x in range(cara_img.width):
        r, g, b, a = px[x, y]
        if a and abs(r - 192) + g + abs(b - 192) < 60: px[x, y] = (0, 0, 0, 0)
cara_img.save(os.path.join(PUB, 'cara.png'), optimize=True)
doc = {'id': pid, 'nombre': nombre, 'pais': pais, **({'tema': tema} if tema else {}), 'cara': f'/luchadores/{pid}/cara.png', 'total': len(movs), 'categorias': categorias}
json.dump(doc, open(os.path.join('src', 'data', 'luchadores', pid + '.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print(pid, len(movs), 'movimientos;', {c['titulo']: len(c['movimientos']) for c in categorias})
