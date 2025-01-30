// Constantes selon la législation guinéenne
export const PAYROLL_CONSTANTS = {
  // Cotisations sociales (CNSS)
  CNSS_EMPLOYER_RATE: 0.18, // 18% employeur
  CNSS_EMPLOYEE_RATE: 0.05, // 5% employé
  CNSS_CEILING: 2500000, // Plafond mensuel CNSS en GNF

  // Impôt sur le Revenu (ITS - Impôt sur les Traitements et Salaires)
  ITS_BRACKETS: [
    { min: 0, max: 1000000, rate: 0 }, // 0%
    { min: 1000001, max: 5000000, rate: 0.10 }, // 10%
    { min: 5000001, max: 10000000, rate: 0.15 }, // 15%
    { min: 10000001, Infinity, rate: 0.20 }, // 20%
  ],

  // Autres retenues
  PROFESSIONAL_TAX_RATE: 0.015, // Taxe professionnelle 1.5%
  
  // Primes légales
  TRANSPORT_ALLOWANCE: 50000, // Indemnité de transport en GNF
  SENIORITY_RATES: [
    { years: 3, rate: 0.03 }, // 3% après 3 ans
    { years: 5, rate: 0.05 }, // 5% après 5 ans
    { years: 10, rate: 0.07 }, // 7% après 10 ans
    { years: 15, rate: 0.09 }, // 9% après 15 ans
  ]
};

// Calcul de l'ITS
export const calculateITS = (baseSalary) => {
  let its = 0;
  let remainingSalary = baseSalary;

  for (const bracket of PAYROLL_CONSTANTS.ITS_BRACKETS) {
    if (remainingSalary <= 0) break;

    const taxableAmount = Math.min(
      remainingSalary,
      bracket.max ? bracket.max - bracket.min : remainingSalary
    );
    its += taxableAmount * bracket.rate;
    remainingSalary -= taxableAmount;
  }

  return its;
};

// Calcul des cotisations CNSS
export const calculateCNSS = (baseSalary, isEmployer = false) => {
  const cappedSalary = Math.min(baseSalary, PAYROLL_CONSTANTS.CNSS_CEILING);
  const rate = isEmployer ? 
    PAYROLL_CONSTANTS.CNSS_EMPLOYER_RATE : 
    PAYROLL_CONSTANTS.CNSS_EMPLOYEE_RATE;
  
  return cappedSalary * rate;
};

// Calcul de la prime d'ancienneté
export const calculateSeniorityBonus = (baseSalary, yearsOfService) => {
  const applicableRate = PAYROLL_CONSTANTS.SENIORITY_RATES
    .reverse()
    .find(sr => yearsOfService >= sr.years);

  return applicableRate ? baseSalary * applicableRate.rate : 0;
};

// Calcul du salaire net
export const calculateNetSalary = (
  baseSalary,
  yearsOfService,
  additionalBonuses = [],
  additionalDeductions = []
) => {
  // Calcul des primes
  const seniorityBonus = calculateSeniorityBonus(baseSalary, yearsOfService);
  const transportAllowance = PAYROLL_CONSTANTS.TRANSPORT_ALLOWANCE;
  const totalBonuses = additionalBonuses.reduce((sum, bonus) => sum + bonus.amount, 0);

  // Salaire brut
  const grossSalary = baseSalary + seniorityBonus + transportAllowance + totalBonuses;

  // Calcul des retenues
  const cnssEmployee = calculateCNSS(baseSalary);
  const its = calculateITS(grossSalary - cnssEmployee);
  const professionalTax = baseSalary * PAYROLL_CONSTANTS.PROFESSIONAL_TAX_RATE;
  const totalDeductions = additionalDeductions.reduce((sum, deduction) => sum + deduction.amount, 0);

  // Calcul du net
  const netSalary = grossSalary - (cnssEmployee + its + professionalTax + totalDeductions);

  return {
    grossSalary,
    netSalary,
    details: {
      baseSalary,
      bonuses: {
        seniority: seniorityBonus,
        transport: transportAllowance,
        additional: totalBonuses,
      },
      deductions: {
        cnss: cnssEmployee,
        its,
        professionalTax,
        additional: totalDeductions,
      }
    }
  };
};
