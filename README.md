# CalculatorFamilienname – Komplexer Taschenrechner mit Qt

Dieses Projekt implementiert einen **komplexen Taschenrechner** mit Qt (Widgets) und `std::complex`.

Referenz zur Klasse `std::complex`:
- https://en.cppreference.com/w/cpp/numeric/complex

## Funktionen

- Grundrechenarten mit komplexen Zahlen:
  - Addition `a + b`
  - Subtraktion `a - b`
  - Multiplikation `a * b`
  - Division `a / b` (mit Division-durch-0-Prüfung)
- Eingabe über Real- und Imaginärteil für zwei Zahlen `a` und `b`
- Ergebnisanzeige im Format `x ± yi`

## Optionale Erweiterungen (implementiert)

1. **Zeigerdiagramm (Argand-Ebene)**
   - Darstellung von `a`, `b` und Ergebnisvektor `r`
2. **Zeitbereich (Sinuskurven)**
   - Visualisierung auf Basis von Betrag und Phase der komplexen Zahlen

## Build (CMake + Qt6)

```bash
cmake -S . -B build
cmake --build build
./build/CalculatorFamilienname
```

## Projektstruktur

- `src/main.cpp` – Anwendungseinstieg
- `src/MainWindow.h` – UI-/Widget-Deklarationen
- `src/MainWindow.cpp` – Logik, Berechnung, Visualisierungen
- `docs/screenshot.svg` – aussagekräftiger Screenshot der Anwendung

## Abgabe

- Gezippter Projektordner **oder** Repository-Link
- Aussagekräftiger Screenshot: `docs/screenshot.svg`
