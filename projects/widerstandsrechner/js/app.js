(() => {
    const OHM = "\u03a9";
    const MICRO = "\u00b5";
    const TAU = "\u03c4";

    const eSeries = {
        e12: [10, 12, 15, 18, 22, 27, 33, 39, 47, 56, 68, 82],
        e24: [10, 11, 12, 13, 15, 16, 18, 20, 22, 24, 27, 30, 33, 36, 39, 43, 47, 51, 56, 62, 68, 75, 82, 91],
        e96: [100, 102, 105, 107, 110, 113, 115, 118, 121, 124, 127, 130, 133, 137, 140, 143, 147, 150, 154, 158, 162, 165, 169, 174, 178, 182, 187, 191, 196, 200, 205, 210, 215, 221, 226, 232, 237, 243, 249, 255, 261, 267, 274, 280, 287, 294, 301, 309, 316, 324, 332, 340, 348, 357, 365, 374, 383, 392, 402, 412, 422, 432, 442, 453, 464, 475, 487, 499, 511, 523, 536, 549, 562, 576, 590, 604, 619, 634, 649, 665, 681, 698, 715, 732, 750, 768, 787, 806, 825, 845, 866, 887, 909, 931, 953, 976]
    };

    const colorDigits = [
        { name: "Schwarz", value: 0, color: "#1f2933" },
        { name: "Braun", value: 1, color: "#7c3f18" },
        { name: "Rot", value: 2, color: "#d62828" },
        { name: "Orange", value: 3, color: "#f97316" },
        { name: "Gelb", value: 4, color: "#facc15" },
        { name: "Gruen", value: 5, color: "#16a34a" },
        { name: "Blau", value: 6, color: "#2563eb" },
        { name: "Violett", value: 7, color: "#7c3aed" },
        { name: "Grau", value: 8, color: "#6b7280" },
        { name: "Weiss", value: 9, color: "#f8fafc" }
    ];

    const colorMultipliers = [
        { name: "Schwarz x1", value: 1, color: "#1f2933" },
        { name: "Braun x10", value: 10, color: "#7c3f18" },
        { name: "Rot x100", value: 100, color: "#d62828" },
        { name: "Orange x1k", value: 1000, color: "#f97316" },
        { name: "Gelb x10k", value: 10000, color: "#facc15" },
        { name: "Gruen x100k", value: 100000, color: "#16a34a" },
        { name: "Blau x1M", value: 1000000, color: "#2563eb" },
        { name: "Gold x0,1", value: 0.1, color: "#d4af37" },
        { name: "Silber x0,01", value: 0.01, color: "#c0c0c0" }
    ];

    const colorTolerances = [
        { name: "Braun +/-1%", value: 1, color: "#7c3f18" },
        { name: "Rot +/-2%", value: 2, color: "#d62828" },
        { name: "Gruen +/-0,5%", value: 0.5, color: "#16a34a" },
        { name: "Blau +/-0,25%", value: 0.25, color: "#2563eb" },
        { name: "Violett +/-0,1%", value: 0.1, color: "#7c3aed" },
        { name: "Gold +/-5%", value: 5, color: "#d4af37" },
        { name: "Silber +/-10%", value: 10, color: "#c0c0c0" }
    ];

    const state = {
        stock: "e12",
        networkMode: "series",
        networkValues: ["100", "390", "1k"]
    };

    const $ = (selector, root = document) => root.querySelector(selector);
    const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

    const numberFormat = new Intl.NumberFormat("de-DE", {
        maximumFractionDigits: 2
    });

    const preciseFormat = new Intl.NumberFormat("de-DE", {
        maximumFractionDigits: 4
    });

    function decimal(value) {
        return numberFormat.format(value);
    }

    function precise(value) {
        return preciseFormat.format(value);
    }

    function parsePlainNumber(input) {
        if (input === null || input === undefined) {
            return NaN;
        }
        const cleaned = String(input)
            .trim()
            .replace(/\s+/g, "")
            .replace(",", ".");
        if (!cleaned) {
            return NaN;
        }
        return Number(cleaned);
    }

    function suffixFactorForResistance(suffix) {
        const normalized = suffix.toLowerCase();
        if (!normalized || normalized === "r" || normalized === "ohm") {
            return 1;
        }
        if (normalized === "k" || normalized === "kohm") {
            return 1000;
        }
        if (normalized === "m" || normalized === "meg" || normalized === "mohm") {
            return 1000000;
        }
        return NaN;
    }

    function parseResistance(input) {
        if (typeof input === "number") {
            return input;
        }
        const raw = String(input || "")
            .trim()
            .replace(/\u03a9/gi, "")
            .replace(/ohm/gi, "")
            .replace(/\s+/g, "")
            .replace(",", ".");
        if (!raw) {
            return NaN;
        }

        const embedded = raw.match(/^([+-]?(?:\d+|\d*\.\d+))([rRkKmM])(\d+)$/);
        if (embedded) {
            const factor = suffixFactorForResistance(embedded[2]);
            return Number(`${embedded[1]}.${embedded[3]}`) * factor;
        }

        const regular = raw.match(/^([+-]?(?:\d+|\d*\.\d+))(k|K|m|M|meg)?$/);
        if (!regular) {
            return NaN;
        }
        return Number(regular[1]) * suffixFactorForResistance(regular[2] || "");
    }

    function parseCapacitance(input) {
        const raw = String(input || "")
            .trim()
            .replace(/\s+/g, "")
            .replace(/farad/gi, "")
            .replace(/f$/i, "")
            .replace(",", ".");
        if (!raw) {
            return NaN;
        }

        const factorMap = {
            p: 1e-12,
            n: 1e-9,
            u: 1e-6,
            "\u00b5": 1e-6,
            m: 1e-3,
            "": 1
        };

        const embedded = raw.match(/^([+-]?(?:\d+|\d*\.\d+))([pnum\u00b5])(\d+)$/i);
        if (embedded) {
            const suffix = embedded[2].toLowerCase();
            return Number(`${embedded[1]}.${embedded[3]}`) * factorMap[suffix];
        }

        const regular = raw.match(/^([+-]?(?:\d+|\d*\.\d+))([pnum\u00b5])?$/i);
        if (!regular) {
            return NaN;
        }
        const suffix = regular[2] ? regular[2].toLowerCase() : "";
        return Number(regular[1]) * factorMap[suffix];
    }

    function formatResistance(value) {
        const absolute = Math.abs(value);
        if (!Number.isFinite(value)) {
            return "-";
        }
        if (absolute >= 1000000) {
            return `${precise(value / 1000000)} M${OHM}`;
        }
        if (absolute >= 1000) {
            return `${precise(value / 1000)} k${OHM}`;
        }
        if (absolute >= 1) {
            return `${precise(value)} ${OHM}`;
        }
        return `${precise(value * 1000)} m${OHM}`;
    }

    function formatVoltage(value) {
        return Number.isFinite(value) ? `${precise(value)} V` : "-";
    }

    function formatCurrent(value) {
        const absolute = Math.abs(value);
        if (!Number.isFinite(value)) {
            return "-";
        }
        if (absolute >= 1) {
            return `${precise(value)} A`;
        }
        if (absolute >= 0.001) {
            return `${precise(value * 1000)} mA`;
        }
        return `${precise(value * 1000000)} ${MICRO}A`;
    }

    function formatPower(value) {
        const absolute = Math.abs(value);
        if (!Number.isFinite(value)) {
            return "-";
        }
        if (absolute >= 1) {
            return `${precise(value)} W`;
        }
        if (absolute >= 0.001) {
            return `${precise(value * 1000)} mW`;
        }
        return `${precise(value * 1000000)} ${MICRO}W`;
    }

    function formatTime(value) {
        const absolute = Math.abs(value);
        if (!Number.isFinite(value)) {
            return "-";
        }
        if (absolute >= 1) {
            return `${precise(value)} s`;
        }
        if (absolute >= 0.001) {
            return `${precise(value * 1000)} ms`;
        }
        if (absolute >= 0.000001) {
            return `${precise(value * 1000000)} ${MICRO}s`;
        }
        return `${precise(value * 1000000000)} ns`;
    }

    function buildStandardValues(seriesName, minValue, maxValue) {
        const baseValues = eSeries[seriesName] || eSeries.e12;
        const values = new Set();
        const isE96 = seriesName === "e96";
        const multipliers = [0.001, 0.01, 0.1, 1, 10, 100, 1000, 10000, 100000, 1000000];

        for (const base of baseValues) {
            for (const multiplier of multipliers) {
                const value = isE96 ? (base / 10) * multiplier : base * multiplier;
                if (value >= minValue && value <= maxValue) {
                    values.add(Number(value.toPrecision(6)));
                }
            }
        }

        return Array.from(values).sort((a, b) => a - b);
    }

    function parseValueRange() {
        const [min, max] = $("#value-range").value.split(":").map(Number);
        return { min, max };
    }

    function parseCustomValues() {
        const { min, max } = parseValueRange();
        const tokens = $("#custom-values").value
            .split(/[;,\n]+/)
            .map((item) => item.trim())
            .filter(Boolean);
        const values = tokens
            .map(parseResistance)
            .filter((value) => Number.isFinite(value) && value > 0 && value >= min && value <= max);
        return Array.from(new Set(values)).sort((a, b) => a - b);
    }

    function getStockValues() {
        if (state.stock === "custom") {
            return parseCustomValues();
        }
        const { min, max } = parseValueRange();
        return buildStandardValues(state.stock, min, max);
    }

    function pushCandidate(candidates, candidate, keepCount) {
        candidate.error = Math.abs(candidate.value - candidate.target);
        candidate.errorPercent = candidate.target === 0 ? 0 : (candidate.error / candidate.target) * 100;
        candidates.push(candidate);
        if (candidates.length > keepCount * 20) {
            candidates.sort(compareCandidates);
            candidates.length = keepCount;
        }
    }

    function compareCandidates(a, b) {
        const typeOrder = { single: 0, series: 1, parallel: 2 };
        return a.errorPercent - b.errorPercent || typeOrder[a.type] - typeOrder[b.type] || a.value - b.value;
    }

    function findCombinations(target, stock, resultCount) {
        const candidates = [];
        const keepCount = resultCount * 8;

        for (const value of stock) {
            pushCandidate(candidates, {
                type: "single",
                values: [value],
                value,
                target
            }, keepCount);
        }

        for (let i = 0; i < stock.length; i += 1) {
            const a = stock[i];
            for (let j = i; j < stock.length; j += 1) {
                const b = stock[j];
                pushCandidate(candidates, {
                    type: "series",
                    values: [a, b],
                    value: a + b,
                    target
                }, keepCount);
                pushCandidate(candidates, {
                    type: "parallel",
                    values: [a, b],
                    value: (a * b) / (a + b),
                    target
                }, keepCount);
            }
        }

        const seen = new Set();
        return candidates
            .sort(compareCandidates)
            .filter((candidate) => {
                const key = `${candidate.type}:${candidate.values.join("|")}`;
                if (seen.has(key)) {
                    return false;
                }
                seen.add(key);
                return true;
            })
            .slice(0, resultCount);
    }

    function typeLabel(type) {
        if (type === "single") {
            return "Einzelwert";
        }
        if (type === "series") {
            return "Reihe";
        }
        return "Parallel";
    }

    function valuesLabel(candidate) {
        const separator = candidate.type === "parallel" ? " || " : " + ";
        return candidate.values.map(formatResistance).join(separator);
    }

    function renderCombinationError(message) {
        const body = $("#combination-results");
        body.innerHTML = "";
        const row = document.createElement("tr");
        const cell = document.createElement("td");
        cell.colSpan = 4;
        cell.className = "is-error";
        cell.textContent = message;
        row.appendChild(cell);
        body.appendChild(row);
        $("#result-meter-fill").style.width = "0";
    }

    function updateCombinations() {
        const targetValue = parsePlainNumber($("#target-value").value) * Number($("#target-unit").value);
        const resultCount = Number($("#result-count").value);
        const stock = getStockValues();

        if (!Number.isFinite(targetValue) || targetValue <= 0) {
            renderCombinationError("Bitte einen gueltigen Zielwert eingeben.");
            return;
        }
        if (stock.length < 1) {
            renderCombinationError("Keine gueltigen Widerstandswerte in der Auswahl gefunden.");
            return;
        }

        const results = findCombinations(targetValue, stock, resultCount);
        const body = $("#combination-results");
        body.innerHTML = "";

        for (const candidate of results) {
            const row = document.createElement("tr");
            const typeCell = document.createElement("td");
            const valuesCell = document.createElement("td");
            const resultCell = document.createElement("td");
            const errorCell = document.createElement("td");

            typeCell.textContent = typeLabel(candidate.type);
            valuesCell.textContent = valuesLabel(candidate);
            resultCell.textContent = formatResistance(candidate.value);
            errorCell.textContent = `${decimal(candidate.errorPercent)}%`;

            row.append(typeCell, valuesCell, resultCell, errorCell);
            body.appendChild(row);
        }

        const best = results[0];
        $("#combination-summary").textContent = `${formatResistance(targetValue)} Zielwert`;
        const fill = Math.max(8, 100 - Math.min(best.errorPercent * 16, 92));
        $("#result-meter-fill").style.width = `${fill}%`;
    }

    function renderNetworkRows() {
        const list = $("#network-values");
        list.innerHTML = "";

        state.networkValues.forEach((value, index) => {
            const row = document.createElement("div");
            row.className = "value-row";

            const label = document.createElement("label");
            label.textContent = `R${index + 1}`;
            const input = document.createElement("input");
            input.type = "text";
            input.inputMode = "decimal";
            input.value = value;
            input.dataset.networkIndex = String(index);
            label.appendChild(input);

            const remove = document.createElement("button");
            remove.type = "button";
            remove.textContent = "-";
            remove.setAttribute("aria-label", `R${index + 1} entfernen`);
            remove.dataset.removeNetwork = String(index);
            remove.disabled = state.networkValues.length <= 2;

            row.append(label, remove);
            list.appendChild(row);
        });
    }

    function calculateNetwork() {
        const values = state.networkValues.map(parseResistance).filter((value) => Number.isFinite(value) && value > 0);
        if (values.length !== state.networkValues.length) {
            $("#network-result").textContent = "-";
            $("#network-detail").textContent = "Bitte alle Widerstandswerte gueltig eintragen.";
            return;
        }

        const result = state.networkMode === "series"
            ? values.reduce((sum, value) => sum + value, 0)
            : 1 / values.reduce((sum, value) => sum + 1 / value, 0);

        $("#network-result").textContent = formatResistance(result);
        $("#network-detail").textContent = `${state.networkMode === "series" ? "Reihenschaltung" : "Parallelschaltung"} mit ${values.length} Widerstaenden.`;
    }

    function calculateDivider() {
        const vin = parsePlainNumber($("#divider-vin").value);
        const r1 = parseResistance($("#divider-r1").value);
        const r2 = parseResistance($("#divider-r2").value);
        const load = parseResistance($("#divider-load").value);

        if (!Number.isFinite(vin) || !Number.isFinite(r1) || !Number.isFinite(r2) || r1 <= 0 || r2 <= 0) {
            $("#divider-vout").textContent = "-";
            $("#divider-current").textContent = "-";
            $("#divider-load-share").textContent = "Eingabe pruefen";
            return;
        }

        const hasLoad = Number.isFinite(load) && load > 0;
        const bottom = hasLoad ? (r2 * load) / (r2 + load) : r2;
        const total = r1 + bottom;
        const current = vin / total;
        const vout = current * bottom;

        $("#divider-vout").textContent = formatVoltage(vout);
        $("#divider-current").textContent = formatCurrent(current);
        $("#divider-load-share").textContent = hasLoad ? formatCurrent(vout / load) : "ohne Last";
    }

    function calculateOhm() {
        let voltage = parsePlainNumber($("#ohm-v").value);
        let current = parsePlainNumber($("#ohm-i").value);
        let resistance = parseResistance($("#ohm-r").value);
        let power = parsePlainNumber($("#ohm-p").value);

        const known = [
            Number.isFinite(voltage) ? "v" : null,
            Number.isFinite(current) ? "i" : null,
            Number.isFinite(resistance) && resistance !== 0 ? "r" : null,
            Number.isFinite(power) && power >= 0 ? "p" : null
        ].filter(Boolean);

        if (known.length < 2) {
            $("#ohm-out-v").textContent = "-";
            $("#ohm-out-i").textContent = "-";
            $("#ohm-out-r").textContent = "-";
            $("#ohm-out-p").textContent = "2 Werte";
            return;
        }

        if (Number.isFinite(voltage) && Number.isFinite(resistance) && resistance !== 0) {
            current = voltage / resistance;
        } else if (Number.isFinite(voltage) && Number.isFinite(current) && current !== 0) {
            resistance = voltage / current;
        } else if (Number.isFinite(current) && Number.isFinite(resistance)) {
            voltage = current * resistance;
        } else if (Number.isFinite(power) && Number.isFinite(resistance) && resistance > 0) {
            current = Math.sqrt(power / resistance);
            voltage = current * resistance;
        } else if (Number.isFinite(power) && Number.isFinite(current) && current !== 0) {
            voltage = power / current;
            resistance = voltage / current;
        } else if (Number.isFinite(power) && Number.isFinite(voltage) && voltage !== 0) {
            current = power / voltage;
            resistance = voltage / current;
        }

        power = voltage * current;

        $("#ohm-out-v").textContent = formatVoltage(voltage);
        $("#ohm-out-i").textContent = formatCurrent(current);
        $("#ohm-out-r").textContent = formatResistance(resistance);
        $("#ohm-out-p").textContent = formatPower(power);
    }

    function nearestStandardAtOrAbove(value, seriesName) {
        const stock = buildStandardValues(seriesName, 0.1, 10000000);
        return stock.find((item) => item >= value) || stock[stock.length - 1];
    }

    function calculateLed() {
        const supply = parsePlainNumber($("#led-vs").value);
        const forward = parsePlainNumber($("#led-vf").value);
        const count = Number($("#led-count").value);
        const current = parsePlainNumber($("#led-current").value) / 1000;
        const headroom = supply - forward * count;

        if (!Number.isFinite(supply) || !Number.isFinite(forward) || !Number.isFinite(count) || !Number.isFinite(current) || count < 1 || current <= 0 || headroom <= 0) {
            $("#led-resistor").textContent = "-";
            $("#led-power").textContent = "-";
            $("#led-e12").textContent = "Spannung pruefen";
            return;
        }

        const resistance = headroom / current;
        const power = current * current * resistance;

        $("#led-resistor").textContent = formatResistance(resistance);
        $("#led-power").textContent = formatPower(power);
        $("#led-e12").textContent = formatResistance(nearestStandardAtOrAbove(resistance, "e12"));
    }

    function calculateRc() {
        const resistance = parseResistance($("#rc-r").value);
        const capacitance = parseCapacitance($("#rc-c").value);

        if (!Number.isFinite(resistance) || !Number.isFinite(capacitance) || resistance <= 0 || capacitance <= 0) {
            $("#rc-tau").textContent = "-";
            $("#rc-5tau").textContent = "-";
            $("#rc-fc").textContent = "Eingabe pruefen";
            return;
        }

        const tau = resistance * capacitance;
        const cutoff = 1 / (2 * Math.PI * tau);
        $("#rc-tau").textContent = formatTime(tau).replace("s", "s");
        $("#rc-5tau").textContent = formatTime(tau * 5);
        $("#rc-fc").textContent = `${precise(cutoff)} Hz`;
    }

    function populateColorSelect(select, items, defaultIndex) {
        select.innerHTML = "";
        items.forEach((item, index) => {
            const option = document.createElement("option");
            option.value = String(index);
            option.textContent = item.name;
            if (index === defaultIndex) {
                option.selected = true;
            }
            select.appendChild(option);
        });
    }

    function calculateColorCode() {
        const band1 = colorDigits[Number($("#color-band-1").value)];
        const band2 = colorDigits[Number($("#color-band-2").value)];
        const multiplier = colorMultipliers[Number($("#color-multiplier").value)];
        const tolerance = colorTolerances[Number($("#color-tolerance").value)];
        const resistance = (band1.value * 10 + band2.value) * multiplier.value;

        $("#color-result").textContent = `${formatResistance(resistance)} +/-${decimal(tolerance.value)}%`;
        $("#preview-band-1").style.background = band1.color;
        $("#preview-band-2").style.background = band2.color;
        $("#preview-multiplier").style.background = multiplier.color;
        $("#preview-tolerance").style.background = tolerance.color;
    }

    function bindTabs() {
        $$(".tab-list button").forEach((button) => {
            button.addEventListener("click", () => {
                const tab = button.dataset.tab;
                $$(".tab-list button").forEach((item) => {
                    item.classList.toggle("active", item === button);
                    item.setAttribute("aria-selected", item === button ? "true" : "false");
                });
                $$(".tab-panel").forEach((panel) => {
                    const active = panel.dataset.panel === tab;
                    panel.classList.toggle("active", active);
                    panel.hidden = !active;
                });
            });
        });
    }

    function bindCombinationForm() {
        $("#target-form").addEventListener("submit", (event) => {
            event.preventDefault();
            updateCombinations();
        });

        $("[data-stock='e12']").parentElement.addEventListener("click", (event) => {
            const button = event.target.closest("[data-stock]");
            if (!button) {
                return;
            }
            state.stock = button.dataset.stock;
            $$("[data-stock]").forEach((item) => item.classList.toggle("active", item === button));
            $("#custom-field").classList.toggle("is-visible", state.stock === "custom");
            updateCombinations();
        });

        ["target-value", "target-unit", "result-count", "value-range", "custom-values"].forEach((id) => {
            $(`#${id}`).addEventListener("input", updateCombinations);
            $(`#${id}`).addEventListener("change", updateCombinations);
        });

        $("#load-example").addEventListener("click", () => {
            $("#target-value").value = "3,3";
            $("#target-unit").value = "1000";
            $("#custom-values").value = "100, 220, 330, 470, 680, 1k, 2k2, 4k7, 10k";
            updateCombinations();
        });
    }

    function bindNetworkForm() {
        renderNetworkRows();
        calculateNetwork();

        $("#network-form").addEventListener("submit", (event) => {
            event.preventDefault();
            calculateNetwork();
        });

        $("#network-values").addEventListener("input", (event) => {
            const input = event.target.closest("[data-network-index]");
            if (!input) {
                return;
            }
            state.networkValues[Number(input.dataset.networkIndex)] = input.value;
            calculateNetwork();
        });

        $("#network-values").addEventListener("click", (event) => {
            const button = event.target.closest("[data-remove-network]");
            if (!button || state.networkValues.length <= 2) {
                return;
            }
            state.networkValues.splice(Number(button.dataset.removeNetwork), 1);
            renderNetworkRows();
            calculateNetwork();
        });

        $("#add-network-value").addEventListener("click", () => {
            state.networkValues.push("1k");
            renderNetworkRows();
            calculateNetwork();
        });

        $$("[data-network-mode]").forEach((button) => {
            button.addEventListener("click", () => {
                state.networkMode = button.dataset.networkMode;
                $$("[data-network-mode]").forEach((item) => item.classList.toggle("active", item === button));
                calculateNetwork();
            });
        });
    }

    function bindLiveForm(formId, handler) {
        const form = $(`#${formId}`);
        form.addEventListener("submit", (event) => event.preventDefault());
        form.addEventListener("input", handler);
        form.addEventListener("change", handler);
        handler();
    }

    function initColorCode() {
        populateColorSelect($("#color-band-1"), colorDigits, 4);
        populateColorSelect($("#color-band-2"), colorDigits, 7);
        populateColorSelect($("#color-multiplier"), colorMultipliers, 2);
        populateColorSelect($("#color-tolerance"), colorTolerances, 5);
        bindLiveForm("color-form", calculateColorCode);
    }

    function init() {
        bindTabs();
        bindCombinationForm();
        bindNetworkForm();
        bindLiveForm("divider-form", calculateDivider);
        bindLiveForm("ohm-form", calculateOhm);
        bindLiveForm("led-form", calculateLed);
        bindLiveForm("rc-form", calculateRc);
        initColorCode();
        updateCombinations();
    }

    document.addEventListener("DOMContentLoaded", init);
})();
