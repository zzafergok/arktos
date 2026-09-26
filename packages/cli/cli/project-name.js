export function normalizeProjectName(name) {
  if (!name || typeof name !== 'string') {
    return name
  }

  try {
    let normalized = name.normalize('NFD')

    const characterMap = {
      ç: 'c',
      Ç: 'C',
      ğ: 'g',
      Ğ: 'G',
      ı: 'i',
      İ: 'I',
      ö: 'o',
      Ö: 'O',
      ş: 's',
      Ş: 'S',
      ü: 'u',
      Ü: 'U',
      á: 'a',
      Á: 'A',
      à: 'a',
      À: 'A',
      â: 'a',
      Â: 'A',
      é: 'e',
      É: 'E',
      è: 'e',
      È: 'E',
      ê: 'e',
      Ê: 'E',
      í: 'i',
      Í: 'I',
      ì: 'i',
      Ì: 'I',
      î: 'i',
      Î: 'I',
      ó: 'o',
      Ó: 'O',
      ò: 'o',
      Ò: 'O',
      ô: 'o',
      Ô: 'O',
      ú: 'u',
      Ú: 'U',
      ù: 'u',
      Ù: 'U',
      û: 'u',
      Û: 'U',
      ñ: 'n',
      Ñ: 'N',
    }

    normalized = normalized.replace(/./g, (char) => characterMap[char] || char)
    normalized = normalized.replace(/\p{Diacritic}/gu, '')

    return normalized.normalize('NFC')
  } catch {
    const fallbackMap = {
      ç: 'c',
      Ç: 'C',
      ğ: 'g',
      Ğ: 'G',
      ı: 'i',
      İ: 'I',
      ö: 'o',
      Ö: 'O',
      ş: 's',
      Ş: 'S',
      ü: 'u',
      Ü: 'U',
    }

    return name.replace(/[çÇğĞıİöÖşŞüÜ]/g, (char) => fallbackMap[char] || char)
  }
}

export function validateProjectName(name) {
  const checks = [
    {
      test: name && name.trim() !== '',
      message: 'Project name cannot be empty',
      code: 'EMPTY_NAME',
    },
    {
      test: name.length <= 50,
      message: 'Project name cannot exceed 50 characters',
      code: 'NAME_TOO_LONG',
    },
    {
      test: name.length >= 1,
      message: 'Project name must be at least 1 character long',
      code: 'NAME_TOO_SHORT',
    },
    {
      test: !/^\d/.test(name),
      message: 'Project name cannot start with a number',
      code: 'STARTS_WITH_NUMBER',
    },
    {
      test: !name.includes(' '),
      message: 'Project name cannot contain spaces',
      code: 'CONTAINS_SPACE',
    },
    {
      test: !/^[.-]/.test(name),
      message: 'Project name cannot start with a dot or hyphen',
      code: 'STARTS_WITH_SPECIAL',
    },
    {
      test: !/[.-]$/.test(name),
      message: 'Project name cannot end with a dot or hyphen',
      code: 'ENDS_WITH_SPECIAL',
    },
  ]

  for (const check of checks) {
    if (!check.test) {
      return {
        isValid: false,
        message: check.message,
        code: check.code,
      }
    }
  }

  const normalizedName = normalizeProjectName(name)
  const validationRegex = /^[a-zA-Z0-9._-]+$/
  if (!validationRegex.test(normalizedName)) {
    return {
      isValid: false,
      message: 'Project name can only contain letters, numbers, dots, hyphens, and underscores',
      code: 'INVALID_CHARACTERS',
    }
  }

  const reservedNames = [
    'test',
    'express',
    'node_modules',
    '.git',
    'src',
    'public',
    'build',
    'dist',
    'coverage',
    'prisma',
    'api',
    'root',
    'admin',
    'config',
    'lib',
    'bin',
  ]

  if (reservedNames.includes(normalizedName.toLowerCase())) {
    return {
      isValid: false,
      message: `"${name}" is a reserved name, please choose another name`,
      code: 'RESERVED_NAME',
    }
  }

  const npmInvalidPatterns = [/^_/, /\s/, /[A-Z]/, /[@/]/]

  for (const pattern of npmInvalidPatterns) {
    if (pattern.test(normalizedName)) {
      return {
        isValid: false,
        message: 'Project name must follow npm package naming conventions (lowercase, no spaces, no leading underscore)',
        code: 'INVALID_NPM_NAME',
      }
    }
  }

  return { isValid: true, normalizedName }
}
