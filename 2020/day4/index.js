let isTest = false;

let path = require('path');
let Day = require(path.join(__dirname, '..', '..', 'helpers', 'Day'));
let { isSuperSet } = require(path.join(__dirname, '..', '..', 'helpers', 'general'));
let _ = require('lodash');
let day = new Day(2020, 4, isTest);
day.task(1, task1);
day.task(2, task2);

/*
* -------------------------------------------------------------------------------------
* Solution below
* -------------------------------------------------------------------------------------
*/

const FIELD_KEYS = new Set(['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']);

function parseData(data) {
  return data.split('\r\n\r\n').map(pass => {
    const fields = pass.replace(/(\r\n)| /g, '--').split('--')
    return fields.reduce((res, field) => {
      const [key, value] = field.split(':');
      res[key] = value;
      return res;
    }, {})
  });
}

function task1(data) {
  const passports = parseData(data);

  return passports.reduce((sum, passport) => {
    const isValid = validPassport1(passport);
    return sum + (isValid ? 1 : 0)
  }, 0)
}

function task2(data) {
  const passports = parseData(data);

  return passports.reduce((sum, passport) => {
    const isValid = validPassport1(passport) && validPassport2(passport);
    return sum + (isValid ? 1 : 0)
  }, 0)
}

function validPassport1(passport) {
  let passportKeys = new Set(Object.keys(passport));
  return isSuperSet(passportKeys, FIELD_KEYS)
}

function validPassport2(passport) {
  try {
    const byrValid = validYear(passport['byr'], 1920, 2002);
    const iyrValid = validYear(passport['iyr'], 2010, 2020);
    const eyrValid = validYear(passport['eyr'], 2020, 2030);
    const hgtValid = validHeight(passport['hgt']);
    const hclValid = /^#[0-9a-f]{6}$/.test(passport['hcl']);
    const eclValid = /^amb|blu|brn|gry|grn|hzl|oth$/.test(passport['ecl']);
    const pidValid = /^\d{9}$/.test(passport['pid']);

    return byrValid && iyrValid && eyrValid && hgtValid && hclValid && eclValid && pidValid;
  } catch (e) {
    return false;
  }
}

function validYear(year, min, max) {
  return year.length === 4 && +year >= min && +year <= max;
}

function validHeight(height) {
  let [match, digit, unit] = height.match(/^(\d+)(in|cm)$/);

  let validUnit = unit === 'cm' || unit === 'in';
  let validDigit = unit === 'cm' ? (+digit >= 150 && +digit <= 193) : (+digit >= 59 && +digit <= 76);
  return validDigit && validUnit;
}
