/**
 * URL Encoder/Decoder Utility Functions
 * Provides encoding, decoding, parsing, validation, and building capabilities
 */

/**
 * Encode a string using encodeURIComponent
 * Safely handles Unicode and special characters
 */
export function encodeUrlComponent(text: string): string {
  try {
    return encodeURIComponent(text)
  } catch (error) {
    throw new Error('Failed to encode URL component')
  }
}

/**
 * Decode a URL-encoded string
 * Handles malformed percent encoding with error messages
 */
export function decodeUrlComponent(text: string): string {
  try {
    return decodeURIComponent(text)
  } catch (error) {
    throw new Error('Invalid URL encoding or malformed percent sequence')
  }
}

/**
 * URL component parts returned from parsing
 */
export interface UrlParts {
  protocol: string      // 'https:'
  hostname: string      // 'example.com'
  port: string          // '8080' or ''
  pathname: string      // '/path/to/page'
  search: string        // '?key=value'
  hash: string          // '#section'
  isValid: boolean
  error?: string
}

/**
 * Parse and validate a URL string
 * Returns breakdown of URL components
 */
export function parseAndValidateUrl(urlString: string): UrlParts {
  if (!urlString.trim()) {
    return {
      protocol: '',
      hostname: '',
      port: '',
      pathname: '',
      search: '',
      hash: '',
      isValid: false,
      error: 'URL is empty'
    }
  }

  try {
    const url = new URL(urlString)
    return {
      protocol: url.protocol,
      hostname: url.hostname,
      port: url.port,
      pathname: url.pathname,
      search: url.search,
      hash: url.hash,
      isValid: true
    }
  } catch (error) {
    return {
      protocol: '',
      hostname: '',
      port: '',
      pathname: '',
      search: '',
      hash: '',
      isValid: false,
      error: 'Invalid URL format. Please include protocol (http:// or https://)'
    }
  }
}

/**
 * Query parameter with decoded value
 */
export interface QueryParam {
  key: string
  value: string
  decodedValue: string  // URL-decoded value
}

/**
 * Parse query parameters from a URL
 * Handles URLs with or without query strings
 */
export function parseQueryParams(urlString: string): QueryParam[] {
  if (!urlString.trim()) {
    return []
  }

  try {
    // Handle both full URLs and query strings
    let url: URL | null = null

    if (urlString.includes('?')) {
      // Try to parse as full URL first
      if (urlString.startsWith('http://') || urlString.startsWith('https://')) {
        url = new URL(urlString)
      } else {
        // If it's just a query string, add dummy domain
        url = new URL(`http://dummy.com${urlString.startsWith('?') ? urlString : '?' + urlString}`)
      }
    }

    if (!url || !url.search) {
      return []
    }

    const params: QueryParam[] = []
    const searchParams = new URLSearchParams(url.search)

    searchParams.forEach((value, key) => {
      params.push({
        key,
        value,
        decodedValue: decodeUrlComponent(value)
      })
    })

    return params
  } catch {
    return []
  }
}

/**
 * Input for building a URL from components
 */
export interface UrlBuilderInput {
  protocol: string
  domain: string
  path: string
  queryParams: { key: string; value: string }[]
  hash?: string
}

/**
 * Build a complete URL from components
 * Handles edge cases like missing slashes, empty values
 */
export function buildUrl(input: UrlBuilderInput): string {
  const { protocol, domain, path, queryParams, hash } = input

  if (!domain.trim()) {
    return ''
  }

  let url = `${protocol}://${domain}`

  // Add path with leading slash
  if (path.trim()) {
    const cleanPath = path.startsWith('/') ? path : `/${path}`
    url += cleanPath
  }

  // Add query parameters
  if (queryParams.length > 0) {
    const validParams = queryParams.filter(p => p.key.trim())
    if (validParams.length > 0) {
      const searchParams = new URLSearchParams()
      validParams.forEach(p => {
        searchParams.append(p.key, p.value)
      })
      url += `?${searchParams.toString()}`
    }
  }

  // Add hash
  if (hash && hash.trim()) {
    const cleanHash = hash.startsWith('#') ? hash : `#${hash}`
    url += cleanHash
  }

  return url
}
