#!/usr/bin/env python3
"""Genera los datos de una colección a partir de sus sprites (1 píxel = 1 cuenta).

Uso:  python3 scripts/generar-coleccion.py <slug>
Entrada:  scripts/colecciones/<slug>/meta.json  +  los PNG que cite («archivo»), con fondo transparente.
Salida:   public/colecciones/<slug>/<id>.png  (recortado)  y  src/data/colecciones/<slug>.js
Cada color se pasa al código más cercano de la gama Mini (Artkal M, sólidos) de la herramienta.
Después, añade el import y la entrada en src/data/colecciones/index.js.
"""
import json, re, sys, os
from PIL import Image

slug = sys.argv[1]
base = os.path.join('scripts', 'colecciones', slug)
meta = json.load(open(os.path.join(base, 'meta.json'), encoding='utf-8'))

src = open('src/pages/herramienta/initEditor.js', encoding='utf-8').read()
data = json.loads(re.search(r'const DATA=(\[.*?\]);', src, re.S).group(1))
pal = [d for d in data if d['g'] == 'm' and d['t'] == 'Sólido']

def rgb(h): return tuple(int(h[i:i + 2], 16) for i in (1, 3, 5))
def lab(c):
    def f(t):
        t /= 255
        return ((t + 0.055) / 1.055) ** 2.4 if t > 0.04045 else t / 12.92
    r, g, b = map(f, c)
    X = (0.4124 * r + 0.3576 * g + 0.1805 * b) / 0.95047; Y = 0.2126 * r + 0.7152 * g + 0.0722 * b; Z = (0.0193 * r + 0.1192 * g + 0.9505 * b) / 1.08883
    q = lambda t: t ** (1 / 3) if t > 0.008856 else 7.787 * t + 16 / 116
    return (116 * q(Y) - 16, 500 * (q(X) - q(Y)), 200 * (q(Y) - q(Z)))
PL = [(d['c'], d['h'], lab(rgb(d['h']))) for d in pal]
near = lambda c: min(PL, key=lambda p: sum((a - b) ** 2 for a, b in zip(lab(c), p[2])))
LET = 'abcdefghijklmnopqrstuvwxyz'

os.makedirs(os.path.join('public', 'colecciones', slug), exist_ok=True)
out = []
for d in meta['disenos']:
    im = Image.open(os.path.join(base, d['archivo'])).convert('RGBA')
    bb = im.getbbox()
    im = im.crop(bb)
    im.save(os.path.join('public', 'colecciones', slug, d['id'] + '.png'))
    w, h = im.size
    idx, cnt, rows = {}, {}, []
    for y in range(h):
        row = ''
        for x in range(w):
            r, g, b, a = im.getpixel((x, y))
            if a < 128: row += '.'; continue
            code = near((r, g, b))[0]
            if code not in idx: idx[code] = len(idx)
            if idx[code] >= len(LET): raise SystemExit('Demasiados colores (máx. 26) en ' + d['archivo'])
            cnt[code] = cnt.get(code, 0) + 1
            row += LET[idx[code]]
        rows.append(row)
    hexof = {p[0]: p[1] for p in PL}
    out.append({**{k: v for k, v in d.items() if k != 'archivo'}, 'ancho': w, 'alto': h, 'cuentas': sum(cnt.values()),
                'colores': [{'codigo': k, 'hex': hexof[k], 'cuentas': cnt[k], 'letra': LET[idx[k]]} for k in sorted(cnt, key=lambda k: -cnt[k])],
                'filas': rows})
    print(d['id'], w, h, sum(cnt.values()), 'cuentas', len(cnt), 'colores')

col = {k: v for k, v in meta.items() if k != 'disenos'}
col['disenos'] = out
js = '// Generado por scripts/generar-coleccion.py (no editar a mano).\nexport default ' + json.dumps(col, ensure_ascii=False, indent=1) + ';\n'
open(os.path.join('src', 'data', 'colecciones', slug + '.js'), 'w', encoding='utf-8').write(js)
