#!/usr/bin/env python3
"""Genera la ficha de cada movimiento de un luchador (prototipo: más adelante saldrá de la base de datos).

Uso:  python3 scripts/luchadores/fichas.py <id>     (después de construir.py <id>)
Entrada:  src/data/luchadores/<id>.json  y los fotogramas public/luchadores/<id>/<movimiento>/f1.png…
Salida:   public/fichas/<id>-<movimiento>.json  con el mismo formato que una colección con ficha
          (cada fotograma distinto es un diseño: tamaño, cuentas y colores en gama Mini y Midi).
Se piden solo al abrir la ficha (src/data/colecciones/cargar.js).
"""
import json, os, re, sys
from PIL import Image

pid = sys.argv[1]
doc = json.load(open(os.path.join('src', 'data', 'luchadores', pid + '.json'), encoding='utf-8'))
pal = json.load(open(os.path.join(os.path.dirname(__file__), 'paletas.json'), encoding='utf-8'))[pid]

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
GAMAS = {g: [(d['c'], d['h'], lab(rgb(d['h']))) for d in data if d['g'] == g and d['t'] == 'Sólido'] for g in ('m', 's')}
LET = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'  # más letras que las colecciones normales: hay retratos con muchos colores

def convertir(im):
    im = im.convert('RGBA'); im = im.crop(im.getbbox()); w, h = im.size; px = im.load()
    gamas = {}; cuentas = 0
    for g, PL in GAMAS.items():
        idx, cnt, rows, cache = {}, {}, [], {}
        for y in range(h):
            row = ''
            for x in range(w):
                r, gg, b, a = px[x, y]
                if a < 128: row += '.'; continue
                if (r, gg, b) not in cache:
                    l = lab((r, gg, b)); cache[(r, gg, b)] = min(PL, key=lambda p: sum((u - v) ** 2 for u, v in zip(l, p[2])))[0]
                code = cache[(r, gg, b)]
                if code not in idx:
                    if len(idx) >= len(LET): raise SystemExit('Demasiados colores')
                    idx[code] = len(idx)
                cnt[code] = cnt.get(code, 0) + 1; row += LET[idx[code]]
            rows.append(row)
        hexof = {p[0]: p[1] for p in PL}
        gamas[g] = {'colores': [{'codigo': k, 'hex': hexof[k], 'cuentas': cnt[k], 'letra': LET[idx[k]]} for k in sorted(cnt, key=lambda k: -cnt[k])], 'filas': rows}
        cuentas = sum(cnt.values())
    return {'ancho': w, 'alto': h, 'cuentas': cuentas, 'gamas': gamas}

# --- colores de la ficha: el texto de la ficha es blanco, así que el fondo sale de la paleta del luchador con contraste suficiente ---
def lum(h):
    f = lambda c: (c / 255 / 12.92) if c / 255 <= 0.03928 else ((c / 255 + 0.055) / 1.055) ** 2.4
    r, g, b = rgb(h); return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b)
def contraste(a, b):
    x, y = sorted((lum(a), lum(b)), reverse=True); return (x + 0.05) / (y + 0.05)
mezcla = lambda a, b, t: '#%02x%02x%02x' % tuple(round(u + (v - u) * t) for u, v in zip(rgb(a), rgb(b)))
cands = [pal['fondo'], pal['circulo'], pal['circulo2']]
fondo = next((c for c in cands if contraste('#ffffff', c) >= 4.5), None) or mezcla(pal['circulo2'], '#000000', 0.3)
claro = max([pal['fondo'], pal['circulo'], pal['acento']], key=lum)
tema = {'fondo': fondo, 'circulo': mezcla(fondo, '#ffffff', 0.22), 'circulo2': mezcla(fondo, '#000000', 0.35), 'acento': claro,
        'acentoTexto': '#ffffff' if contraste('#ffffff', claro) >= contraste('#150702', claro) else '#150702'}

os.makedirs('public/fichas', exist_ok=True)
n = 0
for cat in doc['categorias']:
    for m in cat['movimientos']:
        rutas = m['frames']; disenos = []
        for i, ruta in enumerate(rutas, 1):
            r = convertir(Image.open(os.path.join('public', ruta.lstrip('/'))))
            disenos.append({'id': f'f{i}', 'nombre': f"{doc['nombre']} · {m['nombre']}" + (f' {i}' if len(rutas) > 1 else ''), 'fase': 'Fotograma' if len(rutas) > 1 else 'Diseño', **r})
        k = len(rutas); nom = doc['nombre']
        col = {'slug': f"{pid}-{m['id']}", 'titulo': f"{nom} · {m['nombre']}", 'entrega': 'Street Fighter II',
               'lema': [f"{k} fotograma{'s' if k > 1 else ''}", f" de {nom}"],
               'texto': f"{nom}: {m['nombre'].lower()}, en pixel art para hacer en cuentas.",
               'intro': f"{nom}, {m['nombre'].lower()}. " + ('Elige un fotograma para ver su ficha o mira lo que lleva hacerlos todos.' if k > 1 else 'Su ficha completa.'),
               'resumen': f"{nom}: {m['nombre'].lower()}.", 'tema': tema, 'base': os.path.dirname(rutas[0]), 'disenos': disenos}
        json.dump(col, open(os.path.join('public', 'fichas', col['slug'] + '.json'), 'w', encoding='utf-8'), ensure_ascii=False, separators=(',', ':'))
        n += 1
print(pid, n, 'fichas')
