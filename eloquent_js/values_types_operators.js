// NUMBERS
// Integer
var integer = 13;
// Fractional number
var fractional_number = 2.31;
// Exponential number
var exponential_number = 2.998e8;

// ARITHMETIC
// Compound arithmetic of addition and multiplication
var product = 100 + 4 * 11;
// Remainder 
var remainder = 314 % 100;

// SPECIAL NUMBER
// Positive infinity && Negative infinity
var pos_inf = Infinity;
var neg_inf = -Infinity
// NaN (not a number)
var nan = 0 / 0;

// STRING
// Double-quoted
var double_quoted_string = "Double-quoted string"
// Single-quoted
var single_quoted_string = 'Singled-quoted string'
// Even backticks
var backticked_string = `Backticked string`
// Character escaping
var newlined_string = "This is the first line\nAnd this is the second line"
// String concatenation
var concatenated_string = "con" + "cat" + "e" + "na" + "ted" + " " + "string";
// Template literals - backtick-quoted string with embedded values
var template_literal = `Half of 100 is ${100 / 2}`;

// UNARY OPERATORS
// typeof operator - used to display an object's type
var uo1 = 12;
var uo2 = "hans";

// BOOLEAN VALUES
var True = true;
var False = false;

// AUTOMATIC TYPE CONVERSION
var eight_multiply_null = 8 * null; // --> 0
var stringOfFive_minus_one = "5" - 1; // --> 4
var stringOfFive_add_one = "5" + 1; // --> 51
var string_multiply_two = "five" * 2; // --> NaN (!?)
var false_equals_zero = false == 0; 
var NaN_comparison = null == NaN;
console.log(NaN_comparison);