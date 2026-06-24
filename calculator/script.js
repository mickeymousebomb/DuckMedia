// Basic Calculator Class
class Calculator {
    constructor(previousOperandElement, currentOperandElement) {
        this.previousOperandElement = previousOperandElement;
        this.currentOperandElement = currentOperandElement;
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
        this.updateDisplay();
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
        this.updateDisplay();
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
        this.updateDisplay();
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
        this.updateDisplay();
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;

        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '/':
                computation = prev / current;
                break;
            case '%':
                computation = prev % current;
                break;
            default:
                return;
        }

        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
        this.updateDisplay();
    }

    updateDisplay() {
        this.currentOperandElement.innerText = this.formatNumber(this.currentOperand);
        if (this.operation != null) {
            this.previousOperandElement.innerText = 
                `${this.formatNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.previousOperandElement.innerText = '';
        }
    }

    formatNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;

        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            });
        }

        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }
}

// Scientific Calculator Class
class ScientificCalculator extends Calculator {
    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;

        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '/':
                computation = prev / current;
                break;
            case '%':
                computation = prev % current;
                break;
            case '^':
                computation = Math.pow(prev, current);
                break;
            default:
                return;
        }

        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
        this.updateDisplay();
    }

    sqrt() {
        if (this.currentOperand === '') return;
        this.currentOperand = Math.sqrt(parseFloat(this.currentOperand));
        this.updateDisplay();
    }

    sin() {
        if (this.currentOperand === '') return;
        // Convert to radians
        this.currentOperand = Math.sin(parseFloat(this.currentOperand) * Math.PI / 180);
        this.updateDisplay();
    }

    cos() {
        if (this.currentOperand === '') return;
        this.currentOperand = Math.cos(parseFloat(this.currentOperand) * Math.PI / 180);
        this.updateDisplay();
    }

    tan() {
        if (this.currentOperand === '') return;
        this.currentOperand = Math.tan(parseFloat(this.currentOperand) * Math.PI / 180);
        this.updateDisplay();
    }

    log() {
        if (this.currentOperand === '') return;
        this.currentOperand = Math.log10(parseFloat(this.currentOperand));
        this.updateDisplay();
    }

    ln() {
        if (this.currentOperand === '') return;
        this.currentOperand = Math.log(parseFloat(this.currentOperand));
        this.updateDisplay();
    }

    factorial() {
        if (this.currentOperand === '') return;
        const num = parseInt(this.currentOperand);
        if (num < 0) return;
        let result = 1;
        for (let i = 2; i <= num; i++) {
            result *= i;
        }
        this.currentOperand = result;
        this.updateDisplay();
    }

    reciprocal() {
        if (this.currentOperand === '' || parseFloat(this.currentOperand) === 0) return;
        this.currentOperand = 1 / parseFloat(this.currentOperand);
        this.updateDisplay();
    }

    appendPi() {
        this.currentOperand = Math.PI;
        this.updateDisplay();
    }

    appendE() {
        this.currentOperand = Math.E;
        this.updateDisplay();
    }

    power() {
        if (this.currentOperand === '') return;
        this.operation = '^';
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
        this.updateDisplay();
    }
}

// Unit Converter Class
class UnitConverter {
    constructor() {
        this.conversionFactors = {
            length: {
                m: 1,
                km: 0.001,
                cm: 100,
                mm: 1000,
                mi: 0.000621371,
                yd: 1.09361,
                ft: 3.28084,
                in: 39.3701
            },
            weight: {
                kg: 1,
                g: 1000,
                mg: 1000000,
                lb: 2.20462,
                oz: 35.274
            },
            temperature: {
                c: 1,
                f: 2,
                k: 3
            },
            volume: {
                l: 1,
                ml: 1000,
                gal: 0.264172,
                pt: 2.11338,
                cup: 4.22675
            }
        };
    }

    convert(value, fromUnit, toUnit, type) {
        if (type === 'temperature') {
            return this.convertTemperature(value, fromUnit, toUnit);
        }

        const factors = this.conversionFactors[type];
        if (!factors[fromUnit] || !factors[toUnit]) return null;

        // Convert to base unit, then to target unit
        const baseValue = value / factors[fromUnit];
        return baseValue * factors[toUnit];
    }

    convertTemperature(value, fromUnit, toUnit) {
        let celsius;

        // Convert to Celsius first
        if (fromUnit === 'c') {
            celsius = value;
        } else if (fromUnit === 'f') {
            celsius = (value - 32) * 5 / 9;
        } else if (fromUnit === 'k') {
            celsius = value - 273.15;
        }

        // Convert from Celsius to target
        if (toUnit === 'c') {
            return celsius;
        } else if (toUnit === 'f') {
            return celsius * 9 / 5 + 32;
        } else if (toUnit === 'k') {
            return celsius + 273.15;
        }
    }

    getUnitsForType(type) {
        const unitsMap = {
            length: [
                { value: 'm', text: 'Meters (m)' },
                { value: 'km', text: 'Kilometers (km)' },
                { value: 'cm', text: 'Centimeters (cm)' },
                { value: 'mm', text: 'Millimeters (mm)' },
                { value: 'mi', text: 'Miles (mi)' },
                { value: 'yd', text: 'Yards (yd)' },
                { value: 'ft', text: 'Feet (ft)' },
                { value: 'in', text: 'Inches (in)' }
            ],
            weight: [
                { value: 'kg', text: 'Kilograms (kg)' },
                { value: 'g', text: 'Grams (g)' },
                { value: 'mg', text: 'Milligrams (mg)' },
                { value: 'lb', text: 'Pounds (lb)' },
                { value: 'oz', text: 'Ounces (oz)' }
            ],
            temperature: [
                { value: 'c', text: 'Celsius (°C)' },
                { value: 'f', text: 'Fahrenheit (°F)' },
                { value: 'k', text: 'Kelvin (K)' }
            ],
            volume: [
                { value: 'l', text: 'Liters (L)' },
                { value: 'ml', text: 'Milliliters (ml)' },
                { value: 'gal', text: 'Gallons (gal)' },
                { value: 'pt', text: 'Pints (pt)' },
                { value: 'cup', text: 'Cups (cup)' }
            ]
        };
        return unitsMap[type] || [];
    }
}

// Initialize Basic Calculator
const display = document.getElementById('display');
const previousOperand = document.getElementById('previousOperand');
const basicCalculator = new Calculator(previousOperand, display);

const numberButtons = document.querySelectorAll('.basic-mode .number-btn');
const operatorButtons = document.querySelectorAll('.basic-mode .operator-btn');
const clearButton = document.getElementById('clear');
const deleteButton = document.getElementById('delete');
const equalsButton = document.getElementById('equals');
const decimalButton = document.getElementById('decimal');

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        basicCalculator.appendNumber(button.innerText);
    });
});

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        basicCalculator.chooseOperation(button.dataset.operator);
    });
});

equalsButton.addEventListener('click', () => {
    basicCalculator.compute();
});

clearButton.addEventListener('click', () => {
    basicCalculator.clear();
});

deleteButton.addEventListener('click', () => {
    basicCalculator.delete();
});

decimalButton.addEventListener('click', () => {
    basicCalculator.appendNumber('.');
});

// Initialize Scientific Calculator
const sciDisplay = document.getElementById('sci-display');
const sciPreviousOperand = document.getElementById('sciPreviousOperand');
const scientificCalculator = new ScientificCalculator(sciPreviousOperand, sciDisplay);

const sciNumberButtons = document.querySelectorAll('.scientific-mode .number-btn');
const sciOperatorButtons = document.querySelectorAll('.scientific-mode .operator-btn');
const sciClearButton = document.getElementById('sci-clear');
const sciDeleteButton = document.getElementById('sci-delete');
const sciEqualsButton = document.getElementById('sci-equals');
const sciDecimalButton = document.getElementById('sci-decimal');
const sciButtons = document.querySelectorAll('.scientific-mode .sci-btn');

sciNumberButtons.forEach(button => {
    button.addEventListener('click', () => {
        scientificCalculator.appendNumber(button.innerText);
    });
});

sciOperatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        scientificCalculator.chooseOperation(button.dataset.operator);
    });
});

sciEqualsButton.addEventListener('click', () => {
    scientificCalculator.compute();
});

sciClearButton.addEventListener('click', () => {
    scientificCalculator.clear();
});

sciDeleteButton.addEventListener('click', () => {
    scientificCalculator.delete();
});

sciDecimalButton.addEventListener('click', () => {
    scientificCalculator.appendNumber('.');
});

sciButtons.forEach(button => {
    button.addEventListener('click', () => {
        const func = button.dataset.func;
        switch(func) {
            case 'sqrt':
                scientificCalculator.sqrt();
                break;
            case 'sin':
                scientificCalculator.sin();
                break;
            case 'cos':
                scientificCalculator.cos();
                break;
            case 'tan':
                scientificCalculator.tan();
                break;
            case 'log':
                scientificCalculator.log();
                break;
            case 'ln':
                scientificCalculator.ln();
                break;
            case 'factorial':
                scientificCalculator.factorial();
                break;
            case 'reciprocal':
                scientificCalculator.reciprocal();
                break;
            case 'pi':
                scientificCalculator.appendPi();
                break;
            case 'e':
                scientificCalculator.appendE();
                break;
            case 'pow':
                scientificCalculator.power();
                break;
        }
    });
});

// Initialize Unit Converter
const unitConverter = new UnitConverter();
const converterType = document.getElementById('converterType');
const fromUnit = document.getElementById('fromUnit');
const toUnit = document.getElementById('toUnit');
const fromValue = document.getElementById('fromValue');
const toValue = document.getElementById('toValue');
const convertBtn = document.getElementById('convertBtn');

function updateConverterUnits() {
    const type = converterType.value;
    const units = unitConverter.getUnitsForType(type);

    // Clear and repopulate unit selects
    fromUnit.innerHTML = '';
    toUnit.innerHTML = '';

    units.forEach(unit => {
        const option1 = document.createElement('option');
        option1.value = unit.value;
        option1.text = unit.text;
        fromUnit.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = unit.value;
        option2.text = unit.text;
        toUnit.appendChild(option2);
    });

    // Set default selection for toUnit
    if (toUnit.options.length > 1) {
        toUnit.selectedIndex = 1;
    }

    performConversion();
}

function performConversion() {
    const type = converterType.value;
    const from = fromUnit.value;
    const to = toUnit.value;
    const value = parseFloat(fromValue.value);

    if (isNaN(value)) {
        toValue.value = '';
        return;
    }

    const result = unitConverter.convert(value, from, to, type);
    toValue.value = result.toFixed(6).replace(/\.?0+$/, '');
}

converterType.addEventListener('change', updateConverterUnits);
fromUnit.addEventListener('change', performConversion);
toUnit.addEventListener('change', performConversion);
fromValue.addEventListener('input', performConversion);
convertBtn.addEventListener('click', performConversion);

// Mode Toggle
const modeButtons = document.querySelectorAll('.mode-btn');
const modes = document.querySelectorAll('.mode');

modeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const mode = button.dataset.mode;

        // Remove active class from all buttons and modes
        modeButtons.forEach(btn => btn.classList.remove('active'));
        modes.forEach(m => m.classList.remove('active'));

        // Add active class to clicked button and corresponding mode
        button.classList.add('active');
        document.querySelector(`.${mode}-mode`).classList.add('active');

        // Initialize converter units if switching to converter
        if (mode === 'converter') {
            updateConverterUnits();
        }
    });
});

// Initialize converter on load
updateConverterUnits();
