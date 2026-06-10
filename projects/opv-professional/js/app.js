(function () {
    "use strict";

    var storageKey = "opv-professional-settings";
    var checklistPrefix = "opv-checklist-";
    var defaultSettings = {
        theme: "system",
        font: 100,
        space: 100,
        contrast: false,
        reduceMotion: false,
        accent: "teal"
    };

    var accentThemes = {
        teal: {
            primary: "#145c63",
            primaryDark: "#0b3940",
            accent: "#d78b2a",
            tint: "#e8f4f1"
        },
        blue: {
            primary: "#1d5f91",
            primaryDark: "#123d61",
            accent: "#d78b2a",
            tint: "#e8f1fb"
        },
        green: {
            primary: "#277047",
            primaryDark: "#16462d",
            accent: "#c78325",
            tint: "#e9f5ec"
        },
        red: {
            primary: "#9d3e36",
            primaryDark: "#64231f",
            accent: "#d7982f",
            tint: "#faecea"
        }
    };

    var searchItems = [
        {
            title: "Startseite",
            url: "index.html",
            text: "Projektuebersicht, Kennzahlen, Dashboard, Glossar, Qualitaetscheck"
        },
        {
            title: "Aufgabenstellung",
            url: "aufgabenstellung.html",
            text: "Teilaufgaben, Vorgaben, Messziel, Material, Sicherheit, Vorbereitung"
        },
        {
            title: "Loesungsweg",
            titleHtml: "L&ouml;sungsweg",
            url: "loesungsweg.html",
            text: "Berechnung, OPV-Rechner, Formel, Messvorgang, Fehlersuche, Protokoll"
        },
        {
            title: "Ergebnisse",
            url: "ergebnisse.html",
            text: "Kennlinie, Messdaten, filterbare Tabelle, Saettigung, Sinusmessung, Fazit"
        },
        {
            title: "Team",
            url: "team.html",
            text: "Projektteam, Rollen, Arbeitsteilung, allgemeine Daten, Abgabecheck"
        }
    ];

    function readSettings() {
        try {
            return Object.assign({}, defaultSettings, JSON.parse(localStorage.getItem(storageKey) || "{}"));
        } catch (error) {
            return Object.assign({}, defaultSettings);
        }
    }

    function normalizeText(value) {
        return String(value)
            .toLowerCase()
            .replace(/ä/g, "ae")
            .replace(/ö/g, "oe")
            .replace(/ü/g, "ue")
            .replace(/ß/g, "ss");
    }

    function writeSettings(settings) {
        localStorage.setItem(storageKey, JSON.stringify(settings));
    }

    var settings = readSettings();

    function systemPrefersDark() {
        return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    }

    function effectiveTheme() {
        return settings.theme === "system" ? (systemPrefersDark() ? "dark" : "light") : settings.theme;
    }

    function applySettings() {
        var html = document.documentElement;
        var accent = accentThemes[settings.accent] || accentThemes.teal;

        html.dataset.theme = effectiveTheme();
        html.dataset.contrast = settings.contrast ? "high" : "normal";
        html.dataset.reduceMotion = settings.reduceMotion ? "true" : "false";
        html.style.setProperty("--font-scale", String(settings.font / 100));
        html.style.setProperty("--space-scale", String(settings.space / 100));
        html.style.setProperty("--color-primary", accent.primary);
        html.style.setProperty("--color-primary-dark", accent.primaryDark);
        html.style.setProperty("--color-accent", accent.accent);
        html.style.setProperty("--color-tint", accent.tint);

        document.querySelectorAll("[data-theme-choice]").forEach(function (button) {
            button.classList.toggle("active", button.dataset.themeChoice === settings.theme);
        });

        document.querySelectorAll("[data-accent-choice]").forEach(function (button) {
            button.classList.toggle("active", button.dataset.accentChoice === settings.accent);
        });

        var fontRange = document.querySelector("[data-font-range]");
        var spaceRange = document.querySelector("[data-space-range]");
        var contrast = document.querySelector("[data-contrast-toggle]");
        var motion = document.querySelector("[data-motion-toggle]");
        var fontValue = document.querySelector("[data-font-value]");
        var spaceValue = document.querySelector("[data-space-value]");

        if (fontRange) fontRange.value = String(settings.font);
        if (spaceRange) spaceRange.value = String(settings.space);
        if (contrast) contrast.checked = settings.contrast;
        if (motion) motion.checked = settings.reduceMotion;
        if (fontValue) fontValue.textContent = settings.font + "%";
        if (spaceValue) spaceValue.textContent = settings.space + "%";
    }

    function showToast(message) {
        var toast = document.querySelector("[data-toast]");
        if (!toast) return;
        toast.textContent = message;
        toast.classList.add("show");
        clearTimeout(showToast.timer);
        showToast.timer = setTimeout(function () {
            toast.classList.remove("show");
        }, 2200);
    }

    function copyText(text) {
        if (navigator.clipboard && window.isSecureContext) {
            return navigator.clipboard.writeText(text);
        }
        var textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "fixed";
        textarea.style.top = "-1000px";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        textarea.remove();
        return Promise.resolve();
    }

    function createChrome() {
        var floating = document.createElement("div");
        floating.className = "floating-actions print-only-hide";
        floating.innerHTML = [
            '<button type="button" data-open-search aria-label="Suche oeffnen">Suche</button>',
            '<button type="button" data-open-settings aria-label="Optionen oeffnen">Optionen</button>',
            '<button type="button" data-back-top aria-label="Nach oben">Top</button>'
        ].join("");
        document.body.appendChild(floating);

        var toast = document.createElement("div");
        toast.className = "toast";
        toast.setAttribute("role", "status");
        toast.setAttribute("aria-live", "polite");
        toast.dataset.toast = "";
        document.body.appendChild(toast);
    }

    function createSearchModal() {
        var modal = document.createElement("div");
        modal.className = "modal-backdrop";
        modal.hidden = true;
        modal.dataset.searchModal = "";
        modal.innerHTML = [
            '<section class="modal-card" role="dialog" aria-modal="true" aria-labelledby="search-title">',
            '  <div class="modal-header">',
            '    <h2 id="search-title">Projekt durchsuchen</h2>',
            '    <button class="icon-button" type="button" data-close-modal>Schliessen</button>',
            '  </div>',
            '  <label class="search-field">',
            '    <span>Suchbegriff</span>',
            '    <input type="search" data-site-search placeholder="z. B. Kennlinie, Rechner, Team">',
            '  </label>',
            '  <div class="search-results" data-search-results></div>',
            '</section>'
        ].join("");
        document.body.appendChild(modal);
        renderSearchResults("");
    }

    function createSettingsPanel() {
        var panel = document.createElement("aside");
        panel.className = "settings-panel";
        panel.hidden = true;
        panel.dataset.settingsPanel = "";
        panel.setAttribute("aria-label", "Darstellungsoptionen");
        panel.innerHTML = [
            '<div class="modal-header">',
            '  <h2>Optionen</h2>',
            '  <button class="icon-button" type="button" data-close-settings>Schliessen</button>',
            '</div>',
            '<div class="settings-group">',
            '  <strong>Farbschema</strong>',
            '  <div class="segmented">',
            '    <button type="button" data-theme-choice="system">System</button>',
            '    <button type="button" data-theme-choice="light">Hell</button>',
            '    <button type="button" data-theme-choice="dark">Dunkel</button>',
            '  </div>',
            '</div>',
            '<div class="settings-group">',
            '  <label class="setting-control">Schriftgroesse <span data-font-value>100%</span>',
            '    <input type="range" min="85" max="125" step="5" data-font-range>',
            '  </label>',
            '</div>',
            '<div class="settings-group">',
            '  <label class="setting-control">Abstaende <span data-space-value>100%</span>',
            '    <input type="range" min="90" max="120" step="5" data-space-range>',
            '  </label>',
            '</div>',
            '<div class="settings-group">',
            '  <strong>Akzentfarbe</strong>',
            '  <div class="swatches" aria-label="Akzentfarbe waehlen">',
            '    <button type="button" style="background:#145c63" data-accent-choice="teal" aria-label="Petrol"></button>',
            '    <button type="button" style="background:#1d5f91" data-accent-choice="blue" aria-label="Blau"></button>',
            '    <button type="button" style="background:#277047" data-accent-choice="green" aria-label="Gruen"></button>',
            '    <button type="button" style="background:#9d3e36" data-accent-choice="red" aria-label="Rot"></button>',
            '  </div>',
            '</div>',
            '<div class="settings-group">',
            '  <label class="switch-row"><span>Hoher Kontrast</span><input type="checkbox" data-contrast-toggle></label>',
            '  <label class="switch-row"><span>Bewegung reduzieren</span><input type="checkbox" data-motion-toggle></label>',
            '</div>',
            '<div class="settings-group">',
            '  <button class="button secondary-on-light" type="button" data-reset-settings>Zuruecksetzen</button>',
            '</div>'
        ].join("");
        document.body.appendChild(panel);
        applySettings();
    }

    function openSearch() {
        var modal = document.querySelector("[data-search-modal]");
        if (!modal) return;
        modal.hidden = false;
        document.body.classList.add("search-open");
        var input = modal.querySelector("[data-site-search]");
        if (input) {
            input.focus();
            input.select();
        }
    }

    function closeSearch() {
        var modal = document.querySelector("[data-search-modal]");
        if (!modal) return;
        modal.hidden = true;
        document.body.classList.remove("search-open");
    }

    function openSettings() {
        var panel = document.querySelector("[data-settings-panel]");
        if (!panel) return;
        panel.hidden = false;
        document.body.classList.add("settings-open");
    }

    function closeSettings() {
        var panel = document.querySelector("[data-settings-panel]");
        if (!panel) return;
        panel.hidden = true;
        document.body.classList.remove("settings-open");
    }

    function renderSearchResults(query) {
        var container = document.querySelector("[data-search-results]");
        if (!container) return;
        var normalized = normalizeText(query.trim());
        var results = searchItems.filter(function (item) {
            return !normalized || normalizeText(item.title + " " + item.text).includes(normalized);
        });

        if (!results.length) {
            container.innerHTML = '<p>Keine Treffer gefunden.</p>';
            return;
        }

        container.innerHTML = results.map(function (item) {
            return '<a href="' + item.url + '"><strong>' + (item.titleHtml || item.title) + '</strong><span>' + item.text + '</span></a>';
        }).join("");
    }

    function initNavigation() {
        var toggle = document.querySelector("[data-nav-toggle]");
        var nav = document.querySelector("#site-nav");
        if (!toggle || !nav) return;
        toggle.addEventListener("click", function () {
            var isOpen = nav.classList.toggle("is-open");
            toggle.setAttribute("aria-expanded", String(isOpen));
        });
    }

    function initReadingProgress() {
        var bar = document.querySelector("[data-reading-progress]");
        if (!bar) return;
        function update() {
            var max = document.documentElement.scrollHeight - window.innerHeight;
            var progress = max > 0 ? (window.scrollY / max) * 100 : 0;
            bar.style.width = Math.min(100, Math.max(0, progress)) + "%";
            document.body.classList.toggle("is-scrolled", window.scrollY > 320);
        }
        update();
        window.addEventListener("scroll", update, { passive: true });
        window.addEventListener("resize", update);
    }

    function initReveal() {
        var items = Array.prototype.slice.call(document.querySelectorAll("[data-reveal]"));
        if (!items.length) return;
        if (!("IntersectionObserver" in window)) {
            items.forEach(function (item) {
                item.classList.add("is-visible");
            });
            return;
        }
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });
        items.forEach(function (item) {
            observer.observe(item);
        });
    }

    function initChecklists() {
        document.querySelectorAll("[data-checklist]").forEach(function (list) {
            var key = checklistPrefix + list.dataset.checklist;
            var saved = [];
            try {
                saved = JSON.parse(localStorage.getItem(key) || "[]");
            } catch (error) {
                saved = [];
            }
            list.querySelectorAll("input[type='checkbox']").forEach(function (input, index) {
                input.checked = Boolean(saved[index]);
                input.addEventListener("change", function () {
                    var values = Array.prototype.map.call(list.querySelectorAll("input[type='checkbox']"), function (checkbox) {
                        return checkbox.checked;
                    });
                    localStorage.setItem(key, JSON.stringify(values));
                });
            });
        });
    }

    function initCalculator() {
        var form = document.querySelector("[data-opv-calculator]");
        if (!form) return;
        var key = "opv-calculator-values";
        var r1 = form.querySelector("[data-r1]");
        var r2 = form.querySelector("[data-r2]");
        var ue = form.querySelector("[data-ue]");
        var gain = form.querySelector("[data-gain]");
        var ua = form.querySelector("[data-ua]");

        try {
            var saved = JSON.parse(localStorage.getItem(key) || "{}");
            if (saved.r1) r1.value = saved.r1;
            if (saved.r2) r2.value = saved.r2;
            if (saved.ue) ue.value = saved.ue;
        } catch (error) {
            /* ignore invalid saved calculator data */
        }

        function formatNumber(value) {
            return value.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        }

        function update() {
            var r1Value = Math.max(0.0001, parseFloat(r1.value) || 0.0001);
            var r2Value = Math.max(0, parseFloat(r2.value) || 0);
            var ueValue = parseFloat(ue.value) || 0;
            var gainValue = 1 + r2Value / r1Value;
            var uaValue = gainValue * ueValue;
            gain.textContent = formatNumber(gainValue);
            ua.textContent = formatNumber(uaValue) + " V";
            localStorage.setItem(key, JSON.stringify({ r1: r1.value, r2: r2.value, ue: ue.value }));
        }

        form.querySelectorAll("input").forEach(function (input) {
            input.addEventListener("input", update);
        });

        var copyButton = form.querySelector("[data-copy-calculation]");
        if (copyButton) {
            copyButton.addEventListener("click", function () {
                var text = "Nichtinvertierender OPV: v = 1 + R2 / R1 = " + gain.textContent + ", Ua = " + ua.textContent;
                copyText(text).then(function () {
                    showToast("Rechnung kopiert");
                });
            });
        }
        update();
    }

    function initTableTools() {
        var filter = document.querySelector("[data-table-filter]");
        var table = document.querySelector("[data-filter-table]");
        if (filter && table) {
            filter.addEventListener("input", function () {
                var query = normalizeText(filter.value.trim());
                table.querySelectorAll("tbody tr").forEach(function (row) {
                    row.hidden = query && !normalizeText(row.textContent).includes(query);
                });
            });
        }

        document.querySelectorAll("[data-copy-table]").forEach(function (button) {
            button.addEventListener("click", function () {
                var target = document.querySelector(button.dataset.copyTable);
                if (!target) return;
                var rows = Array.prototype.map.call(target.querySelectorAll("tr"), function (row) {
                    return Array.prototype.map.call(row.children, function (cell) {
                        return cell.textContent.trim();
                    }).join("\t");
                }).join("\n");
                copyText(rows).then(function () {
                    showToast("Tabelle kopiert");
                });
            });
        });
    }

    function initTabs() {
        document.querySelectorAll("[data-tabs]").forEach(function (tabs) {
            var buttons = tabs.querySelectorAll("[data-tab]");
            var panels = tabs.querySelectorAll("[data-tab-panel]");
            buttons.forEach(function (button) {
                button.addEventListener("click", function () {
                    buttons.forEach(function (item) {
                        item.setAttribute("aria-selected", String(item === button));
                    });
                    panels.forEach(function (panel) {
                        panel.classList.toggle("active", panel.dataset.tabPanel === button.dataset.tab);
                    });
                });
            });
        });
    }

    function initZoom() {
        document.querySelectorAll("[data-zoom-image]").forEach(function (button) {
            button.addEventListener("click", function () {
                var modal = document.createElement("div");
                modal.className = "modal-backdrop";
                modal.dataset.zoomModal = "";
                modal.innerHTML = [
                    '<div class="zoom-content" role="dialog" aria-modal="true">',
                    '  <div class="modal-header">',
                    '    <h2>Bildansicht</h2>',
                    '    <button class="icon-button" type="button" data-close-modal>Schliessen</button>',
                    '  </div>',
                    '  <img src="' + button.dataset.zoomImage + '" alt="' + (button.dataset.zoomAlt || "") + '">',
                    '</div>'
                ].join("");
                document.body.appendChild(modal);
                document.body.classList.add("zoom-open");
            });
        });
    }

    function initGlobalEvents() {
        document.addEventListener("click", function (event) {
            var target = event.target;
            if (!(target instanceof Element)) return;

            if (target.closest("[data-open-search]")) {
                openSearch();
            }

            if (target.closest("[data-open-settings]")) {
                openSettings();
            }

            if (target.closest("[data-print]")) {
                window.print();
            }

            if (target.closest("[data-back-top]")) {
                window.scrollTo({ top: 0, behavior: settings.reduceMotion ? "auto" : "smooth" });
            }

            if (target.closest("[data-close-modal]")) {
                closeSearch();
                var zoom = document.querySelector("[data-zoom-modal]");
                if (zoom) zoom.remove();
                document.body.classList.remove("zoom-open");
            }

            if (target.closest("[data-close-settings]")) {
                closeSettings();
            }

            var themeButton = target.closest("[data-theme-choice]");
            if (themeButton) {
                settings.theme = themeButton.dataset.themeChoice;
                writeSettings(settings);
                applySettings();
            }

            var accentButton = target.closest("[data-accent-choice]");
            if (accentButton) {
                settings.accent = accentButton.dataset.accentChoice;
                writeSettings(settings);
                applySettings();
            }

            if (target.closest("[data-reset-settings]")) {
                settings = Object.assign({}, defaultSettings);
                writeSettings(settings);
                applySettings();
                showToast("Optionen zurueckgesetzt");
            }
        });

        document.addEventListener("input", function (event) {
            var target = event.target;
            if (!(target instanceof Element)) return;

            if (target.matches("[data-site-search]")) {
                renderSearchResults(target.value);
            }

            if (target.matches("[data-font-range]")) {
                settings.font = Number(target.value);
                writeSettings(settings);
                applySettings();
            }

            if (target.matches("[data-space-range]")) {
                settings.space = Number(target.value);
                writeSettings(settings);
                applySettings();
            }
        });

        document.addEventListener("change", function (event) {
            var target = event.target;
            if (!(target instanceof Element)) return;

            if (target.matches("[data-contrast-toggle]")) {
                settings.contrast = target.checked;
                writeSettings(settings);
                applySettings();
            }

            if (target.matches("[data-motion-toggle]")) {
                settings.reduceMotion = target.checked;
                writeSettings(settings);
                applySettings();
            }
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                closeSearch();
                closeSettings();
                var zoom = document.querySelector("[data-zoom-modal]");
                if (zoom) zoom.remove();
                document.body.classList.remove("zoom-open");
            }

            if (event.key === "/" && !/input|textarea|select/i.test(document.activeElement.tagName)) {
                event.preventDefault();
                openSearch();
            }
        });

        if (window.matchMedia) {
            window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function () {
                if (settings.theme === "system") applySettings();
            });
        }
    }

    function init() {
        applySettings();
        createChrome();
        createSearchModal();
        createSettingsPanel();
        initNavigation();
        initReadingProgress();
        initReveal();
        initChecklists();
        initCalculator();
        initTableTools();
        initTabs();
        initZoom();
        initGlobalEvents();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
