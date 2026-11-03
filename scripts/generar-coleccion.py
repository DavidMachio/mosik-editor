#!/usr/bin/env python3
"""Genera los datos de una colección a partir de sus sprites (1 píxel = 1 cuenta).

Uso:  python3 scripts/generar-coleccion.py <slug>
Entrada:  scripts/colecciones/<slug>/meta.json  +  los PNG que cite («archivo»), con fondo transparente.
Salida:   public/colecciones/<slug>/<id>.png  (recortado)  y  src/data/colecciones/<slug>.js
Cada color se pasa al código más cercano de la gama Mini (Artkal M) y de la Midi (Artkal S), solo sólidos, de la herramienta.
Después, añade el import y la entrada en src/data/colecciones/index.js.
"""
import json, re, sys, os
from PIL import Image

slug = sys.argv[1]
base = os.path.join('scripts', 'colecciones', slug)
meta = json.load(open(os.path.join(base, 'meta.json'), encoding='utf-8'))

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
# Gamas: m = Mini (Artkal M), s = Midi (Artkal S), solo sólidos
GAMAS = {g: [(d['c'], d['h'], lab(rgb(d['h']))) for d in data if d['g'] == g and d['t'] == 'Sólido'] for g in ('m', 's')}
LET = 'abcdefghijklmnopqrstuvwxyz'

os.makedirs(os.path.join('public', 'colecciones', slug), exist_ok=True)
def convertir(ruta, destino):
    """PNG (1 píxel = 1 cuenta) -> tamaño, cuentas y rejilla por gama. Guarda el PNG recortado en destino."""
    im = Image.open(ruta).convert('RGBA')
    im = im.crop(im.getbbox())
    im.save(destino)
    w, h = im.size
    gamas = {}
    cuentas = None
    for g, PL in GAMAS.items():
        idx, cnt, rows = {}, {}, []
        cache = {}
        for y in range(h):
            row = ''
            for x in range(w):
                r, gg, b, a = im.getpixel((x, y))
                if a < 128: row += '.'; continue
                if (r, gg, b) not in cache:
                    l = lab((r, gg, b)); cache[(r, gg, b)] = min(PL, key=lambda p: sum((u - v) ** 2 for u, v in zip(l, p[2])))[0]
                code = cache[(r, gg, b)]
                if code not in idx: idx[code] = len(idx)
                if idx[code] >= len(LET): raise SystemExit('Demasiados colores (máx. 26) en ' + ruta + ' (gama ' + g + ')')
                cnt[code] = cnt.get(code, 0) + 1
                row += LET[idx[code]]
            rows.append(row)
        hexof = {p[0]: p[1] for p in PL}
        gamas[g] = {'colores': [{'codigo': k, 'hex': hexof[k], 'cuentas': cnt[k], 'letra': LET[idx[k]]} for k in sorted(cnt, key=lambda k: -cnt[k])], 'filas': rows}
        cuentas = sum(cnt.values())
    return {'ancho': w, 'alto': h, 'cuentas': cuentas, 'gamas': gamas}

out = []
for d in meta['disenos']:
    destino = os.path.join('public', 'colecciones', slug)
    r = convertir(os.path.join(base, d['archivo']), os.path.join(destino, d['id'] + '.png'))
    resto = {k: v for k, v in d.items() if k not in ('archivo', 'archivoPequeno')}
    item = {**resto, **r}
    # Versión pequeña opcional («archivoPequeno»): mismos datos con otro tamaño; se elige en la página de la colección
    if d.get('archivoPequeno'):
        item['pequeno'] = convertir(os.path.join(base, d['archivoPequeno']), os.path.join(destino, d['id'] + '-p.png'))
    out.append(item)
    print(d['id'], r['ancho'], r['alto'], r['cuentas'], 'cuentas', {g: len(v['colores']) for g, v in r['gamas'].items()}, 'colores',
          ('| pequeña %d x %d, %d cuentas' % (item['pequeno']['ancho'], item['pequeno']['alto'], item['pequeno']['cuentas'])) if 'pequeno' in item else '')

col = {k: v for k, v in meta.items() if k != 'disenos'}
col['disenos'] = out
js = '// Generado por scripts/generar-coleccion.py (no editar a mano).\nexport default ' + json.dumps(col, ensure_ascii=False, indent=1) + ';\n'
open(os.path.join('src', 'data', 'colecciones', slug + '.js'), 'w', encoding='utf-8').write(js)
