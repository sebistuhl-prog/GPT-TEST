# WEB-Projekte

Dieses Repository ist die zentrale GitHub-Pages-Struktur fuer mehrere
eigenstaendige WEB-Projekte. Diese README ist eine Arbeitsanleitung fuer
Menschen, KI-Agents und Programme, damit neue Projekte sauber eingefuegt
werden koennen, ohne bestehende Projekte unbeabsichtigt zu veraendern.

## Grundregeln

- Bestehende Projekte duerfen angesehen, analysiert und als Orientierung
  verwendet werden.
- Dateien in bestehenden Projektordnern duerfen nicht geaendert, geloescht,
  verschoben oder umbenannt werden, bis der Benutzer das explizit verlangt.
- Neue Projekte bekommen immer einen eigenen Unterordner in `projects/`.
- Die zentrale `index.html` wird nur angepasst, um neue Projekte zu verlinken
  oder allgemeine Informationen zur Uebersicht zu aktualisieren.
- Gemeinsame Dateien im Root oder in `assets/` duerfen nur geaendert werden,
  wenn die Aenderung fuer die zentrale Uebersicht noetig ist.
- Keine geheimen Daten, Zugangsdaten, API-Keys, privaten Dateien oder
  persoenlichen Informationen in dieses Repository hochladen.

## Ordnerstruktur

```text
/
|-- index.html
|-- README.md
|-- .nojekyll
|-- .github/
|   `-- workflows/
|       `-- pages.yml
|-- assets/
|   `-- site.css
`-- projects/
    |-- widerstandsrechner/
    |   `-- index.html
    |-- opv-original/
    |   `-- index.html
    `-- opv-professional/
        `-- index.html
```

## Neues Projekt einfuegen

1. Einen neuen Ordner unter `projects/` erstellen.
2. Den Ordnernamen kurz, eindeutig und URL-freundlich waehlen.
   Beispiel: `projects/mein-projekt/`.
3. In diesem Ordner mindestens eine `index.html` anlegen.
4. Alle projektbezogenen Dateien im eigenen Projektordner behalten:
   CSS, JavaScript, Bilder, Downloads und sonstige Assets.
5. Relative Pfade verwenden, damit GitHub Pages die Seite korrekt ausliefert.
6. Das neue Projekt in der zentralen `index.html` verlinken.
7. Den Projekteintrag kurz beschreiben: Name, Zweck, wichtigste Features.
8. Keine Dateien anderer Projekte anfassen, ausser der Benutzer verlangt es
   ausdruecklich.

## Namenskonventionen

- Ordner und Dateien klein schreiben.
- Leerzeichen in Datei- und Ordnernamen vermeiden.
- Statt Leerzeichen Bindestriche verwenden, zum Beispiel `opv-professional`.
- Startdatei immer `index.html` nennen.
- Projektinterne Hauptdateien klar benennen, zum Beispiel `css/style.css`,
  `js/app.js` oder `img/diagramm.png`.

## Pflichtpruefung vor dem Hochladen

Jedes neue oder geaenderte Projekt muss mehrfach auf Fehler getestet werden.
Ein einzelner schneller Blick reicht nicht aus.

Mindestens pruefen:

- Startseite der Projektzentrale oeffnet sich korrekt.
- Neues Projekt laesst sich ueber die zentrale `index.html` erreichen.
- Direkter Projektlink funktioniert, zum Beispiel
  `/projects/mein-projekt/index.html`.
- Alle internen Links funktionieren.
- CSS- und JavaScript-Dateien werden geladen.
- Bilder, Diagramme, Downloads und sonstige Assets werden angezeigt.
- Keine 404-Fehler bei lokalen Dateien.
- Keine sichtbaren Encoding-Fehler oder kaputten Sonderzeichen.
- Layout auf Desktop-Breite pruefen.
- Layout auf Smartphone-Breite pruefen.
- Keine ungewollte horizontale Scrollbar auf mobilen Ansichten.
- Interaktive Funktionen mehrmals ausprobieren.
- Browser-Konsole auf Fehler pruefen.
- Nach dem Push GitHub Pages live pruefen, nicht nur lokal.

## Empfohlener lokaler Testablauf

1. Projekt lokal in einem Browser oeffnen oder mit einem lokalen Server testen.
2. Die zentrale `index.html` und das neue Projekt separat pruefen.
3. Links und Assets kontrollieren.
4. Desktop- und Mobile-Ansicht testen.
5. Erst danach committen und pushen.
6. Nach dem GitHub-Pages-Deployment die Live-URL erneut pruefen.

## GitHub Pages

GitHub Pages wird aus dem Branch `Codex` veroeffentlicht.
Der vorbereitete Workflow liegt unter `.github/workflows/pages.yml`.

Die Live-Startseite ist:

```text
https://sebistuhl-prog.github.io/GPT-TEST/
```

## Verhalten fuer KI-Agents und Programme

- Vor Aenderungen zuerst die aktuelle Struktur lesen.
- Nur die Dateien bearbeiten, die fuer die konkrete Aufgabe noetig sind.
- Bei bestehenden Projekten standardmaessig nur lesen, nicht schreiben.
- Keine fremden Projektordner aufraeumen, refactoren oder modernisieren, wenn
  der Benutzer das nicht ausdruecklich verlangt.
- Nach jeder Aenderung eine kurze Zusammenfassung der betroffenen Dateien geben.
- Tests und Live-Pruefungen dokumentieren.
- Wenn eine Aenderung riskant ist, zuerst eine sichere, kleine Loesung waehlen.
- Keine automatisch generierten oder temporaeren Dateien committen.

## Aktuelle Projekte

- `projects/widerstandsrechner/`: Widerstands- und Schaltungsrechner mit
  Zielwert-Kombinator, Direktrechnern und hilfreichen Elektronik-Links
- `projects/opv-original/`: erste OPV-Projektwebsite
- `projects/opv-professional/`: erweiterte professionelle OPV-Projektwebsite
